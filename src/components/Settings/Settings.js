import "./settings.css";
import { useContext } from "react";
import { ModalContext } from "../../Contexts/ModalContext";
import { ThemeContext } from "../../Contexts/ThemeContext";

export const Settings = ({ multiplier, setMultiplier, setGameOver }) => {
  const { desaturated, setDesaturated, body, title } = useContext(ModalContext);
  const { lightTheme, setLightTheme } = useContext(ThemeContext);

  const speedMode = multiplier > 1;

  function handleSpeed() {
    setGameOver(true);
    speedMode ? setMultiplier(1) : setMultiplier(1.6);
  }

  function handleSaturation() {
    setDesaturated(!desaturated);
  }

  function handleTheme() {
    setLightTheme(!lightTheme);
  }

  return (
    <div>
      <h1 className={lightTheme ? 'h1-light' : 'h1-dark'}>{title}</h1>
      <Toggle
        mode="Speed Mode"
        handleClick={handleSpeed}
        condition={speedMode}
      />
      <Toggle
        mode="Light Mode"
        condition={lightTheme}
        handleClick={handleTheme}
      />
      <Toggle
        handleClick={handleSaturation}
        condition={desaturated}
        mode="Desaturate When Inactive"
      />
    </div>
  );
};

const Toggle = ({ handleClick, condition, mode }) => {
  const { lightTheme } = useContext(ThemeContext);

  return (
    <div className="setting">
      <p>{mode}</p>
      <button
        className="toggle"
        onClick={handleClick}
        style={{ backgroundColor: lightTheme && "rgb(200,200,200)" }}
      >
        <div
          className={condition ? "toggle-button on" : "toggle-button"}
          style={{ backgroundColor: lightTheme && condition && "white" }}
        />
      </button>
    </div>
  );
};
