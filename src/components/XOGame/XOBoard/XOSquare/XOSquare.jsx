import s from "./XOSquare.module.scss";

const XOSquare = ({ value, disabled, onClick }) => {
  console.log(value);
  return (
    <button
      type="button"
      className={`${s.square} ${
        value === "✕" ? s.playerX : value === "○" ? s.playerO : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default XOSquare;
