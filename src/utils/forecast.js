const request=require('request')

const forecast=(latt,long,callback)=>{
   const url='http://api.weatherstack.com/current?access_key=8e929b970eec4c5bedcf3bd266470d2e&query='+latt+','+long
   request({url,json:true},(err,{body})=>{
        if(err){
            callback('please check your internet connection and try again',undefined)
        }else if(body.current===undefined){
            callback('please try another search',undefined)
        }else{
            callback(undefined,
                   body.current.weather_descriptions +". the temperature is "+ body.current.temperature+' degrees' + ' and feels like '+body.current.feelslike+ ' degrees out'
                )
        }
   })
}

module.exports=forecast

