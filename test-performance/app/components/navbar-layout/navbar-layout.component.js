import { navegateTo } from '../../Router';
import styles from './navbar-layout.styles.css'

export function NavbarLayoutComponent(page,logic){
    const root = document.getElementById('root')
    
    root.innerHTML = `
        <nav class=${styles.navbar}>
            <ul>
                <li><a href="/dashboard">Home</a></li>
                <li><a href="/booking">Booking</a></li>
                <li><a id="logout">Logout</a></li>
            </ul>
        </nav>
        ${page}

    
    
    `;

    const $idLogOut = document.getElementById('logout');
    $idLogOut.addEventListener('click', () => {
        localStorage.clear();
        navegateTo('/login');
    })

    logic();

}