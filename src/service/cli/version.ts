import { version } from '../../../package.json';

const appVersion = { name: '--version', run: () => console.log(version) };

export default appVersion;
