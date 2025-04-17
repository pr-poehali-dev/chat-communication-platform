
import { useState, useEffect } from 'react';
import { Server, Channel, Message, User } from '@/types/chat';
import { mockData } from '@/data/mockData';

export const useChat = () => {
  const [servers, setServers] = useState<Server[]>(mockData.servers);
  const [selectedServer, setSelectedServer] = useState<Server | null>(mockData.servers[0] || null);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(
    selectedServer?.channels[0] || null
  );
  const [currentUser, setCurrentUser] = useState<User>(mockData.currentUser);
  const [isVoiceChannel, setIsVoiceChannel] = useState(false);
  
  // Обновляем тип канала при изменении выбранного канала
  useEffect(() => {
    setIsVoiceChannel(selectedChannel?.type === 'voice');
  }, [selectedChannel]);

  const handleServerSelect = (server: Server, isMobile: boolean) => {
    setSelectedServer(server);
    setSelectedChannel(server.channels[0] || null);
    return isMobile; // Возвращаем чтобы определить, нужно ли закрыть сайдбар
  };

  const handleChannelSelect = (channel: Channel, isMobile: boolean) => {
    setSelectedChannel(channel);
    return isMobile; // Возвращаем чтобы определить, нужно ли закрыть сайдбар
  };

  const handleSendMessage = (content: string) => {
    if (!selectedChannel || !content.trim()) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      user: currentUser,
      timestamp: new Date().toISOString(),
    };

    // Обновляем состояние серверов, добавляя новое сообщение в выбранный канал
    setServers(prevServers => {
      return prevServers.map(server => {
        if (server.id === selectedServer?.id) {
          return {
            ...server,
            channels: server.channels.map(channel => {
              if (channel.id === selectedChannel.id) {
                return {
                  ...channel,
                  messages: [...channel.messages, newMessage]
                };
              }
              return channel;
            })
          };
        }
        return server;
      });
    });
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  return {
    servers,
    selectedServer,
    selectedChannel,
    currentUser,
    isVoiceChannel,
    handleServerSelect,
    handleChannelSelect,
    handleSendMessage,
    handleUpdateUser
  };
};
