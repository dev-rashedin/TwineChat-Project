import { useEffect } from "react";
import Chat from "./components/Chat";
import Detail from "./components/Detail";
import List from "./components/List";
import Login from "./components/Login";
import Notification from "./components/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";

const App = () => {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore()

  const user = true;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
    fetchUserInfo(user?.uid)
    })

    return () => {
      unSub();
    }
  }, [fetchUserInfo])


  console.log(currentUser)
  
  

  if(isLoading) return <div className="loading">Loading...</div>

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