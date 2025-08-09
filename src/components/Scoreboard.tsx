interface ScoreboardProps {
  wins: number;
  losses: number;
  games: number;
  onReset: () => void;
}

export default function Scoreboard({
  wins,
  losses,
  games,
  onReset,
}: ScoreboardProps) {
  const rate = games ? Math.round((wins / games) * 100) : 0;

  return (
    <div className="mx-auto my-2 w-full max-w-3xl px-3">
      <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
        <div className="rounded border p-2 text-center">
          <div className="text-gray-500">Vitórias</div>
          <div className="text-green-600 text-lg font-semibold">{wins}</div>
        </div>
        <div className="rounded border p-2 text-center">
          <div className="text-gray-500">Derrotas</div>
          <div className="text-red-600 text-lg font-semibold">{losses}</div>
        </div>
        <div className="rounded border p-2 text-center">
          <div className="text-gray-500">Partidas</div>
          <div className="text-gray-800 text-lg font-semibold">{games}</div>
        </div>
        <div className="rounded border p-2 text-center">
          <div className="text-gray-500">Win Rate</div>
          <div className="text-indigo-600 text-lg font-semibold">{rate}%</div>
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="rounded border px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
          title="Zerar placar (localStorage)"
        >
          Resetar placar
        </button>
      </div>
    </div>
  );
}
