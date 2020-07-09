import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { useMediaQuery } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { PhoneVm } from '../phones.vm';
import React from 'react';

interface Props {
  phonesCollection: PhoneVm[],
  onPhoneClick: (id: PhoneVm) => void
}

export const PhonesTableComponent = (props: Props) => {
  const { phonesCollection, onPhoneClick } = props;
  const isMobile = useMediaQuery('(min-width:600px');
  const buildUrl = (imageUrl: string) => `${process.env.SERVER_URL}/media/img/${imageUrl}`;

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {isMobile && <TableCell>Avatar</TableCell>}
                  <TableCell>Name</TableCell>
                  {isMobile && <TableCell>Manufacturer</TableCell>}
                  <TableCell>Price</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {phonesCollection.map((row) => (
                  <TableRow key={row.name} data-testid="tableRow">
                    {isMobile && <TableCell>
                      {<Avatar alt={row.name} src={buildUrl(row.image_url)} />}
                    </TableCell>
                    }
                    <TableCell>{row.name}</TableCell>
                    {isMobile && <TableCell>{row.manufacturer}</TableCell>}
                    <TableCell>{row.price}</TableCell>
                    <TableCell>
                      <Button size="small" variant="contained" onClick={e => { onPhoneClick(row) }}> View </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>)
}