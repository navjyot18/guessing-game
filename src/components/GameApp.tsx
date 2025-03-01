import { useState } from "react";
import Usercreds from "./UserCreds";
import { GameScreen } from "./GameScreen";

export const GameApp = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleGameStart = () => {
    setIsGameStarted(true);
  };
  return (
    <>
      {!isGameStarted ? (
        <GameScreen />
      ) : (
        <Usercreds handleGameStart={handleGameStart} />
      )}
    </>
  );
};
