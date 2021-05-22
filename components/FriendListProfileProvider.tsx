import { forwardRef, Ref, useContext } from 'react';

import { useForkRef } from '@material-ui/core';
import { useInView } from 'react-intersection-observer';

import FriendListContext, { FriendListContextType } from '../context/FriendListContext';
import useFriendProfile from '../hooks/useFriendProfile';
import { FriendListProfileProps } from '../types/FriendListProfile';
import FriendListProfile from './FriendListProfile';

export type FriendListProfileProviderProps = {
  steamId: FriendListProfileProps['steamId'];
};

export default forwardRef<HTMLDivElement, FriendListProfileProviderProps>(function FriendListProfileProvider(
  props,
  refProp,
) {
  const { steamId } = props;
  const { size, collapsed = false } = useContext<FriendListContextType>(FriendListContext);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const { data, error, isLoading, isSuccess } = useFriendProfile(steamId, { enabled: !!steamId && inView });
  const innerRef = useForkRef(refProp, ref) as Ref<HTMLDivElement>;

  if (error) console.error(error);

  return (
    <FriendListProfile
      {...data}
      size={size}
      steamId={steamId}
      isLoading={isLoading || !isSuccess}
      collapsed={collapsed}
      ref={innerRef}
    />
  );
});
