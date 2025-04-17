
import { Server, Channel } from '@/types/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { VolumeIcon, MessageSquare, PlusCircle, Settings, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChannelSidebarProps {
  server: Server | null;
  selectedChannel: Channel | null;
  onSelectChannel: (channel: Channel) => void;
}

const ChannelSidebar = ({ server, selectedChannel, onSelectChannel }: ChannelSidebarProps) => {
  if (!server) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-sidebar-border">
          <h2 className="font-semibold text-lg">Выберите сервер</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-sidebar-border flex justify-between items-center">
        <h2 className="font-semibold text-lg truncate">{server.name}</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Настройки сервера</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="py-2">
          <div className="px-2 mb-2">
            <div className="flex items-center justify-between text-xs font-semibold text-sidebar-foreground opacity-70 mt-4 mb-1">
              <span>ТЕКСТОВЫЕ КАНАЛЫ</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-4 w-4">
                      <PlusCircle className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Создать канал</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {server.channels.filter(c => c.type === 'text').map((channel) => (
              <ChannelItem
                key={channel.id}
                channel={channel}
                isSelected={selectedChannel?.id === channel.id}
                onClick={() => onSelectChannel(channel)}
              />
            ))}
          </div>

          <div className="px-2 mb-2">
            <div className="flex items-center justify-between text-xs font-semibold text-sidebar-foreground opacity-70 mt-4 mb-1">
              <span>ГОЛОСОВЫЕ КАНАЛЫ</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-4 w-4">
                      <PlusCircle className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Создать канал</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {server.channels.filter(c => c.type === 'voice').map((channel) => (
              <ChannelItem
                key={channel.id}
                channel={channel}
                isSelected={selectedChannel?.id === channel.id}
                onClick={() => onSelectChannel(channel)}
              />
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-sidebar-border mt-auto">
        <Button variant="outline" size="sm" className="w-full flex justify-start gap-2">
          <Users className="h-4 w-4" />
          <span>Участники ({server.members.length})</span>
        </Button>
      </div>
    </div>
  );
};

interface ChannelItemProps {
  channel: Channel;
  isSelected: boolean;
  onClick: () => void;
}

const ChannelItem = ({ channel, isSelected, onClick }: ChannelItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center w-full px-2 py-1 rounded text-sidebar-foreground hover:bg-sidebar-border/50 gap-1.5 transition-colors",
        isSelected && "bg-sidebar-border/50 text-sidebar-foreground font-medium"
      )}
    >
      {channel.type === 'text' ? (
        <MessageSquare className="h-4 w-4 opacity-70" />
      ) : (
        <VolumeIcon className="h-4 w-4 opacity-70" />
      )}
      <span className="truncate">{channel.name}</span>
    </button>
  );
};

export default ChannelSidebar;
