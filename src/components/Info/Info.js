import { useContext } from "react";
import { ModalContext } from "../../Contexts/ModalContext";
import { ThemeContext } from "../../Contexts/ThemeContext";

export const Info = () => {

  const { lightTheme } = useContext(ThemeContext);
  const { body, title } = useContext(ModalContext);

  return (
    <div>
      <h1 className={lightTheme ? 'h1-light' : 'h1-dark'}>{title}</h1>
      <p>{body}</p>
      <br />
      <p>Enjoy!</p>    
      </div>
  );
};
