
const { add, err, promiseTest, app } = require('../index')
const supertest =require('supertest')
test('toBe',()=>{
    expect(add(2,3)).toBe(5)
})
test('toEqual',()=>{
    expect(add(2,3)).toBeDefined()
})
test('toBeNUll',()=>{
    expect(add(2,3)).not.toBeNull()
})
test('toBeLessThan',()=>{
    expect(add(2,3)).toBeLessThan(6)
})
test('toMatch',()=>{
    expect(add('Hello','world')).toMatch(/Hello/)
})
test('toError',()=>{
    expect(()=>err()).toThrow('its an error')
})
test('promise passtest',()=>{
    expect(promiseTest(5,3)).resolves.toBe('Positive')
})
test('express',async()=>{
await supertest(app)
.get('/users')
.expect(200)
.then(result => {
    expect(result && result.body && typeof result.body ==='object')
})
})



---
  
const express=require('express')
const app= express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const users=[{name:'mahesh',email:'mahesh@mail.com',pass:'pass@123'}]

app.get("/users",(req,res)=>{
    res.status(200).json(users)
})

const add=(a,b)=>{
    return a+b
}
const err= ()=>{
    throw new Error('its an error')
}
const data=()=>{
    return ['admin']
}
const promiseTest=(a,b) =>{
    return new Promise((resolve,reject)=> {
        if(a-b>0){
            resolve('Positive')
        }else {
            reject('negative')
        }
    })
}
app.listen(4000)
module.exports={
    add,err,promiseTest,app
}
