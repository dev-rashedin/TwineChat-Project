import { useState } from 'react';
import '../styles/login.css';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Link, useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



  const handleLogin = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);

      console.log(res)

    navigate('/')
      
      
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
            <input type='text' placeholder='Email' name='email' autoComplete='email' />
            <input type='password' placeholder='Password' name='password' autoComplete='current-password' />
            <button disabled={loading}>
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </form>
          <p>
            Don&apos;t have an account?{' '}
            <Link className='link' to='/register'>
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
