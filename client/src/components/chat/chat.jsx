import styles from "./chat.module.css";
import SendIcon from "@mui/icons-material/Send";
import { Button, Input } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const Chat = ({ socket }) => {
  const messagemRef = useRef();
  const bottomRef = useRef();
  const [messagemBox, setMessagemBox] = useState([]);

  useEffect(() => {
    messagemRef.current.focus();
    socket.on("receive_menssagem", (data) => {
      setMessagemBox((current) => [...current, data]);
    });

    return () => socket.off("receive_menssagem");
  }, [socket]);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messagemBox]);

  const menssagemSubmit = () => {
    const messagem = messagemRef.current.value;
    if (!messagem.trim()) return;

    socket.emit("messagem", messagem);

    clearIpt();
    messagemRef.current.focus();
  };
  const clearIpt = () => {
    messagemRef.current.value = "";
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      menssagemSubmit();
    }
  };
  return (
    <>
      <div className={styles["chat-cont"]}>
        <div className={styles["chat-body"]}>
          {messagemBox.map((messagem, index) => (
            <div
              className={`${styles["messagem-container"]} ${
                messagem.authorID === socket.id && styles["messagem-mine"]
              }`}
              key={index}
            >
              <div className={styles["messagem-author"]}>
                <strong>{messagem.author}</strong>
              </div>
              <div className={styles["messagem-text"]}>{messagem.text}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className={styles["chat-footer"]}>
          <Input
            inputRef={messagemRef}
            fullWidth
            placeholder="Mensagem"
            onKeyDown={handleKeyPress}
          />{" "}
          <SendIcon
            sx={{ m: 1, cursor: "pointer" }}
            style={{ color: "#129d93" }}
            onClick={() => menssagemSubmit()}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
