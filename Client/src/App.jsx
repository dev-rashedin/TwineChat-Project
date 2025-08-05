import { useEffect } from "react";
import Chat from "./components/Chat";
import Detail from "./components/Detail";
import List from "./components/List";
import Login from "./components/Login";
import Notification from "./components/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  useEffect(() => {
    toast.info('welcome')
  },[])
  
  

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
      <ToastContainer position='top-right' style={{ zIndex: 9999 }} />
    </div>
  );
}

export default App