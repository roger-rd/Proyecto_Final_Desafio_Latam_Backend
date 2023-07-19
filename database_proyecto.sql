DROP TABLE IF EXISTS carrito;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS favoritos;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS platos;
DROP TABLE IF EXISTS categorias;




CREATE TABLE usuarios (
	id_usuario serial primary key,
	nombre varchar (50) ,
	apellido varchar (50),
	rut varchar(10),
	telefono int,
	direccion varchar(100),
	numero_de_direccion int,
	correo varchar (50) UNIQUE,
	password varchar(100),
	rol varchar(20)
);

SELECT * FROM usuarios;
-- INSERT INTO usuarios (nombre  ,	apellido ,	rut ,telefono ,direccion,numero_de_direccion,correo ,password,rol) VALUES(
--   'Juan',
--   'Pérez',
--   '12345678-9',
--   '+1234567890',
--   'Calle 123',
--   '123',
--   'juan@example.com',
--   '123456',
--   'usuario'
-- )


CREATE TABLE categorias (
  id_categoria serial primary key,
  nombre_categoria varchar(50)
);

INSERT INTO categorias (nombre_categoria) VALUES 
	('plato fondo'),
	('postre');



CREATE TABLE platos (
	id_plato serial primary key,
	nombre varchar (50),
	ingredientes varchar (300),
	monto int,
	img_url varchar(300), -- Agregamos la columna de tipo URL
	id_categoria integer REFERENCES categorias (id_categoria) ON DELETE CASCADE
	
);


-- INSERT INTO platos (nombre, ingredientes, monto, img_url, id_categoria) VALUES 
-- (	'Papas rellenas',
-- ' 	{"Papas", "2 huevos duros", "250 gramos de carne molida", "aceitunas negras","pimienta negra", "oregano"}',
-- 	'5950',
--   	'https://www.gourmet.cl/wp-content/uploads/2016/09/Papas_Rellenas_video_Retoques_01-570x458.jpg',
--  	'1'
--  )
-- ),
-- (	'CHILI CON CARNE',
--  	ARRAY['Carne Molida','Pulpa de tomate','Porotos negros','Choclo desgranado'],
-- 	'7250',
--  	'https://www.gourmet.cl/wp-content/uploads/2021/08/Chili-con-Carne-Ajustada-Web-570x458.jpg',
--  	'1'
-- );







CREATE TABLE favoritos (
  id_favorito serial primary key,
  id_usuario integer REFERENCES usuarios (id_usuario) ON DELETE CASCADE,
  id_plato integer REFERENCES platos (id_plato) ON DELETE CASCADE
);

CREATE TABLE pedidos (
	id_pedido serial primary key,
	fecha date,
	forma_de_pago varchar (10),
	direccion_de_envio varchar (100),
	estado_pedido varchar (20),
	cantidad int,
	id_usuario integer REFERENCES usuarios (id_usuario) ON DELETE CASCADE,
	id_plato integer REFERENCES platos (id_plato) ON DELETE CASCADE
);

CREATE TABLE carrito (
	id_carrito serial primary key,
	id_usuario integer REFERENCES usuarios (id_usuario) ON DELETE CASCADE,
	id_pedido integer REFERENCES pedidos (id_pedido) ON DELETE CASCADE,
	procesado boolean
);






