

const express= require('express')
const Order= require('./Order')

const app=express()
app.use(express.json())

function loadData(){
    var orderList= new Array(
        new Order('101','laptop','electronics'),
        new Order('102','mobile','electronics'), 
        new Order('103','charger','electronics'),
        new Order('104','soap','essentials')
    )
    return orderList
}
let orderList= loadData()

app.get('/orders',(req,res) =>{
    let orders=[]
    let category=req.query.category
    if(req.query.category){
        orders=orderList.filter((item) => item.category===category)
    }else {
        orders=orderList
    }
    res.status(200).send(orders)
})
app.listen(9090,()=>{
    console.log('server for order is ready');
})
