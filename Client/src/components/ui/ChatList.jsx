import { useEffect, useState } from 'react';
import '../../styles/chatList.css';
import AddUser from './AddUser';
import { useUserStore } from '../../lib/userStore';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import LoadingDots from './LoadingDots';
import { useChatStore } from '../../lib/chatStore';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  console.log(chatId);

  useEffect(() => {
    setLoading(true);
    const unSub = onSnapshot(
      doc(db, 'userChats', currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items?.map(async (item) => {
          const userDocRef = doc(db, 'users', item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatsData = await Promise.all(promises);
        setChats(chatsData.sort((a, b) => b.updatedAt - a.updatedAt));
        setLoading(false);
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, 'userChats', currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };

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
        <div style={{ marginTop: '50px', marginRight: '60px' }}>
          <LoadingDots />
        </div>
      ) : (
        chats.map((chat) => (
          <div
            className='item'
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
            style={{ backgroundColor: chat?.isSeen ? "transparent" : 'var(--background-color)'  }}
          >
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
};
export default ChatList;
