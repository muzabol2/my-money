import dayjs from "dayjs";

export const toNumber = (amount: string) => Number(amount.replace(/,/, "."));

export const formatDate = (date: string) => dayjs(date).format("DD/MM/YYYY").toString();

export const formatInputDate = (date: string) => dayjs(date).format("YYYY-MM-DD").toString();

export const generateCurrentDate = () => dayjs().toString();
