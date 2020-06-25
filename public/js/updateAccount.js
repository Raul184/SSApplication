import axios from 'axios'
import {showAlert} from './alert'

export const updateData = async (name,email) => {
  try {
    const res = await axios.patch('/api/v1/users/updateMe', {name,email})

    if(res.data.status === 'success'){
      showAlert('success' , 'Account successfully updated')
    }
  } 
  catch (error) {
    showAlert('error', error.response.data.message)  
  }
}