import React from "react"
import styles from "../../styles/Signup.module.scss"
import Link from "next/link";

const Signup = () =>{
    return(
        <div className={styles.container}>
            <h1>Sign Up</h1>
          <div>
            <input placeholder="email" name="email" type="text"/>
          </div>
          <div>
            <input placeholder="Name" name="name" type="text"/>
          </div>
          <div>
            <input placeholder="Password" name="password" type="password"/>
          </div>
          <div>
            <input name="isAdmin" type="radio"/>
          </div>
          <div>
            <input className="sub" type="submit"/>
          </div>
             <Link href="/login">Go back to login page</Link>
        </div>
    )
}
export default Signup
