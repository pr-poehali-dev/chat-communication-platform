
import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Monitor, Phone, PhoneOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Channel, User } from '@/types/chat';
import { ScrollArea } from '@/components/ui/scroll-area';

interface VoiceChatProps {
  channel: Channel | null;
  currentUser: User;
  participants: User[];
}

const VoiceChat = ({ channel, currentUser, participants }: VoiceChatProps) => {
  const [micActive, setMicActive] = useState(true);
  const [audioActive, setAudioActive] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [inCall, setInCall] = useState(true);
  const [micVolume, setMicVolume] = useState(75);
  const [speakerVolume, setSpeakerVolume] = useState(80);

  if (!channel || channel.type !== 'voice') {
    return null;
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-lg">🔊 {channel.name}</h2>
        <p className="text-xs text-muted-foreground">Голосовой канал</p>
      </div>

      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {participants.map((user) => (
              <div 
                key={user.id} 
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/40"
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback>{user.username.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  {user.id === currentUser.id && micActive && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full">
                      <Mic className="h-3 w-3 text-white" />
                    </div>
                  )}
                  {user.id === currentUser.id && !micActive && (
                    <div className="absolute -bottom-1 -right-1 bg-red-500 p-1 rounded-full">
                      <MicOff className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {user.username}
                      {user.id === currentUser.id && " (Вы)"}
                    </span>
                    <div className="flex items-center gap-1">
                      {screenSharing && user.id === currentUser.id && (
                        <Monitor className="h-4 w-4 text-primary" />
                      )}
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                  </div>
                  <div className="relative w-full h-1 bg-muted-foreground/20 rounded-full mt-2">
                    <div 
                      className="absolute top-0 left-0 h-full bg-primary rounded-full animate-pulse" 
                      style={{ width: user.id === currentUser.id ? '75%' : `${Math.floor(Math.random() * 60 + 20)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border bg-card">
          <div className="flex justify-center gap-4 mb-4">
            <Button 
              variant={micActive ? "default" : "destructive"} 
              size="icon" 
              onClick={() => setMicActive(!micActive)}
              className="h-12 w-12 rounded-full"
            >
              {micActive ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
            
            <Button 
              variant={audioActive ? "default" : "destructive"} 
              size="icon" 
              onClick={() => setAudioActive(!audioActive)}
              className="h-12 w-12 rounded-full"
            >
              {audioActive ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>
            
            <Button 
              variant={screenSharing ? "secondary" : "outline"} 
              size="icon" 
              onClick={() => setScreenSharing(!screenSharing)}
              className="h-12 w-12 rounded-full"
            >
              <Monitor className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="destructive" 
              size="icon" 
              onClick={() => setInCall(false)}
              className="h-12 w-12 rounded-full"
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChat;
