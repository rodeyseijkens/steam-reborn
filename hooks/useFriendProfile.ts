import { useQuery, UseQueryOptions } from 'react-query';

import friends from '../mock/friends.json';
import { FriendListProfileProps } from '../types/FriendListProfile';

const getProfileData = async (steamId: number) => {
  const result = friends.find((friend) => friend.steamId === steamId);

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return result as FriendListProfileProps;
};

function useFriendProfile(steamId: number, options?: UseQueryOptions) {
  return useQuery<FriendListProfileProps>(['friend', steamId], () => getProfileData(steamId), {
    enabled: options?.enabled ?? !!steamId,
  });
}

export default useFriendProfile;
