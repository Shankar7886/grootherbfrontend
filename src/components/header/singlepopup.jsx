import React, { useState, useRef } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function Example({ isOpen, toggle, herb }) {
  const [isVisible, setVisible] = useState(true);
  const { treename, subname, treeimage, history, pros, cons, life, color } = herb;
  const sectionRef = useRef();
  
  // Responsive breakpoint detection
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
  
  return (
    <Modal 
      isOpen={isOpen} 
      toggle={toggle} 
      size={isMobile ? "lg" : "xl"}
      style={{
        maxWidth: isMobile ? "95vw" : isTablet ? "90vw" : "1200px",
        margin: isMobile ? "10px auto" : "30px auto"
      }}
      centered
    >
      <ModalHeader 
        toggle={toggle}
        style={{
          fontSize: isMobile ? "1.2rem" : "1.5rem",
          padding: isMobile ? "15px 20px" : "20px 30px",
          borderBottom: `2px solid ${color || '#4CAF50'}20`
        }}
      >
        {treename}
      </ModalHeader>
      <ModalBody
        style={{
          padding: isMobile ? "15px" : isTablet ? "20px" : "30px",
          maxHeight: isMobile ? "70vh" : "80vh",
          overflowY: "auto"
        }}
      >
        <div
          ref={sectionRef}
          style={{
            minHeight: isMobile ? "auto" : "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: isMobile ? "10px" : isTablet ? "15px 20px" : "10px 30px",
            position: "relative",
            textAlign: "center",
            opacity: 1,
            transform: "translateY(0)",
            transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transitionDelay: `${1 * 0.3}s`,
          }}
        >
          <div 
            style={{ 
              marginBottom: isMobile ? "30px" : "50px", 
              maxWidth: isMobile ? "100%" : "700px",
              width: "100%"
            }}
          >
            <div
              style={{
                fontSize: isMobile ? "2rem" : isTablet ? "2.5rem" : "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 800,
                background: `linear-gradient(135deg, ${color || '#4CAF50'}40 0%, ${color || '#4CAF50'} 50%, ${color || '#4CAF50'}80 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "16px",
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                letterSpacing: isMobile ? "-0.01em" : "-0.02em",
                lineHeight: "1.1",
                transform: "scale(1)",
                transition: "transform 1s ease-out",
                transitionDelay: `${1 * 0.3 + 0.2}s`,
                wordBreak: "break-word"
              }}
            >
              {treename}
            </div>

            <div
              style={{
                fontSize: isMobile ? "0.9rem" : isTablet ? "1rem" : "clamp(1rem, 2vw, 1.3rem)",
                color: "#64748b",
                fontStyle: "italic",
                fontWeight: 300,
                letterSpacing: "0.03em",
                opacity: 1,
                transform: "translateY(0)",
                transition: "all 0.8s ease-out",
                transitionDelay: `${1 * 0.3 + 0.4}s`,
              }}
            >
              {subname}
            </div>
          </div>

          {/* Content Grid with Image - Responsive Layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr auto 1fr" : "1fr auto 1fr",
              gap: isMobile ? "30px" : isTablet ? "30px" : "50px",
              maxWidth: isMobile ? "100%" : "1000px",
              width: "100%",
              marginBottom: isMobile ? "30px" : "50px",
              alignItems: "center",
            }}
          >
            {/* Benefits - Reordered for mobile */}
            <div
              style={{
                textAlign: isMobile ? "center" : "right",
                opacity: 1,
                transform: "translateX(0)",
                transition: "all 1s ease-out",
                transitionDelay: `${1 * 0.3 + 0.6}s`,
                order: isMobile ? 2 : 1
              }}
            >
              <h3
                style={{
                  fontSize: isMobile ? "0.8rem" : "0.9rem",
                  textTransform: "uppercase",
                  color: color || '#4CAF50',
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  marginBottom: isMobile ? "15px" : "20px",
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <span style={{ position: "relative", zIndex: 1 }}>
                  Benefits
                </span>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-3px",
                    right: isMobile ? "50%" : "0",
                    left: isMobile ? "50%" : "auto",
                    transform: isMobile ? "translateX(50%)" : "none",
                    width: isMobile ? "60px" : "100%",
                    height: "1px",
                    background: `linear-gradient(90deg, ${isMobile ? color || '#4CAF50' : 'transparent'} 0%, ${color || '#4CAF50'} ${isMobile ? '50%' : '100%'}, ${isMobile ? color || '#4CAF50' : 'transparent'} ${isMobile ? '100%' : '100%'})`,
                  }}
                />
              </h3>
              <p
                style={{
                  fontSize: isMobile ? "0.85rem" : isTablet ? "0.9rem" : "clamp(0.9rem, 1.5vw, 1rem)",
                  lineHeight: 1.6,
                  color: "#374151",
                  fontWeight: 400,
                  margin: 0,
                  maxWidth: isMobile ? "100%" : "280px",
                  marginLeft: isMobile ? "auto" : "auto",
                  marginRight: isMobile ? "auto" : "0",
                  textAlign: isMobile ? "center" : "right"
                }}
              >
                {pros}
              </p>
            </div>

            {/* Center Image */}
            <div
              style={{
                position: "relative",
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "scale(1) rotateY(0deg)"
                  : "scale(0.8) rotateY(180deg)",
                transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transitionDelay: `${1 * 0.3 + 0.4}s`,
                order: isMobile ? 1 : 2,
                justifySelf: "center"
              }}
            >
              {/* Floating Rings */}
              <div
                style={{
                  position: "absolute",
                  top: isMobile ? "-10px" : "-15px",
                  left: isMobile ? "-10px" : "-15px",
                  right: isMobile ? "-10px" : "-15px",
                  bottom: isMobile ? "-10px" : "-15px",
                  border: `1px solid ${color || '#4CAF50'}20`,
                  borderRadius: "50%",
                  animation: "float 6s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: isMobile ? "-15px" : "-20px",
                  left: isMobile ? "-15px" : "-20px",
                  right: isMobile ? "-15px" : "-20px",
                  bottom: isMobile ? "-15px" : "-20px",
                  border: `1px solid ${color || '#4CAF50'}10`,
                  borderRadius: "50%",
                  animation: "float 8s ease-in-out infinite reverse",
                }}
              />

              {/* Main Image Container */}
              <div
                style={{
                  width: isMobile ? "140px" : isTablet ? "160px" : "180px",
                  height: isMobile ? "140px" : isTablet ? "160px" : "180px",
                  position: "relative",
                  borderRadius: "50%",
                  background: `conic-gradient(from 45deg, ${color || '#4CAF50'}15, transparent, ${color || '#4CAF50'}25, transparent, ${color || '#4CAF50'}15)`,
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: isMobile ? "132px" : isTablet ? "152px" : "172px",
                    height: isMobile ? "132px" : isTablet ? "152px" : "172px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 30% 30%, ${color || '#4CAF50'}10, transparent 70%)`,
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={treeimage}
                    alt={treename}
                    style={{
                      width: isMobile ? "116px" : isTablet ? "136px" : "156px",
                      height: isMobile ? "116px" : isTablet ? "136px" : "156px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      filter: `drop-shadow(0 ${isMobile ? '8px' : '12px'} ${isMobile ? '16px' : '24px'} ${color || '#4CAF50'}30) saturate(1.05) brightness(1.02)`,
                      transition: "all 0.6s ease",
                    }}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Orbital Elements - Hidden on mobile for performance */}
              {!isMobile && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "-25px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${color || '#4CAF50'}, ${color || '#4CAF50'}80)`,
                      animation: "orbit 12s linear infinite",
                      transformOrigin: isTablet ? "-55px 65px" : "-65px 75px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "-30px",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${color || '#4CAF50'}60, ${color || '#4CAF50'}40)`,
                      animation: "orbit 15s linear infinite reverse",
                      transformOrigin: isTablet ? "85px -45px" : "95px -50px",
                    }}
                  />
                </>
              )}
            </div>

            {/* Precautions */}
            <div
              style={{
                textAlign: isMobile ? "center" : "left",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(80px)",
                transition: "all 1s ease-out",
                transitionDelay: `${1 * 0.3 + 0.8}s`,
                order: isMobile ? 3 : 3
              }}
            >
              <h3
                style={{
                  fontSize: isMobile ? "0.8rem" : "0.9rem",
                  textTransform: "uppercase",
                  color: "#dc2626",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  marginBottom: isMobile ? "15px" : "20px",
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <span style={{ position: "relative", zIndex: 1 }}>
                  Precautions
                </span>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-3px",
                    left: isMobile ? "50%" : "0",
                    transform: isMobile ? "translateX(-50%)" : "none",
                    width: isMobile ? "60px" : "100%",
                    height: "1px",
                    background: isMobile 
                      ? "linear-gradient(90deg, #dc2626 0%, #dc2626 100%)"
                      : "linear-gradient(90deg, #dc2626 0%, transparent 100%)",
                  }}
                />
              </h3>
              <p
                style={{
                  fontSize: isMobile ? "0.85rem" : isTablet ? "0.9rem" : "clamp(0.9rem, 1.5vw, 1rem)",
                  lineHeight: 1.6,
                  color: "#374151",
                  fontWeight: 400,
                  margin: 0,
                  maxWidth: isMobile ? "100%" : "280px",
                  marginLeft: isMobile ? "auto" : "0",
                  marginRight: isMobile ? "auto" : "0",
                  textAlign: isMobile ? "center" : "left"
                }}
              >
                {cons}
              </p>
            </div>
          </div>

          {/* History */}
          <div
            style={{
              maxWidth: isMobile ? "100%" : "700px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s ease-out",
              transitionDelay: `${1 * 0.3 + 1}s`,
              width: "100%"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: isMobile ? "20px" : "24px",
                flexWrap: "wrap"
              }}
            >
              <div
                style={{
                  width: isMobile ? "40px" : "60px",
                  height: "1px",
                  background: `linear-gradient(90deg, transparent 0%, ${color || '#4CAF50'}60 100%)`,
                  marginRight: isMobile ? "12px" : "16px",
                }}
              />
              <h4
                style={{
                  fontSize: isMobile ? "0.7rem" : "0.8rem",
                  textTransform: "uppercase",
                  color: "#6b7280",
                  letterSpacing: "0.2em",
                  margin: 0,
                  fontWeight: 600,
                  textAlign: "center",
                  whiteSpace: isMobile ? "nowrap" : "normal"
                }}
              >
                Historical Background
              </h4>
              <div
                style={{
                  width: isMobile ? "40px" : "60px",
                  height: "1px",
                  background: `linear-gradient(90deg, ${color || '#4CAF50'}60 0%, transparent 100%)`,
                  marginLeft: isMobile ? "12px" : "16px",
                }}
              />
            </div>

            <blockquote
              style={{
                fontSize: isMobile ? "0.9rem" : isTablet ? "1rem" : "clamp(1rem, 2vw, 1.1rem)",
                color: "#4b5563",
                lineHeight: 1.6,
                fontStyle: "italic",
                fontWeight: 300,
                marginBottom: isMobile ? "20px" : "24px",
                position: "relative",
                paddingLeft: isMobile ? "16px" : "24px",
                paddingRight: isMobile ? "16px" : "24px",
                textAlign: isMobile ? "left" : "center"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: isMobile ? "-5px" : "0",
                  top: isMobile ? "-10px" : "0",
                  fontSize: isMobile ? "2rem" : "2.5rem",
                  color: `${color || '#4CAF50'}25`,
                  fontFamily: "serif",
                  lineHeight: 1,
                }}
              >
                "
              </span>
              {history}
              <span
                style={{
                  position: "absolute",
                  right: isMobile ? "-5px" : "0",
                  bottom: isMobile ? "-20px" : "-12px",
                  fontSize: isMobile ? "2rem" : "2.5rem",
                  color: `${color || '#4CAF50'}25`,
                  fontFamily: "serif",
                  lineHeight: 1,
                }}
              >
                "
              </span>
            </blockquote>

            <div
              style={{
                fontSize: isMobile ? "0.7rem" : "0.8rem",
                color: "#9ca3af",
                fontWeight: 500,
                opacity: 0.7,
                textAlign: "center"
              }}
            >
              Life Span: {life}
            </div>
          </div>
        </div>

        {/* Responsive CSS animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(180deg); }
          }
          
          @keyframes orbit {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @media (max-width: 768px) {
            .modal-dialog {
              margin: 10px !important;
            }
            
            .modal-content {
              border-radius: 15px !important;
            }
          }
          
          @media (max-width: 480px) {
            .modal-dialog {
              margin: 5px !important;
            }
            
            .modal-body {
              padding: 10px !important;
            }
          }
        `}</style>
      </ModalBody>
    </Modal>
  );
}

export default Example;