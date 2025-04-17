
export interface User {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  isBot?: boolean;
}

export interface Message {
  id: string;
  content: string;
  user: User;
  timestamp: string;
  attachments?: string[];
  reactions?: { emoji: string; count: number; reacted: boolean }[];
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'announcement';
  description?: string;
  messages: Message[];
  unreadCount?: number;
}

export interface Server {
  id: string;
  name: string;
  icon: string;
  channels: Channel[];
  members: User[];
  ownerId: string;
}

export interface ChatContextState {
  servers: Server[];
  selectedServer: Server | null;
  selectedChannel: Channel | null;
  currentUser: User;
  isVoiceChannel: boolean;
  handleServerSelect: (server: Server, isMobile: boolean) => boolean;
  handleChannelSelect: (channel: Channel, isMobile: boolean) => boolean;
  handleSendMessage: (content: string) => void;
  handleUpdateUser: (updatedUser: User) => void;
}

export interface ResponsiveContextState {
  isMobile: boolean;
  showServerSidebar: boolean;
  showChannelSidebar: boolean;
  toggleServerSidebar: () => void;
  toggleChannelSidebar: () => void;
  setShowServerSidebar: (show: boolean) => void;
  setShowChannelSidebar: (show: boolean) => void;
}
