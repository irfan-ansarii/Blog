import { getPost } from "@/features/query/posts";

const PostPage = async ({ params }: { params: Record<string, string> }) => {
  const { id } = params;

  const { data } = await getPost(id);

  return <div>PostPage</div>;
};

export default PostPage;
