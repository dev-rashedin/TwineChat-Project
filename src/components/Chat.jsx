import { useState } from 'react';
import '../styles/chat.css';
import EmojiPicker from 'emoji-picker-react';


const Chat = () => {

  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const handleEmoji = (e) => { 

    setText((prev) => prev + e.emoji);
    setOpen(false);

  }

  console.log(text)
  

  return (
    <div className='chat'>
      {/* top portion */}
      <div className='top'>
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
      </div>
      {/* center portion */}
      <div className='center'>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum esse dolorum neque voluptatibus iste at excepturi praesentium optio, officiis eum nesciunt deserunt repellat sunt dignissimos quaerat commodi animi similique provident!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        {/* 2nd message box */}
        <div className="message">
          <img src="./avatar.png" alt="User" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum esse dolorum neque voluptatibus iste at excepturi praesentium optio, officiis eum nesciunt deserunt repellat sunt dignissimos quaerat commodi animi similique provident!
            </p>
            <span>1 min ago</span>
          </div> 
        </div>
        {/* 3rd message box */}
        <div className="message own">       
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum esse dolorum neque voluptatibus iste at excepturi praesentium optio, officiis eum nesciunt deserunt repellat sunt dignissimos quaerat commodi animi similique provident!
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        {/* 4th message box */}
        <div className="message">
          <img src="./avatar.png" alt="User" />
          <div className="texts">
            <img src="./bg.jpg" alt="" />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum esse dolorum neque voluptatibus iste at excepturi praesentium optio, officiis eum nesciunt deserunt repellat sunt dignissimos quaerat commodi animi similique provident!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
      </div>

      {/* bottom portion */}
      <div className='bottom'>
        <div className='icons'>
          <img src='./img.png' alt='Image' />
          <img src='./camera.png' alt='Camera' />
          <img src='./mic.png' alt='Microphone' />
        </div>

        <input
          type='text'
          name=''
          id=''
          placeholder='Type a message...'
          onChange={(e) => setText(e.target.value)}
          value={text}
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
        <button className='send-button'>Send</button>
      </div>
    </div>
  );
};
export default Chat;
