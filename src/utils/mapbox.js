const request =require('request')

const geocoding=(loc,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+loc+'.json?access_token=pk.eyJ1IjoiZ293dGhhbTEyODAiLCJhIjoiY2wxb2VncjF3MTNyNzNib2JmdXl5MjIzdyJ9.Jll_ufG_Zt4oneQS0I_M7A&limit=1'
    request({url:url,json:true},(err,{body})=>{
        if(err){
            callback('please check your internet connection ')
        }else if(body.features===undefined||false){
            callback("unable to fetch please try again")
        }else{
            callback(undefined,{
                longitude: body.features[0].center[0],
                lattitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocoding



