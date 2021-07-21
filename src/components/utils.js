import moment from "moment";

export function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function sameMonth(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
  );
}

export function formatTime(inputDate) {
  var date = new Date(inputDate);
  return moment(date).format("h:mmA");
}

export function formatDate(inputDate) {
  var date = new Date(inputDate);
  return moment(date).format("ddd, D MMM YYYY, h:mmA");
}