import Header from "@/21_CalcHeader/components/Header";
import Output from "@/21_CalcHeader/components/Output";
import UserInput from "@/21_CalcHeader/components/UserInput";
import { useState } from "react";

export type InputValue = {
  initialInvestment: number;
  annualInvestment: number;
  expectedReturn: number;
  duration: number;
  currency: string;
};

const currencies = ["$", "€", "£", "¥", "₹"];

export default function CalcHeader() {
  const initialValues = {
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
    currency: "$",
  };

  const [userInput, setUserInput] = useState(initialValues);
  return (
    <div className="min-h-screen bg-gray-900">
      <Header title="Investment Calculator" />
      <UserInput
        userInput={userInput}
        setUserInput={setUserInput}
        initialValues={initialValues}
        currencies={currencies}
      />
      <Output inputValue={userInput} />
    </div>
  );
}
