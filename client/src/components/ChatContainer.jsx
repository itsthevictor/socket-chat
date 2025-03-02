import React, { useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import { ChatHeader, MessageInput } from '../components';
const ChatContainer = () => {
  const { messages, getMessages, messagesLoading, selectedUser } = useChat();
  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id]);
  return messagesLoading ? (
    <div className='loading'>Loading..</div>
  ) : (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <p>messages...</p>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
