import { FunctionComponent } from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

import Link from '../Link/Link';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      boxSizing: 'border-box',
      display: 'flex',
      padding: theme.spacing(1),
      position: 'relative',
      transition: 'background-color 0.2s',
      width: '100%',
      '&:hover': {
        backgroundColor: `${theme.palette.background.default}33`,
        cursor: 'pointer',
      },
    },
    badge: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 3,
      boxShadow: theme.shadows[3],
      color: theme.palette.common.white,
      left: theme.spacing(6),
      lineHeight: 1,
      padding: theme.spacing(0.5, 0.75),
      position: 'absolute',
      top: theme.spacing(1),
      zIndex: 1,
    },
    picture: {
      borderRadius: '50%',
      height: theme.spacing(7),
      opacity: (props: FriendListProfileStyleProps) => (props.status === 'offline' ? 0.25 : 1),
      position: 'relative',
      transition: 'width 0.2s, height 0.2s, opacity 0.2s',
      width: theme.spacing(7),
    },
    container: {
      margin: theme.spacing(0.5, 0, 0, 1.5),
      opacity: (props: FriendListProfileStyleProps) => (props.status === 'offline' ? 0.25 : 1),
      overflow: 'hidden',
      transition: 'opacity 0.2s',
      width: '100%',
    },
    name: {
      color: theme.palette.common.white,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      transition: 'font-size 0.2s',
      whiteSpace: 'nowrap',
    },
    nickname: {
      color: theme.palette.secondary.main,
      marginLeft: theme.spacing(0.5),
    },
    status: {
      color: theme.palette.secondary.main,
      margin: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      transition: 'font-size 0.2s',
      whiteSpace: 'nowrap',
      '&:before': {
        content: '"-"',
        display: 'inline-block',
        position: 'absolute',
        visibility: 'hidden',
        zIndex: -1,
      },
    },
    gameInfo: {
      color: theme.palette.primary.light,
      marginLeft: theme.spacing(0.5),
    },
    /* Psuedo class for when the prop size = big */
    big: {},
    /* Styling for when the prop size = small */
    small: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      '& $picture': {
        height: theme.spacing(4),
        width: theme.spacing(4),
      },
      '& $container': {
        marginTop: 0,
      },
      '& $name': {
        fontSize: '0.825rem',
        lineHeight: 1.3,
      },
      '& $status': {
        fontSize: '0.625rem',
      },
      '& $badge': {
        fontSize: '0.625rem',
        left: theme.spacing(4),
        padding: theme.spacing(0.5, 0.75),
        top: theme.spacing(0.25),
      },
    },
    /* Styling for when the prop size = text */
    text: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      display: 'flex',
      '& $picture': {
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
        visibility: 'hidden',
        position: 'absolute',
        zIndex: -1,
      },
      '& $container': {
        display: 'flex',
        marginLeft: 0,
        marginRight: 0,
        order: 1,
      },
      '& $name': {
        fontSize: '0.825rem',
        lineHeight: 1.3,
        overflow: 'visible',
      },
      '& $status': {
        fontSize: '0.625rem',
        lineHeight: 1.3,

        '&:before': {
          position: 'relative',
          visibility: 'visible',
          zIndex: 0,
          margin: theme.spacing(0, 0.5),
        },
      },
      '& $badge': {
        fontSize: '0.625rem',
        left: 'unset',
        padding: theme.spacing(0.5, 0.75),
        top: 'unset',
        position: 'relative',
        order: 2,
        lineHeight: 1.3,
      },
    },
  }),
  { name: 'FriendListProfile' },
);

export type FriendListProfileProps = {
  badge?: string | number;
  picture?: string;
  name?: string;
  nickname?: string;
  status?: 'offline' | 'online' | 'snooze' | 'playing';
  playing?: string;
  steamid: number;
  size?: 'big' | 'small' | 'text';
};

type FriendListProfileStyleProps = Pick<FriendListProfileProps, 'status' | 'size'>;

const FriendListProfile: FunctionComponent<FriendListProfileProps> = (props) => {
  const {
    badge,
    picture = '/profile/default.jpg',
    name = 'John Doe',
    nickname,
    status = 'offline',
    playing,
    steamid,
    size = 'small',
  } = props;
  const classes = useStyles({ size, status });

  return (
    <div className={clsx(classes.root, classes[size])}>
      {badge && (
        <Typography variant="caption" className={classes.badge}>
          {badge}
        </Typography>
      )}
      <img className={classes.picture} src={picture} alt={`Profile ${name}`} />
      <dl className={classes.container}>
        <Typography variant="subtitle1" component="dt" className={classes.name} gutterBottom={false}>
          {name}
          {nickname && <span className={classes.nickname}>({nickname})</span>}
        </Typography>
        <Typography variant="subtitle2" component="dd" className={classes.status}>
          {status}
          {playing && (
            <Link href={`/profile/${steamid}`} className={classes.gameInfo} variant="inherit">
              {playing}
            </Link>
          )}
        </Typography>
      </dl>
    </div>
  );
};

export default FriendListProfile;
