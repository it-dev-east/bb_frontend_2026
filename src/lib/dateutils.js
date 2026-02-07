// export function toLocalDatetimeInputValue(date) {
//     const offsetMs = date.getTimezoneOffset() * 60000; // convert minutes → ms
//     const localDate = new Date(date - offsetMs);
//     return localDate.toISOString().slice(0, 16);
//   }
export function toLocalDatetimeInputValue(value) {
  if (!value) return "";

  // normalize input → Date
  const date = value instanceof Date ? value : new Date(value);

  if (isNaN(date.getTime())) return "";

  const offsetMs = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - offsetMs);

  // format for <input type="datetime-local">
  return localDate.toISOString().slice(0, 16);
}