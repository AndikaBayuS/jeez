interface CardProps {
  title: string;
  content: string;
}

export default function Card(props: CardProps) {
  const { title, content } = props;
  return (
    <div className="rounded-lg border border-gray-400 p-5">
      <p className="text-2xl font-semibold text-black">{title}</p>
      <p className="mt-2 text-base text-slate-600">{content}</p>
    </div>
  );
}
