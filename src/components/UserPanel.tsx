
import { Server } from '@/types/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserPanelProps {
  server: Server | null;
}

const UserPanel = ({ server }: UserPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!server) {
    return null;
  }

  const filteredMembers = server.members.filter(member => 
    member.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Группируем пользователей по статусу
  const onlineUsers = filteredMembers.filter(user => user.status === 'online');
  const idleUsers = filteredMembers.filter(user => user.status === 'idle');
  const dndUsers = filteredMembers.filter(user => user.status === 'dnd');
  const offlineUsers = filteredMembers.filter(user => user.status === 'offline');

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-sidebar-border">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск участников"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          {onlineUsers.length > 0 && (
            <UserGroup title={`В сети — ${onlineUsers.length}`} users={onlineUsers} />
          )}
          
          {idleUsers.length > 0 && (
            <UserGroup title={`Не активен — ${idleUsers.length}`} users={idleUsers} />
          )}
          
          {dndUsers.length > 0 && (
            <UserGroup title={`Не беспокоить — ${dndUsers.length}`} users={dndUsers} />
          )}
          
          {offlineUsers.length > 0 && (
            <UserGroup title={`Не в сети — ${offlineUsers.length}`} users={offlineUsers} />
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

interface UserGroupProps {
  title: string;
  users: Array<{
    id: string;
    username: string;
    avatar: string;
    status: 'online' | 'idle' | 'dnd' | 'offline';
  }>;
}

const UserGroup = ({ title, users }: UserGroupProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-sidebar-foreground opacity-70 mb-2">
        {title}
      </h3>
      <div className="space-y-2">
        {users.map(user => (
          <div key={user.id} className="flex items-center gap-2 p-1 rounded hover:bg-sidebar-border/30">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>{user.username.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <StatusIndicator status={user.status} />
            </div>
            <span className="truncate">{user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface StatusIndicatorProps {
  status: 'online' | 'idle' | 'dnd' | 'offline';
}

const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  return (
    <div 
      className={cn(
        "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-sidebar-accent",
        status === 'online' && "bg-green-500",
        status === 'idle' && "bg-yellow-500",
        status === 'dnd' && "bg-red-500",
        status === 'offline' && "bg-gray-500",
      )}
    />
  );
};

export default UserPanel;
