
import { Server } from '@/types/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServerSidebarProps {
  servers: Server[];
  selectedServer: Server | null;
  onSelectServer: (server: Server) => void;
}

const ServerSidebar = ({ servers, selectedServer, onSelectServer }: ServerSidebarProps) => {
  return (
    <div className="flex flex-col h-full py-4">
      <ScrollArea className="flex-1">
        <div className="flex flex-col items-center space-y-2 px-2">
          {servers.map((server) => (
            <ServerIcon
              key={server.id}
              server={server}
              isSelected={selectedServer?.id === server.id}
              onClick={() => onSelectServer(server)}
            />
          ))}
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-accent-foreground transition-colors"
                >
                  <PlusCircle className="w-6 h-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Добавить сервер</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </ScrollArea>
    </div>
  );
};

interface ServerIconProps {
  server: Server;
  isSelected: boolean;
  onClick: () => void;
}

const ServerIcon = ({ server, isSelected, onClick }: ServerIconProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={cn(
              "relative w-12 h-12 rounded-full flex items-center justify-center bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground transition-all",
              isSelected && "rounded-[30%] bg-sidebar-primary"
            )}
          >
            {isSelected && (
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
            )}
            <span className="text-xl">{server.icon}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{server.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ServerSidebar;
