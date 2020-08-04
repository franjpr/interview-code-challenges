import { FileManager } from './file-manager';
import fs from 'fs';
describe('file manager specs', () => {
  it('throws error if filename is not defined', () => {
    let fn = () => {
      let fm = new FileManager(undefined);
    };
    expect(fn).toThrow('Must provide a filename');
  });

  it('throws error if file doesnt exists', () => {
    let fn = () => {
      let fm = new FileManager('randomefile.txt');
    };
    expect(fn).toThrow('File does not exists');
  });

  it('creates a FileManager instance able to retrieve data from the given file', () => {
    let fm = new FileManager('3-robots.txt');
    expect(fm).toBeTruthy();
  });

  it('throw error if the file its empty or contains invalid data', () => {
    let filename = 'emptyfile.txt';
    fs.writeFileSync(`input/${filename}`, '');

    let fn = () => {
      let fm = new FileManager(filename);
      fm.getGridData();
    };

    expect(fn).toThrow('The given file must contain valid data');
    fs.unlinkSync(`input/${filename}`);
  });

  // it('throws error if grid data is invalid', () => {
  //   let filename = 'emptyfile.txt';
  //   fs.writeFileSync(`input/${filename}`, '51 -1');

  //   let fn = () => {
  //     let fm = new FileManager(filename);
  //     fm.getGridData();
  //   };

  //   expect(fn).toThrow('Invalid coordinates, value must be > 0 and < 50');

  //   fs.unlinkSync(`input/${filename}`);
  // });

  it('read grids data', () => {
    let filename = 'emptyfile.txt';
    fs.writeFileSync(`input/${filename}`, '1 1\n');

    let fm = new FileManager(filename);

    let coordinates = fm.getGridData();

    expect(coordinates).toStrictEqual('1 1');

    fs.unlinkSync(`input/${filename}`);
  });

  it('read robot data', () => {
    let filename = 'emptyfile.txt';
    fs.writeFileSync(`input/${filename}`, '1 1\n1 1 E\nRLFRFLF');

    let fm = new FileManager(filename);

    let coordinates = fm.getRobotData();

    expect(coordinates).toStrictEqual(['1 1 E', 'RLFRFLF']);

    fs.unlinkSync(`input/${filename}`);
  });
});
