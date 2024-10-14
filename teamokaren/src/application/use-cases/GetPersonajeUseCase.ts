import axios from 'axios';

export class GetPersonajeUseCase {
  async execute(id: string): Promise<any> {
    const url = `${process.env.SWAPI_URL}/api/people/${id}/?format=json`;
    const response = await axios.get(url);
    return response.data;
  }
}
