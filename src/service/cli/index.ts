import help from './help';
import version from './version';
import generate from './generate';
import server from './server';

const Cli = {
  [help.name]: help,
  [version.name]: version,
  [generate.name]: generate,
  [server.name]: server,
};

export default Cli;
