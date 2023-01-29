import { useState, useEffect, useRef } from "react";
import "./style.css";
import { cells, info, stats, settings } from "../../constants";
import { Cell } from "../Cell/Cell";
import { Header } from "../Header/Header";
import { Modal } from "../Modal/Modal";
import generateRandomIndex from "../../helpers";
import { ThemeContext } from "../../Contexts/ThemeContext";

import { howl1, howl2, howl3, howl4 } from "../../constants";

export const Game = () => {
  //states
  const [round, setRound] = useState(0);
  const [degrees, setDegrees] = useState(0);
  const [stack, setStack] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [count, setCount] = useState(-1);
  const [gameOver, setGameOver] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [gridGap, setGridGap] = useState("40px");
  const [activeCell, setActiveCell] = useState(stack[count]);
  const [highscore, setHighscore] = useState(null);
  const [longestSequence, setLongestSequence] = useState([]);
  const [multiplier, setMultiplier] = useState(1);
  const [lightTheme, setLightTheme] = useState(false);
  const [desaturated, setDesaturated] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(info);
  const [previousScore, setPreviousScore] = useState({
    rounds: 0,
    sequence: [],
  });
  //vars
  const isStarted = round > 0;
  const isIncomplete = count < stack.length;
  const centerText = isStarted ? round : "Start";
  const blinkDelay = count === -1 ? 1200 : 600;
  const gapDelay = 1600 + 600 * stack.length;
  const tones = [howl1, howl2, howl3, howl4];
  const rotation = 90;
  let roundInitTimeout;

  //functions

  function handleStartGame() {
    if (isStarted) return;
    setGameOver(false);
    setRound(1);
  }

  //Handle Local Storage

  useEffect(() => {
    const scoreData = localStorage.getItem("highscore");
    const sequenceData = localStorage.getItem("longestSequence");
    if (scoreData) {
      setHighscore(JSON.parse(scoreData));
    }
    if (sequenceData) {
      setLongestSequence(JSON.parse(sequenceData));
    }
  }, [highscore]);

  //Game Loop

  useEffect(() => {
    function handleRoundChange() {
      if (!isStarted) return setGridGap("40px");
      setDegrees(degrees + rotation);
      setStack([...stack, generateRandomIndex()]);
      setCount(-1);
      if (round >= 1) {
        setGridGap("4px");
        roundInitTimeout = setTimeout(() => {
          setDisabled(false);
          setGridGap("10px");
        }, gapDelay / multiplier);
      }
    }

    handleRoundChange();

    return () => clearTimeout(roundInitTimeout);
  }, [round]);

  useEffect(() => {
    if (isStarted && isIncomplete) {
      const activateCellTimeout = setTimeout(() => {
        setCount(count + 1);
        setActiveCell(stack[count + 1]);
      }, blinkDelay / multiplier);

      const deactivateCellTimeout = setTimeout(() => {
        setActiveCell(null);
      }, 200 / multiplier);

      return () => {
        clearTimeout(activateCellTimeout);
        clearTimeout(deactivateCellTimeout);
      };
    }
  }, [stack, count]);

  useEffect(() => {
    if (isStarted && activeCell !== null && activeCell !== undefined) {
      tones[activeCell].play();
    }
  }, [activeCell, isStarted, tones]);

  useEffect(() => {
    const isCorrect = JSON.stringify(stack) === JSON.stringify(guesses);
    const isGuessing = guesses.length > 0;
    let id;

    function proceedToNextRound() {
      if (isCorrect && isStarted && isGuessing) {
        setDisabled(true);
        id = setTimeout(() => {
          setRound(round + 1);
          setGuesses([]);
        }, 600 / multiplier);
      }
    }

    proceedToNextRound();

    return () => clearTimeout(id);
  }, [guesses]);

  useEffect(() => {
    function restartGame() {
      setStack([]);
      setGuesses([]);
      setCount(-1);
      setRound(0);
      setDegrees(0);
      setActiveCell(null);
      setDisabled(true);
      setGridGap("40px");
    }

    if (gameOver && round > highscore) {
      localStorage.setItem("highscore", JSON.stringify(round));
      localStorage.setItem("longestSequence", JSON.stringify(stack));
      setHighscore(round);
      setLongestSequence(stack);
    }

    if (gameOver) {
      setPreviousScore({
        rounds: round,
        sequence: stack,
      });
      restartGame();
    }
  }, [gameOver, multiplier]);

  //styles

  const centerIconStyle = {
    rotate: `-${degrees}deg`,
    fontSize: isStarted && "2rem",
    transition: `${0.5 / multiplier}s rotate ${
      0.7 / multiplier
    }s cubic-bezier(1,.05,.5,2)`,
    color: lightTheme && "black",
    cursor: !isStarted && 'pointer'
  };

  const gridStyles = {
    rotate: `${degrees}deg`,
    gap: gridGap,
    transition: `${0.5 / multiplier}s rotate ${
      0.5 / multiplier
    }s cubic-bezier(1,.05,.5,1.5), gap ${
      0.4 / multiplier
    }s cubic-bezier(1,.05,.5,1.5)`,
  };

  return (
    <div
      className="game"
      style={{ backgroundColor: lightTheme && "white" }}
    >
      <ThemeContext.Provider value={{ lightTheme, setLightTheme }}>
        <Header
          setSelectedIcon={setSelectedIcon}
          info={info}
          stats={stats}
          settings={settings}
        />
        <div className="grid" style={gridStyles}>
          {cells.map((cell, index) => (
            <Cell
              key={index}
              color={cell}
              index={index}
              stack={stack}
              isStarted={isStarted}
              activeCell={activeCell}
              guesses={guesses}
              setGuesses={setGuesses}
              gameOver={gameOver}
              setGameOver={setGameOver}
              disabled={disabled}
              tone={tones[index]}
              desaturated={desaturated}
            />
          ))}
          <button className="center" onClick={handleStartGame} tabIndex={0}>
            <p style={centerIconStyle}>{centerText}</p>
          </button>
        </div>
        <Shadow />
        {selectedIcon && (
          <Modal
            content={selectedIcon}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            highscore={highscore}
            info={info}
            stats={stats}
            settings={settings}
            longestSequence={longestSequence}
            previousScore={previousScore}
            multiplier={multiplier}
            setMultiplier={setMultiplier}
            setGameOver={setGameOver}
            desaturated={desaturated}
            setDesaturated={setDesaturated}
          />
        )}
      </ThemeContext.Provider>
    </div>
  );
};