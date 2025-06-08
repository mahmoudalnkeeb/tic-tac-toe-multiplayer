import AboutButton from "./AboutButton/AboutButton";
import BoardSelector from "./BoardSelector/BoardSelector";
import s from "./HeaderButtons.module.scss";

const HeaderButtons = () => {
  return (
    <div className={s.headerButtons}>
      <BoardSelector />
      <AboutButton />
    </div>
  );
};

export default HeaderButtons;
