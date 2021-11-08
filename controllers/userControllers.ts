import { Request, Response } from "express"; 
import { any } from "sequelize/types/lib/operators";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) =>{

    const users = await User.findAll();

    res.json({
        users
    })
}

export const getUser = async (req: Request, res: Response) =>{

    const { id } = req.params;

    const user = await User.findByPk(id);

    if(!user){
        res.status(404).json({
            msg: `No existe registro de id ${id}`
        })
    }

    res.json({
        user
    })
}

export const createUser = async(req: Request, res: Response) =>{

    const { body } = req;

    try {

        const existEmail = await User.findOne({
            where:{
                email: body.email
            }
        })

        if(existEmail){
            return res.status(400).json({
                msg: `Existe un usuario con dicho email ${body.email}`
            })
        }

        const user = new User(body);
        await user.save();

        res.json({
            user
        }
        )
        
    } catch (error) {
        res.status(500).json({
            msg: "Contacte al administrador"
        })
    }
}

export const updateUser = async (req: Request, res: Response) =>{

    const { id } = req.params;
    const { body } = req;
    try {
        
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                msg: "Usuario no existe"
            })
        }

        await user.update(body);

        res.status(200).json(user)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Contacte con el administrador"
        })
    }
}

export const deleteUser = async (req: Request, res: Response) =>{

    const { id } = req.params;
    try {
        
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                msg: "Usuario no existe"
            })
        }

        await user.update({state: false});

        res.status(200).json(user)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Contacte con el administrador"
        })
    }
}



