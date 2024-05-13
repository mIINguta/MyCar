export default function isAuthenticated(token?:string){
    token? localStorage.setItem('tokenAuth', token): console.log("Não foi possivel encontrar o token");

   return (localStorage.getItem('tokenAuth'))? true: false;
}


