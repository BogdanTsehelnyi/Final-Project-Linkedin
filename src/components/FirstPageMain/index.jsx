import { NavLink } from 'react-router-dom';
import styles from './FirstPageMain.module.scss';

export default function FirstPageMain() {
    

    return (
        <>
            <main className={styles.firstPageMain}>
                <section className={styles.firstPageLeftSide}>
                    <h1 className={styles.firstPageLeftSideTitle}>Welcom to comunity of specialists!</h1>
                    <div className={styles.firstPageLeftSideBtnContainer}>
                    <button className={styles.firstPageLeftSideBtnGoogle}>Continue with Google</button>
                    <button className={styles.firstPageLeftSideBtnEmail}>Login using email</button>
                    </div>
                    <p className={styles.firstPageLeftSideConfidenPolice}>Click «Continue», that join or Sign in, you getting conditions <span>Users agreement</span>,<span>Confidential Policies and using cookie's files LinkedIn.</span> </p>
                    <h4 className={styles.firstPageLeftSideNotSignIn}>You aren't SignUp in LinkedIn? <NavLink to="/login"><span>SignUp</span></NavLink></h4>
                </section>
                <section className={styles.firstPageRightSide}>
                        <img src="./public/image/first-page/firstPageMainImg.svg" alt="" />
                </section>
            </main>
        </>
    )
}
