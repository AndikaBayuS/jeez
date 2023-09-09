import dayjs from "dayjs";
import Image from "next/image";
import { api, type RouterOutputs } from "~/utils/api";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArrowFatUp, ArrowFatDown } from "@phosphor-icons/react";
import toast from "react-hot-toast";

dayjs.extend(relativeTime);

type CardProps = RouterOutputs["posts"]["getAll"][number];

export default function Card(props: CardProps) {
  const { post, author } = props;
  const ctx = api.useContext();
  const { mutate: mutateUpvote } = api.posts.upvote.useMutation({
    onSuccess: () => {
      void ctx.posts.getAll.invalidate();
    },
    onError: () => {
      toast.error("Too many request!");
    }
  });
  const { mutate: mutateDownvote } = api.posts.downvote.useMutation({
    onSuccess: () => {
      void ctx.posts.getAll.invalidate();
    },
    onError: () => {
      toast.error("Too many request!");
    }
  });

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
        <div className="flex items-center space-x-1">
          <span className="text-xs text-slate-600">@{author.username}</span>
          <span className="text-xs text-slate-600">{`• ${dayjs(
            post.createdAt
          ).fromNow()}`}</span>
        </div>
      </div>
      <p className="mt-2 text-2xl font-semibold text-black">{post.title}</p>
      <p className="mt-2 text-base text-slate-600">{post.content}</p>
      <div className="mt-2 flex items-center space-x-2">
        <div
          onClick={() => mutateUpvote(post.id)}
          className="flex items-center space-x-1 cursor-pointer"
        >
          <ArrowFatUp size={18} weight="bold" />
          <p className="text-base">{post.upvote}</p>
        </div>
        <div
          onClick={() => mutateDownvote(post.id)}
          className="flex items-center space-x-1 cursor-pointer"
        >
          <ArrowFatDown size={18} weight="bold" />
          <p className="text-base">{post.downvote}</p>
        </div>
      </div>
    </div>
  );
}
