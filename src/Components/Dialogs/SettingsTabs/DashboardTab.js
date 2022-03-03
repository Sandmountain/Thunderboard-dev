import {
  Button,
  ButtonGroup,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  Slider,
  Switch,
  Typography,
  FormControlLabel,
} from '@material-ui/core';
import { Warning } from '@material-ui/icons';
import React, { useState } from 'react';
import { updateFirestoreCollection } from '../../../Firestore/FirestoreFunctions';

const marks = (min, max) => {
  return [
    {
      value: min,
      label: min,
    },
    {
      value: max,
      label: max,
    },
  ];
};

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.palette.error.main,
    background: '#ffeded',
    width: '80%',
    padding: '5px',
    margin: '10px auto',
    borderLeft: '3px solid' + theme.palette.error.main,
  },
  errorButton: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
}));

export default function DashboardTab(props) {
  const { settings, setSettings, toggleMovement, scrollToReset } = props;
  const {
    isDraggable,
    nrOfCols,
    rowHeight,
    gridSpacing,
    compactType,
    minimalMode,
  } = settings.dashboardSettings;

  const classes = useStyles();

  const [cols, setCols] = useState(nrOfCols);
  const [height, setHeight] = useState(rowHeight);
  const [spacingX, setSpacingX] = useState(gridSpacing[0]);
  const [spacingY, setSpacingY] = useState(gridSpacing[1]);
  const [compType, setCompType] = useState(compactType);
  const [miniMode, setMiniMode] = useState(minimalMode);

  const handleChanges = (event, newValue, method) => {
    if (newValue !== null) {
      method(newValue);
    } else {
      method(event.target.value);
    }
  };

  const handleToggle = () => {
    setSettings({
      ...settings,
      dashboardSettings: {
        ...settings.dashboardSettings,
        isDraggable: !settings.isDraggable,
      },
    });

    updateFirestoreCollection({
      dashboardSettings: {
        ...settings.dashboardSettings,
        isDraggable: !settings.isDraggable,
      },
    });
    toggleMovement(!settings.dashboardSettings.isDraggable);
  };

  const setStatesToTest = () => {
    setSettings({
      ...settings,
      dashboardSettings: {
        ...settings.dashboardSettings,
        nrOfCols: cols,
        rowHeight: height,
        gridSpacing: [spacingX, spacingY],
        compactType: compType,
        minimalMode: miniMode,
      },
    });

    updateFirestoreCollection({
      dashboardSettings: {
        ...settings.dashboardSettings,
        nrOfCols: cols,
        rowHeight: height,
        gridSpacing: [spacingX, spacingY],
        compactType: compType,
        minimalMode: miniMode,
      },
    });
  };

  const onMinimalSwitch = (val) => {
    console.log(val, miniMode);
    setMiniMode(val);
  };

  return (
    <>
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          Dashboard settings
          <ButtonGroup aria-label="outlined primary button group">
            <Button variant="outlined" onClick={() => setStatesToTest()}>
              {' '}
              Test Changes
            </Button>
            <Button
              variant="outlined"
              className={classes.errorButton}
              onClick={() => scrollToReset()}
            >
              {' '}
              Reset
            </Button>
          </ButtonGroup>
        </div>
      </DialogTitle>
      <Typography
        className={classes.error}
        align="center"
        style={{ marginBottom: 10 }}
      >
        <Warning style={{ verticalAlign: 'text-bottom' }} /> Setting wont change
        if you don't press
        <Typography variant="button"> Test Changes! </Typography>
      </Typography>
      <DialogContent>
        <DialogContentText>
          By default, the minimalistic layout is used. If you switch this
          toggle, you will be able to set the layout yourself.
        </DialogContentText>
        <FormControlLabel
          control={
            <Switch
              checked={miniMode}
              onChange={(_e, v) => onMinimalSwitch(v)}
              name="checkedB"
              color="primary"
            />
          }
          label="Minimalistic Mode"
        />
      </DialogContent>

      {!miniMode && (
        <>
          <DialogContent>
            <DialogContentText>
              Unlock the dashboard by pressing the button below
            </DialogContentText>
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={() => handleToggle()}
            >
              {isDraggable ? 'Save Layout' : 'Unlock Movement'}
            </Button>
          </DialogContent>
          <DialogContent>
            <DialogContentText>Changable parameters</DialogContentText>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ width: '40%' }}>
                <Typography gutterBottom>Column Units (width)</Typography>
                <Slider
                  value={cols}
                  onChange={(e, val) => handleChanges(e, val, setCols)}
                  valueLabelDisplay="auto"
                  marks={marks(1, 50)}
                  step={1}
                  min={1}
                  max={50}
                />
              </div>
              <div style={{ width: '40%' }}>
                <Typography gutterBottom>Row Units (height)</Typography>
                <Slider
                  value={height}
                  onChange={(e, val) => handleChanges(e, val, setHeight)}
                  valueLabelDisplay="auto"
                  marks={marks(1, 50)}
                  step={1}
                  min={1}
                  max={50}
                />
              </div>
            </div>
          </DialogContent>
          <DialogContent>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ width: '40%' }}>
                <Typography gutterBottom>Grid spacing x-axis </Typography>
                <Slider
                  value={spacingX}
                  onChange={(e, val) => handleChanges(e, val, setSpacingX)}
                  valueLabelDisplay="auto"
                  marks={marks(1, 30)}
                  step={1}
                  min={1}
                  max={30}
                />
              </div>
              <div style={{ width: '40%' }}>
                <Typography gutterBottom>Grid spacing y-axis</Typography>
                <Slider
                  value={spacingY}
                  onChange={(e, val) => handleChanges(e, val, setSpacingY)}
                  valueLabelDisplay="auto"
                  marks={marks(1, 30)}
                  step={1}
                  min={1}
                  max={30}
                />
              </div>
            </div>
          </DialogContent>
          <DialogContent>
            <div style={{ width: '100%' }}>
              <Typography gutterBottom>Compaction type</Typography>
              <FormControl style={{ minWidth: 202 }}>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  value={compType}
                  onChange={(e) => handleChanges(e, null, setCompType)}
                >
                  <MenuItem value={'default'}> None</MenuItem>
                  <MenuItem value={'vertical'}>Vertical</MenuItem>
                  <MenuItem value={'horizontal'}>Horizontal</MenuItem>
                </Select>
              </FormControl>
            </div>
          </DialogContent>
        </>
      )}
    </>
  );
}
