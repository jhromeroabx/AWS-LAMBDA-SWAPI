import { GetPersonajeUseCase } from '../../../application/use-cases/GetPersonajeUseCase';

export const handler = async (event: any) => {
  const id = event.pathParameters.id;
  const getPersonajeUseCase = new GetPersonajeUseCase();

  try {
    const data = await getPersonajeUseCase.execute(id);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener el personaje' + error.message }),
    };
  }
};
