import axios from 'axios'
import {showAlert} from './alert'

export const updateData = async data => {
  try {
    const res = await axios.patch('/api/v1/users/updateMe', data)
    if(res.data.status === 'success'){
      showAlert('success' , 'Account successfully updated')
    }
  } 
  catch (error) {
    showAlert('error', error.response.data.message)  
  }
}

export const updatePassword = async (passCurrent, pass, passConfirm) => {
  try {
    const res = await axios.patch(
      '/api/v1/users/updateMyPassword', 
      passCurrent,pass,passConfirm
    )
    if(res.data.status === 'success'){
      showAlert('success' , 'Password successfully updated')
    }
  } 
  catch (error) {
    showAlert('error', error.response.data.message)  
  }
}
