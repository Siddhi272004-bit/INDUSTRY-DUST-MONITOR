const container=document.querySelector('.container');
const registration=document.querySelector('.register-btn');
const login=document.querySelector('.login-btn');

registration.addEventListener('click',()=>{
    container.classList.add('active');
})
login.addEventListener('click',()=>{
    container.classList.remove('active');
})