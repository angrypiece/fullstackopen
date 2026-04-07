import { useState } from "react";

const buttonLabels = ["good", "neutral", "bad"] as const;
type ButtonLabel = (typeof buttonLabels)[number];

interface ButtonProps {
  label: ButtonLabel;
  click: () => void;
}

interface StatisticsProps {
  good: number;
  neutral: number;
  bad: number;
}

const Button = ({ label, click }: ButtonProps) => {
  return <button onClick={click}>{label}</button>;
};

const StatisticsLine = ({
  label,
  statistic,
  isPercent = false,
}: {
  label: string;
  statistic: number;
  isPercent?: boolean;
}) => (
  <p>
    {label} {statistic} {isPercent && " %"}
  </p>
);

const Statistics = ({ good, neutral, bad }: StatisticsProps) => {
  const total = good + neutral + bad;
  const average = Number(((good - bad) / total).toFixed(1));
  const positive = Number(((good / total) * 100).toFixed(1));

  if (total === 0) {
    return <p>no feedback given</p>;
  }

  return (
    <>
      <h2>statistics</h2>
      <StatisticsLine label="good" statistic={good} />
      <StatisticsLine label="neutral" statistic={neutral} />
      <StatisticsLine label="bad" statistic={bad} />
      <StatisticsLine label="average" statistic={average} />
      <StatisticsLine label="positive" statistic={positive} isPercent={true} />
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (name: "good" | "neutral" | "bad") => {
    switch (name) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
        throw new Error("");
    }
  };

  return (
    <div>
      <h2>unicafe feeback</h2>
      {buttonLabels.map((label: ButtonLabel) => {
        return <Button label={label} click={() => handleClick(label)} />;
      })}
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
