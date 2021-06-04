export type FriendListProfileSizes = 'big' | 'small' | 'text';
export type FriendListProfileStatus = 'offline' | 'online' | 'snooze' | 'playing';

export type FriendListProfileProps = {
  steamId: number;
  badge?: string | number;
  categories?: Array<string>;
  name?: string;
  nickname?: string;
  picture?: string;
  playing?: string;
  size?: FriendListProfileSizes;
  status?: FriendListProfileStatus;
  collapsed?: boolean;
  isLoading?: boolean;
};
