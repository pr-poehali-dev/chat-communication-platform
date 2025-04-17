
import VoiceChat from '@/components/VoiceChat';
import ChatContent from '@/components/ChatContent';
import { Channel, User } from '@/types/chat';

interface ChatMainContentProps {
  isVoiceChannel: boolean;
  selectedChannel: Channel | null;
  currentUser: User;
  participants: User[];
  handleSendMessage: (content: string) => void;
  toggleServerSidebar: () => void;
  toggleChannelSidebar: () => void;
  isMobile: boolean;
}

const ChatMainContent = ({
  isVoiceChannel,
  selectedChannel,
  currentUser,
  participants,
  handleSendMessage,
  toggleServerSidebar,
  toggleChannelSidebar,
  isMobile
}: ChatMainContentProps) => {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0F111F]">
      {isVoiceChannel ? (
        <VoiceChat 
          channel={selectedChannel} 
          currentUser={currentUser}
          participants={participants}
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
  );
};

export default ChatMainContent;
