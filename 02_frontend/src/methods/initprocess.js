const getClassRoomPropList = (classRoomDates, keyName) => {
  const propList = []
  for(const classRoomDate of classRoomDates){
    if(propList.indexOf(classRoomDate[keyName]) === -1){
      propList.push(classRoomDate[keyName])
    }
  }
  return propList
}


const getDateClasstimeObj = (dateClasstimeProps) => {
  const dateClasstimeObj = {}
  for (const dateClasstime of dateClasstimeProps) {
    if (!dateClasstimeObj[dateClasstime.date]) {
      dateClasstimeObj[dateClasstime.date] = [];
    }
    dateClasstimeObj[dateClasstime.date].push(dateClasstime.class_time);
  }
  return dateClasstimeObj
}


export { getClassRoomPropList, getDateClasstimeObj }
