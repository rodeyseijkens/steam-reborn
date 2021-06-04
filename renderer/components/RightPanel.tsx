import { MouseEvent, useEffect, useState } from 'react';

import { Checkbox, Divider, IconButton, makeStyles, Menu, MenuItem, Radio } from '@material-ui/core';

import FriendListContext from '../context/FriendListContext';
import useAriaClick from '../hooks/useAriaClick';
import useWindowSize from '../hooks/useWindowSize';
import { FriendListProfileSizes } from '../types/FriendListProfile';
import FriendList from './FriendList';
import Icon from './Icon';
import PanelProfile from './PanelProfile';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      height: '100vh',
      width: '100%',
      transition: 'max-width 0.2s',
      backgroundColor: `${theme.palette.common.black}${theme.toHex(95)}`,
      backgroundImage: `linear-gradient(to bottom, ${theme.palette.gradient.primary}${theme.toHex(60)}, ${
        theme.palette.gradient.secondary
      }${theme.toHex(60)})`,
      backgroundRepeat: 'repeat-x',
      display: 'flex',
      flexDirection: 'column',
    },
    panelProfile: {},
    friendList: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    radio: {
      padding: theme.spacing(0, 2, 0, 0),
    },
    checkbox: {
      padding: theme.spacing(0, 2, 0, 0),
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
  }),
  { name: 'RightPanel' },
);

export default function RightPanel() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const ariaClickProps = useAriaClick(handleClick);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [size, setSize] = useState<FriendListProfileSizes>('big');
  const [hideOffline, setHideOffline] = useState(false);
  const [showInFriends, setShowInFriends] = useState(false);
  const [collapsed, setCollaped] = useState(false);
  const handleChange = (selectedSize: FriendListProfileSizes) => () => {
    setSize(selectedSize);
    setAnchorEl(null);
  };
  const toggleOffline = () => {
    setHideOffline((prev) => !prev);
    setAnchorEl(null);
  };
  const toggleShowInFriends = () => {
    setShowInFriends((prev) => !prev);
    setAnchorEl(null);
  };
  const { width } = useWindowSize();

  useEffect(() => {
    if (!width) return;

    if (collapsed && width > 100) {
      setCollaped(false);
    }

    if (width <= 100) {
      setCollaped(true);
    }

    if (size === 'big' && width <= 72) {
      setSize('small');
    }
  }, [collapsed, size, width]);

  return (
    <div className={classes.root}>
      <FriendListContext.Provider
        value={{
          size,
          hideOffline,
          showInFriends,
          collapsed,
        }}
      >
        <PanelProfile
          className={classes.panelProfile}
          action={
            <>
              <IconButton aria-controls="settings" aria-haspopup="true" {...ariaClickProps} color="inherit">
                <Icon icon="ellipsis-v" />
              </IconButton>
              <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem dense onClick={toggleOffline}>
                  <Checkbox size="small" className={classes.checkbox} checked={hideOffline} disabled /> Hide offline
                </MenuItem>
                <MenuItem dense onClick={toggleShowInFriends}>
                  <Checkbox size="small" className={classes.checkbox} checked={showInFriends} disabled /> Show all in
                  friends
                </MenuItem>
                <Divider className={classes.divider} />
                <MenuItem dense onClick={handleChange('big')}>
                  <Radio size="small" className={classes.radio} checked={size === 'big'} value="big" disabled />
                  Big
                </MenuItem>
                <MenuItem dense onClick={handleChange('small')}>
                  <Radio size="small" className={classes.radio} checked={size === 'small'} value="small" disabled />
                  Small
                </MenuItem>
                <MenuItem dense onClick={handleChange('text')}>
                  <Radio size="small" className={classes.radio} checked={size === 'text'} value="text" disabled />
                  Text only
                </MenuItem>
              </Menu>
            </>
          }
        />
        <FriendList className={classes.friendList} />
      </FriendListContext.Provider>
    </div>
  );
}
