import styles from './home.styles.css'
import { fetchApi } from '../../../helpers/fetch-api'
import { navegateTo } from '../../../Router';

export function HomeScene(){

    const page = `
    
        <div>
            <h2 class=${styles.h2}>Current Flights</h2>
            <div id="container-current-f" class=${styles.containerFlights}> 
            </div>
        </div>
    
    
    `;

    const logic = async () => {

        const userRolLocalStorage = localStorage.getItem('userRol');
        console.log(userRolLocalStorage);

        const $containerFlight = document.getElementById('container-current-f');

        const currentFlight = await fetchApi('http://localhost:3000/flights');
        console.log(currentFlight);
        currentFlight.forEach(flight => {
            $containerFlight.innerHTML += `
                <div class=${styles.containerFlight}>
                    <table class=${styles.table}>
                        <tr class=${styles.trTable}>
                            <th>Flight Number</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>Flight Capacity</th>
                            <td rowspan="2"><button class="button-booking" id-flight="${flight.id}" class=${styles.buttonBooking}>Booking</button></td>
                        </tr>
                        <tr class=${styles.trTable}>
                            <td>${flight.number}</td>
                            <td>${flight.origin}</td>
                            <td>${flight.destination}</td>
                            <td>${flight.departure}</td>
                            <td>${flight.arrival}</td>
                            <td>${flight.capacity}</td>
                        </tr>
                    </table>
                    <div class="container-buttons ${styles.containerButtons}" >
                        <button class="buttonEdit" booking-id="${flight.id}">Edit</button>
                        <button class="buttonDelete" booking-id="${flight.id}">Delete</button>
                    </div>

                    
                    
                </div>
            `
        });//Fin foreach

        const $buttonsEdit = document.querySelectorAll('.buttonEdit');
        console.log($buttonsEdit);
        $buttonsEdit.forEach(btn => {
            btn.addEventListener('click', () => {
                navegateTo(`/edit-booking?bookingId=${btn.getAttribute('booking-id')}`)

            })

        });

        const $buttonsDelete = document.querySelectorAll('.buttonDelete');
        console.log($buttonsDelete);
        $buttonsDelete.forEach(btn => {
            btn.addEventListener('click', async () => {
                if(confirm("Are you sure to delete it")){
                    await fetchApi(`http://localhost:3000/flights/${btn.getAttribute('booking-id')}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })//Cierre fetchApi
                alert("Deleted flight")
                }//Cierre if

            });

        });


        const containerButtonAdd = document.createElement('DIV');
        containerButtonAdd.innerHTML = `<button id="buttonAdd" class=${styles.buttonAdd}> Add Flight</button>`
        containerButtonAdd.classList.add(styles.hidden)
        $containerFlight.appendChild(containerButtonAdd)

        if(userRolLocalStorage === "1"){
            containerButtonAdd.classList.remove(styles.hidden)
        }

        const $buttonAdd = document.getElementById('buttonAdd');
        $buttonAdd.addEventListener('click', () => {

            navegateTo('/created-booking')

        })
        
        const $buttonsBooking = document.querySelectorAll('.button-booking');
        console.log("bookin", $buttonsBooking);
        const $containerButtons = document.querySelectorAll('.container-buttons');
        console.log("container", $containerButtons);

        $containerButtons.forEach(async (btn,idx) => {
            const rolApi = await fetchApi(`http://localhost:3000/rol/${userRolLocalStorage}`);

            if(rolApi){
                if(rolApi.rol !== "Administrator"){
                    btn.classList.add(styles.hidden)
                    return
                }else{
                    $buttonsBooking[idx].classList.add(styles.hidden)

                }
            }

            // if(rolApi.rol === "visitor"){
            //     const $containerButton = document.getElementById('buttonAdd')
            // }
            
        });

        $buttonsBooking.forEach(btn => {
            btn.addEventListener('click', () => {
                navegateTo(`/booking?bookingId=${btn.getAttribute('id-flight')}`)
            });

        });

    };

    return{
        page,
        logic
    }

}







// const flight = await fetchApi(`http://localhost:3000/flights/${idFlight}`)
// console.log(flight);
// const $tableFlight =  document.querySelectorAll('.table-flight');
// console.log($tableFlight);
// $tableFlight.forEach(table => {
//     table.innerHTML = `
//     <h2>Flight Information</h2>
//     <tr class=${styles.trTable}>
//         <th>Flight Number</th>
//         <th>Origin</th>
//         <th>Destination</th>
//         <th>Departure</th>
//         <th>Arrival</th>
//         <th>Flight Capacity</th>
//     </tr>
//     <tr class=${styles.trTable}>
//         <td>${flight.number}</td>
//         <td>${flight.origin}</td>
//         <td>${flight.destination}</td>
//         <td>${flight.departure}</td>
//         <td>${flight.arrival}</td>
//         <td>${flight.capacity}</td>
//     </tr>



//     `;

// }); //Cierre ForEach


// const idCreatorUser = reservation.idUserCreated
// console.log(idCreatorUser);
// const $usersCreators = document.querySelectorAll('.creatorUsers');
// const userCreator = await fetchApi(`http://localhost:3000/users/${idCreatorUser}`);
// $usersCreators.forEach(user => {
//     user.innerHTML = `
//         <p>${userCreator.name}</p>
//         <p>${userCreator.email}</p>

//     `


// })