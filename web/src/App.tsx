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
      setMessages((prev) => [...prev, JSON.parse(e.data)])
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
    <div className='bg-gray-900 text-gray-50'>
      <div className=''>
        <div >
          <form onSubmit={SubmitHandler} className='w-full flex justify-center max-w-7xl mx-auto'>
            <input placeholder='Create a Message' value={message.content} className='w-[97%] mt-2 mx-2 px-3 py-1 rounded-xl placeholder-gray-100 bg-slate-600' onChange={(e) => setMessage((prev) => ({ ...prev, content: e.target.value }))}></input>
          </form>
        </div>
        <div className='max-w-7xl mx-auto mt-2'>
          {[...messages].reverse().map((message, index) => {
            return (
              <div key={index} className='px-4 py-3 hover:bg-gray-800'>
                <time className='text-sm font-mono' dateTime={message.date}>{message.date}</time>
                <h2 className='font-bold text-xl'>{message.content}</h2>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
