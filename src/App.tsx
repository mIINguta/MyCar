import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import AppRoutes from './routes/Route'; 
export default function App() {
 
  
  return (
    <>
      <AppRoutes/>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
            />
      </>
  )
}


