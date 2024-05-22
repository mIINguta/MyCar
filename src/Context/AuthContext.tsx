import { create } from "domain";
import { createContext} from "react";

 interface IAuthContext{
   userId: string;
   setUserId: any;
}
export const AuthContext = createContext({} as IAuthContext);


