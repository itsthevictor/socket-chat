import React, { useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import { ChatHeader, MessageInput, MessagesLoading } from '../components';
import { LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { formatMessageTime } from '../utils/utils';
const ChatContainer = () => {
  const { messages, getMessages, messagesLoading, selectedUser } = useChat();
  const { user } = useAuth();
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
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((item, i) => (
          <div
            key={i}
            className={`chat ${
              item.senderId === selectedUser._id ? 'chat-start' : 'chat-end'
            }`}
          >
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img
                  src={
                    item.senderId === selectedUser._id
                      ? selectedUser.avatar || '/avatar.png'
                      : user.avatar || '/avatar.png'
                  }
                  alt=''
                />
              </div>
            </div>
            <div className='chat-header mb-1'>
              <time datetime='' className='text-xs opacity-50 ml-1'>
                {formatMessageTime(item.createdAt)}
              </time>
            </div>
            <div className='chat-bubble flex flex-col'>
              {item.image && (
                <img
                  src={item.image}
                  className='sm:max-w-[200px] rounded-md mb-2'
                />
              )}
              {item.text && <p>{item.text}</p>}
            </div>
          </div>
        ))}
      </div>{' '}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
