import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import '../../styles/addUser.css';
import { collection, getDocs } from 'firebase/firestore';

const AddUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const username = formData.get('username');

    
  //   try {
  //     const userRef = collection(db, 'users');
  //     const snapshot = await getDocs(userRef);

  //     // Create a query against the collection.
  //     const q = query(userRef, where('username', '==', username));
  //     const querySnapshot = await getDocs(q);

  //     console.log(querySnapshot);
      

  //     if (!querySnapshot.empty) {
  //       setUser(querySnapshot.docs[0].data());
  //     }
  //   } catch (error) {
  //     console.error('Error searching for user:', error);
  //   }
  // };

  const handleAdd = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const userRef = collection(db, 'users');
        const snapshot = await getDocs(userRef);
        const users = snapshot.docs.map((doc) => doc.data());
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
        <button>Search</button>
      </form>

      {filteredUsers.length > 0 && (
        <div className='user-list'>
          {filteredUsers.map((user, index) => (
            <div className='user' key={index}>
              <div className='detail'>
                <img src={user?.avatar || './avatar.png'} alt='' />
                <span>{user?.username}</span>
              </div>
              <button onClick={handleAdd}>Add User</button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
export default AddUser;
