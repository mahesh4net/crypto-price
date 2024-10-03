import Nav from "./navbar";
import Input from "./input";
import Crypto from "./crypto";
import { useRef } from "react";

function App() {
const inputval = useRef(null)

  return <>
  <Nav></Nav>
    <div className="main">
      <Input ></Input>
      <div className="data">
       <Crypto ></Crypto>
      </div>

  </div>
  
  </>
}

export default App;
