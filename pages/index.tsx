import { ChangeEvent, useState } from 'react';

import { Box, Checkbox, FormControl, FormControlLabel, MenuItem, Select } from '@material-ui/core';
import { NextPage } from 'next';

import RightPanel from '../components/RightPanel';
import FriendListContext from '../context/FriendListContext';
import { FriendListProfileSizes } from '../types/FriendListProfile';

const HomePage: NextPage = () => {
  const [size, setSize] = useState<FriendListProfileSizes>('big');
  const [hideOffline, setHideOffline] = useState(false);
  const [showInFriends, setShowInFriends] = useState(false);
  const [collapsed, setCollaped] = useState(false);
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSize(event.target.value as FriendListProfileSizes);
  };
  const toggleOffline = () => {
    setHideOffline((prev) => !prev);
  };
  const toggleShowInFriends = () => {
    setShowInFriends((prev) => !prev);
  };
  const toggleCollapse = () => {
    setCollaped((prev) => !prev);
  };

  return (
    <>
      <Box width="100%" display="flex" justifyContent="space-evenly">
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
        <FormControlLabel
          labelPlacement="start"
          control={<Checkbox checked={collapsed} onChange={toggleCollapse} />}
          label="collapse"
        />
        <FormControl variant="outlined">
          <Select value={size} onChange={handleChange}>
            <MenuItem value="big">Big</MenuItem>
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="text">Text only</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <FriendListContext.Provider
        value={{
          size,
          hideOffline,
          showInFriends,
          collapsed,
        }}
      >
        <RightPanel />
      </FriendListContext.Provider>
    </>
  );
};

export default HomePage;
