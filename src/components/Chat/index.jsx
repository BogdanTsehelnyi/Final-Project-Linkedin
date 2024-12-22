import { useEffect, useRef, useState, useContext } from "react";
import { ContextTheme } from "../../context/contextTheme/ContextTheme";
import light from "./Chat.module.scss";
import dark from "./ChatDark.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers, fetchAllMessage, postMessage, updateNewMessage, clearNewMessage } from "../../redux/slices/chatSlice";

export default function Chat() {
  const endMessageRef = useRef(null);
  const dispatch = useDispatch();
  const [headerName, setHeaderName] = useState({});
  const { users, message, newMessage } = useSelector((state) => state.chat);
  const [idOtherProfile, setIdOtherProfile] = useState(null);
  const { profileData } = useSelector((state) => state.profile);
  const currentIdUser = profileData.userId;
  // const { allProfilesData } = useSelector((state) => state.allProfilesData);

  const { theme } = useContext(ContextTheme);

  const styles = theme === "light" ? light : dark;

  //------------------------ Отримання усіх користувачів
  const handleIdProfile = (id, name, surname) => {
    setIdOtherProfile(id);
    setHeaderName({ name, surname });
    // console.log(id);
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch])

  //------------------------ Отримання усіх повідомлень з користувачем
  useEffect(() => {
    if (idOtherProfile) {
      dispatch(fetchAllMessage({ currentIdUser, idOtherProfile }));
    }
  }, [idOtherProfile, currentIdUser, dispatch]);

  //---------------Відбравка нового повідомлення
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const response = await dispatch(
      postMessage({
        senderId: currentIdUser,
        recipientId: idOtherProfile,
        content: newMessage,
      })
    );

    if (response.meta.requestStatus === "fulfilled") {
      dispatch(fetchAllMessage({ currentIdUser, idOtherProfile })); 
      dispatch(clearNewMessage()); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

    // Автоматическая прокрутка вниз
    useEffect(() => {
      if (endMessageRef.current) {
        endMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [message]);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.listChats}>
        <div className={styles.headerList}>All chats</div>
        {users.map(
          (user) =>
            user.userId !== currentIdUser && (
              <li
                onClick={() => {
                  handleIdProfile(user.userId, user.name, user.surname);
                }}
                key={user.userId}
                className={styles.user}
              >
                <div className={styles.imgWrapper}>
                  <img
                    className={styles.img}
                    src={user.headerPhotoUrl}
                    alt="photo"
                  />
                </div>
                <div className={styles.text}>
                  <div className={styles.headerText}>
                    <p className={styles.name}>
                      {user.name} {user.surname}
                    </p>
                  </div>
                </div>
              </li>
            )
        )}
      </ul>
      <div className={styles.chatWrapper}>
        <div className={styles.headerChat}>
          Message with {headerName.name} {headerName.surname}
        </div>
        <div className={styles.chatWrapper}>
          {message.slice().reverse().map((mess) =>
            mess.senderId === currentIdUser ? (
              <p key={mess.messageId} className={styles.sending}>
               You: {mess.content}
              </p>
            ) : (
              <p key={mess.messageId} className={styles.pending}>
                {mess.content}
              </p>
            )
          )}
          <div ref={endMessageRef}></div>
        </div>
        <textarea
          className={styles.inp}
          value={newMessage}
          onChange={(e) => dispatch(updateNewMessage(e.target.value))}
          onKeyDown={handleKeyDown}
          placeholder="Enter your message"
          type="text"
        />
      </div>
    </div>
  );
}
