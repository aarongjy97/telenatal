import React from 'react'
import ChatInput from './ChatInput'

export default function ChatPanel(props) {
  const [chatMessage, setChatMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);

  const onMessageInput = (event) => {
    setChatMessage(event.target.value)
  }

  const onMessageSubmit = (event) => {
    // send message (call parent component)
    var updated = [...messageList, event.target.value]
    setMessageList(updated)
  }

  return (
    <ChatInput chatMessage={chatMessage} onMessageInput={onMessageInput} onMessageSubmit={onMessageSubmit}/>
  )
}