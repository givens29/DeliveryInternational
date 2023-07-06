const profileForm = document.getElementById('profile');
const dataForm = document.getElementById('data-form');
fetch('https://food-delivery.kreosoft.ru/api/account/profile', {
  method: 'GET',
  headers: {
    'Authorization': "Bearer " + localStorage.getItem("access_token"),
    'Accept': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    const name = document.getElementById('name');
    name.value = data.fullName;
    const email = document.getElementById('email');
    email.value = data.email;
    const birthdate = document.getElementById('birthdate');
    const date = new Date(data.birthDate);
    const formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    birthdate.value = formattedDate;
    const gender = document.getElementById('gender');
    gender.value = data.gender;
    const address = document.getElementById('address');
    address.value = data.address;
    const phonenumber = document.getElementById('phone-number');
    phonenumber.value = data.phoneNumber;
    
  })
  .catch(error => console.error(error));

const editProfile = document.getElementById('editProfile');
editProfile.addEventListener('click', function() {
  event.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const birthdate = document.getElementById('birthdate');
  const gender = document.getElementById('gender');
  const address = document.getElementById('address');
  const phonenumber = document.getElementById('phone-number');
  const editProfile ={
       fullName: name.value,
       birthDate: birthdate.value,
       gender: gender.value,
       address: address.value,
       phoneNumber: phonenumber.value
  }
  fetch('https://food-delivery.kreosoft.ru/api/account/profile', {
    method: 'PUT',
    headers: {
      'Authorization': "Bearer " + localStorage.getItem("access_token"),
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editProfile)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return;
  })
    .then(data => {})
    .catch(error => console.error(error));     
});
