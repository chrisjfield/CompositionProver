import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container } from '@material-ui/core';
import useStyles from '../styles/styles';

const Help = () => {
    const styles = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container className={styles.helpContainer}>
            <ExpansionPanel expanded={expanded === 'about'} onChange={handleChange('about')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="help-about-header"
                >
                    <Typography variant="h6">About</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        This site is to help prove, analyse and store bell ringing compositions. <br/>
                        It can deal with splicing (lead end and half lead), multiple call types, and multple composition styles. <br/>
                        The site is also offline capable, once initially loaded it can run fully without internet connection. <br/>
                        <br/>
                        To use the site set up your composition, methods and calls in the requisite tabs.<br/>
                        Some defaults have been provided to aid this.<br/>
                        <br/>
                        Then go to the results tab, this will automatically calculate the stats about the composition.<br/>
                        This may take a few seconds so don't worry if it does not load immediately.<br/>
                        <br/>
                        Help on each tab can be found below in detail.<br/>
                        <br/>
                        Any comments, bugs or feedback please <a href="https://github.com/chrisjfield/CompositionProver/issues">go here</a> and create an issue,
                        or make a pull request if you want to contribute.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'methods'} onChange={handleChange('methods')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="help-methods-header"
                >
                    <Typography variant="h6">Methods</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        The methods tab is where you add the methods you wish to use in your composition.<br/>
                        Use the stage dropdown to change which set of methods you are looking at.<br/>
                        <br/>
                        The simplist way to add a method is to lookup the method using the "Lookup method" button.<br/>
                        Alternatively if it is not availibe add a method manually using the"Add method" button.<br/>
                        <br/>
                        Method abbriviations must be unique accross all stages, this is to allow multi-stage splicing. <br/>
                        The easiest way to achieve this is suffixing the stage, i.e. plain bob minor could be called "pb6". <br/>
                        <br/>
                        Place notation almost follows the standard set <a href="https://cccbr.github.io/method_ringing_framework/placenotation.html">here</a>.<br/>
                        The exception is only "-" is accepted as a notation for all pairs cross and jump notation is not supported.<br/>
                        <br/>
                        You can also set the default bob or single for a method. When composing this call type will be used when you specify the call "b" or "s".<br/>
                        By default this is a 4ths place bob and a 1234 single, but it can be configured against the method.<br/>
                        This allows more natural entry for methods like stedman, so you can still use "b" and "s" and it will mean the right thing in context.<br/>
                        <br/>
                        Be aware that using this override prevents the use of a 4ths place bob and a 1234 single, if these exist in the composition do not override.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'calls'} onChange={handleChange('calls')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="help-calls-header"
                >
                    <Typography variant="h6">Calls</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        The calls tab is where you can view and add the calls you wish to use in your composition.<br/>
                        Use the stage dropdown to change which set of calls you are looking at.<br/>
                        <br/>
                        Calls are pre set for the most common use cases on each stage.<br/>
                        <br/>
                        For calls beyond the standard set you can define your own using the "user defined calls".<br/>
                        There are four availible in each stage, just fill in the place notation you want to use.<br/>
                        <br/>
                        Place notation almost follows the standard set <a href="https://cccbr.github.io/method_ringing_framework/placenotation.html">here</a>.<br/>
                        The exception is only "-" is accepted as a notation for all pairs cross and jump notation is not supported.<br/>
                        <br/>
                        The letters in brackets after the call are the letters that should be used to refrence that call in a composition.<br/>
                        For example "c" will mean a 6ths place bob. There is an extra defult call type of "p" which always refers to a plain lead.<br/>
                        <br/>
                        The calls "b" and "s" will can be overridden at a method level.<br/>
                        This allows you to set a default bob type for a method and enter compositions more naturally (i.e. stedman).
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container>
    );
}

export default Help;
