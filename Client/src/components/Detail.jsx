import { auth } from '../lib/firebase';
import '../styles/detail.css'

const Detail = () => {
  return (
    <main className='detail'>
      <div className='user'>
        <img src='./avatar.png' alt='User' />
        <h2>Jane Doe</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <section className='info'>
        {/* 1st option */}
        {/* 1st option */}
        <div className='option'>
          <div className='title'>
            <span>Chat Settings</span>
            <img src='./arrowUp.png' alt='Setting' />
          </div>
        </div>
        {/* 2nd option */}
        <div className='option'>
          <div className='title'>
            <span>Privacy % help</span>
            <img src='./arrowUp.png' alt='Setting' />
          </div>
        </div>
        {/* 3rd option */}
        <div className='option'>
          <div className='title'>
            <span>Shared Photos</span>
            <img src='./arrowDown.png' alt='Setting' />
          </div>
        </div>
        {/* 4th option */}
        <div className='option'>
          <div className='title'>
            <span>Shared photos</span>
            <img src='./arrowDown.png' alt='' />
          </div>
          <div className='photos'>
            <div className='photoItem'>
              <div className='photoDetail'>
                <img
                  src='https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                  alt=''
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src='./download.png' alt='' className='icon' />
            </div>
            <div className='photoItem'>
              <div className='photoDetail'>
                <img
                  src='https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                  alt=''
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src='./download.png' alt='' className='icon' />
            </div>
            <div className='photoItem'>
              <div className='photoDetail'>
                <img
                  src='https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                  alt=''
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src='./download.png' alt='' className='icon' />
            </div>
            <div className='photoItem'>
              <div className='photoDetail'>
                <img
                  src='https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                  alt=''
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src='./download.png' alt='' className='icon' />
            </div>
          </div>
        </div>
        {/* 5th option */}
        <div className='option'>
          <div className='title'>
            <span>Shared Files</span>
            <img src='./arrowUp.png' alt='' />
          </div>
        </div>

        {/* buttons */}

        {/* block button */}
        <button>Block User</button>
        <button className='logout' onClick={() => auth.signOut()}>Logout</button>
      </section>
    </main>
  );
}
export default Detail