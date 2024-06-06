import { navegateTo } from '../../../Router';
import { fetchApi } from '../../../helpers/fetch-api';
import styles from './login.styles.css'

export  function LoginScene(){
    
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class=${styles.containerForm}>
            <form class=${styles.form}>
                <div class=${styles.icon}></div>
                <input type="email" placeholder="Enter Your Email" autocomplete="email"/>
                <input type="password" placeholder="Enter Your Password"/>
                <button type="submit">Login</button>
                <a href="/register">haven't you registered yet?</a>
            </form>
        </div>
    `

    const $inputEmail = document.querySelector('input[type="email"]');
    const $inputPassword = document.querySelector('input[type="password"]');
    const $form = document.getElementsByTagName('form')[0];
    
 
    $form.addEventListener('submit' , async (e) => {
        e.preventDefault();

        if(!$inputEmail.value || !$inputPassword.value){
            alert('Please fill all required fields')
            return;
        }

        const users = await fetchApi('http://localhost:3000/users');
        const user = users.find(user => user.email === $inputEmail.value && user.password === $inputPassword.value)
    

        if(user){
            const token = Math.random().toString(36).substring(2);
            localStorage.setItem('token' , token);
            localStorage.setItem('userRol', user.rol );
            localStorage.setItem('userId', user.id);
            navegateTo('/dashboard')
            

        }else{
            alert("User not found")
        }

    });//Cierre evento formulario






}