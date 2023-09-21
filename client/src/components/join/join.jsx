import styles from "./join.module.css";
import { Input, Button } from "@mui/material";
import logofro from "../../assets/devChat.png";
import io from "socket.io-client";
import { useEffect, useRef } from "react";

const Join = ({ state, handShake }) => {
  const usernameRef = useRef();
useEffect(()=>{
  usernameRef.current.focus()
})
  const submit = async () => {
    const username = usernameRef.current.value;
    if (!username.trim()) return;
    // console.log(`Bem vindo ${username}`)
    const socket = await io.connect("http://localhost:3003");
    socket.emit("set_username", username);
    handShake(socket);
    state(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  return (
    <>
      {" "}
      <div className={styles["dev-logo"]}>
        <img src={logofro} alt="" />
      </div>
      <div className={styles["join-container"]}>
        <h2>Bem-vindo ao devChat!</h2>
        <Input
          inputRef={usernameRef}
          placeholder="Nome do usuário..."
          onKeyDown={handleKeyPress}
        />
        <Button
          sx={{ mt: 2, mb: 2 }}
          variant="contained"
          onClick={() => submit()}
        >
          Entrar
        </Button>
      </div>
    </>
  );
};

export default Join;
