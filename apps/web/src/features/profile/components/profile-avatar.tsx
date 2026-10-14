import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { getInitials } from '../utils/get-initials';
import type { Profile } from '@repo/contracts/profile';

type ProfileAvatarProps = {
  profile: Profile;
};

export const ProfileAvatar = ({ profile }: ProfileAvatarProps) => {
  return (
    <Avatar className="after:border-border/70 size-28">
      <AvatarImage src={profile.avatarUrl} alt="" className="rounded-full" />
      <AvatarFallback className="text-xl tracking-wide">
        {getInitials(profile.name)}
      </AvatarFallback>
    </Avatar>
  );
};
