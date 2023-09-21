import { useState } from "react";
import "./App.css";
import Chat from "./components/chat/chat";
import Join from "./components/join/join";

const App = () => {
  const [handShake, setHandShake] = useState(null);
  const [chatVis, setChatVis] = useState(false);

  return (
    <div className="App">
      {chatVis ? (
        <Chat socket={handShake} />
      ) : (
        <Join state={setChatVis} handShake={setHandShake} />
      )}
    </div>
  );
};

export default App;
