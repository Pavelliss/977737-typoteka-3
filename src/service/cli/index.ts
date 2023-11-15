import help from './help';
import version from './version';
import generate from './generate';

const Cli = {
  [help.name]: help,
  [version.name]: version,
  [generate.name]: generate,
};

export default Cli;
