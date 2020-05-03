import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: props => props.height,
  },
});

const CheckboxTable = ({data, onChangeHandler, height}) => {
  const [tableData, setTableData]=useState(data);
  const [rowsPerPage, setRowsPerPage]= useState(20);
  const [page, setPage]= useState(0);
  const classes = useStyles({height});

  useEffect(() => {
    setTableData(data);
  },[data])

  useEffect(()=>{
    onChangeHandler(tableData);
  }, [tableData])


  const handleClick = clickedIndex => setTableData( ()=> {
    const tableCopy = [...tableData];
    tableCopy[clickedIndex].selected = !tableCopy[clickedIndex].selected
    return tableCopy
    }
  )

  return (
    <div class="table">
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableBody>
            {tableData.filter(row => (row.index<(page+1)*rowsPerPage && row.index>(page)*rowsPerPage)).map((row) => (
              <TableRow
                role="checkbox"
                selected={row.selected}
                onClick={(event) => handleClick(row.index)}
                style={
                  {
                    selected: '#ff9800',
                  }
                }
              >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={row.selected}
                />
              </TableCell>
              {
                row.row.map(cell => ( <
                  TableCell align = "left" > {
                    cell
                  } < /TableCell>
                ))
              }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10,20,50]}
        colSpan={3}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(event,newPage)=>setPage(newPage)}
        onChangeRowsPerPage={(event, newPage) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
    </div>
  );
}

export default CheckboxTable;
