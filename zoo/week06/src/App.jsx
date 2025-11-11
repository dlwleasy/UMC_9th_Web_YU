import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import InfinitePostsJsonPlaceholder from "./components/InfinitePostsJsonPlaceholder";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <InfinitePostsJsonPlaceholder />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default App;

//react-query 라이브러리 사용법
//1. QueryClient 객체 생성
//2. QueryClientProvider 컴포넌트로 애플리케이션을 감싸야한다.
//본부를 의미함

//감싸서 처리 ->
//tanstack/react-query 형식 : 반환하는 요소
// client 속성에 queryClient 객체를 전달

//다른 방법 (기존과는 다른방법 )
