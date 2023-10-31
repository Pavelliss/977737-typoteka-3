import { version } from '../../../package.json';

const getVersion = { name: '--version', run: () => console.log(version) };

export default getVersion;
