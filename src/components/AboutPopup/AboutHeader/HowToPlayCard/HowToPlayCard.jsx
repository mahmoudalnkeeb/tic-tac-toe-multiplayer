import InfoCard from "@/components/Shared/InfoCard/InfoCard";
import { HOW_TO_PLAY_LIST } from "@/data/staticData";
import s from "./HowToPlayCard.module.scss";

const HowToPlayCard = () => {
  return (
    <InfoCard title="How to Play">
      <ul className={s.howToPlayList}>
        {HOW_TO_PLAY_LIST.map(({ content, id }) => (
          <li key={id}>{content}</li>
        ))}
      </ul>
    </InfoCard>
  );
};

export default HowToPlayCard;
