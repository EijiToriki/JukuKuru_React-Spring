import axios from 'axios';
import { baseURL } from '../common/Constants';

const registerDateToServer = async(postClassIds) => {
  try{
    const dataToSend = {
      "studentId" : 1,
      "classIds" : postClassIds
    }
    const response = await axios.post(baseURL + "registerDate", dataToSend, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response
  } catch (error) {
    console.error('Error:', error.message);
  }
}

export {registerDateToServer}