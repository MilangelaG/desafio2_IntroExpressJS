const express = require('express');
const fs = require('fs')

const { allowedNodeEnvironmentFlags } = require('process');

const app = express()
const PORT = process.env.PORT || 3001

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.use(express.json())

app.get('/canciones',(req, res)=>{
    const canciones = JSON.parse(fs.readFileSync('repertorio.json','utf-8'))
    res.send(canciones)
})
app.listen(PORT, ()=>{
    console.log(`Servidor Activo en port ${PORT}`)
}) 

app.post('/canciones',(req, res)=>{
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json','utf-8'));
    canciones.push(cancion);
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.send('Cancion Agregada')
    console.log("\x1b[32m", "----------------");
    console.log(" Canción Agregada");
    console.log(" ----------------");
    console.log(`Titulo: ${cancion.titulo}`);
    console.log(`Artista: ${cancion.artista}`);
    console.log("%s\x1b[0m", `Tono: ${cancion.tono}`);
})

app.put('/canciones/:id', (req, res) =>{
    const id = req.params.id;
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
    const index = canciones.findIndex(cancion => cancion.id == id);
    const cancionOld = canciones[index];
    canciones[index] = cancion;
   
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.send('Cancion Editada');
    console.log("-----------------");
    console.log(" Canción Modificada");
    console.log(" -----------------");
    cancionOld.titulo != cancion.titulo
    ? console.log(
        "\x1b[34m%s\x1b[0m",
        `Titulo: ${cancionOld.titulo} --> ${cancion.titulo}`
      )
    : console.log(`Titulo: ${cancionOld.titulo}`);
    cancionOld.artista != cancion.artista
    ? console.log(
        "\x1b[34m%s\x1b[0m",
        `Artista: ${cancionOld.artista} --> ${cancion.artista}`
      )
    : console.log(`Artista: ${cancionOld.artista}`);
    cancionOld.tono != cancion.tono
    ? console.log(
        "\x1b[34m%s\x1b[0m",
        `Tono: ${cancionOld.tono} --> ${cancion.tono}`
      )
    : console.log(`Tono: ${cancionOld.tono}`);
})

app.delete('/canciones/:id', (req, res)=>{
    const id = req.params.id;
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
    const index = canciones.findIndex(cancion => cancion.id == id);
    const cancionEliminada = canciones.find((p) => p.id == id);
    canciones.splice(index, 1);
    console.log("\x1b[31m", "-----------------");
    console.log(" Canción Eliminada");
    console.log(" -----------------");
    console.log(`Titulo: ${cancionEliminada.titulo}`);
    console.log(`Artista: ${cancionEliminada.artista}`);
    console.log("%s\x1b[0m", `Tono: ${cancionEliminada.tono}`);
    
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.send('Cancion Eliminada');
})