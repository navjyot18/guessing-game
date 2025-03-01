import React, { useEffect, useState } from "react";
import { Flex, Text, Heading, TextField, Button } from "@radix-ui/themes";
import { UserNameService } from "../repo/Username.service";
import { PLAYER } from "../constants/types";
const Usercreds: React.FC<{ handleGameStart: () => void }> = ({
  handleGameStart,
}) => {
  const [username, setUsername] = useState<string>("");
  const usernameService = new UserNameService();
  const urlParams = new URLSearchParams(window.location.search);
  const InviteeUsername = urlParams.get("username") || "Unknown Player";
  const InviteeScore = urlParams.get("score") || "0";
  const message = `${InviteeUsername} has challenged you! They scored ${InviteeScore} points. Can you beat them? Play now!`;
  return (
    <div className="flex-center bg-gradient">
      <div className="initial_username_container">
        <Heading
          style={{ width: "100%" }}
          className="username_container_header"
          size="4"
        >
          <img
            alt="globe_icon"
            width={20}
            height={20}
            style={{ borderRadius: "50%" }}
            src="data:image/png;base64,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"
          />
          Globetrotter
        </Heading>
        <Flex className="pd-24" direction={"column"} gap={"4"}>
          <Heading align={"left"}>Join the adventure!</Heading>
          {InviteeUsername !== PLAYER.UNKNOWN_PLAYER && (
            <Text align={"left"} size={"3"} color="green" weight={"bold"}>
              {message}
            </Text>
          )}
          <Text align={"left"} size="4">
            Enter your username to play the game!
          </Text>
          <TextField.Root
            placeholder="Username"
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
            style={{ width: "100%" }}
            size={"3"}
          />
          <Button
            style={{
              width: "100%",
            }}
            onClick={() => {
              handleGameStart();
              usernameService.setUserName(username ?? "");
            }}
            size={"3"}
            disabled={!username}
          >
            Start Playing
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default Usercreds;
