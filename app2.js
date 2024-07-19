const request = require("request")


const url = "https://api.weatherapi.com/v1/current.json?key=7db4564fb81b4da18c8235151241707&q=china&aqi=no"
request({url , json : true},(error,response)=>{

if(error){
    console.log("Unable to access weather page")
}else if(response.body.error){
    console.log(response.body.error.message)
}else{
    console.log(response.body.location.name,response.body.current.condition.text)
}

})

const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/egypt.json?access_token=pk.eyJ1IjoiZXNyYWEtMTIzNCIsImEiOiJjbHlzemVqd3Mwb2RlMnNxNjE3MW54eG81In0.QIfkju4KbDUBip4DGkxEaw"

request({url : geocodeUrl , json : true},(error , response)=>{

    if(error)
    {
        console.log("Unable to access mapbox Page")
    }else if(response.body.message)
    {
        console.log(response.body.message)
    }else if(response.body.features.length===0) {
      console.log("Error:Invalid Country Name")
    }else
    {
      const longitude=response.body.features[0].center[0];
      const latitude=response.body.features[0].center[1];
      console.log(longitude,latitude)
    }

    
})

const forecast = require("./forecast")

const geocode = require("./geocode")


const country = process.argv[2]

geocode(country , (error , data) => {
    console.log("Error : " , error)
    console.log("Data : " , data)

    forecast(data.latitude , data.longitude , (error , data) =>{
        console.log("Error : " , error)
        console.log("Data : " , data)
    })
})


