import '../styles/list.css'
import ChatList from './ui/ChatList'
import UserInfo from './ui/UserInfo'

const List = () => {
  return (
    <main className='list'>
      <UserInfo />
      <ChatList/>
    </main>
  )
}
export default List