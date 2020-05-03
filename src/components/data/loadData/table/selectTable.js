import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';

const useStyles = makeStyles({
  margin:'1rem',
  root: {
    width: '100%',

  },
  container: {
    maxHeight: props => props.height,
  },
});

const SelectTable = ({data, onChangeHandler, height}) => {
  const [collumnData, setCollumnData]=useState([]);
  const [tableData, setTableData]=useState(data);
  const [rowsPerPage, setRowsPerPage]= useState(20);
  const [page, setPage]= useState(0);
  const classes = useStyles({height});

  useEffect(()=>{
    if(data.length>0){
      setCollumnData(
        tableData[0].row.map(item=>"")
      )
    }
  },[])

  useEffect(() => {
    setTableData(data);
  },[data])

  useEffect(()=>{
    onChangeHandler(collumnData);
  }, [collumnData])

  const handleSelect = (event,selectIndex)=> setCollumnData( ()=> {
    const newValue = event?.target?.value;
    return collumnData.map((collumn, index)  => {
      if(collumn === newValue) {
        return "";
      } else if (index === selectIndex ){
        return newValue;
      } else {
        return collumn
      }
    })
    }
  )

  return (
    <div class="table">
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {collumnData.map((column, index) => (
                <TableCell
                >
                <Select
                  native
                   value={column}
                   onChange={(event)=>handleSelect(event,index)}
                 >
                   <option aria-label="None" value="" />
                   <option value={"Date"}>Date</option>
                   <option value={"Description"}>Description</option>
                   <option value={"to"}>To</option>
                   <option value={"Price"}>Price</option>
                 </Select>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.filter(row => (row.index<(page+1)*rowsPerPage && row.index>(page)*rowsPerPage)).map((row) => (
              <TableRow>
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

export default SelectTable;
