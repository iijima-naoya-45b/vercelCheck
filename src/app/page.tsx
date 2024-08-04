import Link from "next/link";
import { client } from "../../libs/client";

type BlogContent = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
};

type BlogResponse = {
  contents: BlogContent[];
};

const fetchBlogData = async (offset = 0, limit = 10): Promise<BlogResponse> => {
  const res = await client.get({
    endpoint: "blog",
    queries: { offset, limit },
  });
  return res;
};

// Homeコンポーネントでの利用
export default async function Home() {
  const blogData = await fetchBlogData(); // 初期オフセットとリミットでデータ取得
  console.log(blogData);

  return (
    <div>
      <ul>
        {blogData.contents.map((content) => (
          <li key={content.id}>
            <Link href={`/blog/${content.id}`}>{content.title}</Link>
          </li>
        ))}
      </ul>
      {/* ページネーションの実装はここに追加できます */}
    </div>
  );
}
