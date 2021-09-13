import { createContext } from 'react';
import { CompositionState } from '../types/context';

const CompositionContext = createContext<CompositionState>({} as CompositionState);
export const CompositionProvider = CompositionContext.Provider;
export default CompositionContext;
