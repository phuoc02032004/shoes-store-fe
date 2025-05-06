import React from 'react';
import { Button } from '@/components/ui/button'; 

interface ProfileActionsProps {
  onLogout: () => void;
  onChangePassword: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ onLogout, onChangePassword }) => {
  return (
    <div className="flex flex-col space-y-4 text-black">
      <Button onClick={onChangePassword} variant="outline" className="w-full">
        Change Password
      </Button>
      <Button variant="outline" onClick={onLogout} className="w-full">
        Logout
      </Button>
    </div>
  );
};

export default ProfileActions;