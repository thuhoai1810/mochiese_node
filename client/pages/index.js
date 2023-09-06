import styles from '../styles/Home.module.scss';
import {useState} from "react";
import Link from "next/link";

export default function Home() {
  const[ isShowLogin, setIsShowLogin] = useState(false)
  const onClickRegist = () =>{}
  const onClickLogin = ()=>{
    setIsShowLogin(true)
  }
  return (
    <div className={styles.container}>
      <div className={styles.hearder}>
        <div className={styles.btnLogin}>
          <Link type="link" href="/login" target="_blank" onClick={onClickLogin}>Login</Link>
        </div>
        <div className={styles.btnRegister}>
          <Link type="link" href="/signup" target="_blank"  onClick={onClickRegist}>Register</Link>
        </div>
      </div>

    </div>
  )
}
