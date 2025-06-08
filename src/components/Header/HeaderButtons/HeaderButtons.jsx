import BoardSelector from "./BoardSelector/BoardSelector";
import s from "./HeaderButtons.module.scss";

const HeaderButtons = () => {
  return (
    <div className={s.headerButtons}>
      <BoardSelector />
    </div>
  );
};

export default HeaderButtons;
