import { useEffect } from "react";
import Chat from "./components/Chat";
import Detail from "./components/Detail";
import List from "./components/List";
import Login from "./components/Login";
import Notification from "./components/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

const App = () => {

  const user = true;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {

    })

    return () => {
      unSub();
    }
  },[])

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

      <Notification/>
    </div>
  );
}

export default App