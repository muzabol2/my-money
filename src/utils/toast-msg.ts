import { toast } from "react-toastify";

const getToastMsg = (msg: string) => toast.info(msg);

export { getToastMsg };
