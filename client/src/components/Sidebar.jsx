import React, { useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import { SidebarContainer, SidebarLoading } from '../components';
import { LoaderPinwheel } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
const Sidebar = () => {
  const { getUsers, users, setSelectedUser, usersLoading, selectedUser } =
    useChat();

  const { onlineUsers } = useAuth();

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return usersLoading ? <SidebarLoading /> : <SidebarContainer />;
};

export default Sidebar;
