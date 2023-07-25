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

-- SELECT * FROM usuarios;
--     SELECT * FROM platos;

--    SELECT * FROM  usuarios WHERE id_usuario = 1
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
	img_url varchar(300),
	descripcion varchar (500),
	id_categoria integer REFERENCES categorias (id_categoria) ON DELETE CASCADE
	
);


-- INSERT INTO platos (nombre, ingredientes, monto, img_url, descripcion, id_categoria)
-- VALUES
--     ('PAPAS RELLENAS', '["Papas", "2 huevos duros", "250 gramos de carne molida", "aceitunas negras","pimienta negra", "oregano"]', 5950, 'https://www.gourmet.cl/wp-content/uploads/2016/09/Papas_Rellenas_video_Retoques_01-570x458.jpg', 'Consiste en una masa frita de papa cocida, rellena de carne de vacuno, pollo, queso, cebollas, aceitunas, huevos duros, entre otros ingredientes picados.', 1),
--     ('CHILI CON CARNE', '["Carne Molida","Pulpa de tomate","Porotos negros","Choclo desgranado"]', 7250, 'https://www.gourmet.cl/wp-content/uploads/2021/08/Chili-con-Carne-Ajustada-Web-570x458.jpg', 'Plato se utiliza carne de res cortada en trozos que serán dorados en una sartén junto con sal, pimienta, chiles verdes, rojos y de árbol.', 1),
--     ('POLLO TERIYAKI', '["Pechugas de pollo", "Arroz blanco", "Brócoli al vapor"," Salsa Teriyaki"]', 7250, 'https://www.gourmet.cl/wp-content/uploads/2021/08/Pollo_Teriyaki_Interior_Gourmet.jpg', 'Técnica de cocción de la cocina japonesa en la cual los alimentos son asados al horno en un adobo de salsa dulce.', 1),
--     ('CAZUELA DE ALBÓNDIGAS', '["Carne Molida","Marraqueta","Huevos","Zapallo amarillo","Papas"]', 7250, 'https://www.gourmet.cl/wp-content/uploads/2016/09/recetas-gourmet-marzo-2021-internet-7-1-570x458.jpg', 'Combinación de albóndigas caseras con caldo y verduras. Las albóndigas están hechas con una mezcla de carne picada, pan rallado, huevos y especias.', 1),
--     ('FETUCCINI CON SALSA DE AZAFRÁN Y OSTIONES', '["Pasta a eleccion","ostiones sin concha","Vino blanco","Crema","queso parmesano rallado"]', 7250, 'https://www.gourmet.cl/wp-content/uploads/2012/07/fetuccini-con-salsa-de-azafran-y-ostiones.jpg', 'Se combinan con una cremosa salsa de azafrán que le da un color dorado y un sabor delicado y aromático. Los ostiones frescos añaden un toque marino y textura suave a esta deliciosa preparación.', 1),
--     ('LOMO VETADO AL HORNO', '["Lomo vetado","Pimienta","Salsa de Soya","Aceite de oliva","Vino blanco"]', 7250, 'https://www.gourmet.cl/wp-content/uploads/2012/07/lomo-vetado-con-salsa-de-champinones.jpg', 'El lomo vetado se sazona con especias y se hornea lentamente, lo que permite que la carne se cocine de manera uniforme y conserve su jugosidad.', 1),
--     ('POLLO AL CURRY', '["Pechugas de pollo", "Curry","Almendra sin piel", "Salsa Blanca"]', 7250, 'https://www.gourmet.cl/wp-content/uploads/2016/09/Pollo-al-Curry-ajustada-web-570x458.jpg', 'Es un plato sabroso y aromático que combina trozos de pollo tierno con una salsa de curry llena de especias y sabores exóticos.', 1),
--     ('QUICHE VEGETARIANO CON MASA DE QUINOA', '["Aceite de oliva","Quinoa tricolor","Pimienta Negra Molida","Pimentón rojo","Zapallo italiano", "Huevos","Crema de leche"]', 7250, 'https://www.gourmet.cl/wp-content/uploads/2021/08/Quiche_Adaptada_Gourmet.jpg', 'Una deliciosa variante del clásico quiche que se caracteriza por ser apto para vegetarianos y utilizar una masa hecha a base de quinoa en lugar de la tradicional masa de harina de trigo.', 1),
--     ('TORTILLA DE PAPAS', '["Papas grandes peladas","Pimentón rojo","Huevos","Merquén","Pimienta Negra"]', 7250, 'https://www.gourmet.cl/wp-content/uploads/2011/04/tortilla_papas.jpg', 'Es un plato clásico de la cocina española y consiste en una mezcla de papas (patatas) y huevos. Se trata de una especie de torta o pastel hecho a base de rodajas finas de papas cocidas en aceite y luego mezcladas con huevos batidos.', 1),
--     ('CARNE ASADA AL HORNO', '["Ají de Color", "Punta de Ganso", "Papas con Cáscara", "Pimienta Negra Molida", "Vino Blanco"]', 7250, 'https://www.gourmet.cl/wp-content/uploads/2018/04/1200x627-1-570x458.jpg', 'Una deliciosa preparación de carne que se cocina en el horno para lograr una cocción uniforme y un sabor jugoso.', 1),
--     ('PESCADO CON COSTRA DE QUÍNOA', '["Filetes de pescado (salmón, congrio)","Mostaza","Quínoa blanca","Quínoa roja","Queso parmesano"]', 7250, 'https://www.gourmet.cl/wp-content/uploads/2015/04/Pescado-con-Costra-de-Quinoa.jpg', 'Una deliciosa preparación en la que se utiliza quinoa para crear una capa crujiente alrededor del pescado. Es una opción saludable y sabrosa que combina la textura crujiente de la quinoa con la jugosidad y el sabor del pescado.', 1),
--     ('SANDWICH VEGETARIANO', '["Leche","Huevos", "Sal", "Harina", "Aceite"]', 7250, 'https://www.gourmet.cl/wp-content/uploads/2016/09/sandwich-vegetariano.jpg', 'Una opción deliciosa y saludable para aquellos que prefieren evitar la carne en su alimentación. Este tipo de sándwich se compone de diferentes ingredientes vegetarianos que se colocan entre dos rebanadas de pan.', 1);



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