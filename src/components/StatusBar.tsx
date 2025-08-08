interface StatusBarProps {
  wrongCount: number;
  maxAttempts: number;
  wrongLetters: string[];
  status: "playing" | "won" | "lost";
}

export default function StatusBar({
  wrongCount,
  maxAttempts,
  wrongLetters,
  status,
}: StatusBarProps) {
  const pct = Math.min(100, Math.round((wrongCount / maxAttempts) * 100));
  const color =
    status === "won"
      ? "bg-green-600"
      : status === "lost"
      ? "bg-red-600"
      : pct < 50
      ? "bg-emerald-500"
      : pct < 75
      ? "bg-amber-500"
      : "bg-rose-500";

  return (
    <div className="mx-auto w-full max-w-3xl px-3">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-gray-600">
          Tentativas: {wrongCount}/{maxAttempts}
        </span>
        <span className="text-gray-500">
          Erros: {wrongLetters.join(" ") || "—"}
        </span>
      </div>
      <div className="h-2 w-full rounded bg-gray-200">
        <div className={`h-2 rounded ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
