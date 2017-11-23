import { Dispatch } from 'redux';

export interface Action {
    type: string;
    payload: any;
}

export interface IStore {
    callReducer: ICallReducerState;
    methodReducer: IMethodReducerState;
    compositionReducer: ICompositionReducerState;
    resultReducer: IResultReducerState;
}

export interface IResultProps extends IResultReducerState {
    dispatch: Dispatch<{}>;
}

export interface ICallProps extends ICallReducerState {
    dispatch: Dispatch<{}>;
}

export interface IMethodProps extends IMethodReducerState {
    dispatch: Dispatch<{}>;
}

export interface ICompositionProps extends ICompositionReducerState {
    dispatch: Dispatch<{}>;
}

export interface ICallReducerState {
    calls: ICall[];
}

export interface IMethodReducerState {
    methods: IMethod[];
}

export interface ICompositionReducerState {
    stage: number;
    parts: number;
    composition: string;
}

export interface IResultReducerState {
    rows: string[][];
    grid: string[];
    leadEnds: string[];
    courseEnds: string[];
    partEnds: string[];
    numberOfChanges: number;
    changesOfMethod: number;
    truth: boolean;
    initialChangeString: string;
    musicalChanges: IMusicalChanges;
}

export interface IResultsHelper {
    results: IResultReducerState;
    latestChange: string[];
    latestMethod: string;
    latestRow: string;
    initialChange: string[];
}

export interface IMusicalChanges {
    queens: number;
    tittums: number;
    rollupsFront: number;
    rollupsBack: number;
    littleBellsFront: number;
    littleBellsBack: number;
}

export interface ICall {
    callName: string;
    callSymbol: string;
    callNotation?: string;
    coreCall?: boolean;
}

export interface IMethod {
    methodId: number;
    methodSymbol?: string;
    methodName?: string;
    methodPlaceNotation?: string;
    coreMethod?: boolean;
}

export interface IStage {
    methods: IMethod[];
    calls: ICall[];
    numberOfBells: number;
}

export interface IStageEnum {
    stage: string;
    numberOfBells: number;
}

