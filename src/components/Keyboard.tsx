interface KeyboardProps {
  onPick: (letter: string) => void;
  disabled?: boolean;
  guessed: string[]; // letras corretas
  wrong: string[]; // letras erradas
}

const ROWS = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKLÇ".split(""), // inclui Ç no fim da segunda linha (pt-BR)
  "ZXCVBNM".split(""),
];

export default function Keyboard({
  onPick,
  disabled,
  guessed,
  wrong,
}: KeyboardProps) {
  const guessedSet = new Set(guessed);
  const wrongSet = new Set(wrong);
  const usedSet = new Set([...guessed, ...wrong]);

  return (
    <div className="mt-5 space-y-2 px-2">
      {ROWS.map((row, idx) => (
        <div
          key={idx}
          className="
            flex justify-center gap-1
            [&>button]:h-10 [&>button]:min-w-8 [&>button]:rounded [&>button]:border [&>button]:text-sm
            sm:[&>button]:h-10 sm:[&>button]:min-w-10
            md:[&>button]:h-11 md:[&>button]:min-w-11
          "
        >
          {row.map((L) => {
            const isGuessed = guessedSet.has(L);
            const isWrong = wrongSet.has(L);
            const isUsed = usedSet.has(L);

            // classes utilitárias para estados
            const base =
              "px-2 transition disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring";
            const state = isGuessed
              ? "bg-green-600 text-white border-green-700"
              : isWrong
              ? "bg-red-600 text-white border-red-700"
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100";

            return (
              <button
                key={L}
                type="button"
                onClick={() => onPick(L)}
                disabled={disabled || isUsed}
                aria-pressed={isUsed}
                aria-label={`Letra ${L}`}
                title={isUsed ? `Letra ${L} já usada` : `Tentar letra ${L}`}
                className={`${base} ${state}`}
              >
                {L}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
