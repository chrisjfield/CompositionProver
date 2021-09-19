import { Call } from '../calls';
import Method from '../methods/method';
import Composition from '../compositions/composition';
import Settings from '../settings/index';

interface AppState {
  calls: Call[];
  methods: Method[];
  compositions: Composition[];
  settings: Settings;
}

export default AppState;
