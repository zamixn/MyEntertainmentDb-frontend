
import { format } from 'date-fns';

export function formatDate(string){
    return format(new Date(string), 'yyyy-MM-dd');
}

export function getCurrentDate(separator=''){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}