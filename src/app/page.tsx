"use client";
import React, {useState, useEffect, useMemo} from "react";
import styles from "./page.module.css";

export default function Home() {
  const [text, setText] = useState("OwO");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [currentSet, setCurrentSet] = useState<keyof typeof variants>("happy");

  const variants = useMemo(() => ({
    happy: ["OwO", "UwU", "owo", "uwu", ">w<", "^w^"],
    sad: ["TwT", "QwQ", "QnQ", "TnT"],
    colon3: [":3", ":0", ":D", ":P", ":c", ":v", ":o", ":O", ">:3", ":3c", ">:3c"],
  }), []);

  const handleMouseOver = () => {
    setIntervalId(setInterval(() => {
      const randomVariation = variants[currentSet][Math.floor(Math.random() * variants[currentSet].length)];
      setText(randomVariation);
    }, 50));
  };

  const handleMouseOut = () => {
    clearInterval(intervalId);
  };

  useEffect(() => {
    const switchVariation = () => {
    const keys = Object.keys(variants) as Array<keyof typeof variants>;
      const currentIndex = keys.indexOf(currentSet);
      const nextIndex = (currentIndex + 1) % keys.length;
      setCurrentSet(keys[nextIndex]);
      const randomVariation = variants[keys[nextIndex]][Math.floor(Math.random() * variants[keys[nextIndex]].length)];
      setText(randomVariation);
  }
    const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "s") {
      switchVariation();
    }
  };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [variants, currentSet]);

  return (
    <div className={styles.page}>
      <main>
        <div
          className={styles.owo}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onFocus={handleMouseOver}
          onBlur={handleMouseOut}
        >
          {text}
        </div>
      </main>
    </div>
  );
}
