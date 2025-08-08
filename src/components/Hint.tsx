interface HintProps {
  hint: string;
}
export default function Hint({ hint }: HintProps) {
  return <p className="mt-3 text-center text-sm text-gray-500">Dica: {hint}</p>;
}
