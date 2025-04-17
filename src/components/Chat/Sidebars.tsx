
import ServerSidebar from '@/components/ServerSidebar';
import ChannelSidebar from '@/components/ChannelSidebar';
import UserControlPanel from '@/components/Chat/UserControlPanel';
import UserPanel from '@/components/UserPanel';
import { Server, Channel, User } from '@/types/chat';

interface SidebarsProps {
  servers: Server[];
  selectedServer: Server | null;
  selectedChannel: Channel | null;
  currentUser: User;
  showServerSidebar: boolean;
  showChannelSidebar: boolean;
  onServerSelect: (server: Server) => void;
  onChannelSelect: (channel: Channel) => void;
  onOpenProfileSettings: () => void;
  onOpenAudioSettings: () => void;
}

const Sidebars = ({
  servers,
  selectedServer,
  selectedChannel,
  currentUser,
  showServerSidebar,
  showChannelSidebar,
  onServerSelect,
  onChannelSelect,
  onOpenProfileSettings,
  onOpenAudioSettings
}: SidebarsProps) => {
  return (
    <>
      {/* Серверы */}
      <div className={`${showServerSidebar ? 'block' : 'hidden'} md:block flex-shrink-0 w-16 md:w-20 bg-[#0D0D20] border-r border-cyan-900/30`}>
        <ServerSidebar 
          servers={servers} 
          selectedServer={selectedServer} 
          onSelectServer={onServerSelect} 
        />
      </div>

      {/* Каналы */}
      <div className={`${showChannelSidebar ? 'block' : 'hidden'} md:block flex-shrink-0 w-60 md:w-64 bg-[#0F111F] border-r border-cyan-900/30 relative`}>
        <ChannelSidebar 
          server={selectedServer} 
          selectedChannel={selectedChannel} 
          onSelectChannel={onChannelSelect} 
        />
        
        {/* Панель пользователя внизу сайдбара с каналами */}
        <div className="absolute bottom-0 left-0 right-0">
          <UserControlPanel
            currentUser={currentUser}
            onOpenProfileSettings={onOpenProfileSettings}
            onOpenAudioSettings={onOpenAudioSettings}
          />
        </div>
      </div>

      {/* Панель пользователя (десктоп) */}
      <div className="hidden lg:block flex-shrink-0 w-60 bg-[#0F111F] border-l border-cyan-900/30">
        <UserPanel server={selectedServer} />
      </div>
    </>
  );
};

export default Sidebars;
