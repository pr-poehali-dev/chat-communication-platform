
import { useState, useEffect } from 'react';
import ServerSidebar from '@/components/ServerSidebar';
import ChannelSidebar from '@/components/ChannelSidebar';
import ChatContent from '@/components/ChatContent';
import UserPanel from '@/components/UserPanel';
import VoiceChat from '@/components/VoiceChat';
import AudioSettings from '@/components/AudioSettings';
import ProfileSettings from '@/components/ProfileSettings';
import { Server, Channel, Message, User } from '@/types/chat';
import { mockData } from '@/data/mockData';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Settings, Mic, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [isVoiceChannel, setIsVoiceChannel] = useState(false);
  const [showAudioSettings, setShowAudioSettings] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);

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

  useEffect(() => {
    setIsVoiceChannel(selectedChannel?.type === 'voice');
  }, [selectedChannel]);

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

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  // Основные цвета для фурри-темы
  const furryThemeColors = {
    primary: 'bg-cyan-600',
    secondary: 'bg-purple-700',
    accent: 'bg-pink-600',
    text: 'text-cyan-400',
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0D0D15] text-white">
      {/* Серверы */}
      <div className={`${showServerSidebar ? 'block' : 'hidden'} md:block flex-shrink-0 w-16 md:w-20 bg-[#0D0D20] border-r border-cyan-900/30`}>
        <ServerSidebar 
          servers={servers} 
          selectedServer={selectedServer} 
          onSelectServer={handleServerSelect} 
        />
      </div>

      {/* Каналы */}
      <div className={`${showChannelSidebar ? 'block' : 'hidden'} md:block flex-shrink-0 w-60 md:w-64 bg-[#0F111F] border-r border-cyan-900/30`}>
        <ChannelSidebar 
          server={selectedServer} 
          selectedChannel={selectedChannel} 
          onSelectChannel={handleChannelSelect} 
        />
        
        {/* Панель пользователя внизу сайдбара с каналами */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-[#0A0C17] border-t border-cyan-900/30 flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20"
            onClick={() => setShowProfileSettings(true)}
          >
            <UserIcon className="h-4 w-4 text-cyan-400" />
          </Button>
          <div className="flex-1 min-w-0">
            <p className="truncate font-medium">{currentUser.username}</p>
            <p className="text-xs text-muted-foreground truncate">
              {currentUser.status === 'online' ? 'В сети' : 
               currentUser.status === 'idle' ? 'Не активен' : 
               currentUser.status === 'dnd' ? 'Не беспокоить' : 'Невидимый'}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20"
            onClick={() => setShowAudioSettings(true)}
          >
            <Settings className="h-4 w-4 text-cyan-400" />
          </Button>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0F111F]">
        {isVoiceChannel ? (
          <VoiceChat 
            channel={selectedChannel} 
            currentUser={currentUser}
            participants={selectedServer?.members.slice(0, 5) || []}
          />
        ) : (
          <ChatContent 
            channel={selectedChannel} 
            onSendMessage={handleSendMessage} 
            toggleServerSidebar={toggleServerSidebar}
            toggleChannelSidebar={toggleChannelSidebar}
            isMobile={isMobile}
          />
        )}
      </div>

      {/* Панель пользователя (десктоп) */}
      <div className="hidden lg:block flex-shrink-0 w-60 bg-[#0F111F] border-l border-cyan-900/30">
        <UserPanel server={selectedServer} />
      </div>

      {/* Модальное окно настроек аудио */}
      <Dialog open={showAudioSettings} onOpenChange={setShowAudioSettings}>
        <DialogContent className="sm:max-w-[500px] bg-[#0D0D20] border-cyan-900/50">
          <AudioSettings onClose={() => setShowAudioSettings(false)} />
        </DialogContent>
      </Dialog>

      {/* Модальное окно настроек профиля */}
      <Dialog open={showProfileSettings} onOpenChange={setShowProfileSettings}>
        <DialogContent className="sm:max-w-[500px] bg-[#0D0D20] border-cyan-900/50">
          <ProfileSettings 
            user={currentUser} 
            onUpdateUser={handleUpdateUser}
            onClose={() => setShowProfileSettings(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatLayout;
