import React, { useState, useEffect } from 'react';

/**
 * Premium Animated Intro / Splash Screen for RentiPair
 * - Plays ONCE per session on initial website load
 * - Smooth dynamic formation of "Renti" (left) + "Pair" (right) -> "RentiPair"
 * - Snap lock effect, logo icon reveal, and tagline fade-in
 * - Seamless upward fade transition into the Navbar and Homepage
 * - Zero CPU/GPU overhead: unmounts completely after completion
 * - Full prefers-reduced-motion accessibility support
 */
export default function SplashScreen() {
  const [shouldRender, setShouldRender] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('entering'); // 'entering' -> 'locked' -> 'tagline' -> 'exiting' -> 'done'

  useEffect(() => {
    // Check if splash has already been displayed this session
    try {
      const alreadyShown = sessionStorage.getItem('rentipair_splash_seen');
      if (alreadyShown) {
        return; // Skip completely for returning navigation in current session
      }
    } catch {
      // Fallback if sessionStorage is restricted
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setShouldRender(true);

    if (prefersReducedMotion) {
      // Rapid accessible fade for users with motion sensitivity
      setAnimationPhase('locked');
      const exitTimer = setTimeout(() => {
        setAnimationPhase('exiting');
        setTimeout(() => {
          setShouldRender(false);
          try { sessionStorage.setItem('rentipair_splash_seen', 'true'); } catch {}
        }, 300);
      }, 500);
      return () => clearTimeout(exitTimer);
    }

    // Precise Cinematic Timeline (Total duration: ~1.75s)
    // 0.0s - 0.7s: Renti (left) & Pair (right) glide toward center
    // 0.75s: Snap lock + Logo symbol reveal
    const lockTimer = setTimeout(() => {
      setAnimationPhase('locked');
    }, 750);

    // 1.05s: Tagline fades in smoothly
    const taglineTimer = setTimeout(() => {
      setAnimationPhase('tagline');
    }, 1050);

    // 1.45s: Smooth exit transition upward into the homepage
    const exitTimer = setTimeout(() => {
      setAnimationPhase('exiting');
    }, 1450);

    // 1.80s: Unmount completely from DOM
    const finishTimer = setTimeout(() => {
      setShouldRender(false);
      try {
        sessionStorage.setItem('rentipair_splash_seen', 'true');
      } catch {}
    }, 1800);

    return () => {
      clearTimeout(lockTimer);
      clearTimeout(taglineTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  if (!shouldRender) return null;

  const isExiting = animationPhase === 'exiting';
  const isLocked = animationPhase === 'locked' || animationPhase === 'tagline' || isExiting;
  const showTagline = animationPhase === 'tagline' || isExiting;

  return (
    <div
      id="rentipair-splash-overlay"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFFFFF',
        overflow: 'hidden',
        pointerEvents: isExiting ? 'none' : 'auto',
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'opacity'
      }}
    >
      {/* Subtle Ambient Radial Brand Glow Backdrop */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22, 119, 255, 0.08) 0%, rgba(0, 194, 255, 0.04) 40%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none',
          transform: isLocked ? 'scale(1.2)' : 'scale(0.8)',
          opacity: isExiting ? 0 : 1,
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease'
        }}
      />

      {/* Main Centered Brand Lockup */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isExiting
            ? 'translateY(-24px) scale(0.96)'
            : isLocked
            ? 'scale(1)'
            : 'scale(0.98)',
          transition: isExiting
            ? 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
            : 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          willChange: 'transform'
        }}
      >
        {/* RentiPair Emblem / Icon (Pivots gently above as parts unite) */}
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: '#0B1533',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(11, 21, 51, 0.18)',
            marginBottom: '16px',
            opacity: isLocked ? 1 : 0,
            transform: isLocked
              ? 'translateY(0) scale(1)'
              : 'translateY(-16px) scale(0.7)',
            transition: 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            willChange: 'transform, opacity'
          }}
        >
          <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
            <path
              d="M14 24 C14 18, 20 14, 24 18 C28 22, 34 26, 34 20 C34 16, 30 14, 28 14"
              stroke="#1677FF"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M34 24 C34 30, 28 34, 24 30 C20 26, 14 22, 14 28 C14 32, 18 34, 20 34"
              stroke="#FF7A00"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <circle cx="24" cy="24" r="3.2" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Dynamic Typography: Renti + Pair meeting in the center */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: 'clamp(38px, 8.5vw, 64px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1
          }}
        >
          {/* "Renti" sliding smoothly from LEFT */}
          <span
            className="splash-part-renti"
            style={{
              display: 'inline-block',
              color: '#0B1533',
              transform: isLocked ? 'translateX(0)' : 'translateX(-80px)',
              opacity: animationPhase === 'entering' ? 0.3 : 1,
              animation: animationPhase === 'entering' ? 'splashSlideInLeft 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
              willChange: 'transform, opacity'
            }}
          >
            Renti
          </span>

          {/* "Pair" sliding smoothly from RIGHT */}
          <span
            className="splash-part-pair"
            style={{
              display: 'inline-block',
              color: '#1677FF',
              transform: isLocked ? 'translateX(0)' : 'translateX(80px)',
              opacity: animationPhase === 'entering' ? 0.3 : 1,
              animation: animationPhase === 'entering' ? 'splashSlideInRight 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
              willChange: 'transform, opacity'
            }}
          >
            Pair
          </span>

          {/* Subtle Accent Glow dot when locked */}
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#FF7A00',
              marginLeft: '4px',
              opacity: isLocked ? 1 : 0,
              transform: isLocked ? 'scale(1)' : 'scale(0)',
              transition: 'opacity 0.2s ease 0.1s, transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s'
            }}
          />
        </div>

        {/* Tagline: "Rent it. Repair it. RentiPair it." */}
        <div
          style={{
            marginTop: '14px',
            fontSize: 'clamp(13px, 2.8vw, 16px)',
            fontWeight: 600,
            color: '#64748B',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            opacity: showTagline ? 1 : 0,
            transform: showTagline ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>Rent it.</span>
          <span style={{ color: '#CBD5E1' }}>•</span>
          <span>Repair it.</span>
          <span style={{ color: '#CBD5E1' }}>•</span>
          <span style={{ color: '#1677FF', fontWeight: 700 }}>RentiPair it.</span>
        </div>
      </div>

      <style>{`
        @keyframes splashSlideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          40% {
            opacity: 0.9;
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes splashSlideInRight {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }
          40% {
            opacity: 0.9;
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 480px) {
          @keyframes splashSlideInLeft {
            0% {
              opacity: 0;
              transform: translateX(-50px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes splashSlideInRight {
            0% {
              opacity: 0;
              transform: translateX(50px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .splash-part-renti, .splash-part-pair {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
