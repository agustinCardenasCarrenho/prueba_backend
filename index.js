const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const  mysql = require('mysql');
const app = express();
const  path = require('path')

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(fileUpload());
app.use(express.static(__dirname + '/files'));
app.use(cors())

var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database : 'prueba',
   port: 3306
});

connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});


//rutas

//lista de todos los libros
app.get('/api/v1/book' , (req,resp) => {
  let sql = 'SELECT title,author,number_pages,category,slug,image,synopsis FROM book';
  connection.query(sql ,(error, results, fields) => {
    if (error) {
      throw error;
    }
    resp.send(results);
  });
});

//obtencion de un libro en específico
app.get('/api/v1/book/:slug' , (req, resp) => {
    let sql = 'SELECT title,author,number_pages,category,slug,image,synopsis FROM book WHERE slug = ?';
    connection.query(sql , [req.param('slug')] , (error, results) => {
      if(error) {
        throw error;
      }
      resp.send(results);
    });
});

//agregar nuevo libro
app.post('/api/v1/book/new' ,  (req , resp) => {
    
    let image = req.files.img;
    const {title, author, number_pages,category,synopsis} = req.body;

    let imagenName = image.md5 + path.extname(image.name);
    image.mv(`./files/${imagenName}` , (error) => {
        if(error) return resp.status(500).send({messsage : error});
    });

    let sql = `INSERT INTO book(title,author,number_pages,category,slug,image,synopsis)
              VALUES(?,?,?,?,?,?,?)`;
    
    let slug = title.replace(/\s+/g, '-').toLowerCase();
    connection.query(sql, [title,author,number_pages,category,slug,imagenName,synopsis] ,(error) => {
        if(error) return resp.status(500).send({messsage : error});
        resp.status(200).send({messsage : `libro ${title} agregado`});
    });
    console.log(new Date());
});

//inicializada la app
const PORT = 3000;
app.listen(PORT, () => {
 console.log( `El servidor está inicializado en el puerto ${PORT}`);
});
