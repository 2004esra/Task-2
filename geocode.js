const request = require("request")


const geocode=( countryName , callback)=>{

    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ countryName +".json?access_token=pk.eyJ1IjoiZXNyYWEtMTIzNCIsImEiOiJjbHlzemVqd3Mwb2RlMnNxNjE3MW54eG81In0.QIfkju4KbDUBip4DGkxEaw"

    request({ url : geocodeUrl , json : true } , ( error , response) => {

if(error){

    callback("Unable to access Geocode" , undefined)
    
}
else if(response.body.features.length == 0){

    callback("Unable to fined location" , undefined)
    
}
else if(response.body.message)
{
    callback(response.body.message , undefined)
}
else{
    callback(undefined , {
          longitude : response.body.features[0].center[0],
          latitude : response.body.features[0].center[1]
    })
}

    })

}
module.exports=geocode