import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import apiFetch from "../util";
import Example from "./singlepopup";

const FixedFloatingSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilterSuggestions] = useState([]);
  const [singleHerb,setSingleHerb]=useState({});
  const [popupOpen,setPopupOpen] =useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
        setShowSuggestions(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const getAllSuggestionData = async () => {
      try {
        const res = await apiFetch("/treeInfo");
        if (res.status) {
          setSuggestions([...res.Data]);
          const filter = res.Data.map((suggestion) =>
            suggestion.treename.toLowerCase()
          );
          setFilterSuggestions([filter]);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getAllSuggestionData();
  }, []);

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
    setTimeout(() => {
      const input = searchRef.current?.querySelector("input");
      input?.focus();
    }, 400);
  };

  const handleHomeClick = () => {
    setIsSearchExpanded(false);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.treename.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    fetchSingleHerbDetails(suggestion.id);
  };

  const fetchSingleHerbDetails =async(id)=>{
    try{
      const res = await apiFetch(`/tree/${id}`);
      if(res.status){
        setSingleHerb(res.Data);
        setPopupOpen(true)
      }

    }catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          top: window.innerWidth <= 768 ? "100px" : "150px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 999,
          textAlign: "center",
          pointerEvents: "none",
        }}
      ></motion.div>

      <div
        ref={searchRef}
        style={{
          marginTop: window.innerWidth <= 768 ? "20px" : "30px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          width: "100%",
          padding: window.innerWidth <= 768 ? "0 10px" : "0 20px",
          position: "relative",
        }}
      >
        <AnimatePresence>
          {showSuggestions && isSearchExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: "absolute",
                top: window.innerWidth <= 768 ? "70px" : "80px",
                transform: "translateX(-50%)",
                width: window.innerWidth <= 768 ? "95vw" : window.innerWidth <= 1024 ? "350px" : "400px",
                maxWidth: "95vw",
                background: "rgba(200, 230, 201, 0.95)",
                backdropFilter: "blur(20px)",
                borderRadius: window.innerWidth <= 480 ? "15px" : "20px",
                border: "2px solid rgba(76, 175, 80, 0.3)",
                boxShadow: "0 20px 60px rgba(46, 125, 50, 0.3)",
                overflow: "hidden",
              }}
            >
              {filteredSuggestions.length > 0 ? (
                <>
                  <div
                    style={{
                      padding: window.innerWidth <= 480 ? "12px 16px 8px" : "16px 20px 12px",
                      borderBottom: "1px solid rgba(76, 175, 80, 0.2)",
                      background: "rgba(165, 214, 167, 0.5)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: window.innerWidth <= 480 ? "10px" : "12px",
                        fontWeight: "700",
                        color: "#2e7d32",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      🌿 Natural Suggestions ({filteredSuggestions.length})
                    </span>
                  </div>
                  <div style={{ 
                    maxHeight: window.innerWidth <= 480 ? "200px" : "280px", 
                    overflowY: "auto" 
                  }}>
                    {filteredSuggestions.map((suggestion, index) => {
                      return (
                        <motion.div
                          key={suggestion.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          whileHover={{
                            x: 8,
                            backgroundColor: "rgba(76, 175, 80, 0.1)",
                            transition: { duration: 0.2 },
                          }}
                          onClick={() => handleSuggestionClick(suggestion)}
                          style={{
                            padding: window.innerWidth <= 480 ? "12px 16px" : "16px 20px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottom:
                              index !== filteredSuggestions.length - 1
                                ? "1px solid rgba(76, 175, 80, 0.1)"
                                : "none",
                            background: "transparent",
                          }}
                        >
                          <span
                            style={{
                              fontSize: window.innerWidth <= 480 ? "13px" : "15px",
                              fontWeight: "500",
                              color: "#1b5e20",
                              flex: 1,
                              marginRight: "12px",
                            }}
                          >
                            {suggestion.treename}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div
                  style={{
                    padding: window.innerWidth <= 480 ? "30px 16px" : "40px 20px",
                    textAlign: "center",
                  }}
                >
                  <motion.div
                    style={{ 
                      fontSize: window.innerWidth <= 480 ? "30px" : "40px", 
                      marginBottom: "12px" 
                    }}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    🌿
                  </motion.div>
                  <span
                    style={{
                      fontSize: window.innerWidth <= 480 ? "12px" : "14px",
                      color: "#388e3c",
                      fontWeight: "500",
                    }}
                  >
                    No natural results found for "{searchQuery}"
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Island Container */}
        <motion.div
          initial={false}
          animate={{
            width: isSearchExpanded ? 
              (window.innerWidth <= 480 ? "95vw" : 
               window.innerWidth <= 768 ? "90vw" : 
               window.innerWidth <= 1024 ? "400px" : "480px") : 
              (window.innerWidth <= 480 ? "220px" : "220px"),
          }}
          transition={{
            duration: 0.7,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            background: "rgba(196, 235, 177, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: window.innerWidth <= 480 ? "25px" : "30px",
            border: "2px solid rgba(120, 190, 80, 0.6)",
            boxShadow: "0 15px 45px rgba(50, 100, 25, 0.3)",
            padding: window.innerWidth <= 480 ? "10px" : "14px",
            display: "flex",
            alignItems: "center",
            gap: window.innerWidth <= 480 ? "10px" : "14px",
            overflow: "hidden",
            maxWidth: "95vw",
            minWidth: window.innerWidth <= 480 ? "200px" : "310px",
          }}
        >
          <motion.div
            onClick={handleHomeClick}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 8px 25px rgba(120, 190, 80, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: window.innerWidth <= 480 ? "36px" : "44px",
              height: window.innerWidth <= 480 ? "36px" : "44px",
              borderRadius: window.innerWidth <= 480 ? "18px" : "22px",
              background: "linear-gradient(135deg, #78c850, #a8d088)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 5px 20px rgba(120, 190, 80, 0.5)",
              flexShrink: 0,
              zIndex: 2,
            }}
          >
            <motion.svg
              width={window.innerWidth <= 480 ? "16" : "20"}
              height={window.innerWidth <= 480 ? "16" : "20"}
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.3 }}
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </motion.svg>
          </motion.div>

          {/* Content Area - IMPROVED LAYOUT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              minWidth: 0,
              height: window.innerWidth <= 480 ? "36px" : "44px",
              position: "relative",
            }}
          >
            {/* Title and Herb Icon Section - Always visible but repositioned */}
            <motion.div
              animate={{
                opacity: isSearchExpanded ? 0 : 1,
                x: isSearchExpanded ? -20 : 0,
                scale: isSearchExpanded ? 0.8 : 1,
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: window.innerWidth <= 480 ? "8px" : "12px",
                position: isSearchExpanded ? "absolute" : "static",
                left: isSearchExpanded ? "0" : "auto",
                zIndex: isSearchExpanded ? 1 : 2,
                pointerEvents: isSearchExpanded ? "none" : "auto",
                paddingLeft: window.innerWidth <= 480 ? "8px" : "12px",
                paddingRight: window.innerWidth <= 480 ? "8px" : "12px",
              }}
            >
              <motion.div
                style={{ fontSize: window.innerWidth <= 480 ? "20px" : "28px" }}
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                🌿
              </motion.div>

              <span
                style={{
                  fontSize: window.innerWidth <= 480 ? "16px" : window.innerWidth <= 768 ? "18px" : "24px",
                  fontWeight: "700",
                  color: "#33691e",
                  letterSpacing: window.innerWidth <= 480 ? "1px" : "2px",
                  textShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                }}
              >
                GROOT
              </span>
            </motion.div>

            {/* Search Icon (Collapsed State) */}
            <motion.div
              animate={{
                opacity: !isSearchExpanded ? 1 : 0,
                scale: !isSearchExpanded ? 1 : 0.8,
                x: !isSearchExpanded ? 0 : 20,
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={handleSearchClick}
              whileHover={{
                scale: !isSearchExpanded ? 1.1 : 0.8,
                boxShadow: "0 8px 25px rgba(168, 208, 136, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: window.innerWidth <= 480 ? "36px" : "44px",
                height: window.innerWidth <= 480 ? "36px" : "44px",
                borderRadius: window.innerWidth <= 480 ? "18px" : "22px",
                background: "linear-gradient(135deg, #a8d088, #78c850)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 5px 20px rgba(168, 208, 136, 0.4)",
                flexShrink: 0,
                position: !isSearchExpanded ? "static" : "absolute",
                right: !isSearchExpanded ? "auto" : "0",
                zIndex: !isSearchExpanded ? 2 : 1,
                pointerEvents: !isSearchExpanded ? "auto" : "none",
              }}
            >
              <motion.svg
                width={window.innerWidth <= 480 ? "16" : "20"}
                height={window.innerWidth <= 480 ? "16" : "20"}
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </motion.svg>
            </motion.div>

            {/* Expanded Search Input */}
            <motion.div
              animate={{
                opacity: isSearchExpanded ? 1 : 0,
                scale: isSearchExpanded ? 1 : 0.9,
                x: isSearchExpanded ? 0 : -20,
              }}
              transition={{
                duration: 0.5,
                delay: isSearchExpanded ? 0.2 : 0,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.9)",
                borderRadius: window.innerWidth <= 480 ? "18px" : "22px",
                padding: window.innerWidth <= 480 ? "0 12px" : "0 16px",
                height: window.innerWidth <= 480 ? "36px" : "44px",
                border: "2px solid rgba(120, 190, 80, 0.4)",
                overflow: "hidden",
                position: isSearchExpanded ? "static" : "absolute",
                width: isSearchExpanded ? "100%" : "0",
                zIndex: isSearchExpanded ? 3 : 1,
                pointerEvents: isSearchExpanded ? "auto" : "none",
              }}
            >
              <svg
                width={window.innerWidth <= 480 ? "14" : "18"}
                height={window.innerWidth <= 480 ? "14" : "18"}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#78c850"
                strokeWidth="2"
                style={{ flexShrink: 0, opacity: isSearchExpanded ? 1 : 0 }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>

              <input
                type="text"
                placeholder={window.innerWidth <= 480 ? "Search herbs..." : "Search naturally with GROOT..."}
                value={searchQuery}
                onChange={handleInputChange}
                style={{
                  flex: 1,
                  marginLeft: window.innerWidth <= 480 ? "8px" : "12px",
                  fontSize: window.innerWidth <= 480 ? "14px" : "16px",
                  fontWeight: "500",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#1b5e20",
                  minWidth: 0,
                  paddingRight: searchQuery ? "8px" : "0",
                  opacity: isSearchExpanded ? 1 : 0,
                }}
              />

              {/* Result Counter */}
              <AnimatePresence>
                {searchQuery && isSearchExpanded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, width: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      width: "auto",
                      transition: { duration: 0.3 },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      width: 0,
                      transition: { duration: 0.2 },
                    }}
                    style={{
                      background: "linear-gradient(135deg, #78c850, #a8d088)",
                      color: "white",
                      padding: window.innerWidth <= 480 ? "2px 6px" : "4px 8px",
                      borderRadius: window.innerWidth <= 480 ? "12px" : "15px",
                      fontSize: window.innerWidth <= 480 ? "10px" : "12px",
                      fontWeight: "600",
                      minWidth: window.innerWidth <= 480 ? "20px" : "24px",
                      textAlign: "center",
                      flexShrink: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {filteredSuggestions.length}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{
          position: "absolute",
          top: "60%",
          right: window.innerWidth <= 768 ? "10%" : "25%",
          fontSize: window.innerWidth <= 480 ? "25px" : "40px",
          opacity: 0.1,
          zIndex: 1,
        }}
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 5, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        🌱
      </motion.div>
      <Example isOpen={popupOpen} toggle={()=>setPopupOpen(false)} herb={singleHerb} />

      <style jsx>{`
        input::placeholder {
          color: #81c784;
          font-weight: 400;
        }

        div::-webkit-scrollbar {
          width: 4px;
        }

        div::-webkit-scrollbar-track {
          background: rgba(120, 190, 80, 0.1);
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #78c850, #a8d088);
          border-radius: 10px;
        }

        @media (max-width: 480px) {
          input {
            font-size: 16px !important;
          }
        }

        @media (max-width: 768px) {
          input {
            font-size: 16px !important;
          }
        }

        @media (max-width: 1024px) {
          input {
            font-size: 15px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FixedFloatingSearch;