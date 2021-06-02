import { forwardRef } from 'react';

import { makeStyles, Theme, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import { capitalize } from 'lodash';

import { FriendListProfileProps } from '../types/FriendListProfile';
import { ProfileProps } from '../types/Profile';
import Icon from './Icon';

type StyleProps = Pick<FriendListProfileProps, 'status' | 'size'>;

type ClassStatusType = `status${Capitalize<ProfileProps['status']>}`;

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      boxSizing: 'border-box',
      display: 'flex',
      padding: theme.spacing(2),
      transition: 'background-color 0.2s ease-in-out',
      position: 'relative',
      flex: 1,
      flexShrink: 0,
      backgroundColor: 'transparent',
      '&:hover': {
        transitionDuration: '0s',
        backgroundColor: theme.palette.action.hover,
        cursor: 'pointer',
      },
    },
    badge: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 3,
      boxShadow: theme.shadows[3],
      color: theme.palette.common.white,
      left: theme.spacing(12),
      lineHeight: 1,
      padding: theme.spacing(1, 1.5),
      position: 'absolute',
      top: theme.spacing(1),
      zIndex: 1,
    },
    picture: {
      borderRadius: '50%',
      height: theme.spacing(14),
      opacity: (props: StyleProps) => (props.status === 'offline' ? 0.3 : 1),
      position: 'relative',
      transition: 'width 0.2s, height 0.2s, opacity 0.2s',
      width: theme.spacing(14),
      backgroundImage: 'url("/profile/default.jpg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      flexShrink: 0,
      borderWidth: theme.spacing(0.5),
      borderStyle: 'solid',
      borderColor: 'transparent',

      '$statusOnline &': {
        borderColor: theme.palette.primary.main,
      },

      '$statusOffline &': {
        borderColor: theme.palette.secondary.dark,
      },

      '$statusSnooze &': {
        borderColor: theme.palette.primary.main,
        opacity: 0.5,
      },

      '$statusPlaying &': {
        borderColor: theme.palette.success.main,
      },
    },
    container: {
      margin: theme.spacing(0, 0, 0, 3),
      opacity: (props: StyleProps) => (props.status === 'offline' ? 0.3 : 1),
      transition: 'opacity 0.2s',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },
    name: {
      color: theme.palette.common.white,
      textOverflow: 'ellipsis',
      transition: 'font-size 0.2s',
      whiteSpace: 'nowrap',
      lineHeight: 1.35,
    },
    nickname: {
      color: theme.palette.secondary.main,
      marginLeft: theme.spacing(1),
    },
    status: {
      color: theme.palette.secondary.main,
      margin: 0,
      textOverflow: 'ellipsis',
      transition: 'font-size 0.2s',
      whiteSpace: 'nowrap',
      lineHeight: 1.2,
      '&:before': {
        content: '"-"',
        display: 'inline-block',
        position: 'absolute',
        visibility: 'hidden',
        zIndex: -1,
      },
    },
    snoozeIcon: {
      marginTop: theme.spacing(-1),
      marginLeft: theme.spacing(1),
      color: theme.palette.primary.main,
    },
    gameInfo: {
      color: theme.palette.success.main,
      marginLeft: theme.spacing(1),

      '&:hover': {
        textDecoration: 'underline',
      },
    },
    skeleton: {
      '$name &': {
        maxWidth: '80%',
        minWidth: '80px',
      },
      '$status &': {
        maxWidth: '50%',
        minWidth: '50px',
      },
      '&$picture': {
        opacity: 0.5,
      },
    },
    /* Psuedo class for when the prop size = big */
    big: {},
    /* Styling for when the prop size = small */
    small: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      '& $picture': {
        height: theme.spacing(8),
        width: theme.spacing(8),
      },
      '& $container': {},
      '& $name': {
        fontSize: '0.825rem',
        lineHeight: 1.3,
      },
      '& $status': {
        fontSize: '0.625rem',
      },
      '& $badge': {
        fontSize: '0.625rem',
        left: theme.spacing(8),
        padding: theme.spacing(1, 1.5),
        top: theme.spacing(0.5),
      },
    },
    /* Styling for when the prop size = text */
    text: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      display: 'flex',
      '& $picture': {
        height: theme.spacing(5),
        width: theme.spacing(5),
        position: 'absolute',
        zIndex: -1,
      },
      '& $container': {
        marginLeft: 0,
        marginRight: 0,
        order: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      '& $name': {
        fontSize: '0.825rem',
        lineHeight: 1.3,
        overflow: 'visible',
      },
      '& $status': {
        alignItems: 'center',
        display: 'flex',
        fontSize: '0.625rem',
        lineHeight: 1.3,

        '&:before': {
          position: 'relative',
          visibility: 'visible',
          zIndex: 0,
          margin: theme.spacing(0, 1),
        },
      },
      '& $badge': {
        fontSize: '0.625rem',
        left: 'unset',
        padding: theme.spacing(1, 1.5),
        top: 'unset',
        position: 'relative',
        order: 2,
        lineHeight: 1.3,
      },
    },
    /* Styling for when the prop collapsed = true */
    collapsed: {
      '& $picture': {},
      '& $badge': {},
      '& $container': {
        opacity: 0,
      },

      '&$small': {
        '& $badge': {
          left: theme.spacing(7),
        },
      },

      '&$text': {
        '& $picture': {
          visibility: 'unset',
          position: 'relative',
          height: theme.spacing(8),
          width: theme.spacing(8),
          zIndex: 0,
        },
        '& $badge': {
          fontSize: '0.625rem',
          padding: theme.spacing(1, 1.5),
          left: theme.spacing(7),
          top: theme.spacing(0.5),
          position: 'absolute',
          lineHeight: 1,
        },
      },
    },
    statusOnline: {},
    statusOffline: {},
    statusSnooze: {},
    statusPlaying: {},
  }),
  { name: 'FriendListProfile' },
);

