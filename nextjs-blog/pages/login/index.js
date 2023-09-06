import styles from '../../styles/Login.module.scss';
import Link from "next/link";
const Login = () =>{
  return(
    <div className={styles.container}>
      <h1 className={styles.title}>Login Form</h1>
      <div>
        <input placeholder="Name" name="name" type="text"/>
      </div>
      <div>
        <input placeholder="Password" name="password" type="password"/>
      </div>
      <div>
        <input className="sub" type="submit"/>
      </div>
      <h3>Dont have a account ?</h3>
      <Link href="/signup">Create a new account</Link>
    </div>
  )

}
export default  Login;
