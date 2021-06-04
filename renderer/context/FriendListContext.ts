import { createContext } from 'react';

import { FriendListProfileSizes } from '../types/FriendListProfile';

export type FriendListContextType = {
  size: FriendListProfileSizes;
  hideOffline: boolean;
  showInFriends: boolean;
  collapsed: boolean;
};

const FriendListContext = createContext<FriendListContextType>({
  size: 'big',
  hideOffline: false,
  showInFriends: false,
  collapsed: false,
});

export default FriendListContext;
