import React, { useEffect, useState } from 'react';
import './App.css';

const socket = new WebSocket('ws://localhost:4000')

type Message = {
  content: string,
  date: string
}

function App() {
  const [message, setMessage] = useState<Message>({ content: "", date: "" })
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const getMessages = async () => {
      const response = await fetch('http://localhost:3030/api/messages', {
        method: "GET",
        headers: {
          'Content-Type': "application/json"
        }
      })
      const data = await response.json()
      setMessages(data.messages)
    }
    getMessages()
  }, [])

  useEffect(() => {
    socket.addEventListener('open', (e) => {
      console.log("WebSocket Connected")
    })
    socket.addEventListener("message", (e) => {
      setMessages((prev) => [...prev!, JSON.parse(e.data)])
    })
   
  }, [])

  const SubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({content: "", date: ""})
    try {
      const response = await fetch('http://localhost:3030/api/messages', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ ...message, date: new Date().toString() })
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div >
      <div className='container'>
        <div>
          <form onSubmit={SubmitHandler}>
            <input placeholder='Create a Message' value={message.content} onChange={(e) => setMessage((prev) => ({ ...prev, content: e.target.value }))}></input>
          </form>
        </div>
        <div>
          {[...messages].reverse().map((message, index) => {
            return (
              <div key={index}>
                <h3>{message.content}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
