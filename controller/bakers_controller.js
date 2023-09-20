// dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')
const Bread = require('../models/bread.js');

// Index:
baker.get('/', (req, res) => {
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

  



baker.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
})

// Show: 
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
        .populate('breads')
        .then(foundBaker => {
            res.render('bakerShow', {
                baker: foundBaker
            })
        })
})

// delete
baker.delete('/:id', (req, res) => {
    Baker.findByIdAndDelete(req.params.id) 
      .then(deletedBaker => { 
        res.status(303).redirect('/breads')
      })
})


// export
module.exports = baker
