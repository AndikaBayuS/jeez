import Image from "next/image";
import type { RouterOutputs } from "~/utils/api";

type CardProps = RouterOutputs["posts"]["getAll"][number];

export default function Card(props: CardProps) {
  const { post, author } = props;
  return (
    <div className="rounded-lg border border-gray-400 p-5">
      <div className="flex items-center space-x-1">
        <div className="relative h-5 w-5 overflow-hidden rounded-full">
          <Image
            src={author.imageUrl}
            alt="Profile Image"
            objectFit="cover"
            layout="fill"
          />
        </div>
        <p className="text-xs text-slate-600">@{author.username}</p>
      </div>
      <p className="mt-2 text-2xl font-semibold text-black">{post.title}</p>
      <p className="mt-2 text-base text-slate-600">{post.content}</p>
    </div>
  );
}
