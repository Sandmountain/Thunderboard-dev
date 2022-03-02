import React, { useContext, useRef, useState } from 'react';

import GoogleAuthentication from '../Authentication/GoogleAuthentication';
import WallpaperComponent from '../GridComponents/WallpaperComponent/WallpaperComponent';

import 'react-grid-layout/css/styles.css';

import { Icon, IconButton, Snackbar } from '@material-ui/core';
import { SettingsContext } from '../../Context/SettingsContext.js';
import { updateFirestoreCollection } from '../../Firestore/FirestoreFunctions.js';
import LoadingScreen from '../LoadingScreen/LoadingScreen.js';
import ProgressBolt from '../ProgressBolt/ProgressBolt.js';
import TopBar from '../TopBar/TopBar.js';
import MinimalDashboard from './MinimalDashboard';
import CustomDashboard from './CustomDashboard';

const isProduction = false;

export default function MainDashboard() {
  const { settings, setSettings } = useContext(SettingsContext);
  const { dashboardSettings } = settings;

  const [loggedIn, setIsLoggedIn] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [profileData, setProfileData] = useState(null);

  // Having the layout as a state causes constant updates. This is not pretty, but works
  let newLayout = dashboardSettings?.layout;

  //Settings
  const childRef = useRef();

  const handleCloseDraggable = () => {
    setSettings({
      ...settings,
      dashboardSettings: {
        ...settings.dashboardSettings,
        isDraggable: false,
      },
    });
    updateFirestoreCollection({
      dashboardSettings: {
        ...settings.dashboardSettings,
        isDraggable: false,
      },
    });
  };

  const handleSaveDraggable = () => {
    setSettings({
      ...settings,
      dashboardSettings: {
        ...settings.dashboardSettings,
        isDraggable: false,
        customLayout: newLayout,
      },
    });
    updateFirestoreCollection({
      dashboardSettings: {
        ...settings.dashboardSettings,
        customLayout: JSON.parse(JSON.stringify(newLayout)),
        isDraggable: false,
      },
    });
  };

  return (
    <>
      {/* <LoadingScreen
        loggedIn={loggedIn}
        setSettings={setSettings}
        setIsLoggedIn={setIsLoggedIn}
        setCredentials={setCredentials}
        setProfileData={setProfileData}
      /> */}
      {!loggedIn ? (
        <GoogleAuthentication
          loggedIn={loggedIn}
          setSettings={setSettings}
          setIsLoggedIn={setIsLoggedIn}
          setCredentials={setCredentials}
          setProfileData={setProfileData}
        />
      ) : (
        <>
          <WallpaperComponent
            overlay={settings.dashboardSettings?.minimalMode}
          />
          <TopBar childRef={childRef} profileData={profileData} />
          <div style={{ position: 'relative', zIndex: '2' }}>
            {loggedIn && credentials ? (
              <div style={{ paddingTop: 60 }}>
                {settings.dashboardSettings.minimalMode ? (
                  <MinimalDashboard
                    credentials={credentials}
                    childRef={childRef}
                    isProduction={isProduction}
                  />
                ) : (
                  <CustomDashboard
                    credentials={credentials}
                    isProduction={isProduction}
                    childRef={childRef}
                    newLayout={newLayout}
                  />
                )}
              </div>
            ) : (
              <ProgressBolt />
            )}
          </div>
          <Snackbar
            color="primary"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={dashboardSettings?.isDraggable}
            message={'The dashboard is unlocked, press ✓ to save changes.'}
            action={
              <>
                <IconButton
                  size="small"
                  color="secondary"
                  onClick={handleSaveDraggable}
                >
                  <Icon>check</Icon>
                </IconButton>
                <IconButton
                  size="small"
                  style={{ color: 'white' }}
                  onClick={handleCloseDraggable}
                >
                  <Icon>close</Icon>
                </IconButton>
              </>
            }
          ></Snackbar>
        </>
      )}
    </>
  );
}
