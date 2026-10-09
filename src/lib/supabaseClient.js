import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('your-project-id')
);

// Fallback dummy client for local development when credentials are not yet populated in .env
// Prevents app from throwing uncaught errors while guiding the developer
class LocalAuthStorage {
  constructor() {
    this.sessionKey = 'rentipair_sb_session';
    this.usersKey = 'rentipair_sb_users';
    this.profilesKey = 'rentipair_sb_profiles';
    this.capabilitiesKey = 'rentipair_sb_capabilities';
    this.seedDefaultUsers();
  }

  seedDefaultUsers() {
    const existing = this.getUsers();
    if (existing.length === 0) {
      const demoUser = {
        id: 'usr_demo_user',
        email: 'aditya@rentipair.in',
        password: 'password123',
        created_at: new Date('2024-08-15').toISOString(),
        user_metadata: {
          full_name: 'Aditya Narayan',
          phone: '+91 98402 11928',
          city: 'Chennai',
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
        }
      };
      const demoAdmin = {
        id: 'usr_demo_admin',
        email: 'admin@rentipair.in',
        password: 'admin123',
        created_at: new Date('2024-01-01').toISOString(),
        user_metadata: {
          full_name: 'Super Admin',
          phone: '+91 99999 88888',
          city: 'Chennai',
          avatar_url: ''
        }
      };
      this.saveUser(demoUser);
      this.saveUser(demoAdmin);

      this.saveProfile('usr_demo_user', {
        id: 'usr_demo_user',
        user_id: 'usr_demo_user',
        full_name: 'Aditya Narayan',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        phone: '+91 98402 11928',
        city: 'Chennai',
        onboarding_completed: true,
        is_admin: false
      });
      this.saveCapabilities('usr_demo_user', ['RENTER', 'EQUIPMENT_OWNER']);

      this.saveProfile('usr_demo_admin', {
        id: 'usr_demo_admin',
        user_id: 'usr_demo_admin',
        full_name: 'Super Admin',
        avatar_url: '',
        phone: '+91 99999 88888',
        city: 'Chennai',
        onboarding_completed: true,
        is_admin: true
      });
      this.saveCapabilities('usr_demo_admin', ['RENTER', 'EQUIPMENT_OWNER', 'TECHNICIAN']);
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
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          localStorageAuth.saveProfile(userId, newProfile);
          localStorageAuth.saveCapabilities(userId, ['RENTER']);

          const session = {
            access_token: `mock_jwt_${Date.now()}`,
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
            return { data: { user: null, session: null }, error: { message: 'Invalid login credentials. User not found.' } };
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
            access_token: `mock_jwt_${Date.now()}`,
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
                return { data: null, error: null };
              },
              then: (resolve) => {
                if (tableName === 'user_capabilities') {
                  const caps = localStorageAuth.getCapabilities(val);
                  resolve({ data: caps.map(c => ({ capability: c })), error: null });
                } else {
                  resolve({ data: [], error: null });
                }
              }
            }),
            then: (resolve) => resolve({ data: [], error: null })
          }),
          upsert: (record) => ({
            select: () => ({
              single: async () => {
                if (tableName === 'profiles') {
                  const updated = localStorageAuth.saveProfile(record.id || record.user_id, record);
                  return { data: updated, error: null };
                }
                return { data: record, error: null };
              }
            }),
            then: (resolve) => resolve({ data: record, error: null })
          }),
          insert: (records) => ({
            then: (resolve) => {
              if (tableName === 'user_capabilities') {
                const arr = Array.isArray(records) ? records : [records];
                const userId = arr[0]?.user_id;
                if (userId) {
                  localStorageAuth.saveCapabilities(userId, arr.map(r => r.capability));
                }
              }
              resolve({ data: records, error: null });
            }
          }),
          delete: () => ({
            eq: () => ({
              then: (resolve) => resolve({ data: null, error: null })
            })
          })
        };
      }
    };

export { localStorageAuth };
