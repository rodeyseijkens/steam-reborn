import { ChangeEvent, useState } from 'react';

import { Box, Checkbox, FormControl, FormControlLabel, MenuItem, Select } from '@material-ui/core';
import { NextPage } from 'next';

import FriendList, { FriendListProps } from '../components/FriendList';
import { FriendListProfileProps } from '../components/FriendListProfile';

const HomePage: NextPage = () => {
  const [size, setSize] = useState<FriendListProfileProps['size']>('big');
  const [hideOffline, setHideOffline] = useState<FriendListProps['hideOffline']>(false);
  const [showInFriends, setShowInFriends] = useState<FriendListProps['showInFriends']>(false);
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSize(event.target.value as FriendListProfileProps['size']);
  };
  const toggleOffline = () => {
    setHideOffline((prev) => !prev);
  };
  const toggleShowInFriends = () => {
    setShowInFriends((prev) => !prev);
  };

  return (
    <>
      <Box width={550} display="flex" justifyContent="space-evenly">
        <FormControlLabel
          labelPlacement="start"
          control={<Checkbox checked={hideOffline} onChange={toggleOffline} />}
          label="hide offline"
        />
        <FormControlLabel
          labelPlacement="start"
          control={<Checkbox checked={showInFriends} onChange={toggleShowInFriends} />}
          label="show all in friends"
        />
        <FormControl variant="outlined">
          <Select value={size} onChange={handleChange}>
            <MenuItem value="big">Big</MenuItem>
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="text">Text only</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <FriendList size={size} hideOffline={hideOffline} showInFriends={showInFriends} />
    </>
  );
};

export default HomePage;
