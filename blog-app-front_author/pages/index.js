import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import auth from '../utils/auth'
import Axios from 'axios'

import styles from '../styles/Login.module.css'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    if(auth.getToken())
      router.push('/home') 
  }, [])

  const LogInHandler = async () => {
    try {
      const { data } = await Axios.post('http://localhost:1337/auth/local', {
        identifier: email,
        password
      })
      auth.setToken(data.jwt, data.user.name, data.user.id)
      router.push('/home')
    } catch (err) {
      console.log(err.message)
    }
  }

  const SetInputHandler = e => {
    if(e.target.name === 'email')
      setEmail(e.target.value)

    if(e.target.name === 'password')
      setPassword(e.target.value)
  }

  return (
      <div className={styles.container}>
        <Head>
          <title>Author System</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <div className={styles.content}>
        <div></div>
        <div>
          <div className={styles.loginBox}>
            <div>Welcome Author!</div>
            
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="author@mail.com" value={email} onChange={SetInputHandler}/>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" value={password} onChange={SetInputHandler}/>

            <div onClick={LogInHandler}>Log In</div>
          </div>
        </div>
      </div>

      </div>
  )
}
