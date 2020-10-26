CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `number_pages` int DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `slug` varchar(45) DEFAULT NULL,
  `synopsis` varchar(1000) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

INSERT INTO prueba.book(title,author,number_pages,category,slug,image,synopsis) VALUES (
      'papelucho', 'marcela paz' , 200,'cuantos niños' , 'papelucho' , 'f424db2c404a87ba6b6071f74c75f5ff.jpg','Papelucho es el protagonista de una
      serie de libros para niños creado por la escritora chilena Marcela Paz que narran las aventuras de un niño chileno.
      Papelucho se basa en las experiencias de la autora en su infancia,
      y los libros están escritos en la forma de un diario
      de vida escrito por el personaje principal');
INSERT INTO prueba.book(title,author,number_pages,category,slug,image,synopsis) VALUES (
      'El instituto', 'Stephen King' , 610,'terror' , 'el_instituto' , '7a6364450eefd29e6266bed1f4bf5d32.jpeg','El instituto es una novela 
      del escritor estadounidense Stephen King, publicada el 10 de septiembre de 2019.​​ La novela, de estilo similar a Ojos de fuego de 1980, ​ 
      relata la historia de Luke Ellis, un niño 
      con aparentes poderes psíquicos que es reclutado por una oscura organización conocida com');
INSERT INTO prueba.book(title,author,number_pages,category,slug,image,synopsis) VALUES (
      'el arte de la guerra', 'Sun Tzu' , 150,'guerra' , 'el_arte_de_la_guerra' , '7ac6edae552394e1395f34c4406584f2.jpeg','El arte de la 
      guerra es un libro sobre tácticas y estrategias militares, escrito por Sun Tzu, un famoso estratega militar chino. Se trata
      de un antiguo tratado militar chino que data del final del periodo de las primaveras y otoños.');
commit;

