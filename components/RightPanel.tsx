import { MouseEvent, useContext, useState } from 'react';

import { IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import clsx from 'clsx';

import FriendListContext from '../context/FriendListContext';
import useAriaClick from '../hooks/useAriaClick';
import FriendList from './FriendList';
import Icon from './Icon';
import PanelProfile from './PanelProfile';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      height: '100%',
      maxWidth: theme.spacing(100),
      transition: 'max-width 0.2s',
      backgroundColor: `${theme.palette.common.black}${theme.toHex(95)}`,
      backgroundImage: `linear-gradient(to bottom, ${theme.palette.gradient.primary}${theme.toHex(60)}, ${
        theme.palette.gradient.secondary
      }${theme.toHex(60)})`,
      backgroundRepeat: 'repeat-x',
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
  { name: 'RightPanel' },
);

export default function RightPanel() {
  const { collapsed, size } = useContext(FriendListContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const ariaClickProps = useAriaClick(handleClick);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={clsx(classes.root, classes[size], { [classes.collapsed]: collapsed })}>
      <PanelProfile
        action={
          <>
            <IconButton aria-controls="settings" aria-haspopup="true" {...ariaClickProps} color="inherit">
              <Icon icon="ellipsis-v" />
            </IconButton>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </>
        }
      />
      <FriendList />
    </div>
  );
}
