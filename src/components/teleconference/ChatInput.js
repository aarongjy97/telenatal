import React from 'react'
import {Input} from 'antd'
const {TextArea} = Input;
export default function ChatInput(props) {
  return (
      <Input.Search placeholder="Send message..."
      value={props.chatMessage}
      onChange={props.onMessageInput}
      size="large"
      enterButton="send"
      onSearch={props.onMessageSend}/>
  )
}