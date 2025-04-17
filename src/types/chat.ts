
export interface User {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
}

export interface Message {
  id: string;
  content: string;
  user: User;
  timestamp: string;
  attachments?: Array<{
    id: string;
    type: 'image' | 'file';
    url: string;
    name?: string;
  }>;
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  messages: Message[];
}

export interface Server {
  id: string;
  name: string;
  icon: string;
  channels: Channel[];
  members: User[];
}
