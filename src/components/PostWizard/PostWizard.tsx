import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

export default function PostWizard() {
  const { user } = useUser();
  const [input, setInput] = useState({
    title: "",
    content: "",
  });
  const ctx = api.useContext();
  const { mutate, isLoading } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput({ title: "", content: "" });
      void ctx.posts.getAll.invalidate();
    },
    onError: () => {
      toast.error("Too many request!");
    },
  });

  if (!user) return null;

  return (
    <div className="flex space-x-3 border-b border-slate-300 p-5">
      <div className="relative h-9 w-9 overflow-hidden rounded-full">
        <Image
          src={user.imageUrl}
          alt="Profile Image"
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="w-full">
        <input
          className="mb-2 w-full rounded-md bg-slate-200 px-3 py-1.5 outline-none"
          disabled={isLoading}
          placeholder="Sup ?"
          value={input.title}
          onChange={(e) => setInput({ ...input, title: e.target.value })}
        />
        <input
          className="mb-2 w-full rounded-md bg-slate-200 px-3 py-1.5 outline-none"
          disabled={isLoading}
          placeholder="Tell us more.."
          value={input.content}
          onChange={(e) => setInput({ ...input, content: e.target.value })}
        />
        {input.title !== "" && input.content !== "" && (
          <button
            className="rounded-md bg-slate-900 px-4 py-1.5 font-semibold text-slate-100 disabled:opacity-50"
            disabled={isLoading}
            onClick={() => mutate(input)}
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
}
