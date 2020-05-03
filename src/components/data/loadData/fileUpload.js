import React, {useRef} from 'react';
import { readString } from 'react-papaparse'
import Button from '@material-ui/core/Button';
import { proccessData } from './util/proccessData'
import timeSplit from './util/timeSplit'

const FileUpload = ({setData, onLoadHandler, setMode, setOpen}) => {
  const inputRef = useRef()

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      var reader = new FileReader();
      reader.onload = (reader =>
        {
          return () =>
          {
            onLoadHandler(readString(reader.result));
          }
        })(reader);
      const text = reader.readAsText(e.dataTransfer.files[0])
    }
  };


  const inputOnChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      var reader = new FileReader();
      reader.onload = (reader => {
        return () => {
          onLoadHandler(readString(reader.result));
        }
      })(reader);
      const text = reader.readAsText(e.target.files[0])
    }
  };

  const onClick = () => {
    inputRef.current.click();
  };


  const onExampleClick = () => {
    fetch("http://wheres-my-money.s3-website-ap-southeast-2.amazonaws.com/data.json")
      .then(res => {
        return res.json()})
      .then(results => {
        setData(timeSplit(proccessData(results)));
        setMode("display-list");
        setOpen(true);
      })
  }

  return (
    <div className="loadContainer">
      <div
        className="fileDropArea"
        onDrop={e => handleDrop(e)}
        onDragOver={e => handleDragOver(e)}
        onDragEnter={e => handleDragEnter(e)}
        onDragLeave={e => handleDragLeave(e)}
      >
      <div className='content'>
        <input
         type='file'
         ref={inputRef}
         style={{display: 'none'}}
         onChange={inputOnChange}
        />
        <div className='row'>
          <Button onClick={onClick}>
            Load File
          </Button>
          <Button onClick={onExampleClick} >
            Load Example
          </Button>
        </div>
        <div className='rowCenter'>
          <i className="fas fa-file-upload fa-10x"></i>
          <p className="noselect">Drop File Here</p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default FileUpload;
