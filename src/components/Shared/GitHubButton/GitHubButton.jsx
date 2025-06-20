import SvgIcon from "../SvgIcon";
import s from "./GitHubButton.module.scss";

const GitHubButton = () => {
  return (
    <a
      href="https://github.com/Moamal-2000/tic-tac-toe"
      target="_blank"
      className={s.button}
      rel="noreferrer"
      title="Visit GitHub Repository"
    >
      <SvgIcon name="github" />
      GitHub
    </a>
  );
};

export default GitHubButton;
