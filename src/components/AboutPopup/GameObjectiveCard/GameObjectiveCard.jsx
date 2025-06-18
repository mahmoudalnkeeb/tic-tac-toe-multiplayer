import InfoCard from "@/components/Shared/InfoCard/InfoCard";

const GameObjectiveCard = () => {
  return (
    <InfoCard title="Game Objective">
      <p>
        Tic Tac Toe is a classic strategy game where two players take turns
        placing their symbols on a grid. The first player to get three (or more
        on larger boards) of their symbols in a row, either{" "}
        <strong>horizontally</strong>, <strong>vertically</strong>, or{" "}
        <strong>diagonally</strong>, wins!
      </p>
    </InfoCard>
  );
};

export default GameObjectiveCard;
