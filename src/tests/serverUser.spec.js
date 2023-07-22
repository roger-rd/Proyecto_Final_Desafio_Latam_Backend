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
      correo: 'test2@example.com',
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

describe("DELETE /api/v1/user/delete/:id_usuario", () => {
  it("Comprueba que se obtiene un código 200 al eliminar un usuario", async () => {
    // 1. Generar un token válido usando jwt.sign() con la misma clave secreta (JWT_SECRET) que utilizas en otras partes de tu aplicación
    const id_usuario = 5;
    const token = jwt.sign({ id_usuario }, process.env.JWT_SECRET);

    // 2. Realizar la solicitud de eliminación con el token válido
    const response = await request(app)
      .delete(`/api/v1/user/delete/${id_usuario}`)
      .set('Authorization', `Bearer ${token}`);

    // 3. Verificar que la respuesta sea un código 200
    expect(response.status).toBe(200);
  });
});





    
    
    

});

