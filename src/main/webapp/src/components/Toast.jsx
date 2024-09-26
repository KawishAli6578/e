import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function configure(toastId, timer, showProgressBar, position) {
  return {
    position: position || 'top-center',
    autoClose: timer ? (timer === 'off' ? false : timer) : 5000,
    hideProgressBar: showProgressBar ? false : true,
    transition: Slide,
    closeOnClick: true,
    newestOnTop: true,
    toastId: toastId ? toastId : '000'
  };
}
const Toast = {
  success(message, toastId, timer, showProgressBar, position) {
    toast.success(message, configure(toastId, timer, showProgressBar, position));
  },
  warn(message, toastId, timer, showProgressBar, position) {
    toast.warn(message, configure(toastId, timer, showProgressBar, position));
  },
  error(message, toastId, timer, showProgressBar, position) {
    toast.error(message, configure(toastId, timer, showProgressBar, position));
  },
  info(message, toastId, timer, showProgressBar, position) {
    toast.info(message, configure(toastId, timer, showProgressBar, position));
  },
  dismiss(toastId) {
    toast.dismiss(toastId);
  }
};

export default Toast;
