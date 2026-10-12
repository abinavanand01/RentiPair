import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('your-project-id')
);

/**
 * Local Data Storage for Development & Offline Mode
 * Strictly starts 100% EMPTY without any fake or demo users.
 * All records must be genuinely created by real users.
 */
class LocalAuthStorage {
  constructor() {
    this.sessionKey = 'rentipair_sb_session';
    this.usersKey = 'rentipair_sb_users';
    this.profilesKey = 'rentipair_sb_profiles';
    this.capabilitiesKey = 'rentipair_sb_capabilities';
    this.tablePrefix = 'rentipair_tbl_';

    // Purge legacy demo users if present in client storage
    this.cleanLegacyDemoData();
  }

  cleanLegacyDemoData() {
    try {
      const users = this.getUsers();
      const hasDemoUser = users.some(u => u.email?.includes('rentipair.in') || u.id === 'usr_demo_user');
      if (hasDemoUser) {
        const realUsers = users.filter(u => !u.email?.includes('rentipair.in') && u.id !== 'usr_demo_user');
        localStorage.setItem(this.usersKey, JSON.stringify(realUsers));
      }

      const session = this.getSession();
      if (session?.user?.email?.includes('rentipair.in') || session?.user?.id === 'usr_demo_user') {
        localStorage.removeItem(this.sessionKey);
      }
    } catch {
      // ignore
    }
  }

