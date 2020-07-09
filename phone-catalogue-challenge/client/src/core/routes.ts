import { generatePath } from 'react-router-dom';

interface ISwitchRoutes {
  root: string;
  phoneDetails: string;
}

export const SwitchRoutes: ISwitchRoutes = {
  root: '/',
  phoneDetails: '/phone/:id',
};

type NagivationFunction = (id: number) => string;

interface ILinkedRoutes extends Omit<ISwitchRoutes, 'phoneDetails'> {
  phoneDetails: NagivationFunction;
}

export const LinkedRoutes: ILinkedRoutes = {
  ...SwitchRoutes,
  phoneDetails: (id) => generatePath(SwitchRoutes.phoneDetails, { id }),
};
