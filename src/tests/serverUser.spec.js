import * as dotenv from "dotenv";
dotenv.config();

import  request  from "supertest";
import {app} from "../main.js";
import jwt from "jsonwebtoken"


describe ("Probando las rutas del backend", ()=>{
    describe("GET//api/v1/user ",()=>{
        it("status 200 ruta raiz", async()=>{
                const response = await request(app).get("/api/v1/user");

                expect(response.status).toBe(200);
            });
    })
    
    describe('POST /api/v1/user/register', () => {
    
        it('debe devolver un status code 201 y un token', async () => {
          // Datos de prueba para el registro
            const userData = {
            nombre: 'test2010',
            apellido: 'testApellido',
            rut: '123456789',
            telefono: '+123456789',
            direccion: 'Calle Principal',
            numero_de_direccion: '123',
            correo: 'test2010@example.com',
            password: '123456',
            rol: 'user',
        };
    
          // Realizar la solicitud POST al servidor con los datos de prueba
        const response = await request(app).post('/api/v1/user/register').send(userData);
    
          // Verificar el status code esperado (201)
        expect(response.status).toBe(201);
    
          // Verificar si la respuesta incluye un token
        expect(response.body.token).toBeDefined();
        });
});

describe('POST /api/v1/user/login', () => {
  it('debe retornar un status code 200 y un token válido para un usuario existente con credenciales correctas', async () => {
    const loginData = {
      correo: "test12@example.com",
      password: '123456'
    };

    const response = await request(app)
      .post('/api/v1/user/login')
      .send(loginData);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    
  });

  it('debe retornar un status code 500 si el usuario no existe o la contraseña es incorrecta', async () => {
    const loginData = {
      correo: 'usuario_inexistente@example.com',
      password: 'contraseña_incorrecta',
    };

    const response = await request(app)
      .post('/api/v1/user/login')
      .send(loginData);

    expect(response.status).toBe(500);
    
  });
});


describe("PUT /api/v1/user/update/:id_usuario/",() => {    
  it('debe retornar un status code 200 al modificar el usuario', async () => {
    const id_usuario = 2;

      const response = await request(app)
      .put(`/api/v1/user/update/${id_usuario}`)
      .send({
        nombre: "actualizado desde test prueba 3",
        apellido: "test",
        rut: "12345-9",
        telefono: "1234560",
        direccion: "Calle pedro",
        numero_de_direccion: "123",
        correo: "actualizado3@gmail.com",
        password: "$2a$10$Wb12Jv2St6ZCdPc92tsAXu.tF865OkXKqdBd.Q9LqnmIkEXinio8q",
        rol: "admin"
      });

    expect(response.status).toBe(200);
    console.log(response.body);
  });
  
  
  
  
      it("Prueba que la ruta PUT /api/v1/user/update/:id_usuario devuelve un status code 400 si intentas actualizar un usuario enviando un id en los parámetros que sea diferente al id_usuario dentro del payload", async()=>{
          const invalidUsuario = 30

        const response = await request(app)
        .put(`/api/v1/user/update/${invalidUsuario}`)
        .send({
          nombre: "actualizado",
          apellido: "test3",
          rut: "12345-9",
          telefono: "1234560",
          direccion: "Calle pedro",
          numero_de_direccion: "123",
          correo: "actualizado@gmail.com",
          password: "$2a$10$Wb12Jv2St6ZCdPc92tsAXu.tF865OkXKqdBd.Q9LqnmIkEXinio8q",
          rol: "admin"
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
        message: "No se encontró ningún usuario con ese ID",
          ok: false,
        });
      });
      


    });

describe("DELETE /api/v1/user/delete/:id_usuario", () => {
  it("Comprueba que se obtiene un código 200 al eliminar un usuario", async () => {
    const id_usuario = 11;
    const token = jwt.sign({ id_usuario }, process.env.JWT_SECRET);


    const response = await request(app)
      .delete(`/api/v1/user/delete/${id_usuario}`)
      .set('Authorization', `Bearer ${token}`);


    expect(response.status).toBe(200);
    
  });

  it("se obtiene un error 404 sio se intenta borrar un usuario inexistente", async () => {
    const id_usuario = 13;
    const token = jwt.sign({ id_usuario }, process.env.JWT_SECRET);


    const response = await request(app)
      .delete(`/api/v1/user/delete/${id_usuario}`)
      .set('Authorization', `Bearer ${token}`);


    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Usuario no encontrado",
      });
  });
});



    
    
    

});

