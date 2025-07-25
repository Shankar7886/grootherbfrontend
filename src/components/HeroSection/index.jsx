import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Environment } from "@react-three/drei";
import { motion } from "framer-motion";

// Clean GLB Model Component with loading state
const PlantModel = ({ url = "modals/plant.glb", onLoad }) => {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useEffect(() => {
    if (scene && onLoad) {
      // Small delay to ensure model is fully rendered
      setTimeout(() => onLoad(), 100);
    }
  }, [scene, onLoad]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003; // Very subtle rotation
    }
  });

  return (
    <Center>
      <primitive
        ref={ref}
        object={scene.clone()}
        scale={window.innerWidth <= 768 ? 2.5 : window.innerWidth <= 1024 ? 3 : 3.5}
        position={[0, -0.5, 0]}
      />
    </Center>
  );
};

// Enhanced loading component with 3D styling
const Loader = () => (
  <motion.div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      color: "#6b7280",
      fontSize: window.innerWidth <= 768 ? "14px" : "16px",
      fontWeight: "400",
      letterSpacing: "0.5px",
      zIndex: 10,
    }}
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  >
    {/* Animated Plant Icon */}
    <motion.div
      style={{
        fontSize: window.innerWidth <= 768 ? "40px" : "60px",
        color: "#10b981",
      }}
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      🌱
    </motion.div>
    
    {/* Loading Text */}
    <div>Loading 3D Model...</div>
    
    {/* Loading Dots */}
    <div style={{ display: "flex", gap: "4px" }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: "6px",
            height: "6px",
            backgroundColor: "#10b981",
            borderRadius: "50%",
          }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  </motion.div>
);

