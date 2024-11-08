import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "./ChatMiniBar.module.scss";

export default function ChatMiniBar() {
    const profilePicture = useSelector((state) => state.profile.profileData.profilePicture);
    
    // Створюємо стан для контролю напрямку панелі
    const [isArrowUp, setIsArrowUp] = useState(true);

    // Функція для перемикання стану
    const toggleArrow = () => {
        setIsArrowUp(prevState => !prevState);
    };

    return (
        <>
            <aside className={`${styles.chatMiniBar} ${isArrowUp ? styles.up : styles.down}`}>
                <div className={styles.chatMiniBarHeader}>
                    <div className={styles.chatMiniBarUpHeader}>
                    <img className={styles.chatMiniBarPhoto} src={profilePicture} alt="" />
                    <h4>Messages</h4>
                    <nav className={styles.chatMiniBarMenu}>
                        <ul className={styles.chatMiniBarList}>
                            <li><img src="image/profile/three-dots.svg" alt="dots" /></li>
                            <li><img src="image/chat/notice.svg" alt="notice" /></li>
                            <li onClick={toggleArrow}>
                                <img 
                                    src={isArrowUp ? "image/chat/arrowUp.svg" : "image/chat/arrowDown.svg"} 
                                    alt={isArrowUp ? "Up" : "Down"} 
                                />
                            </li>
                        </ul>
                    </nav>
                    </div>
                    <div className={styles.inputWrapper}>
                        <input
                        className={styles.chatMiniBarSearch}
                        type="text"
                        name="search"
                        placeholder="Search"
                        />
                    </div>
                </div>
                <div className={styles.chatMiniBarItems}>
                    <h4>You don't have Message!</h4>
                </div>
            </aside>
        </>
    )
}

