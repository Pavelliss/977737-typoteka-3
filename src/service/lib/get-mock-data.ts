import fs from 'fs';
import { customConsole } from '../../utils';

const FILE_NAME = `mocks.json`;

let data: string[] = [];
export const getMockData = async () => {
  if (data.length > 0) {
    return data;
  }

  try {
    const fileContent = await fs.promises.readFile(FILE_NAME, 'utf-8');
    data = JSON.parse(fileContent);
  } catch (err) {
    customConsole.error(err);
    return err;
  }

  return data;
};
