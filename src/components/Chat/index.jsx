import { useEffect, useRef, useState, useContext } from "react";
import { ContextTheme } from "../../context/contextTheme/ContextTheme";
import light from "./Chat.module.scss";
import dark from "./ChatDark.module.scss";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Chat() {
  const endMessageRef = useRef(null);
  const [headerName, setHeaderName] = useState({});

  const { theme } = useContext(ContextTheme);

  const styles = theme === "light" ? light : dark;

  //------------------------ Отримання усіх користувачів
  const [data, setData] = useState([]);
  const [idOtherProfile, setIdOtherProfile] = useState(null);
  // console.log(data);
  // console.log(idOtherProfile);

  const handleIdProfile = (id, name, surname) => {
    setIdOtherProfile(id);
    setHeaderName({ name, surname });
    console.log(id);
  };

  useEffect(() => {
    const fetchDataLit = async () => {
      const response = await axios.get(
        "https://final-project-link.onrender.com/profiles",
        {
          withCredentials: true,
        }
      );
      setData(response.data);
      // console.log(response.data);
    };
    fetchDataLit();
  }, []);

  //------------------------ Отримання усіх повідомлень з користувачем
  const { profileData } = useSelector((state) => state.profile);
  const currentIdUser = profileData.userId;
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const getAllMessage = async () => {
      const response = await axios.get(
        "https://final-project-link.onrender.com/messages/chat",
        {
          withCredentials: true,
          params: {
            id1: currentIdUser,
            id2: idOtherProfile,
          },
        }
      );
      console.log(response.data);
      setMessage(response.data);
    };
    getAllMessage();
  }, [idOtherProfile]);

  //---------------Post new message
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async (e) => {
    if (!newMessage.trim()) return;

    const response = await axios.post(
      "https://final-project-link.onrender.com/messages/create",
      {
        senderId: currentIdUser,
        recipientId: idOtherProfile,
        content: newMessage,
      },
      { withCredentials: true }
    );

    console.log(response.data);

    if (response.status === 200) {
      setMessage([...message, response.data]);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.listChats}>
        <div className={styles.headerList}>All chats</div>
        {data.map(
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
          {message.map((mess) =>
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
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your message"
          type="text"
        />
      </div>
    </div>
  );
}
