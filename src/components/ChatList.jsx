import '../styles/chatList.css'

const ChatList = () => {
  return (
    <div className='chatList'>
      <div className='search'>
        <div className='searchBar'>
          <img src='./search.png' alt='search' />
          <input type='text' placeholder='Search...' />
        </div>
        <img src='./plus.png' alt='add' className='add' />
      </div>
    </div>
  );
}
export default ChatList