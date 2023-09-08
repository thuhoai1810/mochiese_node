import styles from '../styles/Home.module.scss';
import MenuDashboard from "../component/MenuDashboard/MenuDashboard";
const Home = () =>{
  return(
    <>
      <div className={styles.container}>
        <MenuDashboard/>
      </div>
    </>
  )
}
export default  Home;
