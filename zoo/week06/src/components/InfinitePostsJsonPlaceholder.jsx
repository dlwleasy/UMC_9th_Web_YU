// InfinitePostsJsonPlaceholder.jsx
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

// 1) 한 번에 가져올 게시글 개수
const PAGE_SIZE = 10;

// 2) 데이터 가져오는 함수 (JS 버전)
async function fetchPosts({ pageParam = 1 } = {}) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${PAGE_SIZE}`
  );

  if (!res.ok) {
    throw new Error("네트워크 에러");
  }

  // JSONPlaceholder의 포스트는 { id, title, body } 형태
  return await res.json();
}

// 3) 메인 컴포넌트
export default function InfinitePostsJsonPlaceholder() {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", PAGE_SIZE],
    queryFn: ({ pageParam }) => fetchPosts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const isLast = lastPage.length < PAGE_SIZE;
      return isLast ? undefined : allPages.length + 1;
    },
  });

  if (isLoading) return <div>로딩 중이에요...</div>;

  if (error) {
    const msg = error instanceof Error ? error.message : "알 수 없는 에러";
    return <div>에러가 발생했어요: {msg}</div>;
  }

  return (
    <div>
      {data?.pages.map((page, pageIndex) => (
        <ul key={pageIndex} style={{ marginBottom: 16 }}>
          {page.map((post) => (
            <li key={post.id}>
              <strong>#{post.id}</strong> {post.title}
            </li>
          ))}
        </ul>
      ))}

      <div>
        {hasNextPage ? (
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "불러오는 중..." : "더 보기"}
          </button>
        ) : (
          <span>마지막 페이지예요.</span>
        )}
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: "#555" }}>
        상태: {status} / 다음 페이지 가능: {String(!!hasNextPage)}
      </div>
    </div>
  );
}
