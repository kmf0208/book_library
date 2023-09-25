const express = require('express')
const app = express()
const BodyParser = require('body-parser')
const mongoose = require('mongoose');
const db = 'mongodb://localhost/example'
const Book = require('./Book.model')
const port = 8080;
const Book = require('./Book.model');
const bodyParser = require('body-parser');


mongoose.connect(db)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))



app.get('/', function(req, res){
    res.send('happy to be here')
})

app.get('/books', function(req, res){
    console.log('getting all the books')
    Book.find({})
    .exec(function(err, books){
        if (err){
            res.send('error have occured')
        }else{
            console.log(books)
            res.json(books)
        }
    })
})

app.get('/books/:id', function(req, res){
    Book.findOne({
    _id: req.params.id
    })
    .exec(function(err, book){
        if(err){
            res.send('error occured')

        }else{
            console.log(book)
            res.json(book)
        }
    })
})




app.post('/book', function(req, res){
    const newBook = new Book()
    
    newBook.title= req.body.title
    newBook.author = req.body.author
    newBook.category = req.body.category
    
    newBook.save(function(err, book){
        if(err){
            res.send('error saving book')
        }else{
            console.log(book)
            res.send(book)
        }
    })
    
})

app.post('/books2', function(req, res){
    Book.create(req.body, function(err, book){
        if(err){
            res.send('error saving book')
        }else{
            console.log(book)
            res.send(book)
        }
    })
})


app.put('/book/:id', function(req, res){
    Book.findByIdAndUpdate({
        _id: req.params.id,

    }, 
    {$set:
        {title:req.body.title}},
        {upsert: true}, 
        function(err, newBook){
            if(err){
            console.log('error ocurred')
        }
        else{
            console.log(newBook)
            res.status(204)
        }
    
})
})


app.delete('/book/:id', function(req, res){
    Book.findByIdAndDelete({
        _id: req.params.id
    }, function(err, book){
        if(err){
            res.send('error deleting a book')
        }else{
            console.log(book)
            res.status(204)
        }
    })
})



app.listen(port, function(){
    console.log('app listening on port'+ port)
});