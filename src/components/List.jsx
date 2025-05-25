import '../styles/list.css'
import ChatList from './ChatList'
import UserInfo from './UserInfo'

const List = () => {
  return (
    <main className='list'>
      <UserInfo />
      <ChatList/>
    </main>
  )
}
export default List