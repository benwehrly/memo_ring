import "./style.css";
import { FaInfoCircle } from "react-icons/fa";
import { ImStatsBars, ImCog } from "react-icons/im";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { useContext } from "react";

export const Header = ({ setSelectedIcon, info, stats, settings }) => {
  const title = "Memo Ring".split("");
  const { lightTheme } = useContext(ThemeContext)
  const themeColors = { color: lightTheme && 'rgb(90,90,105)' }

  function handleModal(icon) {
    setSelectedIcon(icon);
  }

  return (
    <header>
      <h1 className="title">
        {title.map((letter, i) =>
          letter !== " " ? <p key={i} content={letter}>{letter}</p> : <p key={i}>&nbsp;</p>
        )}
      </h1>
      <ul className={lightTheme ? "navigation-icons light" : "navigation-icons"}>
        <button className="icon" tabIndex={0} onClick={() => handleModal(stats)} style={themeColors}>
          <ImStatsBars size="20" />
        </button>
        <button className="icon" tabIndex={0} onClick={() => handleModal(info)} style={themeColors}>
          <FaInfoCircle size="20" />
        </button>
        <button className="icon" tabIndex={0} onClick={() => handleModal(settings)} style={themeColors}>
          <ImCog size="20" />
        </button>
      </ul>
    </header>
  );
};
