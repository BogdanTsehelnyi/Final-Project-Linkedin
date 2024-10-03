import { Link } from "react-router-dom"
import styles from "./Header.module.scss"


export default function Header() {
return(
    <>
    <div className={styles.headerContainer}>
        <Link to="/profile">link</Link>
    </div>
    </>
)
}