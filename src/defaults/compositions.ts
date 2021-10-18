import { Composition } from '../types/compositions';

const defaultCompositions: Composition[] = [{
  id: 0,
  name: 'Plain Bob Major (3H)',
  type: 'Full',
  numberOfBells: 8,
  parts: 3,
  halfLead: false,
  fullComposition: 'pb8p.pb8p.pb8p.pb8p.pb8p.pb8p.pb8b',
  numericalComposition: '6',
  positionalComposition: 'W',
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
},
{
  id: 2,
  name: 'Spliced Stages',
  type: 'Full',
  numberOfBells: 8,
  parts: 1,
  halfLead: false,
  fullComposition: 'gr7p.pb8p.gr7p.pb8p',
  numericalComposition: '',
  positionalComposition: '',
  startingMethod: '',
  changes: 60,
},
{
  id: 3,
  name: 'false',
  type: 'Full',
  numberOfBells: 6,
  parts: 4,
  halfLead: false,
  fullComposition: 'pb5p.pb5p.pb5b.pb5p.pb5b',
  numericalComposition: '',
  positionalComposition: '',
  startingMethod: '',
  changes: 200,
}, {
  id: 4,
  name: 'Plain Bob Major (3H)',
  type: 'Full',
  numberOfBells: 8,
  parts: 1,
  halfLead: false,
  fullComposition: '',
  numericalComposition: '',
  positionalComposition: '2H.2sW.H',
  startingMethod: 'pb8',
  changes: 448,
}, {
  id: 5,
  name: 'Grandsire',
  type: 'Full',
  numberOfBells: 8,
  parts: 1,
  halfLead: false,
  fullComposition: 'gr7p.gr7g.gr7b.gr7h.gr7s',
  numericalComposition: 'g2.b1',
  positionalComposition: 'hH.bH',
  startingMethod: 'gr7',
  changes: 448,
}, {
  id: 6,
  name: 'InvalidCall',
  type: 'Full',
  numberOfBells: 8,
  parts: 1,
  halfLead: false,
  fullComposition: 'pb8o',
  numericalComposition: 'o1',
  positionalComposition: 'oH',
  startingMethod: 'pb8',
}, {
  id: 7,
  name: 'InvalidMethod',
  type: 'Full',
  numberOfBells: 8,
  parts: 1,
  halfLead: false,
  fullComposition: 'fakep',
  numericalComposition: 'ba',
  positionalComposition: 'H',
  startingMethod: 'fake',
}];

export default defaultCompositions;
