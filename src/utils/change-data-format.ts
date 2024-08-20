import dayjs from "dayjs";

const toNumber = (amount: string) => Number(amount.replace(/,/, "."));

const formatDate = (date: string) => dayjs(date).format("DD/MM/YYYY").toString();

const formatInputDate = (date: string) => dayjs(date).format("YYYY-MM-DD").toString();

const generateCurrentDate = () => dayjs().toString();

export { toNumber, formatDate, formatInputDate, generateCurrentDate };
