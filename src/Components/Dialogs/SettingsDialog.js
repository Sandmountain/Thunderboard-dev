import React, { useContext, useState } from 'react';
import { AppBar, Dialog, Tab, Tabs } from '@material-ui/core';
import TabPanel from './TabPanel/TabPanel';
import '../../App.css';
import { SettingsContext } from '../../Context/SettingsContext';
import WallpaperTab from './SettingsTabs/WallpaperTab';

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

export default function SettingsDialog(props) {
  const { onClose, open } = props;

  const [currentTab, setCurrentTab] = useState(0);

  const handleClose = () => {
    onClose();
  };

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <AppBar position="static">
        <Tabs value={currentTab} onChange={handleChange} scrollButtons="on" variant="scrollable">
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Wallpaper" {...a11yProps(1)} />
          <Tab label="Google Mail" {...a11yProps(2)} />
          <Tab label="Youtube" {...a11yProps(3)} />
          <Tab label="Twitch" {...a11yProps(4)} />
          <Tab label="Reddit" {...a11yProps(5)} />
          <Tab label="Universal Converter" {...a11yProps(6)} />
          <Tab label="Weather Widget" {...a11yProps(7)} />
        </Tabs>
      </AppBar>
      <TabPanel value={currentTab} index={0}>
        <WallpaperTab onClose={onClose} handleClose={handleClose} />
      </TabPanel>
    </Dialog>
  );
}
