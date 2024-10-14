import axios from 'axios';

export class GetPersonajeUseCase {
  private baseUrl: string;
  async execute(id: string): Promise<any> {
    try {
      this.baseUrl = `${process.env.SWAPI_URL}api/people/${id}/?format=json`;
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      throw new Error('Error get url ' + error.message + " URL: " + this.baseUrl);
    }
  }
}
