const MatthewPage = () => <h1>매튜 페이지</h1>;
const AeongPage = () => <h1>애옹 페이지</h1>;
const JoyPage = () => <h1>조이 페이지</h1>;

function App() {
  const { pathname } = window.location;

  switch (pathname) {
    case "/matthew":
      return <MatthewPage />;
    case "/aeong":
      return <AeongPage />;
    case "/joy":
      return <JoyPage />;
    default:
      return <h1>404</h1>;
  }
}

export default App;

// css로 변환한다면? 의미상 동일한 스타일
// .box {
//   background-color: #A855F7;  /* bg-purple-500에 해당(근사) */
//   color: white;              /* text-white */
//   padding: 1rem;             /* p-4 */
//   font-weight: 700;          /* font-bold */
//   text-align: center;        /* text-center */
// }
