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

export {registerDateToServer, deleteDateToServer}