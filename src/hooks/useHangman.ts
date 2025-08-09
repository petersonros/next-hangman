import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { words } from "@/utils/words";

export type GameStatus = "playing" | "won" | "lost";

const MAX_ATTEMPTS = 6;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇ".split("");
const STATS_KEY = "hangman:stats";

type Stats = { wins: number; losses: number; games: number };

function pickRandom() {
  return words[Math.floor(Math.random() * words.length)];
}

export function useHangman() {
  const [{ word, hint }, setWordData] = useState(() => words[0]);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string[]>([]);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [stats, setStats] = useState<Stats>({ wins: 0, losses: 0, games: 0 });
  const scoredRef = useRef(false);

  useEffect(() => {
    setWordData(pickRandom());
  }, []);

  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined" ? localStorage.getItem(STATS_KEY) : null;
      if (raw) setStats(JSON.parse(raw));
    } catch {}
  }, []);

  const normalizedWord = useMemo(() => word.toUpperCase(), [word]);
  const usedLetters = useMemo(
    () => new Set<string>([...guessed, ...wrong]),
    [guessed, wrong]
  );
  const reveal = useMemo(
    () =>
      normalizedWord.split("").map((ch) => (guessed.includes(ch) ? ch : "")),
    [normalizedWord, guessed]
  );
  const wrongCount = wrong.length;

  useEffect(() => {
    if (reveal.every((ch) => ch !== "")) setStatus("won");
  }, [reveal]);
  useEffect(() => {
    if (wrongCount >= MAX_ATTEMPTS) setStatus("lost");
  }, [wrongCount]);

  useEffect(() => {
    if (status === "playing" || scoredRef.current) return;

    setStats((prev) => {
      const next: Stats =
        status === "won"
          ? { wins: prev.wins + 1, losses: prev.losses, games: prev.games + 1 }
          : { wins: prev.wins, losses: prev.losses + 1, games: prev.games + 1 };
      try {
        localStorage.setItem(STATS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });

    scoredRef.current = true;
  }, [status]);

  const tryLetter = useCallback(
    (raw: string) => {
      if (status !== "playing") return;
      const letter = raw.toUpperCase();
      if (!LETTERS.includes(letter)) return;
      if (usedLetters.has(letter)) return;

      if (normalizedWord.includes(letter)) {
        setGuessed((prev) => [...prev, letter]);
      } else {
        setWrong((prev) => [...prev, letter]);
      }
    },
    [status, usedLetters, normalizedWord]
  );

  const newGame = useCallback(() => {
    setWordData(pickRandom());
    setGuessed([]);
    setWrong([]);
    setStatus("playing");
    scoredRef.current = false;
  }, []);

  const resetStats = useCallback(() => {
    const empty: Stats = { wins: 0, losses: 0, games: 0 };
    setStats(empty);
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(empty));
    } catch {}
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (status !== "playing") return;
      const k = e.key.toUpperCase();
      const letter = k === "¸" ? "Ç" : k;
      tryLetter(letter);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tryLetter, status]);

  return {
    word,
    hint,
    status,
    guessed,
    wrong,
    usedLetters,
    wrongCount,
    reveal,
    tryLetter,
    newGame,
    maxAttempts: MAX_ATTEMPTS,
    letters: LETTERS,
    stats,
    resetStats,
  };
}
