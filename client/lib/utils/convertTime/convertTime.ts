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
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const month = months[time.getMonth()];
  const weekDay = weekDays[time.getDay() - 1];
  const date = `${time.getDate()}/${month}`;
  return { weekDay, date };
};

export default convertTime;
