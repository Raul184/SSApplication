import '@babel/polyfill'
import {login,logout} from './login'
import {displayMap} from './mapbox'
import {updateData} from './updateAccount'
import { showAlert } from './alert';
console.log('Parcel');

const loginForm = document.querySelector('.form--login')
const logoutBtn = document.querySelector('.nav__el--logout')
const userForm = document.querySelector('.form-user-data')
const mapbox = document.getElementById('map')
if(mapbox){
  const locations = JSON.parse(document.getElementById('map').dataset.locations)
  displayMap(locations)
}
if(loginForm){
  loginForm.addEventListener('submit' , e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email , password)
  })
}
if(logoutBtn){
  logoutBtn.addEventListener('click', logout)
}

if(userForm){
  userForm.addEventListener('submit', e => {
    e.preventDefault()
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if(name.length > 0 && email.length > 0){
      updateData(name,email);
    }else{
      showAlert('error', 'Please verify your fill in the info want to update')
    }
  })
}