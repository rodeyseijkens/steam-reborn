import { forwardRef, Ref } from 'react';

import { useForkRef } from '@material-ui/core';
import { useInView } from 'react-intersection-observer';

import useFriendProfile from '../hooks/useFriendProfile';
import FriendListProfile, { FriendListProfileProps } from './FriendListProfile';

export type FriendListProfileProviderProps = {
  size?: FriendListProfileProps['size'];
  steamId: FriendListProfileProps['steamId'];
};

export default forwardRef<HTMLDivElement, FriendListProfileProviderProps>(function FriendListProfileProvider(
  props,
  refProp,
) {
  const { steamId, size } = props;
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const { data, error, isLoading, isSuccess } = useFriendProfile(steamId, { enabled: !!steamId && inView });
  const innerRef = useForkRef(refProp, ref) as Ref<HTMLDivElement>;

  if (error) console.error(error);

  return (
    <FriendListProfile {...data} size={size} steamId={steamId} isLoading={isLoading || !isSuccess} ref={innerRef} />
  );
});
