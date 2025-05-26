import { useState } from 'react';
import '../styles/login.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './lib/firebase';

const Login = () => {
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  

  const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      
      console.log(res)
      
      if (res.user) { 
        toast.success('Login Successful');
        window.location.href = '/';
      }
     
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }

    // toast.success('Login Successful');
  };

  

  return (
    <main className='container'>
      <section className='login'>
        <div className='item'>
          <h2>Welcome back,</h2>
          <form onSubmit={handleLogin}>
            <input
              type='text'
              placeholder='Email'
              name='email'
              autoComplete='email'
              required
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              autoComplete='current-password'
              required
            />
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
