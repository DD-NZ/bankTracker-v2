const sectionReducer = (accumulator, currentValue) => accumulator + currentValue.Price;

const trimData = data => {
  let end = false;
  return data.filter(item => {
      if(item.total === 0 && !end){
        return false;
      } else {
        end = true;
        return true
      }
  })
}

const graphFilter = (data,filters) => {
  return data.map( section => ({
    start: section.start.toDateString(),
    end: section.end.toDateString(),
    transactions: section.transactions.filter( item => (
      ( filters.endDate ? item.Date <= filters.endDate : true) &&
      ( filters.startDate ? item.Date >= filters.startDate : true)
    )),
  }));
};

const listFilter = (data,filters) => {
  let filteredData = data.map( section => ({
    start: section.start.toDateString(),
    end: section.end.toDateString(),
    transactions: section.transactions.filter( item => (
      ( filters.endDate ? item.Date <= filters.endDate : true) &&
      ( filters.startDate ? item.Date >= filters.startDate : true) &&
      ( filters.search ? item.to.toLowerCase().includes(filters.search.toLowerCase()) : true)
    )),
  }));

  if (filters.direction === "ascending") {
    filteredData = filteredData.reverse().map( section => ({
      start: section.start,
      end: section.end,
      transactions: section.transactions.reverse(),
    }))
  }
  return filteredData
};

const filterData = (mode, data, filters) => {
  let selectedDataSet;
  switch (filters.time) {
    case "week":
      selectedDataSet = data.weekValues;
      break;
    case "month":
      selectedDataSet = data.monthValues;
      break;
    default:
      selectedDataSet = data.weekValues;
      break;
  }
  const filteredData = mode === "display-list" ? listFilter(selectedDataSet,filters) : graphFilter(selectedDataSet,filters);

  const proccessedData = filteredData.map( section => ({
    start: section.start,
    end: section.end,
    transactions: section.transactions,
    total: section.transactions.reduce(sectionReducer,0)
  }));

  let trimmedData = trimData(proccessedData);
  trimmedData = trimData(trimmedData.reverse());
  return trimmedData.reverse();
}


export default filterData;
