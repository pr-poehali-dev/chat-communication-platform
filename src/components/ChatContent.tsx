
import { useState, useRef, useEffect } from 'react';
import { Channel, Message } from '@/types/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Send, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ChatContentProps {
  channel: Channel | null;
  onSendMessage: (content: string) => void;
  toggleServerSidebar: () => void;
  toggleChannelSidebar: () => void;
  isMobile: boolean;
}

const ChatContent = ({ 
  channel, 
  onSendMessage, 
  toggleServerSidebar, 
  toggleChannelSidebar, 
  isMobile 
}: ChatContentProps) => {
  const [message, setMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Прокрутка вниз при изменении канала или новых сообщениях
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [channel?.id, channel?.messages.length]);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!channel) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-4">
        <h2 className="text-2xl font-semibold mb-2">Выберите канал</h2>
        <p className="text-muted-foreground">Выберите канал чтобы начать общение</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Шапка канала */}
      <div className="flex items-center p-4 border-b">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleServerSidebar} className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleChannelSidebar} className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div>
          <h2 className="font-semibold text-lg">#{channel.name}</h2>
          <p className="text-xs text-muted-foreground">
            {channel.type === 'text' ? 'Текстовый канал' : 'Голосовой канал'}
          </p>
        </div>
      </div>

      {/* Список сообщений */}
      <ScrollArea 
        className="flex-1 p-4" 
        ref={scrollAreaRef}
      >
        {channel.messages.length > 0 ? (
          <div className="space-y-4">
            {channel.messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <h3 className="font-medium text-lg mb-2">Начало канала #{channel.name}</h3>
            <p className="text-muted-foreground">
              Это начало канала. Отправьте первое сообщение!
            </p>
          </div>
        )}
      </ScrollArea>

      {/* Ввод сообщения */}
      {channel.type === 'text' && (
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Введите сообщение..."
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              size="icon" 
              disabled={!message.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  const date = new Date(message.timestamp);
  const formattedTime = format(date, 'HH:mm');
  const formattedDate = format(date, 'dd MMMM yyyy', { locale: ru });

  return (
    <div className="flex gap-3 group">
      <Avatar>
        <AvatarImage src={message.user.avatar} alt={message.user.username} />
        <AvatarFallback>{message.user.username.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline">
          <span className="font-medium mr-2">{message.user.username}</span>
          <span className="text-xs text-muted-foreground">{formattedTime}</span>
          <span className="text-xs text-muted-foreground ml-1 hidden group-hover:inline">
            {formattedDate}
          </span>
        </div>
        <p className="mt-1">{message.content}</p>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 grid grid-cols-1 gap-2">
            {message.attachments.map((attachment) => (
              <div key={attachment.id} className="rounded overflow-hidden">
                {attachment.type === 'image' ? (
                  <img
                    src={attachment.url}
                    alt={attachment.name || 'Attachment'}
                    className="max-w-full max-h-96 object-contain"
                  />
                ) : (
                  <div className="p-2 bg-muted rounded flex items-center gap-2">
                    <Paperclip className="h-4 w-4" />
                    <span className="text-sm">{attachment.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContent;
