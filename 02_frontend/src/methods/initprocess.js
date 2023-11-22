import axios from 'axios';
import { baseURL } from "../common/Constants"

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


const fetchDates = async(params, urlSuffix) => {
  try{
    const res = await axios.get(baseURL + urlSuffix, {
      params
    })
    return res.data
  }catch(error){
    return -1
  }
}



export { getClassRoomPropList, getDateClasstimeObj, fetchDates }
