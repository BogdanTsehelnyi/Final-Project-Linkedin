import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";

// Заглушка для пользователей
const usersArr = [
  { id: 1, name: "John Doe", avatar: "https://example.com/avatar1.jpg" },
  { id: 2, name: "Jane Smith", avatar: "https://example.com/avatar2.jpg" },
  { id: 3, name: "Alice Johnson", avatar: "https://example.com/avatar3.jpg" },
];

// Заглушки для сообщений
const messagesArr = [
  { id: 1, userId: 1, text: "Hello! How are you?", sending: true},
  { id: 2, userId: 2, text: "I'm fine, thanks! How about you?", sending: false},
  { id: 3, userId: 1, text: "I'm doing great!", sending: true},
];

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const endMessageRef = useRef(null);

  useEffect(() => {
    setMessages(messagesArr);
    setUsers(usersArr);
  }, [])
  
  const handleHeightnInp = (e) => {
    const inp = e.target;
    setMessage(inp.value);
    inp.style.height = "auto";
    inp.style.height = `${inp.scrollHeight}px`;
  };
  const handleSendMessage = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newMessage = {
        id: messages.length + 1,
        userId: 1,
        text: message,
        sending: true,
      }
      setMessages([...messages, newMessage]);
      setMessage("");
      
    }
  }
  useEffect(() => {
    endMessageRef.current ? endMessageRef.current.scrollIntoView({ behavior: 'smooth' }) : "";
  }, [messages])
  return (
    <div className={styles.wrapper}>
      <ul className={styles.listChats}>
        <div className={styles.headerList}>All chats</div>
        {users.map(user => (user.id !== 1 &&
        <li key={user.id} className={styles.user}>
          <div className={styles.imgWrapper}>
            <img
              className={styles.img}
              src="data:image/jpeg;base64,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"
              alt="image"
            />
          </div>
          <div className={styles.text}>
            <div className={styles.headerText}>
              <p className={styles.name}>{user.name}</p>
              <p className={styles.date}>12.12.2012</p>
            </div>
            {/* <p className={styles.discription}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              numquam obcaecati minus! Sint distinctio molestiae aperiam earum
              in nostrum quod illo minima necessitatibus, perferendis
              praesentium officia? Neque ad nobis perferendis!
            </p> */}
          </div>
        </li>
        ))}
      </ul>
      <div className={styles.chatWrapper}>
        <div className={styles.headerChat}>header</div>
        <div className={styles.chatWrapper}>
            {/* <div className={styles.pending}>              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              numquam obcaecati minus! Sint distinctio molestiae aperiam earum
              in nostrum quod illo minima necessitatibus, perferendis
              praesentium officia? Neque ad nobis perferendis!</div> */}
            {messages.map((msg) => (<div key={msg.userId} className={`${msg.sending ? styles.sending : styles.pending}`}>
              <span>{users.find(user => user.id === msg.userId)?.name}:</span>
              {msg.text}
            </div>))}
            <div ref={endMessageRef}></div>
        </div>
        <textarea
          className={styles.inp}
          value={message}
          onChange={handleHeightnInp}
          onKeyDown={handleSendMessage}
          placeholder="Enter your message"
          type="text"
        />
      </div>
    </div>
  );
}
