import chalk from 'chalk';

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const shuffle = <T>(someArray: T[]): T[] => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

export const customConsole = {
  info: (mes: any, ...optionalParams: any[]): void => console.log(chalk.yellow(mes), ...optionalParams),
  success: (mes: any, ...optionalParams: any[]): void => console.log(chalk.green(mes), ...optionalParams),
  error: (mes: any, ...optionalParams: any[]): void => console.log(chalk.red(mes), ...optionalParams),
};
