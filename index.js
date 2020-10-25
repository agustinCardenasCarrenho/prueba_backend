const express = require('express');
const fileUpload = require('express-fileupload');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors')
const  mysql = require('mysql');
const app = express();
const path = require('path');

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(fileUpload());
app.use(express.static(__dirname + '/files'));
app.use(cors())

let db = new sqlite3.Database('./db/bookdb.db');

var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   port: 3306
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});

//inicialización de la base de datos
db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS book
    ( title TEXT,
      author TEXT,
      number_pages INTEGER,
      category TEXT,
      slug TEXT,
      synopsis TEXT,
      image TEXT
    )`,(error) => {
      db.run('INSERT INTO book(title,author,number_pages,category,slug,image,synopsis) VALUES (?,?,?,?,?,?,?)',
      ['papelucho', 'marcela paz' , 1222,'cuantos niños' , 'el_papelucho' , 'papelucho.jpeg',`Papelucho es el protagonista de una
      serie de libros para niños creado por la escritora chilena Marcela Paz que narran las aventuras de un niño chileno.
      Papelucho se basa en las experiencias de la autora en su infancia,
      y los libros están escritos en la forma de un diario
      de vida escrito por el personaje principal`]);
      db.run('INSERT INTO book(title,author,number_pages,category,slug,image,synopsis) VALUES (?,?,?,?,?,?,?)',
      ['instituto', 'stephen king' , 1222,'cuantos niños' , 'el_insituto','instituto.jpeg',`El instituto es una novela del escritor
      estadounidense Stephen King, publicada el 10 de septiembre de 2019.​​ La novela, de estilo similar a Ojos de fuego de 1980,
      ​relata la historia de Luke Ellis, un niño con aparentes poderes
       psíquicos que es reclutado por una oscura organización conocida como "El instituto".​`]);
      db.run('INSERT INTO book(title,author,number_pages,category,slug,image,synopsis) VALUES (?,?,?,?,?,?,?)',
      ['la ultima leccion', 'randy' , 1222,'cuantos niños' , 'la_ultima_leccion','laultimaleccion.jpg',`La última lección es un libro
      autobiográfico escrito por Randy Pausch, profesor de informática, diseño e interacción
      persona-ordenador en la Universidad Carnegie Mellon de Pittsburgh, Pennsylvania, Estados Unidos.`]);
    }
  );
});

//rutas
app.get('/', (req, resp) => {
  resp.sendFile(__dirname + '/upload.html');
});

//lista de todos los libros
app.get('/api/v1/book' , (req,resp) => {
  let sql = 'SELECT title,author,number_pages,category,slug,image , synopsis FROM book';
  db.all(sql , [] , (error, rows) => {
    if (error) {
      throw error;
    }
    resp.send(rows);
  });
});

//obtencion de un libro en específico
app.get('/api/v1/book/:slug' , (req, resp) => {
  let sql = 'SELECT title,author,number_pages,category,slug , image ,synopsis FROM book WHERE slug = ?';
  db.get(sql , [req.param('slug')] , (error, row) => {
    if(error) {
      throw error;
    }
    resp.send(row);
  });
});

//agregar nuevo libro
app.post('/api/v1/book/new' ,  (req , resp) => {
  let image = req.files.img;
  const {title, author, number_pages,category,synopsis} = req.body;
  let slug = title.replace(/\s+/g, '-').toLowerCase();

  image.mv(`./files/${image.name}` , (error) => {
      if(error) return resp.status(500).send({messsage : error});
  });
  let sql = `INSERT INTO book(title,author,number_pages,category,slug,image,synopsis)
            VALUES(?,?,?,?,?,?,?)`;
  db.run(sql, [title,author,number_pages,category,slug,image.name,synopsis] ,(error) => {
      if(error){
        throw error;
        resp.status(500).send({messsage : 'Error'});
      }
      resp.status(200).send({messsage : `libro ${title} agregado`});
  });

});

//inicializada la app
const PORT = 3001;
app.listen(PORT, () => {
 console.log( `El servidor está inicializado en el puerto ${PORT}`);
});
