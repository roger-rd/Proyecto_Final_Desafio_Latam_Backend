import  request  from "supertest";
import {app} from "../main.js";


describe ("Probando las rutas del backend", ()=>{
    describe("GET//api/v1/user ",()=>{
        it("codigo 200 ruta raiz", async()=>{
                const response = await request(app).get("/api/v1/user");

                expect(response.status).toBe(200);
            });
    })
    
    describe('POST /api/v1/user/register', () => {
    
        it('debe devolver un status code 201 y un token', async () => {
          // Datos de prueba para el registro
            const userData = {
            nombre: 'test2',
            apellido: 'testApellido',
            rut: '123456789',
            telefono: '+123456789',
            direccion: 'Calle Principal',
            numero_de_direccion: '123',
            correo: 'test2@example.com',
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
    it('debe devolver un status code 200 y un token al iniciar sesión correctamente', async () => {
      // Datos de prueba para el inicio de sesión
      const loginData = {
        correo: 'test@example.com',
        password: '123',
      };
  
      // Realizar la solicitud POST al servidor con los datos de inicio de sesión
      const response = await request(app).post('/api/v1/user/login').send(loginData);
  
      // Verificar el status code esperado (200)
      expect(response.status).toBe(200);
  
      // Verificar si la respuesta incluye un token
      expect(response.body.token).toBeDefined();
    });
  
    it('debe devolver un status code 400 si se proporcionan credenciales inválidas', async () => {
      // Datos de prueba para credenciales inválidas (usuario y contraseña incorrectos)
      const invalidLoginData = {
        correo: 'john@example.com',
        password: 'contraseña_incorrecta',
      };
  
      // Realizar la solicitud POST al servidor con las credenciales inválidas
      const response = await request(app).post('/api/v1/user/login').send(invalidLoginData);
  
      // Verificar el status code esperado (400)
      expect(response.status).toBe(400);
  
      // Verificar el mensaje de error en la respuesta
      expect(response.body.error).toBe('invalid credencial');
    });
 });



});

