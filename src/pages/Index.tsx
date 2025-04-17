
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ChatLayout from '@/components/ChatLayout';
import FurryLanding from '@/components/FurryLanding';

const Index = () => {
  const [showDiscordApp, setShowDiscordApp] = useState(false);

  if (!showDiscordApp) {
    return <FurryLanding onEnterApp={() => setShowDiscordApp(true)} />;
  }

  return <ChatLayout />;
};

export default Index;
