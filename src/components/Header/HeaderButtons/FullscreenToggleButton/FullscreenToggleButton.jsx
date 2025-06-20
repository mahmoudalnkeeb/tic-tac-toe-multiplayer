import SvgIcon from "@/components/Shared/SvgIcon";
import s from "./FullscreenToggleButton.module.scss";

const FullscreenToggleButton = () => {
  return (
    <button type="button" className={s.fullscreenBtn}>
      <SvgIcon name="expand" />
    </button>
  );
};

export default FullscreenToggleButton;
