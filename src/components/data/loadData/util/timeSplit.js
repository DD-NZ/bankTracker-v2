


//
// FILL WEEKS
//

const getEndOfWeek = date => {
  var end = new Date(date);
   return new Date(end.setDate(end.getDate() + 6));
}

const getMonday = date => {
  const day = date.getDay();
  const daysFromMonday = day === 0 ? 6 : day-1;
  var result = new Date(date);
  result.setDate(result.getDate() - daysFromMonday);
  return result;
}

const getWeeks = data => {
  const firstMonday = getMonday(data[0].Date);
  const lastMonday = getMonday(data[data.length-1].Date);
  let week = firstMonday;
  const weeks = new Map();
  const order = [];
  while (week.getTime() <= lastMonday.getTime()) {
    weeks.set(week.getTime(),[]);
    order.push(week.getTime());
    let nextWeek = new Date(week);
    nextWeek.setDate(nextWeek.getDate() + 7);
    week = nextWeek;
  }
  return {
    order,
    values: weeks
  }
}

const fillWeeks = (data, weeks) => {
  data.forEach( item => {
      getFirstOfMonth(item.Date);
      weeks.get(getMonday(item.Date).getTime()).push(item);
  });
}



//
// FIll MONTHS
//

const getEndOfMonth = date => {
  var end = new Date(date);
  var nextMonth = new Date(end.setMonth(end.getMonth()+1))
   return new Date(nextMonth.setDate(nextMonth.getDate() - 1));
}

const getFirstOfMonth = date => {
  const day = date.getDate();
  const daysFromFirst = day-1;
  var result = new Date(date);
  result.setDate(result.getDate() - daysFromFirst)
  return result;
}

const getMonths = data => {
  const firstMonth = getFirstOfMonth(data[0].Date);
  const lastMonth = getFirstOfMonth(data[data.length-1].Date);
  let month = firstMonth;
  const months = new Map();
  const order = [];
  while (month.getTime() <= lastMonth.getTime()) {
    months.set(month.getTime(),[]);
    order.push(month.getTime());
    let nextMonth =  new Date(month.setMonth(month.getMonth()+1));
    month = nextMonth;
  }
  return {
    order,
    values: months
  }
}

const fillMonths = (data, months) => {
  data.forEach( item => {
      months.get(getFirstOfMonth(item.Date).getTime()).push(item);
  });
}

const timeSplit = data => {
  const ascendingData = [...data].reverse()

  const weeks = getWeeks(ascendingData);
  fillWeeks(ascendingData, weeks.values);
  const weekValues = weeks.order.map(section => ({
    start: new Date(section),
    end: getEndOfWeek(section),
    transactions: weeks.values.get(section)
  }))

  const months = getMonths(ascendingData);
  fillMonths(ascendingData, months.values);
  const monthValues = months.order.map(section => ({
    start: new Date(section),
    end: getEndOfMonth(section),
    transactions: months.values.get(section)
  }))

  return({
    weekValues,
    monthValues
  })
}

export default timeSplit;
