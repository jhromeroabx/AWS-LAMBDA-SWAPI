// src/infrastructure/http/handlers/createPersonajeMongoHandler.ts
import { MongoPersonajeRepository } from '../../mongodb/MongoPersonajeRepository';
import { CreatePersonajeUseCase } from '../../../application/use-cases/CreatePersonajeUseCase';
import dotenv from 'dotenv';

dotenv.config();

const personajeRepository = new MongoPersonajeRepository();
const createPersonajeUseCase = new CreatePersonajeUseCase(personajeRepository);

export const handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    await createPersonajeUseCase.execute(data);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Personaje creado exitosamente en MongoDB'
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error al crear el personaje en MongoDB: ' + error.message
      })
    };
  }
};
