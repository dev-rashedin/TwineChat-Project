import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import '../../styles/addUser.css';
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useUserStore } from '../../lib/userStore';

const AddUser = () => {
  // const [user, setUser] = useState(null); 
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  const { currentUser } = useUserStore();


  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const userRef = collection(db, 'users');
        const snapshot = await getDocs(userRef);
        const users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllUsers(users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleInput = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const filtered = allUsers.filter((user) =>
      user.username?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  const handleAddUser = async (userId) => {
    
    const chatRef = collection(db, 'chats');
    const userChatsRef = collection(db, 'userChats');

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      
      await updateDoc(doc(userChatsRef, userId), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: '',
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: '',
          receiverId: userId,
          updatedAt: Date.now(),
        }),
      });
      

    } catch (error) {
      console.error('Error adding user:', error);
      
    }
  };



  return (
    <main className='add-user'>
      <form>
        <input
          type='text'
          placeholder='Username'
          name='username'
          value={searchText}
          onChange={handleInput}
        />
      </form>

      {filteredUsers.length > 0 && (
        <div className='user-list'>
          {filteredUsers.map((user, index) => (
            <div className='user' key={index}>
              <div className='detail'>
                <img src={user?.avatar || './avatar.png'} alt='' />
                <span>{user?.username}</span>
              </div>
              <button onClick={() => handleAddUser(user.id)}>Add</button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
export default AddUser;
