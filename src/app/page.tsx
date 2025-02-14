"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [text, setText] = useState("OwO");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  const handleMouseOver = () => {
    const variations = ["OwO", "UwU", "owo", "uwu", ">w<", "^w^"];
    setIntervalId( setInterval(() => {
      const randomVariation = variations[Math.floor(Math.random() * variations.length)];
      setText(randomVariation);
    }, 50))
  };

  const handleMouseOut = () => {
    clearInterval(intervalId);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div
          className={styles.owo}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {text}
        </div>
      </main>
    </div>
  );
}
