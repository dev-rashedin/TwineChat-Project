import Chat from "./components/Chat";
import Detail from "./components/Detail";
import List from "./components/List";

const App = () => {
  return (
    <div className='container'>
      <List />
      <Chat />
      <Detail/>
    </div>
  );
}

export default App