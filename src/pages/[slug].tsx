import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import { api } from "~/utils/api";

export default function Home() {
  const { isLoaded } = useUser();
  if (!isLoaded) return <div />;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen justify-center overflow-hidden">
        <div className="flex h-full w-full max-w-2xl flex-col border-x border-slate-300">
          <p>Profile Page</p>
        </div>
      </div>
    </>
  );
}
