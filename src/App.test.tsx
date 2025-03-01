import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { GameApp } from "./components/GameApp";
import Usercreds from "./components/UserCreds";

describe("GameApp Component", () => {
  test("starts with GameScreen", () => {
    render(<GameApp />);
    expect(screen.getByText("Guess the Destination! 🌍")).toBeInTheDocument();
  });

  test("switches to UserCreds on Start Playing click", () => {
    render(<GameApp />);
    const startButton = screen.getByRole("button", { name: /start playing/i });

    fireEvent.click(startButton);
    expect(screen.getByText("Join the adventure!")).toBeInTheDocument();
  });
});

describe("UserCreds Component", () => {
  test("renders username input field", () => {
    render(<Usercreds handleGameStart={jest.fn()} />);
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  });

  test("Start Playing button is disabled initially", () => {
    render(<Usercreds handleGameStart={jest.fn()} />);
    expect(
      screen.getByRole("button", { name: /start playing/i })
    ).toBeDisabled();
  });

  test("enables button when username is entered", () => {
    render(<Usercreds handleGameStart={jest.fn()} />);
    const input = screen.getByPlaceholderText("Username");
    const button = screen.getByRole("button", { name: /start playing/i });

    fireEvent.change(input, { target: { value: "JohnDoe" } });
    expect(button).not.toBeDisabled();
  });

  test("triggers handleGameStart on button click", () => {
    const mockHandleGameStart = jest.fn();
    render(<Usercreds handleGameStart={mockHandleGameStart} />);

    const input = screen.getByPlaceholderText("Username");
    const button = screen.getByRole("button", { name: /start playing/i });

    fireEvent.change(input, { target: { value: "JohnDoe" } });
    fireEvent.click(button);

    expect(mockHandleGameStart).toHaveBeenCalledTimes(1);
  });
});
