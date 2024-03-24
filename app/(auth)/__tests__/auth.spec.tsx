import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AuthPage from "./../index";
import * as firebaseConfig from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

// Mock de firebaseConfig
jest.mock("@/firebaseConfig", () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
}));

// Mock de Expo Router
jest.mock("expo-router", () => ({
  router: {
    navigate: jest.fn(),
  },
}));

// Mock de firebase/auth
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn().mockResolvedValueOnce({}),
}));

describe("AuthPage", () => {
  test("deve fazer login ao enviar o formulário", async () => {
    const { getByPlaceholderText, getByText } = render(<AuthPage />);

    const emailInput = getByPlaceholderText("Digite seu e-mail");
    const passwordInput = getByPlaceholderText("Digite sua senha");
    const loginButton = getByText("Entrar");

    fireEvent.changeText(emailInput, "example@example.com");
    fireEvent.changeText(passwordInput, "password123");

    fireEvent.press(loginButton);

    await waitFor(() =>
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1)
    );

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.any(Object),
      "example@example.com",
      "password123"
    );
  });
});
