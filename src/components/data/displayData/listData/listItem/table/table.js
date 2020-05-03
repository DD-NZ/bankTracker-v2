import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: props => props.height,
  },
});


const DisplayTable = ({data, size}) => {
  const classes = useStyles({height: size ? size.height-100 : undefined});
  return (
    <div class="table">
    <Paper className={classes.root}>
      <TableContainer className={classes.container} >
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  To
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map( transaction => (
              <TableRow>
                <TableCell align= "left">
                  {transaction.Date.toDateString()}
                </TableCell>
                <TableCell align="left">
                  {transaction.to}
                </TableCell>
                <TableCell align="left">
                  {transaction.Description}
                </TableCell>
                <TableCell align="left">
                  {transaction.Price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </div>
  );
}

export default DisplayTable;
