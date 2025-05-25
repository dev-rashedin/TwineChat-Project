import '../styles/userInfo.css'

const UserInfo = () => {
  return (
    <main className='userInfo'>
      <div className="user">
        <img src='./avatar.png' alt='user'/>
        <h2 className="name">John Doe</h2>
      </div>
      <div className="icons">
        <img src='./more.png' alt='more'/>
        <img src='./video.png' alt='video'/>
        <img src='./edit.png' alt='edit'/>
      </div>
    </main>
  )
}
export default UserInfo