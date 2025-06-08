import s from "./BoardSelector.module.scss";

const BoardSelector = () => {
  return (
    <div className={s.boardSelector}>
      <button data-size="3">3x3</button>
      <button data-size="4">4x4</button>
      <button data-size="5">5x5</button>
    </div>
  );
};

export default BoardSelector;