export default forwardRef<HTMLDivElement, FriendListProfileProps>(function FriendListProfile(props, ref) {
  const {
    badge,
    name,
    nickname,
    picture = '/profile/default.jpg',
    playing = '',
    size = 'small',
    status,
    steamId,
    collapsed,
    isLoading = true,
    ...restProps
  } = props;
  const classes = useStyles({ size, status });
  const titleName = isLoading ? 'loading' : `${name} - ${status} ${playing}`;
  const statusType = `status${capitalize(status)}` as ClassStatusType;

  return (
    <div
      title={titleName}
      className={clsx(classes.root, classes[size], { [classes[statusType]]: status, [classes.collapsed]: collapsed })}
      ref={ref}
      data-steamid={steamId}
      {...restProps}
    >
      {badge && (
        <Typography variant="caption" className={classes.badge}>
          {badge}
        </Typography>
      )}
      {isLoading ? (
        <Skeleton variant="circle" className={clsx(classes.picture, classes.skeleton)} />
      ) : (
        <img className={classes.picture} src={picture} alt={`Profile ${name}`} />
      )}
      <dl className={classes.container}>
        <Typography variant="subtitle1" component="dt" className={classes.name} gutterBottom={false}>
          {isLoading && <Skeleton variant="text" className={classes.skeleton} />}
          {name}
          {nickname && <span className={classes.nickname}>({nickname})</span>}
        </Typography>
        <Typography variant="subtitle2" component="dd" className={classes.status}>
          {isLoading && <Skeleton variant="text" className={classes.skeleton} />}
          {status}
          {playing && <a className={classes.gameInfo}>{playing}</a>}
          {status === 'snooze' && <Icon icon="snooze" className={classes.snoozeIcon} title="You Snooze, you lose" />}
        </Typography>
      </dl>
    </div>
  );
});
