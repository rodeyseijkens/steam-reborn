import { useQuery } from 'react-query';

import friends from '../mock/friends.json';
import { FriendListProfileProps } from '../types/FriendListProfile';

const getFriendsData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return friends as FriendListProfileProps[];
};

function useFriends() {
  return useQuery<FriendListProfileProps[]>(['friends'], getFriendsData);
}

export default useFriends;
