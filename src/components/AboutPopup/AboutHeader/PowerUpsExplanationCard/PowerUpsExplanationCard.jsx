import InfoCard from "@/components/Shared/InfoCard/InfoCard";
import BombExplanationCard from "../BombExplanationCard/BombExplanationCard";
import FreezeExplanationCard from "../FreezeExplanationCard/FreezeExplanationCard";
import SwapExplanationCard from "../SwapExplanationCard/SwapExplanationCard";

const PowerUpsExplanationCard = () => {
  return (
    <InfoCard title="Power-Ups" disableMarginBottom={true}>
      <p>
        Strategic advantages await! Each player has access to three unique
        power-ups that can dramatically alter the game's flow. Power-ups have a{" "}
        <strong>cooldown period</strong> after use, meaning they become
        available again only after a certain number of turns have passed. Using
        them at the right moment is key to mastering the game!
      </p>

      <FreezeExplanationCard />
      <BombExplanationCard />
      <SwapExplanationCard />
    </InfoCard>
  );
};

export default PowerUpsExplanationCard;
