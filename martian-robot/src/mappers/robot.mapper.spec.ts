import { robotMapper } from './robot.mapper';
import { Grid, Robot } from '../models';
import { MAX_INSTRUCTIONS } from '../common/const';

describe('Robot mapper  specs', () => {
  it('throws error if input is undefined', () => {
    let fn = () => {
      robotMapper(undefined);
    };

    let fnEmptyArray = () => {
      robotMapper([]);
    };

    expect(fn).toThrow('Invalid input');
    expect(fnEmptyArray).toThrow('Invalid input');
  });

  it('throws error if initial coordinates are invalid', () => {
    let inputEmpty = ['', ''];
    let nonNumbersInput = ['A B E', ''];
    let invalidOrientation = ['1 2 X', ''];
    let inputExceedsAllowedValues = ['-1 51 S', ''];

    let fnEmpty = () => {
      robotMapper(inputEmpty);
    };

    let fnNonNumbers = () => {
      robotMapper(nonNumbersInput);
    };

    let fnInvalidOrientation = () => {
      robotMapper(invalidOrientation);
    };

    let fnExceeds = () => {
      robotMapper(inputExceedsAllowedValues);
    };

    expect(fnEmpty).toThrow('Invalid coordinates');
    expect(fnNonNumbers).toThrow('Invalid coordinates');
    expect(fnInvalidOrientation).toThrow('Invalid coordinates');
    expect(fnExceeds).toThrow('Invalid coordinates');
  });

  it('throws error if instructions are invalid', () => {
    let inputEmpty = ['1 1 E', ''];
    let invalidInstructions = ['1 1 W', 'LRFKKA'];
    let maxLengthInstructions = ['1 1 W', 'F'.repeat(MAX_INSTRUCTIONS + 1)];

    let fnEmpty = () => {
      robotMapper(inputEmpty);
    };

    let fnInvalidInstructions = () => {
      robotMapper(invalidInstructions);
    };

    let fnMaxInstructions = () => {
      robotMapper(maxLengthInstructions);
    };

    expect(fnEmpty).toThrow('Invalid instructions');
    expect(fnInvalidInstructions).toThrow('Invalid instructions');
    expect(fnMaxInstructions).toThrow('Invalid instructions');
  });

  it('maps one robot', () => {
    let input = ['1 1 E', 'LFFR'];
    let robot = new Robot(1, 1, 'E', ['L', 'F', 'F', 'R']);
    let parsed = robotMapper(input)[0];

    expect(JSON.stringify(parsed)).toEqual(JSON.stringify(robot));
  });

  it('maps many robot', () => {
    let input = ['1 1 E', 'LFFR', '2 2 W', 'LRRF'];
    let robots: Robot[] = [
      new Robot(1, 1, 'E', ['L', 'F', 'F', 'R']),
      new Robot(2, 2, 'W', ['L', 'R', 'R', 'F']),
    ];

    expect(JSON.stringify(robotMapper(input))).toEqual(JSON.stringify(robots));
  });
});
