import { useMemo } from 'react';

import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import deepmerge from 'deepmerge';

import useFriends from '../hooks/useFriends';
import FriendListCategory from './FriendListCategory';
import { FriendListProfileProps } from './FriendListProfile';

export type FriendListProps = {
  size?: FriendListProfileProps['size'];
  hideOffline?: boolean;
  showInFriends?: boolean;
};

type FriendCategorieSteamIds = { [key: string]: Array<number> };

const useStyles = makeStyles(
  () => ({
    root: {
      height: '80vh',
      position: 'relative',
      overflowY: 'auto',
      overflowX: 'hidden',
      width: '30vw',
    },
  }),
  { name: 'FriendList' },
);
const DefaultFriendsCategory = 'Friends';

export default function FriendList(props: FriendListProps) {
  const { size, hideOffline = false, showInFriends = false } = props;
  const classes = useStyles();
  const { data, status: dataStatus } = useFriends();
  // Create a object with categories
  const categoriesWithSteamIds = useMemo(() => {
    if (!data || ['loading', 'error'].includes(dataStatus)) return [];
    return data.reduce((types, { steamId, status, categories: categoriesProp = [] }) => {
      // Check if to hide when status is offline
      if (hideOffline && status === 'offline') return types;

      // Check if to show categorized friends also in de default friends category
      const categories =
        categoriesProp.length >= 1
          ? [...categoriesProp, showInFriends && DefaultFriendsCategory]
          : [DefaultFriendsCategory];
      const friendCategories = categories.reduce((taggedCategories, categorie) => {
        if (!categorie) return taggedCategories;
        return {
          ...taggedCategories,
          [categorie]: !taggedCategories[categorie] ? [steamId] : [...taggedCategories[categorie], steamId],
        };
      }, {} as FriendCategorieSteamIds);

      return deepmerge(types, friendCategories);
    }, {} as FriendCategorieSteamIds);
  }, [data, dataStatus, hideOffline, showInFriends]);

  return (
    <div className={clsx(classes.root)}>
      {Object.entries(categoriesWithSteamIds).map(([category, steamIds], index) => (
        <FriendListCategory key={category} steamIds={steamIds} category={category} index={index} size={size} />
      ))}
    </div>
  );
}
