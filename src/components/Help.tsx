import * as React from 'react';

function Help() {
    return (
        <div>
            <div className="row">
                <h4 className="help-header">
                    About
                </h4>
            </div>
            <div className="row">
                <p className="help-text">
                    This site is to help prove and analyse bell ringing compositions.
                    <br/>
                    It can deal with splicing and multiple bob types. This includes half leads as long as set up correctly.
                    <br/>
                    The site is also offline capable, once initially loaded it can run fully without internet connection.
                    <br/>
                    <br/>
                    To use the site set up your composition, methods and calls in the requisite tabs. 
                    <br/>
                    Then go to the results tab, this will automatically calculate the stats about the composition.
                    <br/>
                    This may take a few seconds so don't worry if it does not load immediately.
                    <br/>
                    Help on each tab can be found below in detail.
                    <br/>
                    <br/>
                    Any comments, bugs or feedback please <a href="https://github.com/chrisjfield/CompositionProver/issues">go here</a> and create an issue.
                </p>
            </div>
            <div className="row">
                <h4 className="help-header">
                    Composition
                </h4>
            </div>
            <div className="row">
                <p className="help-text">
                    The Compositions tab is where you set the composition you wish to analyse.
                    <br/>
                    <br/>
                    Firstly choose the stage for the composition - this will populate the methods and calls tab for that stage.
                    <br/>
                    <br/>
                    Secondly set the number of parts for the composition, this saves typing repetative compositions out in full.
                    <br/>
                    For one parts this still needs to be populated with the number 1 - only numbers are allowed in this field.
                    <br/>
                    <br/>
                    Finally add the composition. This is done by writing out each lead made up of the method followed by the call type.
                    <br/>
                    For plain leads the call type should be "p".
                    <br/>
                    Leads should be seperated by a single dot ".".
                    <br/>
                    For example a simple touch could be a lead of plain bob, a bobed lead of Cambridge repeated twice.
                    <br/>
                    This would be represented as <strong>pbp.cab</strong> and be a 2 part composition. 
                    <br/>
                    In this example pb and ca would be the method abbreviations assigned in the methods tab, and b the bob notation given in the calls tab. 
                    <br/>
                    The p after pb shows it is a plain lead
                </p>
            </div>
            <div className="row">
                <h4 className="help-header">
                    Methods
                </h4>
            </div>
            <div className="row">
                <p className="help-text">
                    The methods tab allows you to set up methods to use in compositions
                    <br/>
                    The name is purely for the user to remember whats what and has no real significance
                    <br/>
                    The Code is the abbriviation given to the method which is used in the compositions. It is recomended to keep this short (2 characters)
                    <br/>
                    Finally the place notation is the notation of the method.
                    <br/>
                    <br/>
                    The notation we accept is a lower case "x" to represent crossing, 1-0,E,T to represent up to 12 places
                    <br/>
                    A single dot (.) to seperate changes (an x will automatically seperate out so x.13 is the same as writting x13)
                    <br/>
                    A comma is the lead is symmetric with the following letters representing the lead end call.
                    <br/>
                    This is a fairly standard approch, and allows notations to be copied from other sites with little or minimal effort. 
                    <br/> 
                    <a href="https://rsw.me.uk/blueline/methods/">https://rsw.me.uk/blueline/methods/</a> is one such example site which follows the same standards.
                    <br/>
                    <br/>
                    Some methods are provided by default but you can add your own. These defaults also provide examples of how methods should be set up.
                    <br/>
                    Methods are only shown for the stage which is selected on the compositions tab. Changing the stage changes the methods displayed.
                    <br/>
                    This allows re use of method codes across stages (i.e. pb for plan bob on all stages).
                </p>
            </div>
            <div className="row">
                <h4 className="help-header">
                    Calls
                </h4>
            </div>
            <div className="row">
                <p className="help-text">
                    Calls allow the user to set up multiple types of call for a composition.
                    <br/>
                    The standard bobs, singles and extremes are in as default but these can be added to or ammended.
                    <br/>
                    When using a call in a composition it is represented by the character in brackets (i.e. b for a standard bob)
                    <br/>
                    For more unusual bobs, like grandsire, where more than 1 change at the end of a lead is affected you may put longer notation into a call.
                    <br/>
                    Examples for grandsire are in by default, a "." seperates the change and replaces the last x changes in a methods place notation with that of the call.
                </p>
            </div>
            <div className="row">
                <h4 className="help-header">
                    Results
                </h4>
            </div>
            <div className="row">
                <p className="help-text">
                    The results pane can be clicked at any point and will evaluate the composition
                    <br/>
                    The top sections will then show basic stats (truth, changes, changes of method).
                    <br/>
                    <br/>
                    There is a short section on music, although this is highly subjective it shows some of the common changes/patterns considered musical.
                    <br/>
                    <br/>
                    The section ends displays part ends, course ends (lead ends with the tenor in it's home position), and lead ends.
                    <br/>
                    The lead ends will show any calls made that lead on the right, and any change of method on the left
                    <br/>
                    The section ends is hidden by default for compositions with over 40 leads, this is to speed up calculation and save page space.
                    <br/>
                    If you wish to see this data for longer compositions just toggle the "show section ends" option. For long compositions this may take a few seconds to complete.
                    <br/>
                    <br/>
                    Finally there is a grid section which will show a grid of every change. 
                    <br/>
                    The grid is split by lead ends, and, as with lead ends will show changes of methods and calls alongside the relevant change.
                    <br/>
                    There are options here to hide and show the grid as with sections. Again this is hidden if there are over 500 changes by default.
                    <br/>
                    Generating the grid is quite an intensive process so for longer compositions may take a few seconds, or longer on slow hardware.
                    <br/>
                    If you do need to see it, please just wait, it will load!
                    <br/>
                    There are options to highlight the treble path, and a working bell (2 by default) if desired.
                    <br/>
                    If the composition is false all instances of the first false row found are highlighted. This is purely as a guide as the program stops calculating once one false row is found.
                    <br/>
                    As all instances of the offending row are highlighted, to try and help show where the composition became false.

                </p>
            </div>
            <div className="row">
                <h4 className="help-header">
                    FAQs
                </h4>
            </div>
            <div className="row">
                <p className="help-text">
                    <strong>How do i half lead splice methods?</strong>
                    <br/>
                    To half lead splice you will need to create seperate method entries for each half of the method. 
                    <br/>
                    Then write out the composition using these half leads as the building blocks.
                    <br/>
                    The same applies for half lead calls.
                    <br/>
                    <br/>
                </p>
            </div>
        </div>
    );
}

export default Help;
