import { fetchApi } from "../../../helpers/fetch-api";
import styles from './create-booking.styles.css'

export function CreateBookingScene(){
    const page = `
        <div>
            <form name="formFlight" class=${styles.formEdit}>
                <input type="text" placeholder="Flight Number" id="number"/>
                <input type="text" placeholder="Origin" id="origin"/>
                <input type="text" placeholder="Destination" id="destination"/>
                <input type="datetime-local" placeholder="Departure Date" id="departureDate"/>
                <input type="datetime-local" placeholder="Arrival Date" id="arrivalDate"/>
                <button type="submit">Add</button>
            </form>
        </div>
    
    `;

    const logic = () => {

        const $formFlight = document.getElementsByName('formFlight')[0];
        const $inputNumber = document.getElementById('number');
        const $inputOrigin = document.getElementById('origin');
        const $inputDestination = document.getElementById('destination');
        const $inputDeparture = document.getElementById('departureDate');
        const $inputArrival = document.getElementById('arrivalDate');
        
      

        
        $formFlight.addEventListener('submit', async (e) => {
            // e.preventDefault();
            if(!$inputNumber.value || !$inputOrigin.value || !$inputDestination.value || !$inputDeparture.value ||!$inputArrival.value){
                alert("Please fill all the fields")
                return
            }
            await fetchApi('http://localhost:3000/flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    number: $inputNumber.value,
                    origin: $inputOrigin.value,
                    destination: $inputDestination.value,
                    departure: $inputDeparture.value,
                    arrival: $inputArrival.value,
                    capacity: 180
                })
            }); //Cierre fetch
            
            alert("Created Flight")



        }); //Cierre listener
    }//Cierre create booking

    return{
        page,
        logic
    }

}