import { DynamoDBPersonajeRepository } from '../../dynamodb/DynamoDBPersonajeRepository';
import { CreatePersonajeUseCase } from '../../../application/use-cases/CreatePersonajeUseCase';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const personajeRepository = new DynamoDBPersonajeRepository();
const createPersonajeUseCase = new CreatePersonajeUseCase(personajeRepository);

export const handler = async (event) => {
  const data = JSON.parse(event.body);

  try {
    await createPersonajeUseCase.execute(data);
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Personaje creado exitosamente'
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al crear el personaje' + error.message })
    };
  }
};
