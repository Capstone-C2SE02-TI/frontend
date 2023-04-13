const convertDateToCreatedDate = (date) => {
  const a = new Date(date);
  const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  
  const year = a.getFullYear();
  const month = months[a.getMonth()] < 10 ? '0' + months[a.getMonth()] : months[a.getMonth()];
  const day = a.getDate() < 10 ? '0' + a.getDate() : a.getDate();
  const hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
  const min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
  const sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();

  const time = day + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
};

export default convertDateToCreatedDate;
