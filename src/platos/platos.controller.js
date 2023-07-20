/*import { platosModel } from "./platos.model";

const create = async (req,res) => {
    const{nombre ,ingredientes ,monto,img_url, id_categoria}= req.body;

    try {
        const newPlatos = await platosModel.createPlatos ({
        nombre,
        ingredientes,
        monto,
        img_url,
        });
        return res.status(201).json(newPlatos)
    } catch (error) {
        console.log(error);
        return res.status(500).json ({error:error.message});
    }
}
*/