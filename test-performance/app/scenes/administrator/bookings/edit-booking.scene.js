import { fetchApi } from "../../../helpers/fetch-api";
import styles from './create-booking.styles.css'

export function EditBookingScene(){
    const page = `

        <div class=${styles.fatherContainer}>
            <form class=${styles.formEdit} name="formFlight">
                <p id="number"></p>
                <p id="origin"></p>
                <p id="destination"></p>
                <div class=${styles.containerInputs}>
                    <input type="datetime-local" placeholder="Departure Date" id="departureDate"/>
                    <input type="datetime-local" placeholder="Arrival Date" id="arrivalDate"/>
                    <input type="number" placeholder="capacity" id="capacity"/>
                    <button type="submit">Edit</button>
                </div>
            </form>
        </div>
        <div id="container-edit"></div>
    `;

    const logic = async () => {
        const searchParams = window.location.search;
        const paramsTransformed = new URLSearchParams(searchParams)
        const bookingId = paramsTransformed.get('bookingId')
        
        const $formFlight = document.getElementsByName('formFlight')[0];
        const $inputNumber = document.getElementById('number');
        const $inputOrigin = document.getElementById('origin');
        const $inputDestination = document.getElementById('destination');
        const $inputDeparture = document.getElementById('departureDate');
        const $inputArrival = document.getElementById('arrivalDate');
        const $inputCapacity = document.getElementById('capacity')

        const flightApi = await fetchApi(`http://localhost:3000/flights/${bookingId}`)
        
        $inputNumber.textContent = `Flight Number: ${flightApi.number}`
        $inputOrigin.textContent = `Origin: ${flightApi.origin}`
        $inputDestination.textContent = `Destination: ${flightApi.destination}`
        $inputDeparture.value = flightApi.departure
        $inputArrival.value = flightApi.arrival
        $inputCapacity.value = flightApi.capacity    

        $formFlight.addEventListener('submit', async (e) => {
            e.preventDefault();
            await fetchApi(`http://localhost:3000/flights/${bookingId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        departure:  $inputDeparture.value,
                        arrival: $inputArrival.value,
                        capacity: parseInt($inputCapacity.value)
                    }
                )
            })
            alert("Edited flight")

        }); //Cierre listener



    }

    return{
        page,
        logic
    }

}