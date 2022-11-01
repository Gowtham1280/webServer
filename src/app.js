const path=require('path')
const forecast=require('./utils/forecast')
const geocoding=require('./utils/mapbox')
const express=require('express')
const hbs=require('hbs')
const { title } = require('process')
const app=express()

const homeDir=path.join(__dirname,'../public')
const viewsDir=path.join(__dirname,'../templates/views')
const partDir=path.join(__dirname,'../templates/partials')
app.use(express.static(homeDir))
app.set('view engine','hbs')
app.set('views',viewsDir)
hbs.registerPartials(partDir)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'In home page Gowtham',
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'In about Gowtham',
        title:'About me'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Gowtham is a very good boy he Helps',
        title:'Help me'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"please enter address"
        })
    }
    if(req.query.address){
        geocoding(req.query.address,(err,{lattitude,longitude,location}={})=>{
            if(err){
              return res.send(err)
            }
           forecast(lattitude,longitude,(err,forecastData)=>{
               if(err){
                   res.send(err)
               }
               res.send({
                   lattitude,longitude,place:req.query.address,forecastData
               })
           })
        })    
    }
})

app.get('/help/*',(req,res)=>{
    res.render('err',{
        name:'gowtham in help error',
        title:'errorneous',
        errorMessage:'Help page not found'
    })
})

app.get('*',(req,res)=>{
  res.render('err',{
      title:'404',
      name:'Error',
      errorMessage:'Error 404 page not found'
  })
})

app.listen(3000,()=>{
    console.log('web server is up and run')
})
