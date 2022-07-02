export default function parseDate(obj) {
  let date = obj.getDate();
  date = date < 10 ? "0" + date : date;

  let month = obj.getMonth() + 1;
  month = month < 10 ? "0" + month : month;

  const year = obj.getFullYear();
  return `${date}-${month}-${year}`;
}
