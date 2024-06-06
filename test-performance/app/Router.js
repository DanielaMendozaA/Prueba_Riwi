import { NavbarLayoutComponent } from "./components/navbar-layout/navbar-layout.component";
import { routes } from "./routes"

export function Router(){
   const path = window.location.pathname;
   const idRol = localStorage.getItem('userRol');
   console.log(idRol);
  

   if(path === '/dashboard'){
       if(!localStorage.getItem('token')){
            navegateTo('/not-found')
            return
       }
   }

   if(path === '/register' || path === '/login' || path === '/'){
        if(localStorage.getItem('token')){
            navegateTo('/dashboard')
            return
        }
   }

   if(path === '/'){
        if(!localStorage.getItem('token')){
            navegateTo('/login')
        }
   }

   const publicRoute = routes.public.find(route => route.path === path);
   const privateRoute = routes.private.find(route => route.path === path);
   const administratorRoute = routes.administrator.find(route => route.path === path);

   if(publicRoute){
        publicRoute.application()
        return;
   }

   if(privateRoute){
        if(localStorage.getItem('token')){
        const {page, logic} = privateRoute.application();
        NavbarLayoutComponent(page, logic);
        return
        }
   }

   if(administratorRoute){
      if(localStorage.getItem('token') && idRol === "1"){
        const {page, logic} = administratorRoute.application();
        NavbarLayoutComponent(page, logic);
        return
      }else{
          navegateTo('/not-found');
      }
   }
   
   if(!publicRoute && !privateRoute && !administratorRoute){
          navegateTo('/login');
     }

}

export function navegateTo(path){
    window.history.pushState({}, '', window.location.origin + path);
    Router();

}

window.onpopstate = Router;