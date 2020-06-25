import axios from 'axios'
import {showAlert,hideAlert} from './alert'
export const login = async (em,pass) => {
  try {
    const user = await axios({
      method: 'POST',
      url: '/api/v1/users/login' , 
      data: {
        email: em,
        password: pass
      }
    })

    if(user.data.status === 'success'){
      showAlert('success', 'Enjoy your session!')
      window.setTimeout(() => {
        location.assign('/')
      }, 1000)

    }
  } 
  catch (err) {
    showAlert('error', err.response.data.message);  
  }
}

export const logout = async (em,pass) => {
  try {
    const res = await axios({
      method:'GET',
      url:'/api/v1/users/logout'
    })
    if((res.data.status = 'success')) location.reload(true)
  } 
  catch (err) {
    showAlert('error', err.response.data.message);  
  }
}