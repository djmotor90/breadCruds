//Initialize Express
const express  = require('express');
//Intialize the router of breads
const breads   = express.Router();
// somewhere at the top with the other dependencies 
const Baker = require('../models/baker.js')

// Load in Data from models
const Bread = require('../models/bread.js');

// Index:
breads.get('/', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      Bread.find()
      .then(foundBreads => {
          res.render('index', {
              breadsData: foundBreads,
              bakers: foundBakers,
              title: 'Index Page'
          })
      })
    })
})


breads.post('/', (request,response) =>
{
    if (!request.body.image) 
    {
        request.body.image = undefined;
    }
    if(request.body.hasGluten === 'on') 
    {
      request.body.hasGluten = true;
    }
    else 
    {
      request.body.hasGluten = false;
    }
    Bread.create(request.body)
    response.redirect('/breads')
});




// in the new route
breads.get('/new', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
                bakers: foundBakers
            })
      })
})


//Dynamic Routes
//Purpose: show the information for every existing bread
breads.get('/:id', (request, response) => 
{
    Bread.findById(request.params.id)
    .populate('baker')
    .then(foundBread => 
    {
      const bakedBy = foundBread.getBakedBy()
      console.log(bakedBy)
        response.render('showBreadInfo', 
        {
            bread: foundBread,
            title: 'Bread Entry: ' + foundBread.name
        });
    })
    .catch(err => {
      console.error(err);
      response.status(404).send('<h1> 404 Page not Found </h1>');
    })
});

//DELETE a bread
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})


// UPDATE
breads.put('/:id', (request, response) => 
{
    if(request.body.hasGluten === 'on')
    {
      request.body.hasGluten = true
    } 
    else 
    {
      request.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(request.params.id, request.body, { new: true }) 
      .then(updatedBread => {
        console.log(updatedBread); 
        response.redirect(`/breads/${request.params.id}`) 
      })
});

// EDIT
breads.get('/:id/edit', (request, response) => 
{
  Baker.find()
  .then(foundBakers => {
  Bread.findById(request.params.id)
  .then(foundBread => 
  {
      response.render('editPage', 
      {
          bread: foundBread,
          bakers: foundBakers
      });
  })
})
  .catch(err => {
    response.status(404).send('<h1> 404 Page not Found </h1>');
  })
})

breads.get('/data/seed', (req, res) => {
  Bread.insertMany([
    {
      name: 'Rye',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    },
    {
      name: 'French',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    },
    {
      name: 'Gluten Free',
      hasGluten: false,
      image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    },
    {
      name: 'Pumpernickel',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    }
  ]
  )
    .then(createdBreads => {
      res.redirect('/breads')
    })
})

  



module.exports = breads;
