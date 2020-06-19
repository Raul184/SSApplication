const login = async (em,pass) => {
  try {
    const user = await axios({
      method: 'POST',
      url: '/api/v1/users/login' , 
      data: {
        email: em,
        password: pass
      }
    })
    console.log(user);
  } 
  catch (err) {
    console.log(err.response.data);  
  }
}

document.querySelector('.form').addEventListener('submit' , e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email , password)
})