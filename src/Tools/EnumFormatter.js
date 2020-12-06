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

export function formatWatchableType(type){
    switch(type){
        case 1:
            return 'Movie';
        case 2:
            return 'TvSeries';
        case 3:
            return 'Anime';
        default:
            return 'Invalid!!!';
    }
}