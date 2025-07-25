import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const HerbCard = ({ herb }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { name, subname, image, history, pros, cons, createdAt } = herb;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "800px",
        margin: "60px auto",
        padding: "40px 20px",
        borderRadius: "24px",
        background: "#fff",
        boxShadow: "0 25px 60px rgba(0,0,0,0.1)",
        overflow: "visible",
        cursor: "pointer",
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <motion.h2
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#1f2937",
            margin: 0,
          }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          {name}
        </motion.h2>
        <p
          style={{
            fontSize: "18px",
            color: "#6b7280",
            fontStyle: "italic",
            marginTop: "6px",
          }}
        >
          {subname}
        </p>
      </div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "280px",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            maxWidth: "260px",
            maxHeight: "260px",
            objectFit: "contain",
            borderRadius: "16px",
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
          }}
        />
      </motion.div>

      {/* Floating Info Cards */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Pros */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                left: "-220px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "200px",
                padding: "18px",
                backgroundColor: "rgba(52, 199, 89, 0.95)",
                color: "#fff",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                zIndex: 10,
              }}
            >
              <strong style={{ fontSize: "12px", textTransform: "uppercase" }}>
                Benefits
              </strong>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>{pros}</p>
            </motion.div>

            {/* Cons */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                right: "-220px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "200px",
                padding: "18px",
                backgroundColor: "rgba(255, 59, 48, 0.95)",
                color: "#fff",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                zIndex: 10,
              }}
            >
              <strong style={{ fontSize: "12px", textTransform: "uppercase" }}>
                Precautions
              </strong>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>{cons}</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          textAlign: "center",
          marginTop: "40px",
          paddingTop: "20px",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "#8B4513",
            marginBottom: "10px",
            textTransform: "uppercase",
          }}
        >
          History
        </div>
        <p style={{ fontSize: "15px", color: "#374151" }}>{history}</p>
        <div
          style={{
            fontSize: "12px",
            color: "#9ca3af",
            fontStyle: "italic",
            marginTop: "10px",
          }}
        >
          Added {formatDate(createdAt)}
        </div>
      </motion.div>
    </motion.div>
  );
};
