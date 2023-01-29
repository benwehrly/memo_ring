import "./style.css";
import { motion } from "framer-motion";
import { cells } from "../../constants";
import { Stats } from "../Stats/Stats";
import { Settings } from "../Settings/Settings";
import { Info } from "../Info/Info";
import { useContext, useRef } from "react";
import { ModalContext } from "../../Contexts/ModalContext";
import { ThemeContext } from "../../Contexts/ThemeContext";
import FocusTrap from "focus-trap-react";

export const Modal = ({
  content,
  selectedIcon,
  setSelectedIcon,
  info,
  highscore,
  stats,
  settings,
  longestSequence,
  previousScore,
  multiplier,
  setMultiplier,
  setGameOver,
  desaturated,
  setDesaturated,
}) => {
  const { title, body } = content;
  const smallScreen = window.innerWidth < 600;
  const modalRef = useRef(null);
  const { lightTheme } = useContext(ThemeContext);

  function handleOuterClick() {
    setSelectedIcon("");
  }

  const handleTheme = {
    backgroundColor: lightTheme && "white",
    color: lightTheme ? "black" : 'white',
  };

  return (
    <ModalContext.Provider
      value={{
        content,
        selectedIcon,
        highscore,
        stats,
        longestSequence,
        setGameOver,
        multiplier,
        setMultiplier,
        desaturated,
        setDesaturated,
        title,
        body,
      }}
    >
      <FocusTrap focusTrapOptions={{ initialFocus: false }}>
        <div className="backdrop" onClick={handleOuterClick}>
          <motion.div
            ref={modalRef}
            style={handleTheme}
            onClick={(e) => e.stopPropagation()}
            className="modal"
            key="selectedIcon"
            initial={{
              scale: smallScreen ? 1 : 1.2,
              top: smallScreen ? "80%" : "50%",
            }}
            animate={{ scale: 1, top: "50%" }}
          >
            {selectedIcon === info ? (
              <Info />
            ) : selectedIcon === stats ? (
              <Stats
                highscore={highscore}
                sequence={longestSequence}
                colors={cells}
                previousScore={previousScore}
              />
            ) : selectedIcon === settings ? (
              <Settings
                setGameOver={setGameOver}
                setMultiplier={setMultiplier}
                multiplier={multiplier}
              />
            ) : null}

            <button
              className="closeModal"
              style={handleTheme}
              onClick={() => setSelectedIcon("")}
            >
              x
            </button>
          </motion.div>
        </div>
      </FocusTrap>
    </ModalContext.Provider>
  );
};
