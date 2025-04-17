
import { Button } from '@/components/ui/button';
import { Settings, User as UserIcon } from 'lucide-react';
import { User } from '@/types/chat';

interface UserControlPanelProps {
  currentUser: User;
  onOpenProfileSettings: () => void;
  onOpenAudioSettings: () => void;
}

const UserControlPanel = ({ 
  currentUser, 
  onOpenProfileSettings, 
  onOpenAudioSettings 
}: UserControlPanelProps) => {
  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'В сети';
      case 'idle': return 'Не активен';
      case 'dnd': return 'Не беспокоить';
      case 'offline': return 'Невидимый';
      default: return 'В сети';
    }
  };

  return (
    <div className="p-3 bg-[#0A0C17] border-t border-cyan-900/30 flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20"
        onClick={onOpenProfileSettings}
      >
        <UserIcon className="h-4 w-4 text-cyan-400" />
      </Button>
      
      <div className="flex-1 min-w-0">
        <p className="truncate font-medium">{currentUser.username}</p>
        <p className="text-xs text-muted-foreground truncate">
          {getStatusText(currentUser.status)}
        </p>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20"
        onClick={onOpenAudioSettings}
      >
        <Settings className="h-4 w-4 text-cyan-400" />
      </Button>
    </div>
  );
};

export default UserControlPanel;
