import { RegisterScene } from "./scenes/public/register-scene/register.scene";
import { LoginScene } from "./scenes/public/login-scene/login.scene";
import { NotFoundScene } from "./scenes/public/not-found-scene/notFound.scene";
import { HomeScene } from "./scenes/private/home-scene/home.scene";
import { CreateBookingScene } from "./scenes/administrator/bookings/create-booking.scene";
import { EditBookingScene } from "./scenes/administrator/bookings/edit-booking.scene";
import { BookingScene } from "./scenes/private/booking-scene/booking.scene";

export const routes = {

    public: [
        {path:'/register', application: RegisterScene},
        {path:'/login', application: LoginScene},
        {path:'/not-found', application: NotFoundScene}
    ],
    private: [
        {path: '/dashboard', application: HomeScene},
        {path: '/booking', application: BookingScene}

    ],
    administrator: [
        {path: '/created-booking', application: CreateBookingScene},
        {path: '/edit-booking', application: EditBookingScene}
    ]

}