const express = require('express');
const router = express.Router();
const axios = require('axios');
const {Temperament} = require('../db.js');
const {YOUR_API_KEY} = process.env; // trae la apikey

// Traigo todos los temperamentos de la api y si no estan aun en la base de datos los guardo
// GET /types

router.get ('/', async (req, res) => {
    try {
        const infoAxios = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)).data; // traigo la info de la api
        let allTemperament = infoAxios.map((e) => e.temperament) // filtro la info de la api
        allTemperament = allTemperament.map((e) => e?.split(', ')); // divido las strings de los temperamentos en un array
        let Temperaments = [...new Set(allTemperament.flat())]; // convierto el array en un set para eliminar los repetidos con flat
        Temperaments.forEach((e) => { // recorro el set para guardar los temperamentos en la base de datos
            if(e) {
                Temperament.findOrCreate({
                    where: { name: e}
                });
            };
        });
        Temperaments = await Temperament.findAll();
        res.status(200).json(Temperaments);
    } catch (error) {
        console.log(error);
    }
});




































/* router.get ('/', async (req, res) => {
    console.log('llego');

    try{
        const temperaments = await Temperament.count(); // busco en la tabla Temperaments si hay algun tipo
        if (temperaments === 0) { // si no hay, entro a buscar en la api
            let temperaments = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`));
            temperaments = temperaments.data
                if (temperaments) { 
                    console.log('2')
                    temperaments = temperaments.map(t => { // guardo en un array solo los nombres de los temperamentos
                    return {
                        name: t.name
                    }
                    })
                    
                }else{
                    res.sendStatus(500); 
                }
            await Type.bulkCreate(temperaments) // creo los temperamentos en la base de datos
            res.send(temperaments.map(p => p.name)) // retorno los temperamentos
        } else {
            const temperaments = await Type.findAll(); // si hay, los pongo en una variable
            res.send(temperaments.map(p => p.name)) // retorno todos los temperamentos por nombre
    } 

    }catch{
        res.sendStatus(500); 
    }
}) */
module.exports = router;