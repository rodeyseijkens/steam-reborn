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
  className?: string;
};

type StyleProps = {
  isOffline: boolean;
};

type ClassStatusType = `status${Capitalize<ProfileProps['status']>}`;

const useStyles = makeStyles(
  (theme) => ({
    root: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      maxWidth: '100%',
      overflow: 'hidden',
      padding: theme.spacing(2),
      position: 'relative',
      transition: 'max-width 0.2s',
      alignItems: 'stretch',
    },
    picture: {
      backgroundImage: 'url("/profile/default.jpg")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      borderColor: 'transparent',
      borderRadius: theme.spacing(1),
      borderStyle: 'solid',
      borderWidth: theme.spacing(0.5),
      flexShrink: 0,
      width: theme.spacing(17),
      height: theme.spacing(17),
      opacity: (props: StyleProps) => (props.isOffline ? 0.3 : 1),
      position: 'relative',
      transition: 'max-width 0.2s, width 0.2s, height 0.2s, opacity 0.2s',

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

      '&$skeleton ': {
        opacity: 0.5,
      },
    },
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      margin: 0,
      opacity: (props: StyleProps) => (props.isOffline ? 0.3 : 1),
      overflow: 'hidden',
      transition: 'opacity 0.2s',

      '$collapsed &': {
        opacity: 0,
      },
    },
    name: {
      color: theme.palette.common.white,
      lineHeight: 1.35,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      transition: 'font-size 0.2s',
      whiteSpace: 'nowrap',
      marginLeft: theme.spacing(3),
      '& > $skeleton ': {
        maxWidth: '80%',
        minWidth: '80px',
      },
    },
    status: {
      color: theme.palette.secondary.main,
      lineHeight: 1.2,
      margin: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      transition: 'font-size 0.2s',
      whiteSpace: 'nowrap',
      marginLeft: theme.spacing(3),
      '&:before': {
        content: '"-"',
        display: 'inline-block',
        position: 'absolute',
        visibility: 'hidden',
        zIndex: -1,
      },
      '& > $skeleton ': {
        maxWidth: '50%',
        minWidth: '50px',
      },
    },
    gameInfo: {
      color: theme.palette.success.main,
      marginLeft: theme.spacing(1),

      '&:hover': {
        textDecoration: 'underline',
      },
    },
    skeleton: {},
    action: {
      color: theme.palette.common.white,
      position: 'absolute',
      top: 0,
      right: 0,
      transition: 'opacity 0.2s',

      '$collapsed &': {
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
    collapsed: {
      '&$small, &$text': {
        '& > $picture': {
          width: theme.spacing(11),
          height: theme.spacing(11),
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
  const { action, className } = props;
  const { collapsed, size } = useContext(FriendListContext);
  const { data, isLoading } = useProfile();
  const { name, picture, status, playing } = data || {};
  const classes = useStyles({ isOffline: status === 'offline' });
  const titleName = isLoading ? 'loading' : `Status: ${status}`;
  const statusType = `status${capitalize(status)}` as ClassStatusType;

  return (
    <div
      title={titleName}
      className={clsx(className, classes.root, classes[size], {
        [classes[statusType]]: status,
        [classes.collapsed]: collapsed,
      })}
      ref={ref}
    >
      {isLoading ? (
        <Skeleton variant="rect" className={clsx(classes.picture, classes.skeleton)} />
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
