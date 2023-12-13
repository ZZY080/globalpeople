export function randomHeight(minHeight,maxHeight){
  let pic_height =minHeight+ Math.random()*(maxHeight-minHeight);
  return pic_height;
}

// 获取当前时间
export function getCurrentDate(){
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth()+1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    month = month>9?month:"0"+month;
    day = day>9?day:"0"+day;
    hour=hour>9?hour:"0"+hour;
    minute = minute>9?minute:"0"+minute;
    second=second>9?second:"0"+second;
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
// 对当前时间进行运算
export function addCurrentDate(DateStr,time){
  let now = new Date(DateStr);
  let year = now.getFullYear()+time;
  let month = now.getMonth()+1;
  let day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  month = month>9?month:"0"+month;
  day = day>9?day:"0"+day;
  hour=hour>9?hour:"0"+hour;
  minute = minute>9?minute:"0"+minute;
  second=second>9?second:"0"+second;
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}