
import './App.css';
import { useCustomFetch } from './hooks/useCustomFetch';

interface User {
  id: number;
  name: string;
  email: string;
}



function App() : Element {
  const {data} = useCustomFetch<User>(
  'https://jsonplaceholder.typicode.com/users/1'
);

  return <>
  <h1>Tanstack Query</h1>
  {data?.name}
  </>;
}


export default App;