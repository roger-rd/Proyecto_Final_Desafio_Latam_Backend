import { response } from "express";
import  request  from "supertest";
import {app} from "../main.js";


describe ("Probando las rutas del backend", ()=>{

    it("codigo 200 ruta raiz", async()=>{
        const response = await request(app).get("/api/v1/user");

        expect(response.status).toBe(200);
    });

    
    describe("POST/register",() => {
        it("ruta POST/register devuelve un status code 201", async()=>{
            const response = await request(app).
            post("/api/v1/user/register");

            expect(response.status).toBe(400);
        });
        
        // it("Prueba que la ruta POST/cafes agrega un nuevo café y devuelve un código 201", async()=>{
        //     const response = await request(app)
        //     .post("/api/cafes")
        //     .send({
        //         id: cafeId, 
        //         nombre: "cafe venezolano",
        //     });

        //     expect(response.status).toBe(201);
        // });

    });



    
});
