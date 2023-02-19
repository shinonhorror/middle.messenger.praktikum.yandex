const formatData = (time: string) => {
  const newDate = new Date(time);
  const hour = newDate.getHours();
  const min = newDate.getMinutes();
  return `${hour}:${min.toString().length === 2 ? '' : '0'}${min}`;
};
export default formatData;
