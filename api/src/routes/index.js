const { Router} = require('express');
/* const { JSON } = require('sequelize'); */
const {fetch}= require('cross-fetch');
require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {API_KEY} = process.env;
const {Videogame,Genre,Platform} = require('../db.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames',async(req,res)=>{
    try{
        const {name}= req.query;
        const where= {};
        if(name) where.name= name;
        var DbVideogames= await Videogame.findAll({where});
        var ApiVideogames= [];
        for (let i=1;i<=5;i++){
            await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
            .then(data=>data.json())
            .then(data=>data['results'])
            .then(data=>{
                let arr = [];
                if(name){
                    for(let e in data){
                        if((data[e].name).toUpperCase().includes(name.toUpperCase())){
                            arr.push({
                                id:data[e].id,
                                name:data[e].name,
                                released:data[e].released,
                                background_image:data[e].background_image,
                                rating:data[e].rating,
                            })
                        }
                    }
                }else{
                    for(let e in data){
                        arr.push({
                            id:data[e].id,
                            name:data[e].name,
                            released:data[e].released,
                            background_image:data[e].background_image,
                            rating:data[e].rating,
                        })
                    }
                }
                ApiVideogames= ApiVideogames.concat(arr)
            })
        }
        if(Object.keys(ApiVideogames.concat(DbVideogames)).length === 0 ){
            res.status(204).send('No Games available')
        }else{
            res.status(200).json(ApiVideogames.concat(DbVideogames))
        }
    }
    catch(err){
        res.status(404).send(err)
    }
})
module.exports = router;
