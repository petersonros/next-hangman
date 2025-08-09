"use client";

import Header from "@/components/Header";
import Scoreboard from "@/components/Scoreboard";
import StatusBar from "@/components/StatusBar";
import Canvas from "@/components/Canvas";
import Hint from "@/components/Hint";
import WordDisplay from "@/components/WordDisplay";
import Keyboard from "@/components/Keyboard";
import ResultMessage from "@/components/ResultMessage";
import NewGameButton from "@/components/NewGameButton";
import { useHangman } from "@/hooks/useHangman";

export default function Home() {
  const {
    // jogo
    word,
    hint,
    status,
    guessed,
    wrong,
    reveal,
    wrongCount,
    tryLetter,
    newGame,
    maxAttempts,
    // placar
    stats,
    resetStats,
  } = useHangman();

  const disabled = status !== "playing";

  return (
    <main className="mx-auto w-full max-w-4xl px-3 sm:px-4 py-4 space-y-3">
      <Header />

      <Scoreboard
        wins={stats.wins}
        losses={stats.losses}
        games={stats.games}
        onReset={resetStats}
      />

      <StatusBar
        wrongCount={wrongCount}
        maxAttempts={maxAttempts}
        wrongLetters={wrong}
        status={status}
      />

      <Canvas wrongCount={wrongCount} />
      <Hint hint={hint} />
      <WordDisplay reveal={reveal} />

      <Keyboard
        onPick={tryLetter}
        disabled={disabled}
        guessed={guessed}
        wrong={wrong}
      />

      <ResultMessage status={status} word={word} />
      <NewGameButton onClick={newGame} />
    </main>
  );
}
