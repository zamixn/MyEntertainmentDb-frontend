export function formatDate(string){
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    // 'en-GB' is day/month/year
    return new Date(string).toLocaleDateString(['en-GB'],options);
}