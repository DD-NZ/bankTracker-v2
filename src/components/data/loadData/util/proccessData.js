const compare = (a,b) => {
  if (a.Date > b.Date) {
    return -1;
  }
  if (a.Date < b.Date) {
    return 1;
  }
   return 0;
}

const proccessData = (data) => {
  return data.map(item => (
    {
      ...item,
      Date: new Date(item.Date),
      Price: parseFloat(item.Price).toFixed(2) * -1
    }
  ))
  .filter(item => (
    item.Price>0
  ))
  .sort(compare);
}

const modifyCSV = (data) => {
  const maxLengthReducer = (maxLength, currentValue) => currentValue.length > maxLength ? currentValue.length : maxLength ;
  const maxLength = data.reduce(maxLengthReducer, -1);
  return data.map((row,index) =>{
    let selected = false;
    if(row.length<maxLength) {
      selected=true;
      let count = row.length;
      while(count<maxLength){
        row.push(undefined);
        count++;
      }
    }
    return {
      index,
      selected,
      row
    };
  })
}

const checkHeaderValid = (headerData) => {
  const selectedItems = headerData.filter(item=> item!=="");
  if(selectedItems.length === 4){
      return true;
  }
  return false;
}

const createObject = (headers, body) =>{
  const rowReducer = (accumulator, currentValue, index) => {
    const header = headers[index];
    if (header==="") {
      accumulator.extra.push(currentValue);
    } else {
      if (header==="Date") {
        accumulator[header] = new Date(currentValue);
      } else {
        accumulator[header] = currentValue
      }

    }
    return accumulator;
  }

  return body.map(row=>{
    const structure = {
      extra:[]
    }
    return row.row.reduce(rowReducer,structure);
  });
};

export {proccessData, modifyCSV, checkHeaderValid, createObject}
