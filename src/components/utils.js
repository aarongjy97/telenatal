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

export function isBirthday(d1, d2) {
  return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth();
}

export function formatTime(inputDate) {
  var date = new Date(inputDate);
  return moment(date).format("h:mmA");
}

export function formatDateTime(inputDate) {
  var date = new Date(inputDate);
  return moment(date).format("ddd, D MMM YYYY, h:mmA");
}

export function formatDate(inputDate) {
  var date = new Date(inputDate);
  return moment(date).format("YYYY-MM-DD");
}

export function sortAppointments(appointments) {
  appointments.sort(function (a, b) {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateA > dateB ? 1 : -1;
  });
  return appointments;
}

export function getInitials(text) {
  return text
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export function countdownDays(inputDate) {
  var differenceInSeconds =
    new Date().getTime() - new Date(inputDate.date).getTime();
  var differenceInDays = differenceInSeconds / (1000 * 3600 * 24);
  return differenceInDays;
}

export function countdownHours(inputDate) {
  var differenceInSeconds =
    new Date().getTime() - new Date(inputDate.date).getTime();
  var differenceInHours = differenceInSeconds / (1000 * 3600);
  return differenceInHours;
}

export function isDictEmpty(dict) {
  return Object.keys(dict).length === 0;
}
