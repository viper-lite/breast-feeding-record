export default {
  formatTimeStamp(timestamp: number) {
    const now = new Date(timestamp);
    let day = "" + now.getDate();
    let month = "" + (now.getMonth() + 1);
    let year = now.getFullYear();

    if (day.length < 2) day = "0" + day;
    if (month.length < 2) month = "0" + month;

    let hours = "" + now.getHours();
    let minutes = "" + now.getMinutes();
    let seconds = "" + now.getSeconds();

    if (hours.length < 2) hours = "0" + hours;
    if (minutes.length < 2) minutes = "0" + minutes;
    if (seconds.length < 2) seconds = "0" + seconds;
    return (
      hours +
      ":" +
      minutes +
      ":" +
      seconds +
      " " +
      year +
      "/" +
      month +
      "/" +
      day
    );
  },
  getCurrentTimestamp() {
    return Date.now();
  },
  getCurrentDate() {
    const d = new Date();
    let day = "" + d.getDate();
    let month = "" + (d.getMonth() + 1);
    let year = d.getFullYear();

    if (day.length < 2) day = "0" + day;
    if (month.length < 2) month = "0" + month;

    return year + "/" + month + "/" + day;
  },
  getCurrentTime() {
    const now = new Date();
    let hours = "" + now.getHours();
    let minutes = "" + now.getMinutes();
    let seconds = "" + now.getSeconds();

    if (hours.length < 2) hours = "0" + hours;
    if (minutes.length < 2) minutes = "0" + minutes;
    if (seconds.length < 2) seconds = "0" + seconds;

    return hours + ":" + minutes + ":" + seconds;
  },
  getCurrentDays() {
    // 将日期字符串转换为Date对象
    const date1 = new Date("2024-06-24").getTime();
    const date2 = new Date().getTime();

    // 计算两个日期之间的时间差（毫秒）
    const diffTime = Math.abs(date2 - date1);

    // 将时间差转换为天数
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  },
};
