
import { useEffect } from 'react'
import './App.css'
import {io} from 'socket.io-client'
import { useState } from 'react'
function App() {

  const [time, setTime] = useState('connecting...')

useEffect(()=>{
  const socket = io('http://localhost:3000')
  
   socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
    });



  socket.on('timeUpdate',(serverTime)=>{
      setTime(serverTime)
  })

    return () => {
      socket.disconnect();
    };

},[])
  return (
    <>
     <h1>{time}</h1>
    </>
  )
}

export default App
