import type { GameStatus } from "@/hooks/useHangman";

interface ResultMessageProps {
  status: GameStatus;
  word: string;
}

export default function ResultMessage({ status, word }: ResultMessageProps) {
  if (status === "won") {
    return (
      <p
        role="status"
        aria-live="polite"
        className="mt-4 text-center text-green-600"
      >
        Parabéns! Você venceu! 🎉
      </p>
    );
  }
  if (status === "lost") {
    return (
      <p
        role="status"
        aria-live="polite"
        className="mt-4 text-center text-red-600"
      >
        Não foi dessa vez. A palavra era <strong>{word}</strong>.
      </p>
    );
  }
  return (
    <span className="sr-only" aria-live="polite">
      Jogo em andamento
    </span>
  );
}
