import * as process from 'process';
import { DEFAULT_COMMAND, ExitCode, USER_ARGV_INDEX } from '../constants';
import Cli from './cli';

const userArgs = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArgs;

if (userArgs.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[userCommand].run(userArgs.slice(1));
