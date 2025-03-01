import React, { useEffect, useState } from "react";
import { Flex, Text, Heading, Button } from "@radix-ui/themes";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { City } from "../constants/types";
import Confetti from "react-confetti";
import Sharepopup from "./SharePopup";
export const GameScreen: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [cities, setCities] = useState<City[]>([]);
  const [options, setOptions] = useState<City[]>([]);
  const [selectedOption, setSelectedOption] = useState<City | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<City | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrectAnswer, setCorrectAnswer] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [shareLink, setShareLink] = useState(window.location.href);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "guessing-game"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as unknown as City[];
        setCities(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const setupQuestion = () => {
    // Randomly select a city for the question
    const correctCityIndex = Math.floor(Math.random() * cities.length);
    const correctCity = cities[correctCityIndex];
    // Create an array of 3 wrong options (cities that aren't the correct one)
    const wrongOptions = cities
      .filter((_, index) => index !== correctCityIndex)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    // Combine correct and wrong options, then shuffle
    const allOptions = [correctCity, ...wrongOptions].sort(
      () => 0.5 - Math.random()
    );
    setCurrentQuestion(correctCity);
    setOptions(allOptions);
    setAnswered(false);
    setSelectedOption(null);
    setCorrectAnswer(false);
  };

  const handleOptionClick = (selectedCity: City) => {
    // if (answered) return;
    setSelectedOption(selectedCity);
    setAnswered(true);
    if (selectedCity.city === currentQuestion?.city) {
      setScore(score + 1);
      setCorrectAnswer(true);
    }
  };
  useEffect(() => {
    if (!isLoading) {
      setupQuestion();
    }
  }, [isLoading]);

  const setUpNextQuestion = () => {
    setupQuestion();
  };

  const openPopup = () => {
    const username = localStorage.getItem("username") || "Player";
    const baseUrl = window.location.origin;
    // Append username & score as query params
    const inviteLink = `${baseUrl}/invite?username=${encodeURIComponent(
      username
    )}&score=${encodeURIComponent(score)}`;
    const message = `🔥 Hey, I'm ${username} and I just scored ${score} points! Can you beat my score? 🎯\n\nCheck it out here: ${inviteLink}\n\n`;
    const encodedMessage = encodeURIComponent(message);
    setShareLink(`https://wa.me/?text=${encodedMessage}`);
    setPopupOpen(true);
  };
  return (
    <div className="flex-center bg-gradient" style={{ height: "100vh" }}>
      {answered && currentQuestion?.id === selectedOption?.id && <Confetti />}
      {popupOpen && (
        <Sharepopup
          shareLink={shareLink}
          isOpen={popupOpen}
          onClose={() => setPopupOpen(false)}
        />
      )}
      {isLoading ? (
        <Text
          size={"8"}
          style={{
            color: "#fff",
          }}
        >
          Loading your game.....
        </Text>
      ) : (
        <div className="game-screen">
          <Heading style={{ width: "100%", color: "#0f172a" }} size="6">
            Guess the Destination! 🌍
          </Heading>
          <Flex direction={"column"} gap={"4"} className="game_container">
            <Text align={"center"} size="3" weight="bold" color="gray" mt={"3"}>
              {
                currentQuestion?.clues[
                  Math.floor(Math.random() * currentQuestion?.clues.length)
                ]
              }
            </Text>
            {options.map((each) => (
              <div id={each.id.toString()}>
                <Button
                  style={{
                    width: "100%",
                  }}
                  disabled={answered}
                  onClick={() => {
                    handleOptionClick(each);
                  }}
                  size={"3"}
                  color="iris"
                  variant="solid"
                >
                  {each.city}
                </Button>
              </div>
            ))}
            {answered && (
              <>
                <Button
                  style={{
                    width: 200,
                    margin: "0 auto",
                  }}
                  color="crimson"
                  onClick={() => {
                    setUpNextQuestion();
                  }}
                >
                  Next
                </Button>
                <Text color={"green"} weight={"bold"}>
                  {isCorrectAnswer
                    ? "🎉 Correct Answer : "
                    : "😢 Incorrect Answer : "}{" "}
                  {
                    selectedOption?.clues[
                      Math.floor(
                        Math.random() * selectedOption?.fun_fact.length
                      )
                    ]
                  }
                </Text>
              </>
            )}
            <Text size={"4"} weight={"medium"} color={"teal"}>
              Score: {score}
            </Text>
            <Button
              size={"3"}
              style={{ width: "auto", margin: "0 auto" }}
              color={"sky"}
              onClick={() => openPopup()}
            >
              🔥🆚🔥 Challenge a Friend
            </Button>
          </Flex>
        </div>
      )}
    </div>
  );
};
