import { useContext, useMemo } from 'react';

import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import deepmerge from 'deepmerge';

import FriendListContext from '../context/FriendListContext';
import useFriends from '../hooks/useFriends';
import FriendListCategory from './FriendListCategory';

type FriendCategorieSteamIds = { [key: string]: Array<number> };

const useStyles = makeStyles(
  (theme) => ({
    root: {
      height: '80vh',
      position: 'relative',
      overflowY: 'auto',
      overflowX: 'hidden',
      width: 'auto',
      maxWidth: '100%',
      transition: 'max-width 0.2s',
    },
    /* Style for when the prop size = big */
    big: {
      '&$collapsed': {
        maxWidth: theme.spacing(21),
      },
    },
    /* Style for when the prop size = small */
    small: {
      '&$collapsed': {
        maxWidth: theme.spacing(15),
      },
    },
    /* Style for when the prop size = big */
    text: {
      '&$collapsed': {
        maxWidth: theme.spacing(15),
      },
    },
    /* Psuedo class for when the prop collapsed = true */
    collapsed: {},
  }),
  { name: 'FriendList' },
);
const DefaultFriendsCategory = 'Friends';

export default function FriendList() {
  const { hideOffline = false, showInFriends = false, collapsed, size } = useContext(FriendListContext);
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
    <div className={clsx(classes.root, classes[size], { [classes.collapsed]: collapsed })}>
      {Object.entries(categoriesWithSteamIds).map(([category, steamIds], index) => (
        <FriendListCategory key={category} steamIds={steamIds} category={category} index={index} />
      ))}
    </div>
  );
}
