import { forwardRef, ReactNode, useContext } from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import { capitalize } from 'lodash';

import FriendListContext from '../context/FriendListContext';
import useProfile from '../hooks/useProfile';
import { ProfileProps } from '../types/Profile';

type PanelProfileProps = {
  action?: ReactNode;
};

type StyleProps = {
  isOffline: boolean;
};

type ClassStatusType = `status${Capitalize<ProfileProps['status']>}`;

const useStyles = makeStyles(
  (theme) => ({
    root: {
      maxWidth: '100%',
      transition: 'max-width 0.2s',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      padding: theme.spacing(2),
      display: 'flex',
      position: 'relative',
      overflow: 'hidden',
    },
    picture: {
      borderRadius: theme.spacing(1),
      opacity: (props: StyleProps) => (props.isOffline ? 0.3 : 1),
      position: 'relative',
      transition: 'max-width 0.2s, width 0.2s, height 0.2s, opacity 0.2s',
      maxWidth: theme.spacing(15),
      width: '100%',
      backgroundImage: 'url("/profile/default.jpg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      flexShrink: 0,
      display: 'flex',
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
      opacity: (props: StyleProps) => (props.isOffline ? 0.3 : 1),
      overflow: 'hidden',
      transition: 'opacity 0.2s',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },
    name: {
      color: theme.palette.common.white,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      transition: 'font-size 0.2s',
      whiteSpace: 'nowrap',
      lineHeight: 1.35,
    },
    status: {
      color: theme.palette.secondary.main,
      margin: 0,
      overflow: 'hidden',
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
    gameInfo: {
      color: theme.palette.success.main,
      marginLeft: theme.spacing(1),
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
    action: {
      color: theme.palette.common.white,
      position: 'absolute',
      top: 0,
      right: 0,
      transition: 'opacity 0.2s',
    },
    collapsed: {
      '& $container': {
        opacity: 0,
      },

      '& $action': {
        opacity: 0,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',

        '&:hover': {
          opacity: 1,
          backgroundColor: `${theme.palette.common.black}${theme.toHex(95)}`,
          backgroundImage: `linear-gradient(to right, ${theme.palette.gradient.primary}${theme.toHex(60)}, ${
            theme.palette.gradient.secondary
          }${theme.toHex(60)})`,
          backgroundRepeat: 'repeat-x',
        },
      },
    },
    statusOnline: {},
    statusOffline: {},
    statusSnooze: {},
    statusPlaying: {},
    big: {},
    small: {},
    text: {},
  }),
  { name: 'PanelProfile' },
);

export default forwardRef<HTMLDivElement, PanelProfileProps>(function PanelProfile(props, ref) {
  const { action } = props;
  const { collapsed, size } = useContext(FriendListContext);
  const { data, isLoading } = useProfile();
  const { name, picture, status, playing } = data || {};
  const classes = useStyles({ isOffline: status === 'offline' });
  const titleName = isLoading ? 'loading' : `Status: ${status}`;
  const statusType = `status${capitalize(status)}` as ClassStatusType;

  return (
    <div
      title={titleName}
      className={clsx(classes.root, classes[statusType], classes[size], { [classes.collapsed]: collapsed })}
      ref={ref}
    >
      {isLoading ? (
        <Skeleton variant="circle" className={clsx(classes.picture, classes.skeleton)} />
      ) : (
        <img className={classes.picture} src={picture} alt={`Profile ${name}`} />
      )}
      <dl className={classes.container}>
        <Typography variant="subtitle1" component="dt" className={classes.name} gutterBottom={false}>
          {isLoading && <Skeleton variant="text" className={classes.skeleton} />}
          {name}
        </Typography>
        <Typography variant="subtitle2" component="dd" className={classes.status}>
          {isLoading && <Skeleton variant="text" className={classes.skeleton} />}
          {status}
          {playing && <a className={classes.gameInfo}>{playing}</a>}
        </Typography>
      </dl>
      {action && <div className={classes.action}>{action}</div>}
    </div>
  );
});
