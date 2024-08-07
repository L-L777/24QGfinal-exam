import styles from "./Loaders.module.css";
import logo from "../assets/icon.svg";
function Loaders() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className={styles.loader}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
    </div>
  );
}

export default Loaders;