const Hero = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const isMobile = screenSize.width <= 768;
  const isTablet = screenSize.width <= 1024 && screenSize.width > 768;

  const handleModelLoad = () => {
    setModelLoaded(true);
  };

  const getResponsiveStyles = () => ({
    heroContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      minHeight: isMobile ? "auto" : "100vh",
      alignItems: "center",
      maxWidth: "1300px",
      margin: "0 auto",
      padding: isMobile ? "40px 20px" : isTablet ? "60px 40px" : "0 60px",
      gap: isMobile ? "40px" : isTablet ? "60px" : "100px",
      paddingTop: isMobile ? "20px" : "30px",
      background: "transparent",
    },

    modelSection: {
      flex: isMobile ? "none" : "1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: isMobile ? "100%" : "auto",
      order: isMobile ? 2 : 1,
    },

    canvasContainer: {
      width: isMobile ? "300px" : isTablet ? "400px" : "550px",
      height: isMobile ? "300px" : isTablet ? "400px" : "550px",
      background: "transparent",
      position: "relative",
      borderRadius: "20px",
      overflow: "hidden",
      // boxShadow: modelLoaded ? "0 20px 60px rgba(16, 185, 129, 0.1)" : "none",
      transition: "box-shadow 0.5s ease",
    },

    contentSection: {
      flex: isMobile ? "none" : "1",
      maxWidth: isMobile ? "100%" : "550px",
      width: isMobile ? "100%" : "auto",
      textAlign: isMobile ? "center" : "left",
      order: isMobile ? 1 : 2,
    },

    title: {
      fontSize: isMobile ? "2.5rem" : isTablet ? "3rem" : "3.8rem",
      fontWeight: "300",
      lineHeight: "1.1",
      color: "#1f2937",
      marginBottom: isMobile ? "24px" : "32px",
      letterSpacing: "-0.02em",
      wordBreak: "break-word",
    },

    highlight: {
      fontWeight: "600",
      color: "#10b981",
      display: isMobile ? "block" : "inline",
    },

    description: {
      fontSize: isMobile ? "1rem" : isTablet ? "1.05rem" : "1.125rem",
      lineHeight: "1.7",
      color: "#4b5563",
      marginBottom: isMobile ? "32px" : "48px",
      fontWeight: "400",
      letterSpacing: "0.01em",
      maxWidth: isMobile ? "100%" : "none",
    },

    features: {
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? "16px" : "20px",
      marginBottom: isMobile ? "32px" : "48px",
      alignItems: isMobile ? "center" : "flex-start",
    },

    feature: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "12px" : "16px",
      fontSize: isMobile ? "0.9rem" : "1rem",
      color: "#374151",
      fontWeight: "400",
      textAlign: isMobile ? "center" : "left",
      maxWidth: isMobile ? "280px" : "none",
    },

    featureDot: {
      width: "6px",
      height: "6px",
      backgroundColor: "#10b981",
      borderRadius: "50%",
      flexShrink: 0,
    },

    buttons: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "12px" : "20px",
      justifyContent: isMobile ? "center" : "flex-start",
      alignItems: "center",
    },

    primaryBtn: {
      padding: isMobile ? "14px 28px" : "16px 32px",
      background: "#10b981",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: isMobile ? "0.9rem" : "1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
      letterSpacing: "0.01em",
      width: isMobile ? "100%" : "auto",
      maxWidth: isMobile ? "280px" : "none",
    },

    secondaryBtn: {
      padding: isMobile ? "14px 28px" : "16px 32px",
      background: "transparent",
      color: "#374151",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: isMobile ? "0.9rem" : "1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
      letterSpacing: "0.01em",
      width: isMobile ? "100%" : "auto",
      maxWidth: isMobile ? "280px" : "none",
    },
  });

  const styles = getResponsiveStyles();

  return (
    <div style={styles.heroContainer}>
      {/* Left/Top Side - Clean 3D Model */}
      <motion.div
        style={styles.modelSection}
        initial={{ x: isMobile ? 0 : -50, y: isMobile ? -30 : 0, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div style={styles.canvasContainer}>
          {/* Show loader until model is loaded */}
          {!modelLoaded && <Loader />}
          
          <Canvas
            camera={{ 
              position: [0, 0, isMobile ? 5 : 6], 
              fov: isMobile ? 50 : 45 
            }}
            style={{ 
              background: "transparent",
              opacity: modelLoaded ? 1 : 0.3,
              transition: "opacity 0.5s ease"
            }}
            dpr={[1, 2]} // Optimize for different pixel ratios
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[-5, -5, -5]} intensity={0.3} />

            <Environment preset="city" />

            <Suspense fallback={null}>
              <PlantModel 
                url="/models/plant.glb" 
                onLoad={handleModelLoad}
              />
            </Suspense>

            <OrbitControls
              enablePan={false}
              enableZoom={!isMobile} // Disable zoom on mobile for better UX
              enableRotate={true}
              minDistance={isMobile ? 3.5 : 4}
              maxDistance={isMobile ? 8 : 10}
              autoRotate={false}
              dampingFactor={0.05}
              enableDamping={true}
              maxPolarAngle={Math.PI / 1.8} // Limit vertical rotation
              minPolarAngle={Math.PI / 3}
            />
          </Canvas>
        </div>
      </motion.div>

      {/* Right/Bottom Side - Professional Text Content */}
      <motion.div
        style={styles.contentSection}
        initial={{ x: isMobile ? 0 : 50, y: isMobile ? 30 : 0, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 style={styles.title}>
            Professional Plant
            <br />
            <span style={styles.highlight}>Identification</span>
          </h1>
        </motion.div>

        <motion.p
          style={styles.description}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Explore the fascinating world of plants through comprehensive guides
          covering botanical names, rich histories, benefits, challenges, and
          everything you need to know about your green companions.
        </motion.p>

        <motion.div
          style={styles.features}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { text: "Complete botanical name database" },
            { text: "Historical origins & cultural significance" },
            { text: "Detailed pros, cons & growing tips" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              style={styles.feature}
              initial={{ x: isMobile ? 0 : -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            >
              <div style={styles.featureDot}></div>
              <span>{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Optional Buttons Section */}
  
      </motion.div>

      {/* Global responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-container {
            padding-top: 20px !important;
            min-height: auto !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-container {
            padding: 20px 15px !important;
            gap: 30px !important;
          }
        }
        
        @media (hover: hover) {
          button:hover {
            transform: translateY(-2px);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;