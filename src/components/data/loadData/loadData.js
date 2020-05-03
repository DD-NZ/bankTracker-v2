import React, {useState} from 'react';
import FileUpload from './fileUpload';
import CheckboxTable from './table/checkboxTable';
import SelectTable from './table/selectTable';
import Button from '@material-ui/core/Button';
import CustomSnackbar from './snackbar/snackbar'
import {proccessData, modifyCSV, checkHeaderValid, createObject} from './util/proccessData'
import timeSplit from './util/timeSplit'

const LoadData = ({size, setData, setMode, setOpen}) => {
  const [workFlowState, setWorkFlowState] = useState("load");
  const [loadedData, setLoadedData] = useState();
  const [trimmedData, setTrimmedData] = useState();
  const [headerData, setHeaderData] = useState();
  const [error, setError]=useState(false);

  const onLoadHandler = data => {
    setLoadedData(modifyCSV(data.data));
    setWorkFlowState("trim")
  };

  const onTrimHandler = data => {
    setTrimmedData(data.filter(row=> !row.selected));
  };

  const onHeaderHandler = data => {
    setHeaderData(data);
  };

  const onFinishHandler = () => {
    if(checkHeaderValid(headerData)){
      setData(timeSplit(proccessData(createObject(headerData,trimmedData))));
      setMode("display-list");
      setOpen(true);
    } else {
      setError(true)
    }
  };

  const onPreviousHandler = () => {
    setWorkFlowState("trim");
  };

  if (workFlowState === "load") {
    return (
      <div className="newData">
        <FileUpload setData={setData} onLoadHandler={onLoadHandler} setMode={setMode} setOpen={setOpen}/>
        <CustomSnackbar open={true} autoClose={false} alertProps={{severity:"info", message:"Upload a CSV file of your own bank statement, or click Example to checkout the functionality"}}/>
      </div>
    );
  } else if (workFlowState === "trim") {
    return(
        <div className="newData">
          <CustomSnackbar open={true} autoClose={false} alertProps={{severity:"info", message:"Please select all rows which are not transactions, including headers"}}/>
          <div className="table">
            <CheckboxTable
              data={loadedData}
              onChangeHandler={onTrimHandler}
              height={size.height*0.85}
            />
            <div className="floatRight">
              <Button
                onClick={() => setWorkFlowState("header")}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
        )
      }
  else {
    return (
      <div className="newData">
        <CustomSnackbar open={true} alertProps={{severity:"info", message:"Please select one of each Header"}}/>
        <div className="table">
          <SelectTable
            data={trimmedData}
            onChangeHandler={onHeaderHandler}
            height={size.height*0.85}
          />
          <div className="floatRight">
            <Button
              onClick={onFinishHandler}
            >
              Finish
            </Button>
          </div>
          <div className="floatLeft">
            <Button
              onClick={onPreviousHandler}
            >
              Previous
            </Button>
          </div>
          {
            error
            ? <CustomSnackbar open={error} setClose={setError} alertProps={{severity:"error", message:"You have not selected one of each header"}}/>
            : <CustomSnackbar open={true} alertProps={{severity:"info", message:"Please select one of each Header"}}/>
          }
        </div>
      </div>
    )
  }
}

export default LoadData;
