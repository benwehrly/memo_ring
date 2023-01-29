import { useContext } from "react";
import { ModalContext } from "../../Contexts/ModalContext";
import { ThemeContext } from "../../Contexts/ThemeContext";


export const Stats = ({ highscore, sequence, colors, previousScore }) => {

    const {title } = useContext(ModalContext);
    const { lightTheme } = useContext(ThemeContext);

    return (
      <div>
        <h1 className={lightTheme ? 'h1-light' : 'h1-dark'}>{title}</h1>
        {highscore ? (
          <div className="stats">
            <h3 style={{ marginBlock: "20px" }}>
              Previous Round: {previousScore.rounds || "Not Available"}
            </h3>
            {previousScore.sequence.length > 0 && (
              <div className="sequence">
                {previousScore.sequence.map((val, i) => (
                  <div key={i} style={{ backgroundColor: colors[val] }}></div>
                ))}
              </div>
            )}
            <h3 style={{ marginBlock: "20px" }}>Personal Best: {highscore}</h3>
            <div className="sequence">
              {sequence.map((val, i) => (
                <div key={i} style={{ backgroundColor: colors[val] }}></div>
              ))}
            </div>
          </div>
        ) : (
          <p>Start playing to view statistics.</p>
        )}
      </div>
    );
  };