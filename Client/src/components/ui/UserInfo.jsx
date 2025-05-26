import '../../styles/userInfo.css';
import { useUserStore } from '../../lib/userStore';

const UserInfo = () => {
  const { currentUser } = useUserStore();

  if (!currentUser) {
    return (
      <div className='userInfo'>
        <div className='user'>
          <img src='./avatar.png' alt='' />
        </div>
        <div className='icons'>
          <img src='./more.png' alt='' />
          <img src='./video.png' alt='' />
          <img src='./edit.png' alt='' />
        </div>
      </div>
    );
  }

  return (
    <div className='userInfo'>
      <div className='user'>
        <img src={currentUser.avatar || './avatar.png'} alt='' />
        <h2>{currentUser.username}</h2>
      </div>
      <div className='icons'>
        <img src='./more.png' alt='' />
        <img src='./video.png' alt='' />
        <img src='./edit.png' alt='' />
      </div>
    </div>
  );
};
export default UserInfo;
