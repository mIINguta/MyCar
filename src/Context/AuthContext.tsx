import { create } from "domain";
import { createContext} from "react";

 interface IAuthContext{
   userId: string;
   setUserId: any; 
   userName:string,
   setUserName: any,
   userEmail: string;
   setUserEmail: any;
   userToken:string;
   setUserToken: any
}
export const AuthContext = createContext({} as IAuthContext);


