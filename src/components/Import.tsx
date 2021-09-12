import React, { Dispatch } from 'react';
import { connect } from 'react-redux';

import useStyles from '../styles/styles';
import { Button, ButtonGroup } from '@material-ui/core';
import { getCurrentCompositionWithDetails } from '../redux/selectors/compositionSelectors';
import { IAppState } from '../redux/reducers/rootReducer';
import { editCalls, editCurrentComposition, editMethods, editSettingsStage } from '../redux/actions/actions';
import { IComposition, ICall, IMethod, IImportActionTypes, IImportState } from '../interfaces/interfaces';
import defaultCalls from '../defaults/calls';
import defaultMethods from '../defaults/methods';
import defaultComposition from '../defaults/composition';
import defaultSettings from '../defaults/settings';
import { ICurrentCompositionState } from '../redux/reducers/currentCompositionReducer';
import { useRef } from 'react';

const Import = (props: IImportState) => {
  const styles = useStyles();
  const fileUpload = useRef<HTMLInputElement>(null);

  console.log(defaultCalls);

  const resetState = () => {
    props.editComposition(defaultComposition);
    props.editMethods(defaultMethods);
    props.editCalls(defaultCalls);
    props.setStage(defaultSettings.methodStage);
  }

  const exportState = () => { 
    const jsonData = JSON.stringify(props.currentCompositionDetails);
    const blob = new Blob([jsonData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'CompositionProverExport.json';
    link.href = url;
    link.click();
  }
  
  const importState = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      if (file.type !== "application/json") { alert("file must be a JSON file."); return; }
      
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") { 
          const jsonContent = JSON.parse(reader.result) as ICurrentCompositionState;
          
          if (!jsonContent.composition) { alert("composition missing from json"); return; }
          if (!jsonContent.methods) { alert("methods missing from json"); return; }
          if (!jsonContent.calls) { alert("calls missing from json."); return; }
          if (!jsonContent.settings.methodStage) { alert("method stage missing from json"); return; }

          props.editComposition(jsonContent.composition);
          props.editMethods(jsonContent.methods);
          props.editCalls(jsonContent.calls);
          props.setStage(jsonContent.settings.methodStage);
        }
      };
      reader.readAsText(file);
    }
  }

  const importStateClick = () => {
    fileUpload && fileUpload.current && fileUpload.current.click();
  }

  return (
    <>
      <input
        hidden
        ref={fileUpload}
        accept=".json"
        id="raised-button-file"
        type="file"
        onChange={importState}
      />
      <ButtonGroup color="primary" className={styles.importContainer}>
        <Button onClick={importStateClick}>Import</Button>
        <Button onClick={exportState}>Export</Button>
        <Button onClick={resetState}>Reset</Button>
      </ButtonGroup>
    </>
  );
}

const mapStateToProps = (state: IAppState) => {
  const currentCompositionDetails = getCurrentCompositionWithDetails(state);

  return { currentCompositionDetails };
};

const mapDispatchToProps = (dispatch: Dispatch<IImportActionTypes>) => {
  return {
      editComposition: (composition: IComposition) => dispatch(editCurrentComposition(composition)),
      editMethods: (methods: IMethod[]) => dispatch(editMethods(methods)),
      editCalls: (calls: ICall[]) => dispatch(editCalls(calls)),
      setStage: (stage: number) => dispatch(editSettingsStage(stage)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Import);
