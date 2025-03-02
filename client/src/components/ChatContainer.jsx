import React, { useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import { ChatHeader, MessageInput, MessagesLoading } from '../components';
const ChatContainer = () => {
  const { messages, getMessages, messagesLoading, selectedUser } = useChat();
  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id]);
  return messagesLoading ? (
    <div className='flex flex-1 felx-col overflow-auto'>
      {' '}
      <ChatHeader />
      <MessagesLoading />
      <MessageInput />
    </div>
  ) : (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <p>messages...</p>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
