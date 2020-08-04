import { FileManager } from './common/file-manager';
import { gridMapper } from './mappers/grid.mapper';
import { Grid, Robot } from './models';
import { robotMapper } from './mappers/robot.mapper';

const main = (filename: string[]) => {
  let defaultFilename: string = filename.length ? filename[0] : '3-robots.txt';

  const fileManager: FileManager = new FileManager(defaultFilename);
  const gridData = fileManager.getGridData();
  const robotData = fileManager.getRobotData();
  const grid: Grid = gridMapper(gridData);

  const robotCollection: Robot[] = robotMapper(robotData).map((robot) => {
    robot.setLimits(grid.getBoundaries().x, grid.getBoundaries().y);
    return robot;
  });

  let finalOutput: string[] = [];

  console.log(`Grid size: ${grid.getGridSize()} (inclusive)`);

  robotCollection.forEach((robot, index) => {
    console.log(`Robot #${index} starts at-> ${robot.getLocation()}`);
    grid.placeRobot(robot);
    finalOutput.push(robot.getLocation());
  });

  console.log('##### OUTPUT ######');
  finalOutput.forEach((r) => console.log(r));
};

main(process.argv.slice(2));
