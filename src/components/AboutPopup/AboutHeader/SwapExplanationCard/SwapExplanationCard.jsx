import ExampleBoard from "@/components/Shared/ExampleBoard/ExampleBoard";
import InfoCard from "@/components/Shared/InfoCard/InfoCard";
import { SYMBOL_O, SYMBOL_X } from "@/data/constants";
import { BOARD_EXAMPLES } from "@/data/staticData";

const SwapExplanationCard = () => {
  return (
    <InfoCard title="Swap Power-Up" isNested={true} disableMarginBottom={true}>
      <p>
        The <strong>Swap</strong> power-up allows you to{" "}
        <strong>exchange the positions </strong> of any{" "}
        <strong>two existing symbols</strong> on the board. This power-up is
        only active when <strong>two occupied squares</strong> are selected; it
        cannot be used if you choose an <strong>empty square</strong>. Utilize
        this power-up to instantly disrupt your opponent's almost-complete
        winning lines, or to immediately form your own winning combination!
      </p>

      <ExampleBoard boardData={BOARD_EXAMPLES.selectSwapBoard} />

      <p>
        <strong>Player 2 ({SYMBOL_X})</strong> has strategically activated the{" "}
        <strong>Swap</strong> power-up. They selected their own{" "}
        <strong>{SYMBOL_X}</strong> in the bottom-right corner even though it's
        frozen and an <strong>opponent's {SYMBOL_O}</strong> in the same row.
        These two symbols are about to <strong>swap places</strong>, allowing{" "}
        <strong>Player 2</strong> to break the opponent’s setup and possibly set
        up a winning line of their own. The <strong>Swap</strong> power-up can
        even exchange symbols that are frozen, making it a powerful tool to turn
        the tide of the game.
      </p>

      <ExampleBoard boardData={BOARD_EXAMPLES.afterSwapBoard} />

      <p>
        The <strong>'{SYMBOL_O}'</strong> and <strong>`{SYMBOL_X}`</strong> have
        successfully swapped places. This strategic move allowed{" "}
        <strong>Player 2 ({SYMBOL_X})</strong> to immediately complete a{" "}
        <strong>vertical winning</strong> line through the second column,
        securing their victory. By leveraging the Swap power-up even with a{" "}
        <strong>frozen symbol {SYMBOL_X}</strong> was able to turn a defensive
        position into a winning one.
      </p>
    </InfoCard>
  );
};

export default SwapExplanationCard;
