import FirstPageLogo from "../../images/FirstPageLogo";
import styles from "./FirstPageHeader.module.scss";
import Net from "../../images/Net";
import Jobs from "../../images/Jobs";
import Articles from "../../images/Articles";
import Learn from "../../images/Learn";
import Games from "../../images/Games";
import LoadApp from "../../images/LoadApp";
import { NavLink } from "react-router-dom";

export default function FirstPageHeader() {
  return (
    <header className={styles.wrapperFirstPage}>
      {/* Обертаємо логотип у NavLink для переходу на /login */}
      <NavLink to="/login">
        <FirstPageLogo className={styles.name} />
      </NavLink>
      <div className={styles.groupTwoWrapper}>
        <nav className={styles.nav}>
          {/* Кожен елемент також веде на сторінку логіну */}
          <NavLink to="/login" className={styles.item}>
            <Articles />
            <span>Articles</span>
          </NavLink>

          <NavLink to="/login" className={styles.item}>
            <Net />
            <span>Net</span>
          </NavLink>

          <NavLink to="/login" className={styles.item}>
            <Learn className={styles.learn} />
            <span>LinkedIn Learning</span>
          </NavLink>

          <NavLink to="/login" className={styles.item}>
            <Jobs />
            <span>Jobs</span>
          </NavLink>

          <NavLink to="/login" className={styles.item}>
            <Games />
            <span>Notifications</span>
          </NavLink>

          <NavLink to="/login" className={styles.itemBorder}>
            <LoadApp />
            <span>For work</span>
          </NavLink>

          <div className={styles.itemBtn}>
            {/* Кнопки також ведуть на логін */}
            <NavLink to="/login">
              <button className={styles.signIn}>Sign In</button>
            </NavLink>

            <NavLink to="/login">
              <button className={styles.signUp}>Sign Up</button>
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
