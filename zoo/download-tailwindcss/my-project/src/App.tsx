import Header from "./Header";

const MatthewPage = () => <h1>매튜 페이지</h1>;
const AeongPage = () => <h1>애옹 페이지</h1>;
const JoyPage = () => <h1>조이 페이지</h1>;

function App() {
  const { pathname } = window.location;

  let content;
  switch (pathname) {
    case "/matthew":
      content = <MatthewPage />;
      break;
    case "/aeong":
      content = <AeongPage />;
      break;
    case "/joy":
      content = <JoyPage />;
      break;
    default:
      content = <h1>404</h1>;
  }

  return (
    <div>
      {/* 공통 헤더 */}
      <Header />

      {/* 페이지에 따라 바뀌는 부분 */}
      <main style={{ padding: "20px" }}>{content}</main>
    </div>
  );
}

export default App;
