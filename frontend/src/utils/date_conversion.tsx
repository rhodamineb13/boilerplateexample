export interface DateTime {
  day : string;
  date : number;
  month : string;
  year : number
  time : string;
  tz : string;
}

const monthMap : Map<number, string> = new Map<number, string>([
  [0, "Jan"],
  [1, "Feb"],
  [2, "Mar"],
  [3, "Apr"],
  [4, "May"],
  [5, "Jun"],
  [6, "Jul"],
  [7, "Aug"],
  [8, "Sep"],
  [9, "Oct"],
  [10, "Nov"],
  [11, "Dec"]
]);

const dayMap : Map<number, string> = new Map<number, string>([
  [0, "Sunday"],
  [1, "Monday"],
  [2, "Tuesday"],
  [3, "Wednesday"],
  [4, "Thursday"],
  [5, "Friday"],
  [6, "Saturday"],
]);

const monthFullMap : Map<number, string> = new Map<number, string>([
  [0, "January"],
  [1, "February"],
  [2, "March"],
  [3, "April"],
  [4, "May"],
  [5, "June"],
  [6, "July"],
  [7, "August"],
  [8, "September"],
  [9, "October"],
  [10, "November"],
  [11, "December"]
]);

export function ConvertToReadableFormat(dateTimestr : string) {
    const date = new Date(dateTimestr)
    const month : string = monthMap.get(date.getMonth())!
    const day : string = date.getDate().toString()
    const year : string = date.getFullYear().toString()

    return `${month} ${day}, ${year}`
}

export function ConvertCurrentDateTime() : DateTime {
  const now : Date = new Date();

  const totalMin = -now.getTimezoneOffset();
  const sign = totalMin >= 0 ? "+" : "-";
  const pad = (n: number) => String(n).padStart(2, "0");
  const hours = pad(Math.floor(Math.abs(totalMin) / 60));
  const minutes = pad(Math.abs(totalMin) % 60);
  const offset = `${sign}${hours}:${minutes}`;

  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  const tz : string = `(GMT${offset} ${timeZone})`;

  const currentDateTime : DateTime = {
    day: dayMap.get(now.getDay())!,
    date: now.getDate(),
    month: monthFullMap.get(now.getMonth())!,
    year: now.getFullYear(),
    time: `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`,
    tz: tz
  }

  return currentDateTime
}