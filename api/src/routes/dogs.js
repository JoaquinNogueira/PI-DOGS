const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Dog, Temperament} = require('../db.js');
const {YOUR_API_KEY} = process.env; // trae la apikey

const getApiInfo = async () => { // trae la info de la api
    try {
        const infoAxios = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)); // filtro la informacion de la api
        const infoRace = await infoAxios.data.map( e => {
            return {
                name: e.name,
                id: e.id,
                weight_min: parseFloat(e.weight.metric.slice(0, 2)),
                weight_max: parseFloat(e.weight.metric.slice(4)),
                height_min: parseFloat(e.height.metric.slice(0, 2)),
                height_max: parseFloat(e.height.metric.slice(4)),
                years_life_min: parseFloat(e.life_span.slice(0, 2).trim()),
                years_life_max: parseFloat(e.life_span.slice(4).trim()),
                temperament: e.temperament,
                image: e.image.url,
            }

        });
        return infoRace;

    } catch (error) {
        console.log(error);
    }
}

const getDBInfo = async () => { // trae la info de la base de datos
    const infoDB = await Dog.findAll({
        include: {
            model: Temperament, 
            attributes: ['id', 'name'],
            through: { // mediante 
                attributes: []
            }
        }
    });
    return infoDB;
}

const getAllInfo = async () => { // trae la info de la base de datos y la api
    const infoDB = await getDBInfo();
    const infoApi = await getApiInfo();
    const allInfo = infoApi.concat(infoDB); // concateno la info de la api con la de la base de datos
    return allInfo; // retorno toda la info junta
}
// GET /dogs
// GET /dogs?name

router.get ('/', async (req, res) => {
    try {
        const name = req.query.name; // traigo el nombre de la raza
        const dogs = await getAllInfo(); // traigo la info de la base de datos y la api
            if (name) { 
                const dog = dogs.filter(e => e.name === name); // filtro la info de la api y la base de datos
                dog.length > 0 ? res.json(dog) : res.status(404).json({error: 'Raza no existente'}); // si hay una raza con ese nombre, lo retorno, sino retorno un error
            } else {
                res.json(dogs); // si no hay nombre, retorno toda la info
            }
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET /dogs/{id}

router.get ('/:id', async (req, res) => {
    try {
        console.log('1')
        const id = req.params.id // traigo el id de la raza
        const dogsId = await getAllInfo(); // traigo la info de la base de datos y la api
        if (id) {
            let dogId = dogsId.filter(e => e.id == id); // filtro la info de la api y la base de datos
            console.log(dogId)
            dogId.length > 0 ? res.json(dogId) : res.status(404).json({error: 'No se encontro raza con ese id'}); // si hay una raza con ese id, lo retorno, sino retorno un error
        } else {
            res.json(dogsId); // si no hay id, retorno toda la info
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST /dog

router.post ('/', async (req, res) => {
    const {
        name,
        temperament,
        height_min,
        height_max,
        weight_min,
        weight_max,
        years_life_min,
        years_life_max,
        image,
        
      } = req.body;
  try {
    if(name && height_min && height_max && weight_min && weight_max && years_life_min && years_life_max && temperament && image) {
        console.log('2')
    const createBreed = await Dog.create ({
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      years_life_min,
      image,
    })
    // console.log(temperament)
    temperament.map(async e => {
        const temperamentDb = await Temperament.findAll({
            where: {name: e}
        })
        console.log(temperamentDb)
    createBreed.addTemperament(temperamentDb);
    })
        res.status(200).send(createBreed)
      } else {
        res.status(404).send({msg: 'No puede crearse la raza'})
      }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;