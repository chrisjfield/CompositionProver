import { Composition } from '../types/compositions';

const defaultCompositions: Composition[] = [{
  id: 0,
  name: 'Plain Bob Major (3H)',
  type: 'Full',
  numberOfBells: 8,
  parts: 3,
  halfLead: false,
  fullComposition: 'pb8p.pb8p.pb8p.pb8p.pb8p.pb8p.pb8b',
  numericalComposition: '7',
  positionalComposition: 'H',
  startingMethod: 'pb8',
  changes: 336,
},
{
  id: 1,
  name: 'Stedman',
  type: 'Full',
  numberOfBells: 8,
  parts: 1,
  halfLead: true,
  fullComposition: 'st7s.st7p.st7p.st7b.st7p.st7p.st7p.st7s.st7p.st7b.st7s',
  numericalComposition: 's1.4.s8.10.s1',
  positionalComposition: '',
  startingMethod: 'st7',
  changes: 63,
}];

export default defaultCompositions;
