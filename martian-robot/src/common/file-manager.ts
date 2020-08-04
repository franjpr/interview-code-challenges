import fs from 'fs';
import path from 'path';

/**
 * Read files inside ./input/ directory
 */
export class FileManager {
  private readonly ENCODING = 'utf8';
  private data: string = '';

  constructor(filename: string) {
    if (!filename) {
      throw new Error('Must provide a filename');
    }

    if (!this.fileExists(filename)) {
      throw new Error('File does not exists');
    }

    this.data = this.readFile(filename);
  }

  // returns the first row of the file with the grid info
  getGridData = (): string => {
    if (!this.data) {
      throw new Error('The given file must contain valid data');
    }
    return this.data.split('\n')[0];
  };

  // returns the rows related with robot data
  getRobotData = (): string[] => {
    if (!this.data) {
      throw new Error('The given file must contain valid data');
    }
    let allLines = this.data.split('\n');
    // removes first row (we dont need grid info)
    allLines.shift();
    return allLines;
  };

  private fileExists = (filename: string): boolean => {
    const relativePath = path.join(__dirname, '..', '..', 'input', filename);
    return fs.existsSync(relativePath);
  };

  private readFile = (fileName: string): string => {
    let relativePath = path.join(__dirname, '..', '..', 'input', fileName);

    return fs.readFileSync(relativePath, this.ENCODING);
  };
}
