import styles from "./Loaders.module.css";
import logo from "../assets/icon.svg";
function Loaders() {
  return (
    <div className={styles.loader}>
      <img src={logo} alt="Logo" className={styles.logo} />
    </div>
  );
}

export default Loaders;
