import s from "./Header.module.scss";
import HeaderButtons from "./HeaderButtons/HeaderButtons";
import Logo from "./Logo/Logo";

const Header = () => {
  return (
    <header className={s.header}>
      <Logo />
      <HeaderButtons />
    </header>
  );
};

export default Header;
