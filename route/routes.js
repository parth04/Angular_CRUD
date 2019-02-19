var express = require('express')
var router = express.Router()

const Item = require('../model/shoppingItem.js')


//Retrieving data from db
router.get('/getItems',(req,res,next)=>{
    Item.find(function(err,items){
        if(err){
            res.json(err)
        }
        else{
            res.json(items)
        }
        
    })
})

//Inserting new data
router.post('/putItems',(req,res,next)=>{
    let newShoppingItem = new Item({
        itemName : req.body.itemName,
        itemQuantity : req.body.itemQuantity,
        itemBought : req.body.itemBought
    })

    newShoppingItem.save((err,item)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json({msg: "Item has been added successfully"})
        }
    })
})

//Updating the data
router.put('/updateItems/:id',(req,res,next)=>{
    Item.findOneAndUpdate({_id: req.params.id},{
        $set:{
            itemName : req.body.itemName,
            itemQuantity : req.body.itemQuantity,
            itemBought : req.body.itemBought
        }
    },
    function(err,result){
        if(err){
            res.json(err)
        }
        else{
            res.json(result)
        }
    })
        
})

//Deleting the data
router.delete('/deleteItems/:id',(req,res,next)=>{
    Item.remove({_id: req.params.id},function(err,result){
        if(err){
            res.json(err)
        }
        else{
            res.json(result)
        }
    })
})

module.exports = router
