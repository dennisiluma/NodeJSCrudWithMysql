import express from 'express';
import pool from './db/connection.js';

const app = express();
app.use(express.json());

app.listen(4000, ()=>{
    console.log('Server is running on port 4000');
});

//Create a post endpoint to save data to database
app.post('/items', (req, res)=>{
    console.log(req.body);
    const {name, description} = req.body;
    pool.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err, result)=>{
        if(err){
            res.status(500).send("Server Error. Could not save to Database")
        }else{
            res.status(201).send("😁 Successfully Saved To Database")
        }
    });
});

//GET ALL DATA FROM DATABASE
app.get('/items', (req, res)=>{
    pool.query('SELECT * FROM items', (err, result)=>{
        if(err){
            res.status(500).send("Server Error")
        }else{
            res.json(result);
        }
    })
});

//GET Single Data By ID
app.get('/items/getById/:id', (req, res) =>{
    const itemId = req.params.id
    console.log(itemId)
    pool.query('SELECT * FROM items WHERE id = ?', [itemId], (err, result)=>{
        if(err){
            res.status(500).send("Server Error");
        }else{
            if(result.length === 0){
                res.status(404).send('Item not found');
            }else{
                res.send(result[0]);            }
        }
    });
});

//UPDATE ITEM
app.put('/items/update/:id', (req, res)=>{
    const itemId = req.params.id;
    const {name, description} = req.body;
    pool.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, itemId], (err, result)=>{
        if(err){
            res.status(500).send("server Error");
        }else{
            res.status(201).send(`Item with id ${itemId} was updated to name: ${name}`);
        }
    });
});

//DELETE ITEM
app.delete('/items/delete/:id', (req,res)=>{
    const itemId = req.params.id;
    pool.query('DELETE FROM items WHERE id = ?', [itemId], (err, result)=>{
        if(err){
            res.status(500).send("Item Wasn't Deleted. Server Error. Try again")
        }else{
            res.send("Item Sucessfully Deleted");
        }
    })
})