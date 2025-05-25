import Chat from "./components/Chat";
import Detail from "./components/Detail";
import List from "./components/List";
import Login from "./components/Login";

const App = () => {

  const user = false

  return (
    <div className='container'>
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App