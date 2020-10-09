import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Button, Dialog, DialogActions, Tab, Tabs } from '@material-ui/core';
import TabPanel from './TabPanel/TabPanel';
import '../../App.css';
import { SettingsContext } from '../../Context/SettingsContext';

import WallpaperTab from './SettingsTabs/WallpaperTab';
import YoutubeTab from './SettingsTabs/YoutubeTab';
import DashboardTab from './SettingsTabs/DashboardTab';
import GmailTab from './SettingsTabs/GmailTab';

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

  const [prevSettings, setPrevSettings] = useState({ ...settings });
  const [tempSettings, setTempSettings] = useState({ ...settings });

  const handleClose = () => {
    setSettings({ ...prevSettings });
    onClose();
  };

  const testChanges = () => {
    console.log(tempSettings);
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
    setSettings({ ...tempSettings, isDraggable });
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
          <Tab label="Twitch" {...a11yProps(4)} />
          <Tab label="Reddit" {...a11yProps(5)} />
          <Tab label="Universal Converter" {...a11yProps(6)} />
          <Tab label="Weather Widget" {...a11yProps(7)} />
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
