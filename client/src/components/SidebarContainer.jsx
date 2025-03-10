import { Users } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const SidebarContainer = () => {
  const { users, selectedUser, setSelectedUser } = useChat();
  const { onlineUsers, user } = useAuth();

  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  return (
    <aside
      className='h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200'
    >
      <div className='border-b border-base-300 w-full p-5'>
        <Users className='size-6' />
        <div className='font-medium hidden lg:block capitalize'>contacts</div>
      </div>

      <div className='mt-3 hidden lg:flex items-center gap-2 pl-3'>
        <label className='cursor-pointer flex items-center gap-2'>
          <input
            type='checkbox'
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className='checkbox checkbox-sm'
          />
          <span className='text-sm'>Show online only</span>
        </label>
        <span className='text-xs text-zinc-500'>
          ({onlineUsers.length - 1} online)
        </span>
      </div>

      <div className='overflow-y-auto w-full py-3'>
        {filteredUsers.map((item, i) => (
          <button
            key={i}
            onClick={() => setSelectedUser(item)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                selectedUser?._id === item._id
                  ? 'bg-base-300 ring-1 ring-base-300'
                  : ''
              }
            `}
          >
            <div className='relative mx-auto lg:mx-0'>
              <img
                src={item.avatar || '/avatar.png'}
                alt={item.firstName}
                className='size-12 object-cover rounded-full'
              />
              {onlineUsers?.includes(item._id) && (
                <span
                  className='absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900'
                />
              )}
            </div>

            <div className='hidden lg:block text-left min-w-0'>
              <div className='font-medium truncate capitalize'>
                {item.firstName}
              </div>
              <div className='text-sm text-zinc-400'>
                {onlineUsers?.includes(item._id) ? 'Online' : 'Offline'}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className='text-center text-zinc-500 py-4'>No online users</div>
        )}
      </div>
    </aside>
  );
};

export default SidebarContainer;
