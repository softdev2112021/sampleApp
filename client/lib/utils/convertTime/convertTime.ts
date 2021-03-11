const convertTime = (timestamp) => {
  const time = new Date(timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  const month = months[time.getMonth()];
  const weekDay = weekDays[time.getDay()];
  const date = `${month}/${time.getDate()}`;
  return { date, weekDay };
};

export default convertTime;
