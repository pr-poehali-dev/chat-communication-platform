
import { useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { useResponsive } from '@/hooks/useResponsive';
import Sidebars from '@/components/Chat/Sidebars';
import ChatMainContent from '@/components/Chat/ChatMainContent';
import SettingsModals from '@/components/Chat/SettingsModals';

const ChatLayout = () => {
  // Хуки для управления состоянием чата и адаптивной версткой
  const {
    servers,
    selectedServer,
    selectedChannel,
    currentUser,
    isVoiceChannel,
    handleServerSelect,
    handleChannelSelect,
    handleSendMessage,
    handleUpdateUser
  } = useChat();

  const {
    isMobile,
    showServerSidebar,
    showChannelSidebar,
    toggleServerSidebar,
    toggleChannelSidebar,
    setShowServerSidebar,
    setShowChannelSidebar
  } = useResponsive();

  // Состояния для модальных окон
  const [showAudioSettings, setShowAudioSettings] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  // Обработчики событий с учетом мобильной версии
  const handleServerSelection = (server: Server) => {
    const shouldCloseMenu = handleServerSelect(server, isMobile);
    if (shouldCloseMenu) {
      setShowServerSidebar(false);
    }
  };

  const handleChannelSelection = (channel: Channel) => {
    const shouldCloseMenu = handleChannelSelect(channel, isMobile);
    if (shouldCloseMenu) {
      setShowChannelSidebar(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0D0D15] text-white">
      {/* Сайдбары (серверы, каналы, список пользователей) */}
      <Sidebars
        servers={servers}
        selectedServer={selectedServer}
        selectedChannel={selectedChannel}
        currentUser={currentUser}
        showServerSidebar={showServerSidebar}
        showChannelSidebar={showChannelSidebar}
        onServerSelect={handleServerSelection}
        onChannelSelect={handleChannelSelection}
        onOpenProfileSettings={() => setShowProfileSettings(true)}
        onOpenAudioSettings={() => setShowAudioSettings(true)}
      />

      {/* Основной контент (чат или голосовой канал) */}
      <ChatMainContent
        isVoiceChannel={isVoiceChannel}
        selectedChannel={selectedChannel}
        currentUser={currentUser}
        participants={selectedServer?.members.slice(0, 5) || []}
        handleSendMessage={handleSendMessage}
        toggleServerSidebar={toggleServerSidebar}
        toggleChannelSidebar={toggleChannelSidebar}
        isMobile={isMobile}
      />

      {/* Модальные окна настроек */}
      <SettingsModals
        showAudioSettings={showAudioSettings}
        showProfileSettings={showProfileSettings}
        setShowAudioSettings={setShowAudioSettings}
        setShowProfileSettings={setShowProfileSettings}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
};

export default ChatLayout;
