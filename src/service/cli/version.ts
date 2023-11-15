import { version } from '../../../package.json';
import { customConsole } from '../../utils';

const appVersion = { name: '--version', run: () => customConsole.info(version) };

export default appVersion;
