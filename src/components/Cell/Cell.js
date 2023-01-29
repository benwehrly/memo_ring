import { useState, useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";
import "./style.css";

export const Cell = ({
  color,
  index,
  stack,
  activeCell,
  guesses,
  setGuesses,
  isStarted,
  setGameOver,
  disabled,
  desaturated,
  tone,
}) => {
  const { lightTheme } = useContext(ThemeContext);
  const [isClicked, setIsClicked] = useState(false);
  const [guessCount, setGuessCount] = useState(-1);
  const isActive = activeCell === index;
  const displayAsGray = !isActive && disabled && desaturated;
  const boxShadow = `0 0 40px 0 ${color}`;

  const activeStyles = {
    backgroundColor: displayAsGray ? "rgb(220,220,225)" : color,
    boxShadow: lightTheme ? "none" : isClicked || isActive ? boxShadow : "none", // 2nd none = boxShadow
  };

  function handleClick(e) {
    e.preventDefault();
    if (disabled) return;
    setIsClicked(true);
  }

  function handleGuess() {
    if (isStarted && !disabled) {
      setIsClicked(false);
      setGuesses([...guesses, index]);
      setGuessCount((curr) => curr + 1);
    }
  }

  useEffect(() => {
    if (guessCount > -1) {
      tone.play();
      if (index !== stack[guesses.length - 1]) {
        setGameOver(true);
        setIsClicked(false);
        setGuessCount(-1);
      }
    }
  }, [guessCount]);

  useEffect(() => {
    const handleMouseUp = () => setIsClicked(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <button
      className={isActive || isClicked ? "cell flash" : "cell"}
      style={activeStyles}
      onTouchStart={handleClick}
      onMouseDown={handleClick}
      onMouseLeave={() => setIsClicked(false)}
      onClick={handleGuess}
    ></button>
  );
};
