import { useState } from 'react';
import '../styles/chatList.css'


const usersArray = [
  { name: "Rashedin Islam" },
  {name: 'Laila Arjuman'},
  { name: "Mehi Eddin" },
  { name: "Ashfand Shabbir" },
  { name: 'Rocky Haque' },
  { name: 'Jannatul Ferdous' },
  { name: 'Afsarul Ahmed' },
  {name: 'Nayeem Ahmed'},
]

const ChatList = () => {

  const [addMode, setAddMode] = useState(false);

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
      {/*  */}
      {usersArray.map((user, idx) => (
        <div className='item' key={idx}>
          <img src='./avatar.png' alt='user' />
          <div className='texts'>
            <span>{user.name}</span>
            <p>{ `Hello ${user.name}`}</p>
          </div>
        </div>
      ))}
    </main>
  );
}
export default ChatList