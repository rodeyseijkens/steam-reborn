import { useQuery } from 'react-query';

import { FriendListProfileProps } from '../components/FriendListProfile';
import friends from '../mock/friends.json';

const getFriendsData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return friends as FriendListProfileProps[];
};

function useFriends() {
  return useQuery<FriendListProfileProps[]>(['friends'], getFriendsData);
}

export default useFriends;
