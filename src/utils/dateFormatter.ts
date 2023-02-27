enum MONTHS {
  'января' = 0,
  'февраля' = 1,
  'марта' = 2,
  'апреля' = 3,
  'мая' = 4,
  'июня' = 5,
  'июля' = 6,
  'августа' = 7,
  'сентября' = 8,
  'октября' = 9,
  'ноября' = 10,
  'декабря' = 11,
}

export const formatData = (time: string) => {
  const newDate = new Date(time);
  const hour = newDate.getHours();
  const min = newDate.getMinutes();
  return `${hour}:${min.toString().length === 2 ? '' : '0'}${min}`;
};

export const formatMonth = (time: string) => {
  const newDate = new Date(time);
  const day = newDate.getDate();
  const month = newDate.getMonth();
  return `${day}.${MONTHS[month]}`;
};
