import { useCallback, useEffect, useMemo, useState } from "react";
import { words } from "@/utils/words";

export type GameStatus = "playing" | "won" | "lost";

const MAX_ATTEMPTS = 6;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇ".split("");

function pickRandom() {
  return words[Math.floor(Math.random() * words.length)];
}

export function useHangman() {
  const [{ word, hint }, setWordData] = useState(() => words[0]);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string[]>([]);
  const [status, setStatus] = useState<GameStatus>("playing");

  const normalizedWord = useMemo(() => word.toUpperCase(), [word]);

  const usedLetters = useMemo(
    () => new Set([...guessed, ...wrong]),
    [guessed, wrong]
  );

  const reveal = useMemo(() => {
    return normalizedWord
      .split("")
      .map((ch) => (guessed.includes(ch) ? ch : ""));
  }, [normalizedWord, guessed]);

  const wrongCount = wrong.length;

  useEffect(() => {
    setWordData(pickRandom());
  }, []);

  // checa vitória/derrota
  useEffect(() => {
    if (reveal.every((ch) => ch !== "")) setStatus("won");
  }, [reveal]);

  useEffect(() => {
    if (wrongCount >= MAX_ATTEMPTS) setStatus("lost");
  }, [wrongCount]);

  const tryLetter = useCallback(
    (raw: string) => {
      if (status !== "playing") return;

      const letter = raw.toUpperCase();
      if (!LETTERS.includes(letter)) return; // ignora teclas não mapeadas
      if (usedLetters.has(letter)) return; // já usada

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
  }, []);

  // suporte ao teclado físico
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      // mapeia Ç em teclados pt-br
      const letter = k === "¸" ? "Ç" : k;
      tryLetter(letter);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tryLetter]);

  return {
    word,
    hint,
    status,
    guessed,
    wrong,
    usedLetters,
    wrongCount,
    reveal, // array de letras reveladas por posição
    tryLetter,
    newGame,
    maxAttempts: MAX_ATTEMPTS,
    letters: LETTERS,
  };
}
