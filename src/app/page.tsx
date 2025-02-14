"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [text, setText] = useState("OwO");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [currentSet, setCurrentSet] = useState<keyof typeof variants>("happy");

  const variants = {
    happy: ["OwO", "UwU", "owo", "uwu", ">w<", "^w^"],
    sad: ["TwT", "QwQ", "QnQ", "TnT"],
    colon3: [":3", ":0", ":D", ":P", ":c", ":v", ":o", ":O", ">:3"],
  };

  const handleMouseOver = () => {
    setIntervalId(setInterval(() => {
      const randomVariation = variants[currentSet][Math.floor(Math.random() * variants[currentSet].length)];
      setText(randomVariation);
    }, 50));
  };

  const handleMouseOut = () => {
    clearInterval(intervalId);
  };

  const handleClick = () => {
    const keys = Object.keys(variants) as Array<keyof typeof variants>;
    const currentIndex = keys.indexOf(currentSet);
    const nextIndex = (currentIndex + 1) % keys.length;
    setCurrentSet(keys[nextIndex]);
    const randomVariation = variants[currentSet][Math.floor(Math.random() * variants[currentSet].length)];
      setText(randomVariation);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div
          className={styles.owo}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleClick}
        >
          {text}
        </div>
      </main>
    </div>
  );
}
