import { useState } from 'react'
import '../styles/login.css'
import { toast } from 'react-toastify'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  })

  const handleAvatar = (e) => {
   const file = e.target.files[0]
    if (file) {
      setAvatar({
        file: file,
        url: URL.createObjectURL(file),
      });
    }
  }


  const handleLogin = (e) => {
    e.preventDefault()
    toast.success('Login Successful')
  }

  const handleRegister = (e) => {
    e.preventDefault()
  }

  return (
    <main className='login'>
      <section className='item'>
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type='text' placeholder='Email' name='email' />
          <input type='password' placeholder='Password' name='password' />
          <button disabled={loading}>{loading ? 'Loading' : 'Sign In'}</button>
        </form>
      </section>
      <section className='separator'></section>
      <section className='item'>
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor='file'>
            <img src={avatar.url || './avatar.png'} alt='' />
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
          <button disabled={loading}>{loading ? 'Loading' : 'Sign Up'}</button>
        </form>
      </section>
    </main>
  );
}
export default Login