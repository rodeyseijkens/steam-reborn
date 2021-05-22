export type ProfileStatus = 'offline' | 'online' | 'snooze' | 'playing';

export type ProfileProps = {
  steamId: number;
  name: string;
  picture?: string;
  playing?: string;
  status: ProfileStatus;
};
