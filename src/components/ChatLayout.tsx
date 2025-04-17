
import { useState, useEffect } from 'react';
import ServerSidebar from '@/components/ServerSidebar';
import ChannelSidebar from '@/components/ChannelSidebar';
import ChatContent from '@/components/ChatContent';
import UserPanel from '@/components/UserPanel';
import { Server, Channel, Message, User } from '@/types/chat';
import { mockData } from '@/data/mockData';

const ChatLayout = () => {
  const [servers, setServers] = useState<Server[]>(mockData.servers);
  const [selectedServer, setSelectedServer] = useState<Server | null>(mockData.servers[0] || null);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(
    selectedServer?.channels[0] || null
  );
  const [currentUser, setCurrentUser] = useState<User>(mockData.currentUser);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showServerSidebar, setShowServerSidebar] = useState(!isMobile);
  const [showChannelSidebar, setShowChannelSidebar] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowServerSidebar(true);
        setShowChannelSidebar(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleServerSelect = (server: Server) => {
    setSelectedServer(server);
    setSelectedChannel(server.channels[0] || null);
    if (isMobile) {
      setShowServerSidebar(false);
    }
  };

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel);
    if (isMobile) {
      setShowChannelSidebar(false);
    }
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

  const toggleServerSidebar = () => {
    setShowServerSidebar(prev => !prev);
  };

  const toggleChannelSidebar = () => {
    setShowChannelSidebar(prev => !prev);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Серверы */}
      <div className={`${showServerSidebar ? 'block' : 'hidden'} md:block flex-shrink-0 w-16 md:w-20 bg-sidebar border-r border-sidebar-border`}>
        <ServerSidebar 
          servers={servers} 
          selectedServer={selectedServer} 
          onSelectServer={handleServerSelect} 
        />
      </div>

      {/* Каналы */}
      <div className={`${showChannelSidebar ? 'block' : 'hidden'} md:block flex-shrink-0 w-60 md:w-64 bg-sidebar-accent border-r border-sidebar-border`}>
        <ChannelSidebar 
          server={selectedServer} 
          selectedChannel={selectedChannel} 
          onSelectChannel={handleChannelSelect} 
        />
      </div>

      {/* Основной контент */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatContent 
          channel={selectedChannel} 
          onSendMessage={handleSendMessage} 
          toggleServerSidebar={toggleServerSidebar}
          toggleChannelSidebar={toggleChannelSidebar}
          isMobile={isMobile}
        />
      </div>

      {/* Панель пользователя (опционально) */}
      <div className="hidden lg:block flex-shrink-0 w-60 bg-sidebar-accent border-l border-sidebar-border">
        <UserPanel server={selectedServer} />
      </div>
    </div>
  );
};

export default ChatLayout;
