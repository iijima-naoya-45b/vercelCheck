import { client } from "../../../../libs/client";

type BlogContent = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
};

const fetchBlogData = async (id: string): Promise<BlogContent> => {
  const data = await client.get({
    endpoint: "blog",
    contentId: id,
  });
  return data;
};

interface BlogProps {
  params: {
    id: string;
  };
}

const BlogId = async ({ params }: BlogProps) => {
  const blog = await fetchBlogData(params.id);

  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
    </main>
  );
};

export default BlogId;
