import '../styles/chat.css';


const Chat = () => {
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
      <div className='center'></div>
      {/* bottom portion */}
      <div className='bottom'></div>
    </div>
  );
};
export default Chat;
