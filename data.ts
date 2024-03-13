

const express= require('express')
const amqp= require('amqplib/callback_api')
const app= express();

app.get('/customer',(req,res)=>{
    let data={
        id:101,
        name:'User123',
        email:'user@mail.com'
    }
amqp.connect('amqp://localhost',function(err,conn){
    conn.createChannel(function(err,ch){
        const queue= 'message_queue_user'
        const msg= JSON.stringify(data)
        ch.assertQueue(queue,{durable:false})
        ch.sendToQueue(queue,Buffer.from(msg))
        console.log(`sent ${msg} to ${queue}`);

    })
})
    res.send('customer services activated')
})


app.listen(4000,()=>{
    console.log('server is ready');
})







const express= require('express')
const amqp= require('amqplib/callback_api')
const app= express();

app.get('/product',(req,res)=>{

    amqp.connect('amqp://localhost',function(err,conn){
        const queue= 'message_queue_user'
        conn.createChannel(function(err,ch){
            ch.assertQueue(queue,{durable:false})
            console.log('Waiting for the message from QUEUE');
            ch.consume(queue,async function(msg){
                console.log('Message from Queue  ',msg.content.toString());
                await res.send(msg.content.toString())
            },{noAck:true})
        })
    })
    //res.send('product services activated')
})

app.listen(4001,()=>{
    console.log('server is ready');
})
