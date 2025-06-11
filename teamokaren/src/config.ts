import * as dotenv from 'dotenv';

dotenv.config();  // Carga variables desde .env

export const config = {
  personajesTable: process.env.PERSONAJES_TABLE || 'registro_personajes'
};