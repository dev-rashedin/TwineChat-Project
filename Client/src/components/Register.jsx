import { useState } from 'react';
import '../styles/login.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { toast } from 'react-toastify';
import avatarPlaceholder from '../../public/avatar.png';
import fileUpload from './lib/fileUpload';
import { Link } from 'react-router';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState({
    file: null,
    url: '',
  });

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // const previewUrl = URL.createObjectURL(file);

    // Upload the file immediately
    const uploadedUrl = await fileUpload(file);

    if (uploadedUrl) {
      setAvatar({
        file,
        url: uploadedUrl,
      });
    } else {
      // setAvatar({
      //   file,
      //   url: previewUrl,
      // });
      console.error('Upload failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const usersRef = await addDoc(collection(db, 'users'), {
        username,
        email,
        avatar: avatar.url || '',
        blockedList: [],
      });

      const chatRef = await addDoc(collection(db, 'userChats'), {
        chats: [],
      });

      toast.success('Account created! You can now login now.');
      e.target.reset();
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='container'>
      <div className='login'>
        <div className='item'>
          <h2>Create an Account</h2>
          <form onSubmit={handleRegister}>
            <label htmlFor='file'>
              <img src={avatar.url || avatarPlaceholder} alt='User' />
              Upload an image
            </label>
            <input
              type='file'
              id='file'
              style={{ display: 'none' }}
              onChange={handleAvatar}
            />
            <input type='text' placeholder='Username' name='username' />
            <input type='text' placeholder='Email' name='email' />
            <input type='password' placeholder='Password' name='password' />
            <button disabled={loading}>
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
          </form>

          <p>
            Already have an account?{' '}
            <Link className='link' to='/login'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};
export default Register;
