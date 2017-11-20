import { Dispatch } from 'redux';

export interface Action {
    type: string;
    payload: any;
}

export interface IStore {
    appReducer: IAppReducerState;
    callReducer: ICallReducerState;
    methodReducer: IMethodReducerState;
}

export interface IAppReducerState {
    single: string;
    bob: string;
    extreme: string;
    stage: number;
    placeNotation: string;
    composition: string;
    rows: string[];
    initialChange: number[];
    leadEnds: string[];
    truth: boolean;
}

export interface IAppProps extends IAppReducerState {
    dispatch: Dispatch<{}>;
}

export interface IResultProps {
    leadEnds: string[];
    rows: string[];
    truth: boolean;
}

export interface ICallProps extends ICallReducerState {
    dispatch: Dispatch<{}>;
}

export interface IMethodProps extends IMethodReducerState {
    dispatch: Dispatch<{}>;
}

export interface ICompositionProps {
    dispatch: Dispatch<{}>;
    stage: number;
    placeNotation: string;
    composition: string;
}

export interface ICallReducerState {
    calls: ICall[];
}

export interface IMethodReducerState {
    methods: IMethod[];
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
