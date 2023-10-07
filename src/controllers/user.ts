import { Request, Response } from "express";
import { User } from "../entities/user";
import { AppDataSource } from "../database/data-source";


export const cadastrarUsuarios = async (req: Request, res:Response) => {

    try{
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.cpf = req.body.cpf;

        await AppDataSource.getTreeRepository(User).save(user);

        return res.status(201).json({ok:true});
    }catch(error){
        console.log(error, "Erro ao cadastrar usuário")
        return res.status(500).json({ok:false, message: "Erro ao cadastrar usuário"});
    }
}


export const listarUsuarios = async (req: Request, res: Response) => {
    try{
        const users = await AppDataSource.getRepository(User).find();

        return res.status(200).json({ok:true, users: users});
    }catch(error){
        console.log(error, "Erro ao listar usuário.")
        return res.status(500).json({ok:false, message: "Erro ao listar usuário."})
    }
}

export const listarUnicoUsuario = async (req: Request, res: Response) => {
    const id = req.params.id;

    try{
        const user = await AppDataSource.getRepository(User).findOne({where: {id: parseInt(id)}});

        if(!user){
            return res.status(404).json({ok:false, message: "Usuário não encontrado."})
        }

        return res.status(200).json({ok:true, user: user});
    }catch(error){
        console.log(error, "Erro ao listar usuário.");
        return res.status(400).json({ok:true, message:"Erro ao listar usuário."})
    }
}


export const atualizaUsuario = async (req: Request, res: Response) => {
    const id = req.params.id;

    try{
        const user = await AppDataSource.getRepository(User).findOne({where: {id: parseInt(id)}});

        if(!user){
            return res.status(404).json({ok:false, message: "Usuário não encontrado."})
        }

        if(req.body.name){
            user.name = req.body.name;
        }

        if(req.body.email){
            user.email = req.body.email;
        }

        if(req.body.password){
            user.password = req.body.password;
        }

        if(req.body.cpf){
            user.cpf = req.body.cpf;
        }

        await AppDataSource.getRepository(User).save(user);

        return res.status(200).json({ok:true, message: "Salvo com sucesso."})
    }catch(error){
        console.log(error, "Usuário não pode ser atualizado.");
        return res.status(400).json({ok:false, message: "Usuário não pode ser atualizado."})
    }
}

export const deletarUsuario = async (req: Request, res: Response) => {
    const id = req.params.id;

    try{
        const user = await AppDataSource.getRepository(User).findOne({where:{id: parseInt(id)}});

        if(!user){
            return res.status(404).json({ok:false, message: "Usuário não encontrado."})
        }

        await AppDataSource.getRepository(User).delete(user);

        return res.status(200).json({ok:true, message: "Deletado com sucesso."})

    }catch(error){
        console.log(error, "Erro ao deletar usuário.");
        return res.status(400).json({ok:false, message: "Erro ao deletar usuário."})
    }
}