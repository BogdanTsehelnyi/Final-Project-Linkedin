import { useEffect, useRef, useState, useContext } from "react";
import { ContextTheme } from "../../context/contextTheme/ContextTheme";
import light from "./Chat.module.scss";
import dark from "./ChatDark.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllUsers,
  fetchAllMessageByParams,
  fetchAllMessageByRout,
  postMessage,
  updateNewMessage,
  clearNewMessage,
} from "../../redux/slices/chatSlice";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Chat() {
  const endMessageRef = useRef(null);
  const dispatch = useDispatch();
  const [headerName, setHeaderName] = useState({});
  const { users, message, newMessage, } = useSelector(
    (state) => state.chat
  );
  const { id } = useParams();  // Получаем id собеседника из URL
  console.log(id);
  
  // message.forEach((mess) => {
  //   console.log(mess.read === false);
  // })
  // console.log(message);


  
  const [idOtherProfile, setIdOtherProfile] = useState(null);
  const { profileData } = useSelector((state) => state.profile);
  const currentIdUser = profileData.userId;

  const { theme } = useContext(ContextTheme);

  const styles = theme === "light" ? light : dark;

  //------------------------ Отримання усіх користувачів
  const handleIdProfile = (id, name, surname) => {
    setIdOtherProfile(id);
    setHeaderName({ name, surname });
    // console.log(id);
  };

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, users]);

  //------------------------ Отримання усіх повідомлень з користувачем
  useEffect(() => {
    if (idOtherProfile) {
      dispatch(fetchAllMessageByParams({ currentIdUser, idOtherProfile }));
    }
  }, [idOtherProfile, currentIdUser, dispatch]);

  useEffect(() => {
    if (id, currentIdUser) {
      dispatch(fetchAllMessageByRout({ id, currentIdUser }));
    } 
  }, [id, dispatch]);
  

  // const [test, setTest] = useState([]);
  // console.log(test);
  
  // useEffect(() => {
  //   const fetchRoutChat = async () => {
  //   try{
  //     const response = await axios.get(`https://final-project-link.onrender.com/messages/chat`, {
  //       withCredentials: true,
  //       params : {
  //         id1: currentIdUser,
  //         id2: id,
  //         page: 0,
  //         size: 300,
  //       }
  //     })
  //     // return response.data;
  //     //  return console.log(response.data);
  //     setTest(response.data);
      
  //   } catch(error) {
  //     console.log(error);
      
  //   }
  // }
  //     if (id) {
  //       fetchRoutChat();
  //     }
  // }, [id]);

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
      dispatch(fetchAllMessageByParams({ currentIdUser, idOtherProfile }));
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
          {message
            .slice()
            .reverse()
            .map((mess) =>
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
