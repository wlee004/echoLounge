import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  const googleAuth = async () => { 
    window.location.href="http://localhost:8080/api/auth/google/authenticate"
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div >
            <h1 className={styles.title}>SHARE YOUR FAVORITE VIDEOS WITH YOUR FRIENDS LOVED ONES!</h1>
        </div>
        <div>
          <p className={styles.description}>
            Watch, sync, and share unforgettable video moments together in real time
          </p>
        </div>
        <div>
          <button className={styles.button}
            onClick={googleAuth}>Lets Begin
            </button>
        </div>
      </div>
      <div className={styles.picture}>
        <h1>Picture </h1>
      </div>
    </div>
  )
}
