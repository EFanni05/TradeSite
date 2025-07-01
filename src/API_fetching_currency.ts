const url:string = "-- MY URL --"
var key:string = ""

async function fetchingAPI(currency : string, type:string) {
    await fetch(url, {
        method : 'POST',
        headers : {
            //the headers
        },
        body : currency
    })
    .then((Response) => {
        if(Response.ok){
            return Response.json()
        }
        else{
            throw new Error(Response.status.toString())
        }
    })
    .then((data) => {
        if(data.type !== null && data.type !== "" && data.type !== undefined){
            if(!isNaN(Number(data.type))){
                // data.type is a valid number
                return data.type;
            } else {
                // data.type is not a valid number
                console.log("Not a valid number:", data.type);
            }
        }
    })
    .catch((error) => {
        alert(`Something went wrong ${error.message}`)
    })
}