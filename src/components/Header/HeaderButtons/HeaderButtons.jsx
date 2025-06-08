import AboutButton from "./AboutButton/AboutButton";
import BoardSelector from "./BoardSelector/BoardSelector";
import s from "./HeaderButtons.module.scss";
import ResetButton from "./ResetButton/ResetButton";

const HeaderButtons = () => {
  return (
    <div className={s.headerButtons}>
      <BoardSelector />
      <AboutButton />
      <ResetButton />
    </div>
  );
};

export default HeaderButtons;
