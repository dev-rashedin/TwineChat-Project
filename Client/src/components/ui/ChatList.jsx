import { useEffect, useState } from 'react';
import '../../styles/chatList.css'
import AddUser from './AddUser';
import { useUserStore } from '../../lib/userStore';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';



const ChatList = () => {

  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const { currentUser } = useUserStore();
  
  useEffect(() => {
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

      {chats.length > 0 ? (
        chats.map((chat) => (
          <div className='item' key={chat.chatId}>
            <img src='./avatar.png' alt='user' />
            <div className='texts'>
              <span>Jane Smith</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))
      ) : (
        <div className='item'>
          <img src='./avatar.png' alt='user' />
          <div className='texts'>
            <span>Jane Smith</span>
            <p>{`Hello Jane`}</p>
          </div>
        </div>
      )}

      {addMode && <AddUser />}
    </main>
  );
}
export default ChatList