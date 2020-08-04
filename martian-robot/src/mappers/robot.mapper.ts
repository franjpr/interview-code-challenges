import { Robot } from '../models';
import { Orientation } from '../types';
import { MAX_COORDINATE, MAX_INSTRUCTIONS } from '../common/const';

interface TemporaryStore {
  instructions: string;
  position: string;
}
/**
 * returns a collection of robots from a given input
 * @param input
 */
export const robotMapper = (inputLines: string[]): Robot[] => {
  if (!inputLines || inputLines.length === 0) {
    throw new Error('Invalid input');
  }

  let robots: Robot[] = [];

  let temp: TemporaryStore = {
    instructions: '',
    position: '',
  };

  // loop and create a robot each 2 rows
  for (let index = 0; index < inputLines.length; index++) {
    const line: string = removeCarryReturn(inputLines[index]);

    if (index % 2 === 0) {
      temp.position = line;
    } else {
      temp.instructions = line;
      robots.push(createRobot(temp));
    }
  }

  return robots;
};

const createRobot = (tmp: TemporaryStore): Robot => {
  if (areCoordinatesInvalid(tmp.position)) {
    throw new Error('Invalid coordinates');
  }

  if (areInstructionsInvalid(tmp.instructions)) {
    throw new Error('Invalid instructions');
  }

  let [x, y, o] = tmp.position.split(' ');

  let xPos = Number(x);
  let yPos = Number(y);
  let orientation: Orientation = removeCarryReturn(o) as Orientation;
  let instructions = tmp.instructions.split('');

  return new Robot(xPos, yPos, orientation, instructions);
};

const removeCarryReturn = (str: string): string => {
  const lineBreak = new RegExp(/\r|\n/g);

  if (lineBreak) {
    str.substr(0, str.length - 1).trim();
  }

  return str.trim();
};

const areCoordinatesInvalid = (coordinates: string): boolean => {
  let [x, y, o] = coordinates.split(' ');
  let numbersRegex = new RegExp(/^\d$/);
  let allowedOrientation = new RegExp(/^[NSEW]$/);

  if (!x || !y || !o) {
    return true;
  }

  if (!numbersRegex.test(x.trim()) || !numbersRegex.test(y.trim())) {
    return true;
  }

  if (!allowedOrientation.test(o.trim())) {
    return true;
  }

  const xAsNumber: number = Number(x);
  const yAsNumber: number = Number(y);

  return (
    xAsNumber < 0 &&
    yAsNumber < 0 &&
    xAsNumber > MAX_COORDINATE &&
    yAsNumber > MAX_COORDINATE
  );
};

const areInstructionsInvalid = (instructions: string): boolean => {
  if (!instructions || instructions.length > MAX_INSTRUCTIONS) {
    return true;
  }

  const allowedInstructions = new RegExp(/^[LFR]+$/);

  return !allowedInstructions.test(instructions.trim());
};
