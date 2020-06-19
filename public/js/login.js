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

    if(user.data.status === 'success'){
      window.setTimeout(() => {
        location.assign('/')
      }, 1000)

    }
  } 
  catch (err) {
    alert(err.response.data.message);  
  }
}

document.querySelector('.form').addEventListener('submit' , e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email , password)
})