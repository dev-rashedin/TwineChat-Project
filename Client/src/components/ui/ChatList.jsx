import { useEffect, useState } from 'react';
import '../../styles/chatList.css'
import AddUser from './AddUser';
import { useUserStore } from '../../lib/userStore';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import LoadingDots from './LoadingDots';



const ChatList = () => {

  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useUserStore();

  
  useEffect(() => {
    setLoading(true);
    const unSub = onSnapshot(doc(db, 'userChats', currentUser.id), async(res) => {
      const items = res.data().chats
      
      const promises = items.map(async (item) => {
        const userDocRef = doc(db, 'users', item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return {...item, user}
     })

      const chatsData = await Promise.all(promises);
      setChats(chatsData.sort((a, b) => b.updatedAt - a.updatedAt));
      setLoading(false);
      
    });

    return () => {
      unSub();
    };
  }, [currentUser.id]);
  

  return (
    <main className='chatList'>
      {/* search */}
      <div className='search'>
        <div className='searchBar'>
          <img src='./search.png' alt='search' />
          <input type='text' placeholder='Search...' />
        </div>
        <img
          src={addMode ? './minus.png' : './plus.png'}
          alt='add'
          className='add'
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      {loading ? (
        <div style={{marginTop: '30px', textAlign: 'center'}}>
          <LoadingDots />
        </div>
      ) : (
        chats.map((chat) => (
          <div className='item' key={chat.chatId}>
            <img src={chat.user.avatar || './avatar.png'} alt='user' />
            <div className='texts'>
              <span>{chat.user.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))
      )}

      {addMode && <AddUser />}
    </main>
  );
}
export default ChatList