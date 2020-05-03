import React, {useRef} from 'react';
import LoadData from './loadData/loadData'
import DisplayData from './displayData/displayData'
import clsx from 'clsx'

const Data = ({classes, screenSize, open, data, setData, filters, mode, setMode, setOpen}) => {
  const ref = useRef();

  const size = {
    width: ref?.current?.clientWidth,
    height: screenSize?.height-115
  }


  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <div id="body">
        <div style={{ height:size?.height}} className="data" ref={ref}>
            {
              mode === "load"
              ? (
                <div className="dataContent">
                  <LoadData setData={setData} size={size} setMode={setMode} setOpen={setOpen}/>
                </div>
              )
              : (
                <div className="dataContent" >
                  <DisplayData data={data} filters={filters} mode={mode} open={open} size={size}/>
                </div>
              )
            }
        </div>
      </div>
    </main>
  );
}

export default Data;
