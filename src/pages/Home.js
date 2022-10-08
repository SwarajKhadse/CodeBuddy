import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
function Home() {
    const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
 
  
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    //  console.log(id);
    setRoomId(id);
    toast.success('Created a new room');
   

  };
   const joinRoom = () =>
   {
    if(!roomId || !username)
    {
        toast.error("ROOM ID and username is required");
        return;
       
    }
    navigate(`editor/${roomId}`,{
        state: {
            username,
        }
    })
    
   }
   const handelInputEnter= (e) =>{
    console.log('event' , e.code);
    if(e.code==='Enter')
    {
           joinRoom();
    }
   }
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          src="code-sync.png"
          alt="code-sync-logo"
          className="homePageLogo"
        />
        <h4 className="mainLabel"> Paste invitation ROOM ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder = "ROOM ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handelInputEnter}
          />
          <input type="text" className="inputBox" placeholder="USERNAME" 
           onChange={(e) => setUsername(e.target.value)}
           value={username}/>
          <button className="btn joinBtn" onClick={joinRoom}>Join</button>
          <span className="createInfo">
            {" "}
            If yoy don't have an invite then create &nbsp;
            <a href="" className="createNewBtn" onClick={createNewRoom}>
              new Room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built with 💛 by &nbsp;<a href="#">swaraj,aman</a>
        </h4>
      </footer>
    </div>
  );
}

export default Home;
