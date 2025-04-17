
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AudioSettings from '@/components/AudioSettings';
import ProfileSettings from '@/components/ProfileSettings';
import { User } from '@/types/chat';

interface SettingsModalsProps {
  showAudioSettings: boolean;
  showProfileSettings: boolean;
  setShowAudioSettings: (show: boolean) => void;
  setShowProfileSettings: (show: boolean) => void;
  currentUser: User;
  onUpdateUser: (user: User) => void;
}

const SettingsModals = ({
  showAudioSettings,
  showProfileSettings,
  setShowAudioSettings,
  setShowProfileSettings,
  currentUser,
  onUpdateUser
}: SettingsModalsProps) => {
  return (
    <>
      <Dialog open={showAudioSettings} onOpenChange={setShowAudioSettings}>
        <DialogContent className="sm:max-w-[500px] bg-[#0D0D20] border-cyan-900/50">
          <AudioSettings onClose={() => setShowAudioSettings(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showProfileSettings} onOpenChange={setShowProfileSettings}>
        <DialogContent className="sm:max-w-[500px] bg-[#0D0D20] border-cyan-900/50">
          <ProfileSettings 
            user={currentUser} 
            onUpdateUser={onUpdateUser}
            onClose={() => setShowProfileSettings(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingsModals;
