import { useState, useContext } from 'react';
import {
  Typography, Grid, FormControlLabel, Switch, Divider, MenuItem,
} from '@mui/material';
import ResultProps from '../../types/results/resultProps';
import TextField from '../wrappers/materialWrappers';
import CompositionContext from '../../context/compositionContext';
import LeadResult from '../../types/results/leadResult';
import { getStageCharacter } from '../../helpers/stageHelper';

const resultsGrid = ({
  result: {
    leads, initialChange, truth,
  },
}: ResultProps) => {
  const { compositions } = useContext(CompositionContext);
  const { numberOfBells } = compositions[0];

  const [showGrid, setShowGrid] = useState(false);
  const [showTreble, setShowTreble] = useState(true);
  const [workingBell, setWorkingBell] = useState('None');

  const sectionHeader = () => [
    <Typography align="center">
      <b>{initialChange}</b>
    </Typography>,
    <Divider variant="middle" />,
  ];

  const getGridBells = (row: string, index: number) => (
    <Typography align="center" key={`change-${index.toString()}`}>
      {
        Array.from(row).map((char: string) => {
          let color = '';
          if (showTreble && char === '1') { color = 'red'; }
          if (char === getStageCharacter(Number(workingBell))) { color = 'blue'; }

          return (
            <span key={`bell-${index.toString()}`} style={{ color }}>
              {char}
            </span>
          );
        })
      }
    </Typography>
  );

  const getGridRow = (row: string, call: string, method: string, index: number) => {
    const backgroundColor: string = row === truth.firstFalseRow ? '#ff000057' : '';

    return (
      <Grid container key={`row-${index.toString()}`}>
        <Grid item xs={3}>
          <Typography align="right">
            <b>{`${method}  `}</b>
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ backgroundColor }}>
          {getGridBells(row, index)}
        </Grid>
        <Grid item xs={3}>
          <Typography align="left">
            <b>{call !== 'p' && `  ${call}`}</b>
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const getGridLead = (lead: LeadResult, methodChanged: boolean, index: number) => (
    <Grid item xs={12} md={6} lg={4} key={`lead-${index.toString()}`}>
      {index === 0 && sectionHeader()}
      {lead.rows.map((row: string) => {
        const method = (index === 0 && methodChanged) ? lead.method : '';
        const call = (index === lead.rows.length - 1) ? lead.call : '';

        return getGridRow(row, call, method, index);
      })}
    </Grid>
  );

  const getGrid = () => {
    let previousMethod: string = '';

    return leads.map((lead: LeadResult, index: number) => {
      const methodChanged: boolean = previousMethod !== lead.method;
      previousMethod = lead.method;

      return getGridLead(lead, methodChanged, index);
    });
  };

  const getDropdownOptions = () => {
    const dropDownArray: string[] = [];
    for (let i = 1; i <= numberOfBells; i += 1) {
      dropDownArray.push(i === 1 ? 'None' : i.toString());
    }

    return dropDownArray.map((item) => (
      <MenuItem key={item.toString()} value={item}>
        {item.toString()}
      </MenuItem>
    ));
  };

  return (
    <Grid>
      <Typography variant="subtitle1">
        <u>Grid</u>
      </Typography>
      <Typography>
        Please allow a bit of time when changing an option below to allow for the grid to render.
      </Typography>
      <FormControlLabel
        control={(
          <Switch
            checked={showGrid}
            onChange={() => setShowGrid(!showGrid)}
          />
        )}
        label="Show Grid"
      />
      <FormControlLabel
        control={(
          <Switch
            checked={showTreble}
            onChange={() => setShowTreble(!showTreble)}
          />
        )}
        label="Highlight Treble Path"
      />
      <TextField
        select
        label="Highlight Working Bell"
        value={workingBell}
        onChange={(e) => setWorkingBell(e.target.value)}
      >
        {getDropdownOptions()}
      </TextField>
      {showGrid && getGrid()}
    </Grid>
  );
};

export default resultsGrid;
