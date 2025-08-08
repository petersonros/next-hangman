interface NewGameButtonProps {
  onClick: () => void;
}
export default function NewGameButton({ onClick }: NewGameButtonProps) {
  return (
    <div className="mt-5 flex justify-center">
      <button
        onClick={onClick}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Novo Jogo
      </button>
    </div>
  );
}
