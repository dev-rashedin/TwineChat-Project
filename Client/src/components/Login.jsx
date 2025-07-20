import { useState } from 'react';
import '../styles/login.css';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import avatarPlaceholder from '../../public/avatar.png';
import fileUpload from './lib/fileUpload';
import { Link } from 'react-router';

const Login = () => {
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
  

  const handleLogin = (e) => {
    e.preventDefault();
    toast.success('Login Successful');
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
        chats: []
      });

      toast.success("Account created! You can now login now.");
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
      <section className='login'>
        <div className='item'>
          <h2>Welcome back,</h2>
          <form onSubmit={handleLogin}>
            <input type='text' placeholder='Email' name='email' />
            <input type='password' placeholder='Password' name='password' />
            <button disabled={loading}>
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </form>
          <p>
            Don&apos;t have an account? {' '}
            <Link className='link' to='/register' >
              Register
            </Link>
          </p>
        </div>
        <section className='separator'></section>
      </section>
    </main>
  );
};
export default Login;
