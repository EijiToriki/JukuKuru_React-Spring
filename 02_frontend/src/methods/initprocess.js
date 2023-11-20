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


// Todo : 処理内容大した変わらないので、ひとまとめにしたい
const fetchClassRoomDates = async() => {
  const params = {
    classroomId: 1
  }
  try{
    const res = await axios.get(baseURL + "getOpenDate", {
      params
    })
    return res.data
  }catch(error){
    console.log(error)
  }
}


const fetchStudentDates = async() => {
  const params = {
    studentId: 1
  }
  try{
    const res = await axios.get(baseURL + "getComeDate", {
      params
    })
    return res.data
  }catch(error){
    console.log(error)
  } 
}


const fetchExistStudentDates = async() => {
  const params = {
    studentId: 1,
    classroomId: 1
  }
  try{
    const res = await axios.get(baseURL + "getOptionalDate", {
      params
    })
    return res.data
  }catch(error){
    console.log(error)
  } 
}
/////////////////////////////////////////////////////////////////////


export { getClassRoomPropList, getDateClasstimeObj, fetchClassRoomDates, fetchStudentDates, fetchExistStudentDates }
