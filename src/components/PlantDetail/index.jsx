import React, { useRef, useEffect, useState } from "react";
import apiFetch from "../util";

const HerbSection = ({ herb, index, isActive }) => {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef();

  const { treename, subname,treeimage, history, pros, cons, life, color } = herb;



  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div
      ref={sectionRef}
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 30px',
        position: 'relative',
        textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
        transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: `${index * 0.3}s`,
      }}
    >
      <div style={{ marginBottom: '50px', maxWidth: '700px' }}>
        <div
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            background: `linear-gradient(135deg, ${color}40 0%, ${color} 50%, ${color}80 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '16px',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            transform: isVisible ? 'scale(1)' : 'scale(0.8)',
            transition: 'transform 1s ease-out',
            transitionDelay: `${index * 0.3 + 0.2}s`,
          }}
        >
          {treename}
        </div>
        
        <div
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            color: '#64748b',
            fontStyle: 'italic',
            fontWeight: 300,
            letterSpacing: '0.03em',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out',
            transitionDelay: `${index * 0.3 + 0.4}s`,
          }}
        >
          {subname}
        </div>
      </div>

      {/* Content Grid with Image */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '50px',
          maxWidth: '1000px',
          width: '100%',
          marginBottom: '50px',
          alignItems: 'center',
        }}
      >
        {/* Benefits */}
        <div
          style={{
            textAlign: 'right',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-80px)',
            transition: 'all 1s ease-out',
            transitionDelay: `${index * 0.3 + 0.6}s`,
          }}
        >
          <h3
            style={{
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              color: color,
              fontWeight: 700,
              letterSpacing: '0.15em',
              marginBottom: '20px',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>Benefits</span>
            <div
              style={{
                position: 'absolute',
                bottom: '-3px',
                right: 0,
                width: '100%',
                height: '1px',
                background: `linear-gradient(90deg, transparent 0%, ${color} 100%)`,
              }}
            />
          </h3>
          <p
            style={{
              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
              lineHeight: 1.6,
              color: '#374151',
              fontWeight: 400,
              margin: 0,
              maxWidth: '280px',
              marginLeft: 'auto',
            }}
          >
            {pros}
          </p>
        </div>

        {/* Center Image */}
        <div
          style={{
            position: 'relative',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1) rotateY(0deg)' : 'scale(0.8) rotateY(180deg)',
            transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: `${index * 0.3 + 0.4}s`,
          }}
        >
          {/* Floating Rings */}
          <div
            style={{
              position: 'absolute',
              top: '-15px',
              left: '-15px',
              right: '-15px',
              bottom: '-15px',
              border: `1px solid ${color}20`,
              borderRadius: '50%',
              animation: 'float 6s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              right: '-20px',
              bottom: '-20px',
              border: `1px solid ${color}10`,
              borderRadius: '50%',
              animation: 'float 8s ease-in-out infinite reverse',
            }}
          />
          
          {/* Main Image Container */}
          <div
            style={{
              width: '180px',
              height: '180px',
              position: 'relative',
              borderRadius: '50%',
              background: `conic-gradient(from 45deg, ${color}15, transparent, ${color}25, transparent, ${color}15)`,
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '172px',
                height: '172px',
                borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, ${color}10, transparent 70%)`,
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={treeimage}
                alt={name}
                style={{
                  width: '156px',
                  height: '156px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  filter: `drop-shadow(0 12px 24px ${color}30) saturate(1.05) brightness(1.02)`,
                  transition: 'all 0.6s ease',
                }}
                 loading="lazy"
              />
            </div>
          </div>

          {/* Orbital Elements */}
          <div
            style={{
              position: 'absolute',
              top: '15px',
              right: '-25px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${color}, ${color}80)`,
              animation: 'orbit 12s linear infinite',
              transformOrigin: '-65px 75px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '-30px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${color}60, ${color}40)`,
              animation: 'orbit 15s linear infinite reverse',
              transformOrigin: '95px -50px',
            }}
          />
        </div>

        {/* Precautions */}
        <div
          style={{
            textAlign: 'left',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(80px)',
            transition: 'all 1s ease-out',
            transitionDelay: `${index * 0.3 + 0.8}s`,
          }}
        >
          <h3
            style={{
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              color: '#dc2626',
              fontWeight: 700,
              letterSpacing: '0.15em',
              marginBottom: '20px',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>Precautions</span>
            <div
              style={{
                position: 'absolute',
                bottom: '-3px',
                left: 0,
                width: '100%',
                height: '1px',
                background: 'linear-gradient(90deg, #dc2626 0%, transparent 100%)',
              }}
            />
          </h3>
          <p
            style={{
              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
              lineHeight: 1.6,
              color: '#374151',
              fontWeight: 400,
              margin: 0,
              maxWidth: '280px',
            }}
          >
            {cons}
          </p>
        </div>
      </div>

      {/* History */}
      <div
        style={{
          maxWidth: '700px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s ease-out',
          transitionDelay: `${index * 0.3 + 1}s`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '1px',
              background: `linear-gradient(90deg, transparent 0%, ${color}60 100%)`,
              marginRight: '16px',
            }}
          />
          <h4
            style={{
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              color: '#6b7280',
              letterSpacing: '0.2em',
              margin: 0,
              fontWeight: 600,
            }}
          >
            Historical Background
          </h4>
          <div
            style={{
              width: '60px',
              height: '1px',
              background: `linear-gradient(90deg, ${color}60 0%, transparent 100%)`,
              marginLeft: '16px',
            }}
          />
        </div>
        
        <blockquote
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.1rem)',
            color: '#4b5563',
            lineHeight: 1.6,
            fontStyle: 'italic',
            fontWeight: 300,
            marginBottom: '24px',
            position: 'relative',
            paddingLeft: '24px',
            paddingRight: '24px',
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              fontSize: '2.5rem',
              color: `${color}25`,
              fontFamily: 'serif',
              lineHeight: 1,
            }}
          >
            "
          </span>
          {history}
          <span
            style={{
              position: 'absolute',
              right: 0,
              bottom: '-12px',
              fontSize: '2.5rem',
              color: `${color}25`,
              fontFamily: 'serif',
              lineHeight: 1,
            }}
          >
            "
          </span>
        </blockquote>
        
        <div
          style={{
            fontSize: '0.8rem',
            color: '#9ca3af',
            fontWeight: 500,
            opacity: 0.7,
          }}
        >
          Life Span  {life}
        </div>
      </div>
    </div>
  );
};

const AllCards = () => {
  const [herbs, setHerbs] = useState([]); // New state
  const [page, setPage] = useState(1);    // Pagination page tracker
  const [hasMore, setHasMore] = useState(true); // To check if more herbs are available
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchHerbs(page);
  }, [page]);

  const fetchHerbs = async (pageNum) => {
    try {
      const payload ={
        pageNo:parseInt(pageNum)
      }

      const res = await apiFetch('/treeInfo',payload);
     
      if (Array.isArray(res.Data) && res.Data.length === 0) {
        setHasMore(false);
      } else if(Array.isArray(res.Data) && res.Data.length > 0) {
        setHerbs((prev) => [...prev, ...res.Data]);
      }
    } catch (err) {
      console.error("Failed to load herbs:", err);
      setHasMore(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          setActiveIndex(index);
        }
      });

      // Infinite scroll trigger
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  if (herbs.length === 0 && hasMore) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: '"Inter", sans-serif',
    }}>
      <div style={{
        fontSize: '1.5rem',
        color: '#10b981',
        marginBottom: '20px',
      }}>
        Loading herbal wisdom...
      </div>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #d1fae5',
        borderTop: '4px solid #10b981',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

  return (
    <div
      style={{
        minHeight: '40vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '40vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #34d399 60%, #6ee7b7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            letterSpacing: '-0.03em',
            lineHeight: '1',
          }}
        >
          Herbal
          <br />
          Medicine
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: '#64748b',
            maxWidth: '500px',
            fontWeight: 300,
            lineHeight: 1.5,
            letterSpacing: '0.01em',
          }}
        >
          Discover the natural healing power of ancient botanical wisdom
        </p>

        <div
          style={{
            marginTop: '40px',
            fontSize: '0.8rem',
            color: '#94a3b8',
            animation: 'bounce 2s infinite',
          }}
        >
          Scroll to explore
        </div>
      </div>

      {/* Herb Sections */}
      {herbs.map((herb, index) => (
        <div key={index} data-section>
          <HerbSection herb={herb} index={index} isActive={index === activeIndex} />
        </div>
      ))}

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        body {
          margin: 0;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default AllCards;