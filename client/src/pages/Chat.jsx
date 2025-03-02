import { Navbar, Sidebar, NoChatSelected, ChatContainer } from '../components';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useChat } from '../hooks/useChat';

const Chat = () => {
  const { isCheckingAuth, checkAuth, user } = useAuth();
  const { selectedUser } = useChat();

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <Navbar />
      <div className='h-screen bg-base-200'>
        <div className='flex items-center justify-center pt-20 px-4'>
          <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
            <div className='flex h-full rounedd-lg overflow-hidden'>
              <Sidebar />

              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;
