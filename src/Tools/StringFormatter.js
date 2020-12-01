
import { format } from 'date-fns';

export function formatDate(string){
    return format(new Date(string), 'yyyy-MM-dd');
}