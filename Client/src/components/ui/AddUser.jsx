import { useState } from 'react';
import { db } from '../../lib/firebase';
import '../../styles/addUser.css';
import { collection, getDocs, query, where } from 'firebase/firestore';

const AddUser = () => {

 const [user, setUser] = useState(null);

  const handleSearch = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    console.log(username)
    

    try {
      const userRef = collection(db, 'users');

      const q = query(userRef, where('username', '==', username));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
       setUser(querySnapshot.docs[0].data());
     }

    } catch (error) {
      console.error(error);
    }

  };

  console.log(user)
  

  const handleAdd = (e) => {
    e.preventDefault();
  };

  return (
    <main className='add-user'>
      <form onSubmit={handleSearch}>
        <input type='text' placeholder='Username' name='username' />
        <button>Search</button>
      </form>
      {user && (
        <div className='user'>
          <div className='detail'>
            <img src={user?.avatar || './avatar.png'} alt='' />
            <span>{user?.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </main>
  );
};
export default AddUser;
