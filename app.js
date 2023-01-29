const express = require('express');

const app = express();
app.use(express.json());

//-----------------------------------------------------------------------------------

//GET request
app.get('/', (req, res) => {
    res.send('Successful response.');
  });
app.listen(3000, () => console.log('Example app is listening on port 3000.'));

//-----------------------------------------------------------------------------------

const genres = [
    {id: 1, name:'one', year:'2000', month: '1'}, 
    {id: 2, name:'two', year:'2000', month: '2'},
]

//-----------------------------------------------------------------------------------

//GET request
app.get('/home', (req,res)=>{
    res.send(genres);
});

//-----------------------------------------------------------------------------------

//GET request
app.get('/home/ID/:id', (req, res)=>{
    const genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre){
        res.status(404).send("The genre with the given ID was not found");
    }
        res.send(genre);
});

//-----------------------------------------------------------------------------------

//GET request
app.get('/home/YearMonth/:year/:month', (req, res)=>{
    let years = genres;

    let filteredYear = years.filter(years => years.year.includes(req.params.year) && 
    years.month.includes(req.params.month));
    res.send(filteredYear)
});

//-----------------------------------------------------------------------------------

//POST request
app.post('/home', (req,res) => {                 

    names = req.body.name;  
    let num = names.length; 

    if(num>3){
        const array ={
            id: genres.length +1,
            name:JSON.stringify(req.body.name), 
            year:JSON.stringify(req.body.year), 
            month:JSON.stringify(req.body.month), 
        }
        genres.push(array);    
        res.end(res.body); 

    }
    else{
        res.end("Name has to be greater than 3");
    }
    });
    
//-----------------------------------------------------------------------------------

//PUT request
    app.put('/home/:id', (req,res)=>{   
        //Write the code in order to look up the genre, if not existing return a 404
        const genre = genres.find(c=> c.id === parseInt(req.params.id));
        if(!genre){
            res.status(404).send("The genre with the given ID was not found");
        }
            //update the genre                  
            const array2 ={
                id: parseInt(req.params.id),                            
                name:JSON.stringify(req.body.name), 
                year:JSON.stringify(req.body.year), 
                month:JSON.stringify(req.body.month), 
            }
            genres.splice(parseInt(req.params.id)-1, 1, array2);                         

            res.send(genres);
    });


//-----------------------------------------------------------------------------------

//DELETE request
    app.delete('/home/:id', (req,res)=>{
    //code the following logic
    //look up the course by id
    const genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre){
            //return 404 if does not exist
            res.status(404).send("The genre with the given ID was not found");
    }
    else{
        //delete the course by index HINT: use the indexOf() and splice() methods
        genres.splice(parseInt(req.params.id)-1, 1);
        // return the response to the client the course that was deleted
        res.send(genres);

    }
    });

//-----------------------------------------------------------------------------------

    function removeObjectWithId(arr, id) {
        const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
      
        if (objWithIdIndex > -1) {
          arr.splice(objWithIdIndex, 1);
        }
      
        return arr;
      }
        

 /*
      Raymond Chen 
      Period 7-8 Even 
      1/28/2023 

      Reflection: 
      It request to view a web page, the request get send to server where it then send it 
      to the browser. I learned how to do node.js and use express. This project can be furthur 
      extended by adding more filters and features to the program. 
 */