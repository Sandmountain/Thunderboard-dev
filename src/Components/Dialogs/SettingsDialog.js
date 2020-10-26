import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Button, Dialog, DialogActions, DialogContentText, Tab, Tabs } from '@material-ui/core';
import TabPanel from './TabPanel/TabPanel';
import '../../App.css';
import { SettingsContext } from '../../Context/SettingsContext';

import WallpaperTab from './SettingsTabs/WallpaperTab';
import YoutubeTab from './SettingsTabs/YoutubeTab';
import DashboardTab from './SettingsTabs/DashboardTab';
import GmailTab from './SettingsTabs/GmailTab';
import RedditTab from './SettingsTabs/RedditTab';
import TwitchTab from './SettingsTabs/TwitchTab';

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

export default function SettingsDialog(props) {
  const { onClose, open } = props;
  const [currentTab, setCurrentTab] = useState(0);
  const { settings, setSettings } = useContext(SettingsContext);

  // If the settings changes, update the temp settings.
  useEffect(() => {
    setTempSettings({ ...settings });
  }, [settings]);

  useEffect(() => {
    if (props.openTab !== '') {
      handleChange(null, props.openTab);
    } else {
      handleChange(null, 0);
    }
  }, [props.openTab]);

  const [prevSettings] = useState({ ...settings });
  const [tempSettings, setTempSettings] = useState({ ...settings });

  const handleClose = () => {
    setSettings({ ...prevSettings });
    onClose();
  };

  const testChanges = () => {
    setSettings({ ...tempSettings });
  };

  const saveChanges = () => {
    setSettings({ ...tempSettings });
    onClose();
  };

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const toggleMovement = (isDraggable) => {
    setSettings({
      ...tempSettings,
      dashboardSettings: {
        ...tempSettings.dashboardSettings,
        isDraggable,
      },
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <AppBar position="static">
        <Tabs value={currentTab} onChange={handleChange} scrollButtons="on" variant="scrollable">
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Wallpaper" {...a11yProps(1)} />
          <Tab label="Google Mail" {...a11yProps(2)} />
          <Tab label="Youtube" {...a11yProps(3)} />
          <Tab label="Reddit" {...a11yProps(4)} />
          <Tab label="Twitch" {...a11yProps(5)} />
          <Tab label="Universal Converter" {...a11yProps(6)} />
          <Tab label="Weather Widget" {...a11yProps(7)} />
          <Tab label="RSS reader" {...a11yProps(8)} />
        </Tabs>
      </AppBar>
      <TabPanel value={currentTab} index={0}>
        <DashboardTab
          settings={tempSettings}
          testChanges={testChanges}
          setSettings={setSettings}
          toggleMovement={toggleMovement}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <WallpaperTab settings={tempSettings} testChanges={testChanges} setSettings={setTempSettings} />
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        <GmailTab settings={tempSettings} testChanges={testChanges} setSettings={setTempSettings} />
      </TabPanel>
      <TabPanel value={currentTab} index={3}>
        <YoutubeTab settings={tempSettings} testChanges={testChanges} setSettings={setTempSettings} />
      </TabPanel>
      <TabPanel value={currentTab} index={4}>
        <RedditTab settings={tempSettings} testChanges={testChanges} setSettings={setTempSettings} />
      </TabPanel>
      <TabPanel value={currentTab} index={5}>
        <TwitchTab settings={tempSettings} testChanges={testChanges} setSettings={setTempSettings} />
      </TabPanel>
      <TabPanel value={currentTab} index={6}>
        <DialogContentText>No settings yet...</DialogContentText>
      </TabPanel>
      <TabPanel value={currentTab} index={7}>
        <DialogContentText>No settings yet...</DialogContentText>
      </TabPanel>
      <TabPanel value={currentTab} index={8}>
        <DialogContentText>No settings yet...</DialogContentText>
      </TabPanel>
      <DialogActions>
        <Button className="noBorderRadius" onClick={handleClose} color="default">
          Cancel
        </Button>
        <Button className="noBorderRadius" onClick={saveChanges} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
