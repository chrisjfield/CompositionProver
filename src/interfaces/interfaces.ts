import { EDIT_CALL, EDIT_METHOD, ADD_METHOD, DELETE_METHOD, EDIT_SETTINGS, EDIT_CURRENT_COMPOSITION, DELETE_COMPOSITION, ADD_COMPOSITION, EDIT_COMPOSITION } from "../redux/actions/actionTypes";
import { ICurrentCompositionState } from "../redux/reducers/currentCompositionReducer";

export interface ICall {
    name: string;
    abbreviation: string;
    stage: number;
    leadEndPlaceNotation?: string;
    halfLeadPlaceNotation?: string;
    editable: boolean;
}

export type ICallProperty = 'leadEndPlaceNotation' | 'halfLeadPlaceNotation'

export interface IStage {
    name: string;
    stage: number;
}

export interface INewMethod {
    name: string;
    abbreviation: string;
    placeNotation: string;
    stage: number;
    defaultBob: string;
    defaultSingle: string;
}


export interface IMethod extends INewMethod {
    id: number;
}

export type IMethodProperty = 'name' | 'abbreviation' | 'placeNotation' | 'defaultBob' | 'defaultSingle'

export type ICompositionTypes = 'Full' | 'Numerical' | 'Positional'

export interface IComposition {
    numberOfBells: number;
    type: ICompositionTypes;
    parts: number;
    halfLead: boolean;
    startingMethod?: string;
    composition?: string;
}

export type ICompositionNumericProperty = 'numberOfBells' | 'parts'

export interface IEditCallAction {
    type: typeof EDIT_CALL;
    payload: ICall;
}

export type ICallActionTypes = IEditCallAction

export interface IEditMethodAction {
    type: typeof EDIT_METHOD;
    payload: IMethod;
}

export interface IAddMethodAction {
    type: typeof ADD_METHOD;
    payload: INewMethod;
}

export interface IDeleteMethodAction {
    type: typeof DELETE_METHOD;
    payload: number;
}

export type IMethodActionTypes = IEditMethodAction | IAddMethodAction | IDeleteMethodAction


export interface ICompositionAction {
    type: typeof EDIT_CURRENT_COMPOSITION;
    payload: IComposition;
}

export type ICompositionActionTypes = ICompositionAction

export interface ISettings {
    methodStage: number;
}

export interface IEditSettingsAction {
    type: typeof EDIT_SETTINGS;
    payload: ISettings;
}

export type ISettingsActionTypes = IEditSettingsAction

export interface ISavedComposition {
    name: string;
    compositionState: ICurrentCompositionState;
}

interface IDeleteSavedCompositionAction {
    type: typeof DELETE_COMPOSITION;
    payload: string;
}

interface IAddSavedCompositionAction {
    type: typeof ADD_COMPOSITION;
    payload: ISavedComposition;
}

interface IEditSavedCompositionAction {
    type: typeof EDIT_COMPOSITION;
    payload: ISavedComposition[];
}

export type ISavedCompositionActionTypes = IDeleteSavedCompositionAction | IAddSavedCompositionAction | IEditSavedCompositionAction

export interface IStageSelectorState {
    stage: number;
    setStage(stage: number): void;
}

export interface ICallState {
    calls: ICall[];
    editCall(call: ICall): void;
}

export interface IMethodState {
    allMethods: IMethod[];
    methods: IMethod[];
    calls: ICall[];
    stage: number;
    addMethod(method: INewMethod): void;
    newMethod(stage: number): void;
    editMethod(method: IMethod): void;
    deleteMethod(id: number): void;
}

export interface IMethodDialogState {
    open: boolean;
    stage: number;
    onClose: () => void;
    addMethod(method: INewMethod): void;
}

export interface ICompositionSettingsState {
    composition: IComposition;
    methods: IMethod[];
    calls: ICall[];
    editComposition(composition: IComposition): void;
}

export interface IResultsState {
    composition: IComposition;
    methods: IMethod[];
    calls: ICall[];
}

export interface IResult {
    leads: ILeadResults[];
    grid: string[];
    courseEnds: string[];
    partEnds: string[];
    numberOfChanges: number;
    changesOfMethod: number;
    truth: ITruth;
    musicalChanges: IMusicalChanges;
}

export interface IResultHelper {
    result: IResult;
    highestMethodStage: number;
    initialChange: string;
    currentChange: string;
    expandedComposition: string;
    halfLeadsOn: boolean;
    halfLeadNext: boolean;
    baseMethod: string;
    currentMethod: string;
    courseLeadCounter: number;
}

export interface ILeadResults {
    rows: string[];
    leadEnd: string;
    method: string;
    call: string;
}

export interface IMusicalChanges {
    queens: number;
    tittums: number;
    rollupsFront: number;
    rollupsBack: number;
    littleBellsFront: number;
    littleBellsBack: number;
}

export interface ITruth {
    true: boolean;
    firstFalseRow: string;
}