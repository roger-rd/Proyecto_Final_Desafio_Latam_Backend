import  request  from "supertest";
import {app} from "../main.js";


describe ("Probando las rutas del backend", ()=>{
    describe("GET//api/v1/user ",()=>{
        it("status 200 ruta raiz", async()=>{
                const response = await request(app).get("/api/v1/user");

                expect(response.status).toBe(200);
            });
    })
    
//     describe('POST /api/v1/user/register', () => {
    
//         it('debe devolver un status code 201 y un token', async () => {
//           // Datos de prueba para el registro
//             const userData = {
//             nombre: 'test2010',
//             apellido: 'testApellido',
//             rut: '123456789',
//             telefono: '+123456789',
//             direccion: 'Calle Principal',
//             numero_de_direccion: '123',
//             correo: 'test2010@example.com',
//             password: '123456',
//             rol: 'user',
//         };
    
//           // Realizar la solicitud POST al servidor con los datos de prueba
//         const response = await request(app).post('/api/v1/user/register').send(userData);
    
//           // Verificar el status code esperado (201)
//         expect(response.status).toBe(201);
    
//           // Verificar si la respuesta incluye un token
//         expect(response.body.token).toBeDefined();
//         });
// });

    describe('POST /api/v1/user/login', () => {
      it('status code 200 y un token válido para un usuario existente con credenciales correctas', async () => {
        const loginData = {
          correo: 'test1@gmail.com',
          password: '123456',
        };

        const response = await request(app).post('/api/v1/user/login').send(loginData);

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
      });

      it('status code 400 para si usuario no existe o la contraseña es incorrecta contraseña incorrecta', async () => {
        const loginData = {
          correo: 'usuario_inexistente@example.com',
          password: 'contraseña_incorrecta',
        };

        const response = await request(app).post('/api/v1/user/login').send(loginData);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('invalid credencial');
      });
    });



});

