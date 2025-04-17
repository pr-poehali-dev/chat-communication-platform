
import { useState } from 'react';
import { User } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Camera, Check, X } from 'lucide-react';

interface ProfileSettingsProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  onClose?: () => void;
}

const ProfileSettings = ({ user, onUpdateUser, onClose }: ProfileSettingsProps) => {
  const [username, setUsername] = useState(user.username);
  const [avatar, setAvatar] = useState(user.avatar);
  const [status, setStatus] = useState(user.status);
  const [customStatus, setCustomStatus] = useState('');
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser: User = {
      ...user,
      username,
      status: status as 'online' | 'idle' | 'dnd' | 'offline',
      avatar: previewAvatar || avatar,
    };
    onUpdateUser(updatedUser);
    if (onClose) onClose();
  };

  const handleCancel = () => {
    setPreviewAvatar(null);
    if (onClose) onClose();
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online': return 'В сети';
      case 'idle': return 'Не активен';
      case 'dnd': return 'Не беспокоить';
      case 'offline': return 'Невидимый';
      default: return 'В сети';
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Настройки профиля</h2>

      <Tabs defaultValue="profile">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="profile" className="flex-1">Профиль</TabsTrigger>
          <TabsTrigger value="appearance" className="flex-1">Внешний вид</TabsTrigger>
          <TabsTrigger value="privacy" className="flex-1">Приватность</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage src={previewAvatar || avatar} alt={username} />
                <AvatarFallback className="text-2xl">{username.substring(0, 2)}</AvatarFallback>
              </Avatar>
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Label htmlFor="avatar-upload" className="cursor-pointer p-2 rounded-full bg-primary hover:bg-primary/90">
                  <Camera className="h-5 w-5" />
                  <Input 
                    id="avatar-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleAvatarChange}
                  />
                </Label>
              </div>
            </div>

            {previewAvatar && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setPreviewAvatar(null)}>
                  <X className="h-4 w-4 mr-1" /> Отменить
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Имя пользователя</Label>
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="status">Статус</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">В сети</SelectItem>
                  <SelectItem value="idle">Не активен</SelectItem>
                  <SelectItem value="dnd">Не беспокоить</SelectItem>
                  <SelectItem value="offline">Невидимый</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="custom-status">Пользовательский статус</Label>
              <Input 
                id="custom-status" 
                value={customStatus} 
                onChange={(e) => setCustomStatus(e.target.value)}
                placeholder="Чем вы занимаетесь?"
                className="mt-1"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <p className="text-muted-foreground text-center py-8">
            Настройки внешнего вида будут доступны в следующем обновлении.
          </p>
        </TabsContent>

        <TabsContent value="privacy">
          <p className="text-muted-foreground text-center py-8">
            Настройки приватности будут доступны в следующем обновлении.
          </p>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-6">
        <Button variant="outline" onClick={handleCancel}>Отмена</Button>
        <Button onClick={handleSave}>Сохранить</Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
