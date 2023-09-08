import { api } from "~/utils/api";
import Card from "../Card";
import LoadingSpinner from "../LoadingSpinner";

export default function Feed() {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <LoadingSpinner />;
  if (!data) return <div>Something went wrong!</div>;

  return (
    <div className="flex flex-col gap-3 overflow-auto p-5">
      {data.map((fullPost) => (
        <Card key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
}
