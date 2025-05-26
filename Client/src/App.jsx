import { useNavigate } from "react-router";
import Chat from "./components/Chat";
import Detail from "./components/Detail";
import List from "./components/List";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/lib/firebase";
import { useUserStore } from "./components/lib/userStore";

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
  
  console.log('currentUser', currentUser)
  

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