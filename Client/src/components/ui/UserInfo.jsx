import { useUserStore } from '../../lib/userStore'
import '../../styles/userInfo.css'

const UserInfo = () => {

  const {currentUser} = useUserStore()

  return (
    <main className='userInfo'>
      <div className='user'>
        <img src={currentUser.avatar || './avatar.png'} alt='user' />
        <h2 className='name'>{currentUser.username}</h2>
      </div>
      <div className='icons'>
        <img src='./more.png' alt='more' />
        <img src='./video.png' alt='video' />
        <img src='./edit.png' alt='edit' />
      </div>
    </main>
  );
}
export default UserInfo