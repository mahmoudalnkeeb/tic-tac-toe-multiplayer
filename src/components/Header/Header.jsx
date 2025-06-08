import s from "./Header.module.scss";
import Logo from "./Logo/Logo";

const Header = () => {
  return (
    <header className={s.header}>
      <Logo />
    </header>
  );
};

export default Header;
