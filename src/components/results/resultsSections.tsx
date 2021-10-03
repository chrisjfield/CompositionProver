import { useState } from 'react';
import {
  Stack, Typography, Grid, FormControlLabel, Switch, Divider,
} from '@mui/material';
import ResultProps from '../../types/results/resultProps';
import { LeadResult } from '../../types/results';

const resultsSections = ({
  result: {
    partEnds, courseEnds, initialChange, leads,
  },
}: ResultProps) => {
  const [showSections, setShowSections] = useState(false);

  const getChanges = (rowArray: string[]) => rowArray.map((row: string, index: number) => (
    <Typography align="center" key={`change-${index.toString()}`}>
      {row}
    </Typography>
  ));

  const sectionHeader = (label: string) => [
    <Typography key="sectionheader_label" variant="subtitle2" align="center">
      <u>{label}</u>
    </Typography>,
    <Typography key="sectionheader_initialChange" align="center">
      <b>{initialChange}</b>
    </Typography>,
    <Divider key="sectionheader_divider" variant="middle" />,
  ];

  const getSection = (label: string, rowArray: string[]) => (
    <Stack direction="column">
      {sectionHeader(label)}
      {getChanges(rowArray)}
    </Stack>
  );

  const getLeadEnds = () => {
    let previousMethod: string = '';

    return leads.map((lead: LeadResult, index: number) => {
      const methodChanged: boolean = previousMethod !== lead.method;
      previousMethod = lead.method;

      return (
        <Grid container key={`leadEndGrid-${index.toString()}`}>
          <Grid item xs={4}>
            <Typography align="right">
              <b>{methodChanged && (`${lead.method}  `)}</b>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            {getChanges([lead.leadEnd])}
          </Grid>
          <Grid item xs={4}>
            <Typography align="left">
              <b>{lead.call !== 'p' && `  ${lead.call}`}</b>
            </Typography>
          </Grid>
        </Grid>
      );
    });
  };

  const getLeadEndSection = () => (
    <Stack direction="column">
      {sectionHeader('Lead Ends')}
      {getLeadEnds()}
    </Stack>
  );

  return (
    <Grid>
      <Typography variant="subtitle1">
        <u>Section Ends</u>
      </Typography>
      <Typography>
        Please allow a bit of time when clicking &quot;Show Section Ends&quot;
        for the section ends to render.
      </Typography>
      <FormControlLabel
        control={(
          <Switch
            checked={showSections}
            onChange={() => setShowSections(!showSections)}
          />
        )}
        label="Show Section Ends"
      />
      {showSections
        && (
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 0, md: 3 }}
            alignItems="flex-start"
          >
            {getSection('Part Ends', partEnds)}
            {getSection('Course Ends', courseEnds)}
            {getLeadEndSection()}
          </Stack>
        )}
    </Grid>
  );
};

export default resultsSections;
