import { useEffect, useRef, useState } from 'react';
import '../styles/chat.css';
import EmojiPicker from 'emoji-picker-react';
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useChatStore } from '../lib/chatStore';
import { useUserStore } from '../lib/userStore';
import fileUpload from './../lib/fileUpload';

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [img, setImg] = useState({
    file: null,
    url: '',
  });

  const endRef = useRef(null);

  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  // console.log(chat);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  
  const handleImage = async(e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadedUrl = await fileUpload(file);

    if (uploadedUrl) {
      setImg({
        file,
        url: uploadedUrl,
      });
    } else {
      console.error('Upload failed');
    }
  };

  const handleSend = async () => {
    if (text === '') return;


    try {
     

      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(img.url && { img: img.url }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, 'userChats', id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setImg({
        file: null,
        url: '',
      });

      setText('');
    }
  };

  return (
    <main className='chat'>
      {/* top portion */}
      <section className='top'>
        {/* user */}
        <div className='user'>
          <img src='./avatar.png' alt='user' />
          <div className='texts'>
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor sit amet!</p>
          </div>
        </div>
        {/* icons */}
        <div className='icons'>
          <img src='./phone.png' alt='phone' />
          <img src='./video.png' alt='video' />
          <img src='./info.png' alt='more' />
        </div>
      </section>
      {/* center portion */}
      <section className='center'>
        {chat?.messages?.map((message) => (
          <div
            className={
              message.senderId === currentUser?.id ? 'message own' : 'message'
            }
            key={message?.createdAt}
          >
            <img src='./avatar.png' alt='User' />
            <div className='texts'>
              {message.img && <img src={message.img} alt='Image' />}
              <p>{message.text}</p>
              {/* <span>1 min ago</span> */}
            </div>
          </div>
        ))}

        <div ref={endRef}></div>
      </section>

      {/* bottom portion */}
      <section className='bottom'>
        <div className='icons'>
          <label htmlFor='file'>
            <img src='./img.png' alt='' />
          </label>
          <input
            type='file'
            id='file'
            style={{ display: 'none' }}
            onChange={handleImage}
          />
          <img src='./camera.png' alt='Camera' />
          <img src='./mic.png' alt='Microphone' />
        </div>

        <input
          type='text'
          name=''
          id=''
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? 'You cannot send any message'
              : 'Type a message...'
          }
          onChange={(e) => setText(e.target.value)}
          value={text}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />

        <div className='emoji'>
          <img
            src='./emoji.png'
            alt='emoji'
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className='emoji-picker'>
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          className='send-button'
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </section>
    </main>
  );
};
export default Chat;
