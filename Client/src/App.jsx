import { useNavigate } from 'react-router';
import Chat from './components/Chat';
import Detail from './components/Detail';
import List from './components/List';
import Notification from './components/Notification';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useUserStore } from './lib/userStore';
import Placeholder from './components/ui/Placeholder';
import { useChatStore } from './lib/chatStore';

const App = () => {
  const navigate = useNavigate();

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  const { chatId } = useChatStore();

  // if(!user) {
  //   navigate('/login')
  // }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('The logged in user is:', user);
      fetchUserInfo(user?.uid);
    });

    return () => unsubscribe(); // Clean up when the component unmounts
  }, [fetchUserInfo]);
  

  if (isLoading) return <Placeholder />;

  if (!currentUser) {
    navigate('/login');
  }

  return (
    <div className='container'>
      <>
        <List />
        {chatId && <Chat />}
        {chatId && <Detail />}
      </>

      <Notification />
    </div>
  );
};

export default App;
