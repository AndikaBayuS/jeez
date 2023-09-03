import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function PostWizard() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex space-x-3 py-5 border-b border-slate-300 mb-5">
      <div className="relative h-12 w-12 overflow-hidden rounded-full">
        <Image
          src={user.imageUrl}
          alt="Profile Image"
          objectFit="cover"
          layout="fill"
        />
      </div>
      <input
        className="w-full bg-transparent px-3 outline-none"
        placeholder="Sup?"
      />
    </div>
  );
}
