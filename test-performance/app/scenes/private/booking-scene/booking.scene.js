import { fetchApi } from "../../../helpers/fetch-api";
import styles from './booking.styles.css'

const createTable = function(container, array){
    return array.map(reservation => {
        container.innerHTML += `
            <div class=${styles.containerTables}>
                <h1>Reservation Id: ${reservation.id}</h1>
                <h2 class=${styles.h2}>Passenger Information</h2>
                <table class=${styles.table}>
                    <tr class=${styles.trTable}>
                        <th>Name Passenger</th>
                        <th>Passengers Number</th>
                        <th>Phone Number</th>
                        <th>Creator User</th>
                    </tr>
                    <tr class=${styles.trTable}>
                        <td>${reservation.namePassenger}</td>
                        <td>${reservation.numberOfPassenger}</td>
                        <td>${reservation.phoneNumber}</td>
                        <td class="creatorUsers" user-id=${reservation.idUserCreated}></td>
                    </tr>
                </table>
                <h2 class=${styles.h2}>Flight Information</h2>
                <table class="table-flight ${styles.table}" id-flight="${reservation.flightId}"></table>
            </div>
        
        `;
    })

    
}

const createTableFlight = function(array){
    return array.forEach(async table => {
        const flight = await fetchApi(`http://localhost:3000/flights/${table.getAttribute('id-flight')}`);
        table.innerHTML = `
            
            <tr class=${styles.trTable}>
                <th>Flight Number</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Flight Capacity</th>
            </tr>
            <tr class=${styles.trTable}>
                <td>${flight.number}</td>
                <td>${flight.origin}</td>
                <td>${flight.destination}</td>
                <td>${flight.departure}</td>
                <td>${flight.arrival}</td>
                <td>${flight.capacity}</td>
            </tr>
        
        `;
    });


}

const insertUsers = function(array){
    array.forEach(async creator => {
        const userCreator =  await fetchApi(`http://localhost:3000/users/${creator.getAttribute('user-id')}`);
        creator.innerHTML = `
            <div class=${styles.containerPUser}>
                <p><span>Name:</span> ${userCreator.name}</p>
                <p><span>Email:</span> ${userCreator.email}</p>
            </div>
        `;
    });//Cierre forEach creator Users

}

export function BookingScene(){
    const page = `
        <div class=${styles.fatherContainer}>
            <div id="container-flight-booking" class=${styles.containerFlightBooking}>
                <div id="container-flight" class=${styles.containerFlight}></div>
                <div id="container-form" class="${styles.hidden}">
                    <form name="formBooging" class=${styles.form}>
                        <input type="text" placeholder="Titular Name" id="full-name"/>
                        <input type="number" placeholder="Number of Passengers" id="numberPassenger"/>
                        <input type="number" placeholder="Phone Number" id="phone"/>
                        <button type="submit">Make Reservation</button>
                    </form>
                </div>
            </div>
        

            <div id="container-reservations" class="${styles.containerReservation}"></div>

        </div>
    
    `;

    const logic = async () => {
        const localRolUser = localStorage.getItem('userRol');
        const searchParams = window.location.search;
        const paramsTransformed = new URLSearchParams(searchParams);
        const bookingId = paramsTransformed.get('bookingId');
        const $containerFlight = document.getElementById('container-flight');
        const flightApi = await fetchApi(`http://localhost:3000/flights/${bookingId}`);
        const userId = localStorage.getItem('userId');
        const $containerReservations = document.getElementById('container-reservations');
        
        if(bookingId){
            $containerFlight.innerHTML = `
            <table class=${styles.table}>
                <tr class=${styles.trTable}>
                    <th>Flight Number</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Flight Capacity</th>
                </tr>
                <tr class=${styles.trTable}>
                    <td>${flightApi.number}</td>
                    <td>${flightApi.origin}</td>
                    <td>${flightApi.destination}</td>
                    <td>${flightApi.departure}</td>
                    <td>${flightApi.arrival}</td>
                    <td>${flightApi.capacity}</td>
                </tr>
            </table>
            <div id="container-button-booking">
                <button id="buttonBooking" id-flight="${flightApi.id}" class=${styles.buttonBooking}>Booking</button>
            </div>
            `;

        }else{
            $containerFlight.classList.remove(styles.containerFlight);

        }


        const $containerForm = document.getElementById('container-form');
        const $buttonBooking = document.getElementById('buttonBooking')

        if(localRolUser === "0" && bookingId){
            $buttonBooking.addEventListener('click', () => {
                $containerForm.classList.remove(styles.hidden)
            });
        }

        const $form = document.getElementsByName('formBooging')[0];
        console.log( $form);
        $form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const $inputName = document.getElementById('full-name');
            const $inputNumberP = document.getElementById('numberPassenger');
            const $inputPhone = document.getElementById('phone');
            const flightId = $buttonBooking.getAttribute('id-flight');

            const flightApi = await fetchApi(`http://localhost:3000/flights/${flightId}`);

            if(flightApi.capacity < $inputNumberP.value){
                alert("There is not enough capacity for the number of passengers")
                return
            }


            if(!$inputName.value || !$inputNumberP.value || !$inputPhone.value){
                alert("Please fill all the fields")
                return
            }else{
                if(confirm('Are you sure to make a reservation')){
                    await fetchApi('http://localhost:3000/booking', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            namePassenger: $inputName.value,
                            numberOfPassenger: $inputNumberP.value,
                            phoneNumber:  $inputPhone.value,
                            idUserCreated: userId,
                            flightId: flightId
                            
                        })
                    })//Cierre fetch


                    let idFlight = flightApi.id
                    let flightCapacity = flightApi.capacity
                    let newCapacity = flightCapacity - $inputNumberP.value
                   
                    await fetchApi(`http://localhost:3000/flights/${idFlight}`,
                        {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                capacity: newCapacity
                            })
                        }
                    );
                    

                }// Cierre if interno

            } // Cierre else



        });


        
        const rolFetchApi = await fetchApi('http://localhost:3000/rol');
        const rolUser = rolFetchApi.find(rol => rol.id === localRolUser)

        const reservations = await fetchApi("http://localhost:3000/booking");
        if(rolUser.rol === "Administrator"){
            
            createTable($containerReservations,reservations)
    
            const $creatorUsers = document.querySelectorAll('.creatorUsers');
            console.log($creatorUsers);
            insertUsers($creatorUsers)

            const $tablesFlights = document.querySelectorAll('.table-flight');
            console.log($tablesFlights);
            createTableFlight($tablesFlights)

        }else{
            const reservationByUser = reservations.filter(reservation => reservation.idUserCreated === userId);
            createTable($containerReservations,reservationByUser)

            const $creatorUsers = document.querySelectorAll('.creatorUsers');
            console.log($creatorUsers);
            insertUsers($creatorUsers)

            const $tablesFlights = document.querySelectorAll('.table-flight');
            console.log($tablesFlights);
            createTableFlight($tablesFlights)

        }
      
        if(rolUser.rol === "Administrator" || !bookingId){
            const $containerInformation = document.getElementById('container-flight-booking');
            $containerReservations.classList.add(styles.width)
            $containerInformation.classList.add(styles.hidden)

        }


    }

    return{
        page,logic

    }

}