import { useState } from 'react';
import '../styles/chatList.css'

const ChatList = () => {

  const [addMode, setAddMode] = useState(false);

  return (
    <div className='chatList'>
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
      <div className="item">
        <img src="./avatar.png" alt="user" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello Jane!</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="user" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello Jane!</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="user" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello Jane!</p>
        </div>
      </div>
    </div>
  );
}
export default ChatList