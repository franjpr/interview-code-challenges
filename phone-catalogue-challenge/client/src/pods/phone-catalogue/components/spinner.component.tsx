import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {

}

export const SpinnerComponent = (props: Props) => {
  return (
    <>
      <CircularProgress data-testid="spinnerTestId" />
    </>)
}