  getSession() {
    try {
      const data = localStorage.getItem(this.sessionKey);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  setSession(session) {
    if (session) {
      localStorage.setItem(this.sessionKey, JSON.stringify(session));
    } else {
      localStorage.removeItem(this.sessionKey);
    }
  }

  getUsers() {
    try {
      const data = localStorage.getItem(this.usersKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveUser(user) {
    const users = this.getUsers().filter(u => u.id !== user.id && u.email !== user.email);
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  getProfile(userId) {
    try {
      const data = localStorage.getItem(this.profilesKey);
      const profiles = data ? JSON.parse(data) : {};
      return profiles[userId] || null;
    } catch {
      return null;
    }
  }

  saveProfile(userId, profile) {
    try {
      const data = localStorage.getItem(this.profilesKey);
      const profiles = data ? JSON.parse(data) : {};
      profiles[userId] = { ...profiles[userId], ...profile, updated_at: new Date().toISOString() };
      localStorage.setItem(this.profilesKey, JSON.stringify(profiles));
      return profiles[userId];
    } catch {
      return profile;
    }
  }

  getCapabilities(userId) {
    try {
      const data = localStorage.getItem(this.capabilitiesKey);
      const caps = data ? JSON.parse(data) : {};
      return caps[userId] || [];
    } catch {
      return [];
    }
  }

  saveCapabilities(userId, capabilities) {
    try {
      const data = localStorage.getItem(this.capabilitiesKey);
      const caps = data ? JSON.parse(data) : {};
      caps[userId] = capabilities;
      localStorage.setItem(this.capabilitiesKey, JSON.stringify(caps));
      return caps[userId];
    } catch {
      return capabilities;
    }
  }

  getTableRecords(tableName) {
    try {
      const data = localStorage.getItem(this.tablePrefix + tableName);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveTableRecords(tableName, records) {
    try {
      localStorage.setItem(this.tablePrefix + tableName, JSON.stringify(records));
    } catch {
      // ignore
    }
  }
}

const localStorageAuth = new LocalAuthStorage();

// Export the real Supabase client if configured, otherwise provide an authenticated client shim
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : {
      auth: {
        async getSession() {
          const session = localStorageAuth.getSession();
          return { data: { session }, error: null };
        },
        async getUser() {
          const session = localStorageAuth.getSession();
          return { data: { user: session?.user || null }, error: null };
        },
        async signUp({ email, password, options }) {
          const users = localStorageAuth.getUsers();
          const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
          if (existing) {
            return { data: { user: null, session: null }, error: { message: 'A user with this email already exists.' } };
          }
          const userId = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
          const user = {
            id: userId,
            email,
            created_at: new Date().toISOString(),
            user_metadata: options?.data || {}
          };
          localStorageAuth.saveUser({ ...user, password });

          const newProfile = {
            id: userId,
            user_id: userId,
            full_name: options?.data?.full_name || email.split('@')[0],
            avatar_url: options?.data?.avatar_url || '',
            phone: options?.data?.phone || '',
            city: options?.data?.city || 'Chennai',
            onboarding_completed: false,
            is_admin: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          localStorageAuth.saveProfile(userId, newProfile);
          localStorageAuth.saveCapabilities(userId, ['RENTER']);

          const session = {
            access_token: `sb_token_${Date.now()}`,
            token_type: 'bearer',
            expires_in: 3600,
            user
          };
          localStorageAuth.setSession(session);
          return { data: { user, session }, error: null };
        },
        async signInWithPassword({ email, password }) {
          const users = localStorageAuth.getUsers();
          const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
          if (!found) {
            return { data: { user: null, session: null }, error: { message: 'No registered user found with this email. Please sign up.' } };
          }
          if (found.password && found.password !== password) {
            return { data: { user: null, session: null }, error: { message: 'Invalid password. Please check and try again.' } };
          }
          const user = {
            id: found.id,
            email: found.email,
            created_at: found.created_at,
            user_metadata: found.user_metadata || {}
          };
          const session = {
            access_token: `sb_token_${Date.now()}`,
            token_type: 'bearer',
            expires_in: 3600,
            user
          };
          localStorageAuth.setSession(session);
          return { data: { user, session }, error: null };
        },
        async signOut() {
          localStorageAuth.setSession(null);
          return { error: null };
        },
        async resetPasswordForEmail(email) {
          return { data: {}, error: null };
        },
        onAuthStateChange(callback) {
          const session = localStorageAuth.getSession();
          if (session) {
            callback('SIGNED_IN', session);
          } else {
            callback('SIGNED_OUT', null);
          }
          return {
            data: {
              subscription: {
                unsubscribe: () => {}
              }
            }
          };
        }
      },
      from(tableName) {
        return {
          select: (columns = '*') => ({
            eq: (field, val) => ({
              single: async () => {
                if (tableName === 'profiles') {
                  const p = localStorageAuth.getProfile(val);
                  return { data: p, error: p ? null : { message: 'Not found' } };
                }
                const items = localStorageAuth.getTableRecords(tableName);
                const found = items.find(i => i[field] === val);
                return { data: found || null, error: found ? null : { message: 'Not found' } };
              },
              then: (resolve) => {
                if (tableName === 'user_capabilities') {
                  const caps = localStorageAuth.getCapabilities(val);
                  resolve({ data: caps.map(c => ({ capability: c })), error: null });
                } else {
                  const items = localStorageAuth.getTableRecords(tableName);
                  const matched = items.filter(i => i[field] === val);
                  resolve({ data: matched, error: null });
                }
              }
            }),
            then: (resolve) => {
              const records = localStorageAuth.getTableRecords(tableName);
              resolve({ data: records, error: null });
            }
          }),
          upsert: (record) => ({
            select: () => ({
              single: async () => {
                if (tableName === 'profiles') {
                  const updated = localStorageAuth.saveProfile(record.id || record.user_id, record);
                  return { data: updated, error: null };
                }
                const items = localStorageAuth.getTableRecords(tableName);
                const idx = items.findIndex(i => i.id === record.id);
                if (idx >= 0) items[idx] = { ...items[idx], ...record };
                else items.push(record);
                localStorageAuth.saveTableRecords(tableName, items);
                return { data: record, error: null };
              }
            }),
            then: (resolve) => resolve({ data: record, error: null })
          }),
          insert: (records) => ({
            select: () => ({
              single: async () => {
                const arr = Array.isArray(records) ? records : [records];
                const item = arr[0];
                const items = localStorageAuth.getTableRecords(tableName);
                items.push(item);
                localStorageAuth.saveTableRecords(tableName, items);
                return { data: item, error: null };
              }
            }),
            then: (resolve) => {
              if (tableName === 'user_capabilities') {
                const arr = Array.isArray(records) ? records : [records];
                const userId = arr[0]?.user_id;
                if (userId) {
                  localStorageAuth.saveCapabilities(userId, arr.map(r => r.capability));
                }
              } else {
                const arr = Array.isArray(records) ? records : [records];
                const items = localStorageAuth.getTableRecords(tableName);
                items.push(...arr);
                localStorageAuth.saveTableRecords(tableName, items);
              }
              resolve({ data: records, error: null });
            }
          }),
          update: (updates) => ({
            eq: (field, val) => ({
              then: (resolve) => {
                const items = localStorageAuth.getTableRecords(tableName);
                const updated = items.map(i => i[field] === val ? { ...i, ...updates } : i);
                localStorageAuth.saveTableRecords(tableName, updated);
                resolve({ data: updated, error: null });
              }
            })
          }),
          delete: () => ({
            eq: (field, val) => ({
              then: (resolve) => {
                const items = localStorageAuth.getTableRecords(tableName);
                const remaining = items.filter(i => i[field] !== val);
                localStorageAuth.saveTableRecords(tableName, remaining);
                resolve({ data: remaining, error: null });
              }
            })
          })
        };
      },
      storage: {
        from(bucket) {
          return {
            upload: async (path, file) => {
              return { data: { path }, error: null };
            },
            getPublicUrl: (path) => {
              return { data: { publicUrl: path } };
            },
            remove: async (paths) => {
              return { data: paths, error: null };
            }
          };
        }
      }
    };

/**
 * Checks actual connection to Supabase database with an active request
 */
export async function checkSupabaseConnection() {
  if (!isSupabaseConfigured) {
    return {
      connected: false,
      status: 'NOT_CONFIGURED',
      message: 'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are not configured in .env'
    };
  }

  try {
    const { data, error } = await supabase.from('profiles').select('id').limit(1);
    if (error) {
      return {
        connected: false,
        status: 'ERROR',
        message: error.message || 'Database query failed',
        error
      };
    }
    return {
      connected: true,
      status: 'CONNECTED',
      message: 'Supabase database connected and responsive.'
    };
  } catch (err) {
    return {
      connected: false,
      status: 'NETWORK_ERROR',
      message: err.message || 'Network error reaching Supabase',
      error: err
    };
  }
}

export { localStorageAuth };
