import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import app from './app';

const main = async () => {
    try{
        await AppDataSource.initialize();
        console.log("Banco de dados conectado com sucesso.");

        app.listen(3000, () => {
            console.log("Aplicação ouvindo na porta 3000.")
        });

    }catch(error){
        console.log(error)
    }
};

main();