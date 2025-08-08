interface WordDisplayProps {
  reveal: string[]; // letras ou "" por posição
}

export default function WordDisplay({ reveal }: WordDisplayProps) {
  return (
    <div className="mt-6 flex justify-center gap-2 text-2xl">
      {reveal.map((ch, i) => (
        <span key={i} className="inline-flex w-7 justify-center border-b-2 pb-1">
          {ch}
        </span>
      ))}
    </div>
  );
}
