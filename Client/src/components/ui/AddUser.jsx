import '../../styles/addUser.css';

const AddUser = () => {

  const user = null

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleAdd = (e) => {
    e.preventDefault();
  };

  return (
    <main className='add-user'>
      <form onSubmit={handleSearch}>
        <input type='text' placeholder='Username' name='username' />
        <button>Search</button>
      </form>
      {!user && (
        <div className='user'>
          <div className='detail'>
            <img src={user?.avatar || './avatar.png'} alt='' />
            <span>{user?.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </main>
  );
};
export default AddUser;
