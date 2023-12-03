import axios from 'axios';
import { baseURL } from '../common/Constants';

const registerDateToServer = async(studentId, postClassIds) => {
  try{
    const dataToSend = {
      "studentId" : studentId,
      "classIds" : postClassIds
    }
    const response = await axios.post(baseURL + "registerDate", dataToSend, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    updateRegisterFlag(studentId)
  } catch (error) {
    console.error('Error:', error.message);
  }
}


const deleteDateToServer = async(studentId, deleteClassIds) => {
  try{
    const dataToSend = {
      "studentId": studentId,
      "deleteClassIds": deleteClassIds
    }
    const response = await axios.delete(baseURL + "deleteComeDate",
    {
      data: dataToSend, 
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }catch(error){
    console.error('Error:', error.message)
  }
}


const updateDateToServer = async(studentId, beforeClassIds, afterClassIds) => {
  try{
    const dataToSend = {
      "studentId": studentId,
      "beforeClassIds": beforeClassIds,
      "afterClassIds": afterClassIds
    }
    const response = await axios.put(baseURL + "changeDate", dataToSend, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }catch(error){
    console.error('Error:', error.message)
  }
}


const updateRegisterFlag = async(studentId) => {
  const updateStudentId = {
    "studentId" : studentId
  }
  await axios.put(baseURL + "updateRegisterFlag", updateStudentId, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export {registerDateToServer, deleteDateToServer, updateDateToServer}