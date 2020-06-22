import '@babel/polyfill'
import {login,logout} from './login'
import {displayMap} from './mapbox'
console.log('Parcel');

const loginForm = document.querySelector('.form')
const logoutBtn = document.querySelector('.nav__el--logout')
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
  console.log(logoutBtn);
  logoutBtn.addEventListener('click', logout)
}