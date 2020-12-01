export function formatCreatorType(type){
    switch(type){
        case 1:
            return 'Developer';
        case 2:
            return 'Publisher';
        case 3:
            return 'Director';
        default:
            return 'Creator';
    }
}