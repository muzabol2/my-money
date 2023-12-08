import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = (): JSX.Element => (
  <ToastContainer
    position="bottom-right"
    autoClose={3000}
    hideProgressBar
    newestOnTop={false}
    draggable={false}
    rtl={false}
    pauseOnFocusLoss
    closeOnClick
    pauseOnHover
  />
);

export default Toast;
