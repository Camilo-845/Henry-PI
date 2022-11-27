const { Router} = require('express');
/* const { JSON } = require('sequelize'); */
const {fetch}= require('cross-fetch');
require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {API_KEY} = process.env;
const {Op,Videogame,Genre,Platform} = require('../db.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames',async(req,res)=>{
    try{
        const {name}= req.query;
        const where= {};
        var search= "";
        var pagesLimit=10;
        if(name) {
            pagesLimit=1;
            search =`&search=${name}`
            where.name= { [Op.iLike]:`%${name}%`};
        }
        var DbVideogames= await Videogame.findAll({where,include:[Genre]});
        var ApiVideogames= [];
        const randomNumber=Math.floor(Math.random()*10)
        for (let i=randomNumber;i<=(randomNumber+pagesLimit);i++){
            await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}${search}`)
            .then(data=>data.json())
            .then(data=>data['results'])
            .then(data=>{
                let arr = [];
                    for(let e in data){
                        arr.push({
                            id:data[e].id,
                            name:data[e].name,
                            released:data[e].released,
                            background_image:data[e].background_image,
                            rating:data[e].rating,
                            genres:data[e].genres.map(element=>{
                                return {
                                    id:element.id,
                                    name:element.name
                                }
                            }),
                            belongs_db:false,
                        })
                    }
                ApiVideogames= ApiVideogames.concat(arr)
            })
        }
        var videogames = [];
        if(name){
                videogames=DbVideogames.concat(ApiVideogames).slice(0,30)
        }else{    
                videogames=DbVideogames.concat(ApiVideogames)
        }
        if(Object.keys(videogames).length === 0 ){
            res.status(204).send('No Games available')
        }else{
            res.status(200).json(videogames.slice(0,200))
        }
    }
    catch(err){
        res.status(404).send(new Error(err).message)
    }
})
router.get("/videogame/:idVideogame",async(req,res)=>{
    try{
        const {idVideogame}= req.params;
        const {belongs_db}=req.query;
        var videogame = null
        if(belongs_db==="true"){
            videogame= await Videogame.findByPk(idVideogame,{include:[Genre,Platform]})
        }else{
            videogame= await fetch(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
            .then(data=>data.json())
            .then(data=>{
                return {
                    id:data.id,
                    name:data.name,
                    released:data.released,
                    background_image:data.background_image,
                    rating:data.rating,
                    description:data.description,
                    platforms:data.platforms.map((el)=>el.platform),
                    genres:data.genres,
                }
            })
        }
        if(Object.keys(videogame).length===0){
            res.status(204).send("no se encontro el videojuego con el Id mandado")
        }else{
            res.status(200).json(videogame)
        }
    }
    catch(err){
        res.status(404).send(new Error(err))
    }
})
router.post("/videogame",async(req,res)=>{
    console.log(req.body)
    const {name,genres,platforms} = req.body;
    if(!name)res.status(404).send("falta parametro name")
    try{
        const videogame = await Videogame.create(req.body)
        if(genres){
            var genresArr = genres.map(async el=>{
                let genre= await Genre.findByPk(el.id)
                return videogame.addGenre(genre)
            });
            await Promise.all(genresArr)
            .catch(err=>console.log(err))
        }
        if(platforms){
            var platformsArr = platforms.map(async el=>{
                let platform= await Platform.findByPk(el.id)
                return videogame.addPlatform(platform)
            });
            await Promise.all(platformsArr)
            .catch(err=>console.log(err))
        }
        res.status(201).json(videogame)
    }
    catch(err){ 
        res.status(404).send(`Error en alguno de los datos provistos ${err}`);
    }
})
router.get("/genres",async(req,res)=>{
    try{

        const genres = await Genre.findAll()
        if(Object.keys(genres).length===0){
        var Apigenres= []
        await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        .then(data=>data.json())
        .then(data=>data.results)
        .then(data=>{
            for(let genre in data){
                Apigenres.push({
                    id:data[genre].id,
                    name:data[genre].name
                })
            }
        })
        
        let GenresArr= Apigenres.map(el=>Genre.create(el))
        await Promise.all(GenresArr)
        .catch(err=>{
            console.log(err)
        })
        res.status(200).json(Apigenres)
    }else{
        res.status(200).json(genres)
    }
}
catch(err){
    res.status(404).send(err)
}
})
router.get("/platforms",async(req,res)=>{
    try{
        const platforms = await Platform.findAll()
        if(Object.keys(platforms).length===0){
        var ApiPlatforms= []
        await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
        .then(data=>data.json())
        .then(data=>data.results)
        .then(data=>{
            for(let platform in data){
                ApiPlatforms.push({
                    id:data[platform].id,
                    name:data[platform].name
                })
            }
        })
        
        let PlatformsArr= ApiPlatforms.map(el=>Platform.create(el))
        await Promise.all(PlatformsArr)
        .catch(err=>{
            console.log(err)
        })
        res.status(200).json(ApiPlatforms)
    }else{
        res.status(200).json(platforms)
    }
}
catch(err){
    res.status(404).send(err)
}
})
module.exports = router;
