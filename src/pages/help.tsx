import { useState } from 'react';
import {
  Container, Typography, Accordion, AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HelpPage = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container>
      <Accordion expanded={expanded === 'about'} onChange={handleChange('about')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="help-about-header"
        >
          <Typography component="span" variant="h6">About</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="span">
            This site is to help prove, analyse and store bell ringing compositions.
            {' '}
            <br />
            It can deal with splicing (lead end and half lead),
            multiple call types, and multple composition styles.
            {' '}
            <br />
            The site is also offline capable,
            once initially loaded it can run fully without internet connection.
            {' '}
            <br />
            <br />
            To use the site set up your composition, methods and calls in the requisite tabs.
            <br />
            Some defaults have been provided to aid this.
            <br />
            <br />
            Then go to the results tab,
            this will automatically calculate the stats about the composition.
            <br />
            This may take a few seconds so don&apos;t worry if it does not load immediately.
            <br />
            <br />
            Help on each tab can be found below in detail.
            <br />
            <br />
            Any comments, bugs or feedback please
            {' '}
            <a href="https://github.com/chrisjfield/CompositionProver/issues">go here</a>
            {' '}
            and create an issue,
            or make a pull request if you want to contribute.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'compositions'} onChange={handleChange('compositions')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="help-compositions-header"
        >
          <Typography component="span" variant="h6">Compositions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="span">
            The compositions tab is where you add the composition you wish to run.
            <br />
            Firstly you will need to set the following:
            <br />
            <ul>
              <li>
                <b>Choose the number of bells to ring on.</b>
                {' '}
                This can be higher than the method stage, if, for example, you wanted a cover bell.
              </li>
              <li>
                <b>Choose the composition type.</b>
                {' '}
                This can be one of the following 3 options:
              </li>
              <ul>
                <li>
                  <i>Full</i>
                  {' '}
                  - This is used to specify every lead and can be used for complex compositions.
                </li>
                <li>
                  <i>Numerical</i>
                  {' '}
                  - This can be used for single method compositions to specify
                  which leads have calls, common for Grandsire and Stedman.
                </li>
                <li>
                  <i>Positional</i>
                  {' '}
                  - This can be used for single method compositions to
                  specify the calling position of calls.
                </li>
              </ul>
              <li>
                <b>Choose the method.</b>
                {' '}
                For Numerical and Positional compositions select the method you will be using.
              </li>
              <li>
                <b>Decide on half lead calls.</b>
                {' '}
                For numeric and full compositions you can switch half leads on,
                each notation will then constitute a half lead rather than full.
                This is common for Stedman.
              </li>
              <li>
                <b>Set the number of parts.</b>
                {' '}
                You can save time for repetative compositions by setting the number of parts.
                i.e. W.H.W with Parts = 3 is equivolent to W.H.W.W.H.W.W.H.W
              </li>
              <li>
                <b>Enter the composition!</b>
                {' '}
                You can now enter your composition and look at the results.
              </li>
            </ul>
            <br />
            <Typography component="span" variant="subtitle2"><u>Full Compositions</u></Typography>
            <br />
            Full compositions should be entered lead (or half lead) at a time,
            with each element seperated by a &apos;.&apos;.
            <br />
            The format is the method abbreviation followed by the call abbreviation.
            For plain leads this should be marked &apos;p&apos;.
            <br />
            <br />
            For example
            {' '}
            <i>pb8p.pb8b</i>
            {' '}
            would be a plain lead of bob major followed by a bobbed lead.
            <br />
            <br />
            <Typography component="span" variant="subtitle2"><u>Numerical Compositions</u></Typography>
            <br />
            Numerical compositions should be entered call by call with each element
            seperated by a &apos;.&apos;.
            <br />
            The format is the call abbreviation followed by the lead (or half lead)
            number that this occurs on. Giving no call abbreviation will default
            to a bob as defined by the selected method.
            <br />
            <br />
            For example, if you set the method to Grandsire Triples and wrote
            {' '}
            <i>1.3.s4</i>
            {' '}
            this would give a bob at leads 1 & 3 and a single at lead 4.
            <br />
            <br />
            <Typography component="span" variant="subtitle2"><u>Positional Compositions</u></Typography>
            <br />
            Positional compositions should be entered call by call with
            each element seperated by a &apos;.&apos;.
            <br />
            The format is the call abbreviation followed by the calling position abbreviation.
            Giving no call abbreviation will default to a bob as defined by the selected method.
            You may add a leading number if this position is repeated.
            <br />
            <br />
            For example, if you set the method to Bob Minor and write
            {' '}
            <i>2H.sW</i>
            {' '}
            this would give a bob when the tenor will become it&apos;s home position twice
            and a single when it will be in the wrong position.
            <br />
            <br />
            The calling positions on max are: I,O,4,5,6,7,8,9,M,W,H.
            <br />
            The calling positions on Triples are: I,O,4,M,W,H.
            <br />
            The calling positions on Minimus are: I,O,4.
            <br />
            The inbetween stages simply drop out the highest
            number in order, then M, W & H in that order.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'methods'} onChange={handleChange('methods')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="help-methods-header"
        >
          <Typography component="span" variant="h6">Methods</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="span">
            The methods tab is where you add the methods you wish to use in your composition.
            <br />
            Use the stage dropdown to change which set of methods you are looking at.
            <br />
            <br />
            The simplist way to add a method is to lookup the method
            using the &apos;Lookup method&apos; button.
            <br />
            Alternatively if it is not availibe add a method manually
            using the &apos;Add method&apos; button.
            <br />
            <br />
            Method abbriviations must be unique accross all stages,
            this is to allow multi-stage splicing.
            {' '}
            <br />
            The easiest way to achieve this is suffixing the stage,
            i.e. plain bob minor could be called &apos;pb6&apos;.
            {' '}
            <br />
            <br />
            Place notation almost follows the standard set
            {' '}
            <a href="https://cccbr.github.io/method_ringing_framework/placenotation.html">here</a>
            .
            <br />
            The exception is only &apos;-&apos; is accepted as a notation for all
            pairs cross and jump notation is not supported.
            <br />
            <br />
            You can also set the default bob or single for a method.
            When composing this call type will be used when you specify
            the call &apos;b&apos; or &apos;s&apos;.
            <br />
            By default this is a 4ths place bob and a 1234 single,
            but it can be configured against the method.
            <br />
            This allows more natural entry for methods like stedman,
            so you can still use &apos;b&apos; and &apos;s&apos;
            and it will mean the right thing in context.
            <br />
            <br />
            Be aware that using this override prevents
            the use of a 4ths place bob and a 1234 single,
            if these exist in the composition do not override.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'calls'} onChange={handleChange('calls')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="help-calls-header"
        >
          <Typography component="span" variant="h6">Calls</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="span">
            The calls tab is where you can view and add the
            calls you wish to use in your composition.
            <br />
            Use the stage dropdown to change which set of calls you are looking at.
            <br />
            <br />
            Calls are pre set for the most common use cases on each stage.
            <br />
            <br />
            For calls beyond the standard set you can define
            your own using the &apos;user defined calls&apos;.
            <br />
            There are four availible in each stage, just fill in the place notation you want to use.
            <br />
            <br />
            Place notation almost follows the standard set
            {' '}
            <a href="https://cccbr.github.io/method_ringing_framework/placenotation.html">here</a>
            .
            <br />
            The exception is only &apos;-&apos; is accepted as a
            notation for all pairs cross and jump notation is not supported.
            <br />
            <br />
            The letters in brackets after the call are the letters that
            should be used to refrence that call in a composition.
            <br />
            For example &apos;c&apos; will mean a 6ths place bob.
            There is an extra defult call type of &apos;p&apos; which always refers to a plain lead.
            <br />
            <br />
            The calls &apos;b&apos; and &apos;s&apos; will can be overridden at a method level.
            <br />
            This allows you to set a default bob type for a
            method and enter compositions more naturally (i.e. stedman).
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'results'} onChange={handleChange('results')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="help-calls-results"
        >
          <Typography component="span" variant="h6">Results</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="span">
            The results tab is where you can view the details of your composition.
            <br />
            <br />
            The statistic section will show you if it is true
            (with a note if it does not come round),
            along with the number of changes and number of changes of method.
            <br />
            <br />
            The Music section gives an idea of the musical qualities of a composition,
            this is often opinion based so it just shows a few common measures.
            <br />
            <br />
            The section sends section will show couse ends, part ends and lead ends.
            <br />
            Lead ends will show the methods and calls along side them.
            <br />
            This section may time a few seconds to render for large compositions.
            <br />
            <br />
            The Grid section will show the full grid.
            <br />
            Here you can highlight the treble and any other bell if you wish.
            <br />
            It will also highlight the first false row (and it&apos;s repeats)
            in false compositions.
            <br />
            This section can take multiple seconds to render,
            usually around 5-10s for a peal length composition on a decent PC.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default HelpPage;
