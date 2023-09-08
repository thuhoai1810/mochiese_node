import styles from '../../styles/Login.module.scss';
import {Button, Input} from "antd";
const Login = () =>{
  return(
    <div className={styles.container}>
      <h3 className={styles.title}>Login Form</h3>
      <div className={styles.text}>
        <Input className={styles.input} placeholder="Name" name="name" type="text"/>
      </div>
      <div className={styles.text} >
        <Input className={styles.input} placeholder="Password" name="password" type="password"/>
      </div>
      <div>
        <Button  className={styles.btnSub} type="text" >
          submit
        </Button>
      </div>
    </div>
  )

}
export default  Login;
