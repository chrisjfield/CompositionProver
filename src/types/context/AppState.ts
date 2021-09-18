import Call from '../calls';
import Method from '../methods/method';
import Composition from '../compositions/composition';
import Settings from '../settings/index';

export interface AppState {
  calls: Call[];
  methods: Method[];
  compositions: Composition[];
  settings: Settings;
}
