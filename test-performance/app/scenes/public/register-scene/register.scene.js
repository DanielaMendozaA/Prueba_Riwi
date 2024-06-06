import styles from './register.styles.css'
import { fetchApi } from '../../../helpers/fetch-api'
import { navegateTo } from '../../../Router'

const emailValidator = function(email){
    let isValid = false
    if(email.includes("@") && email.includes(".")){
        isValid = true
    }

    return isValid

}

export function RegisterScene(){
    const root = document.getElementById('root');

    root.innerHTML = `
        <div class=${styles.containerForm}>
            <form class=${styles.form}>
                <div class=${styles.icon}></div>
                <input type="text" placeholder="Enter Your Name" autocomplete="name"/>
                <input type="email" placeholder="Enter Your Email" autocomplete="email"/>
                <input type="date"/>
                <input type="password" placeholder="Enter Your Password"/>
                <button type="submit">Register</button>
                <a href="/login">Are you already registered?</a>
            </form>
        </div>
    `

    const $form = document.getElementsByTagName('form')[0];
    const $inputName = document.querySelector('input[type="text"]');
    const $inputEmail = document.querySelector('input[type="email"]');
    const $inputDateBD = document.querySelector('input[type="date"]');
    const $inputPassword = root.querySelector('input[type="password"]')
   
    $form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const validateEmail = emailValidator($inputEmail.value)
        console.log(validateEmail);

        if(!$inputName.value || !validateEmail || !$inputDateBD.value || !$inputPassword.value){
            alert('Please fill all requeried fields');
            return
        }

        const userCreated = await fetchApi('http://localhost:3000/users',
        { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: $inputName.value,
            email: $inputEmail.value,
            password: $inputPassword.value,
            birthdate: $inputDateBD.value,
            rol: "0"

        })

         
        });//Cierre fetchApi 

        if(userCreated){
               alert('User created successfully');
               navegateTo('/login');
        }else{
            alert('Failed to create user')
        }

    });//Cierre evento del formulario


}