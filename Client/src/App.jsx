import { useNavigate } from "react-router";
import Chat from "./components/Chat";
import Detail from "./components/Detail";
import List from "./components/List";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/lib/firebase";
import { useUserStore } from "./components/lib/userStore";
import Placeholder from "./components/ui/Placeholder";

const App = () => {
const navigate = useNavigate()
 
  const {currentUser, isLoading, fetchUserInfo} = useUserStore() 
  
  // if(!user) {
  //   navigate('/login')
  // }


  useEffect(() => {
    const unSubscribe = () => onAuthStateChanged(auth, (user) => {
     fetchUserInfo(user?.uid)
      
    })

    return () => {
      unSubscribe()
    }
  }, [fetchUserInfo])
  
  if (isLoading) return <Placeholder/>

  if(!currentUser) {
    navigate('/login')
  }
  

  return (
    <div className='container'>

        <>
          <List />
          <Chat />
          <Detail />
        </>


      <Notification/>
    </div>
  );
}

export default App