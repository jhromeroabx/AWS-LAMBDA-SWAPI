import axios from 'axios';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

export class GetPersonajeUseCase {
  private baseUrl: string;
  private fullUrl: string;

  constructor() {
    this.baseUrl = `${process.env.SWAPI_URL}api/people`;
  }

  async execute(id: string): Promise<any> {
    try {
      this.fullUrl = `${this.baseUrl}/${id}`;
      const response = await axios.get(this.fullUrl);
      return response.data;
    } catch (error) {
      throw new Error('Error get url ' + error.message + " URL: " + this.fullUrl);
    }
  }
}
