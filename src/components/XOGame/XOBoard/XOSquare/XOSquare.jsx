import s from "./XOSquare.module.scss";

const XOSquare = ({ value, disabled, onClick }) => {
  return (
    <button
      type="button"
      className={s.square}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default XOSquare;
