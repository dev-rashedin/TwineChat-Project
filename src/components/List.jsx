import '../styles/list.css'
import ChatList from './ChatList'
import UserInfo from './UserInfo'

const List = () => {
  return (
    <div className='list'>
      <UserInfo />
      <ChatList/>
    </div>
  )
}
export default List