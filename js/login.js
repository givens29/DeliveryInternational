const form = document.getElementById('login');
      const email = document.getElementById('email');
      const password = document.getElementById('password')
      form.addEventListener('submit',loginUser);

      function loginUser(event){
        event.preventDefault();

        const user = {
          email: form.elements.email.value,
          password: form.elements.password.value
        }

        fetch('https://food-delivery.kreosoft.ru/api/account/login',{
          method:'POST',
          headers: {"accept": "application/json","Content-Type": "application/json"},
          body:JSON.stringify(user)
        })
        .then(response=>response.json())
        .then(data=>{
          localStorage.setItem('access_token', data.token);
          window.location.href = '/profile.html';
        })
        .catch(error=>{
          console.error('Login failed:',error);
        })
      }