import makeStyles from '@material-ui/styles/makeStyles/makeStyles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel'
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box'
import { PhoneVm } from '../phones.vm';
import React from 'react';

interface Props {
  phone: PhoneVm
  handleClose: () => void,
  open: boolean
}


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  image: {
    maxWidth: '50%',
    marginLeft: '25%',
  },
  displayField: {
    display: 'flex',
    justifyContent: 'start',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '1%',
    padding: '1em',
    backgroundColor: 'aliceblue',
    borderRadius: '5px',
  },
}))

export const PhoneDetailsComponent = (props: Props) => {
  const classes = useStyles({});
  const { handleClose, open, phone } = props;
  const buildUrl = (url: string) => `${process.env.SERVER_URL}/media/img/${url}`;

  return (
    <>
      <Dialog onClose={handleClose} open={open} data-testid="dialogTestId">
        <DialogTitle id="alert-dialog-title">{phone.name}</DialogTitle>
        <DialogContent>
          <Box>
            <img src={buildUrl(phone.image_url)} className={classes.image}></img>

            <Box className={classes.displayField}>
              <InputLabel> Description </InputLabel>
              <small>{phone.description}</small>
            </Box>

            <Box className={classes.displayField}>
              <InputLabel> Screen </InputLabel>
              <span>{phone.screen}</span>
            </Box>

            <Box className={classes.displayField}>
              <InputLabel> Processor </InputLabel>
              <span>{phone.processor}</span>
            </Box>

            <Box className={classes.displayField}>
              <InputLabel> Ram </InputLabel>
              <span>{phone.ram}</span>
            </Box>

          </Box>
        </DialogContent>
      </Dialog>
    </>)
}