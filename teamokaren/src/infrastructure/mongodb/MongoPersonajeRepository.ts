// src/infrastructure/mongodb/MongoPersonajeRepository.ts
import mongoose from 'mongoose';
import { IPersonajeRepository } from '../../domain/repositories/IPersonajeRepository';
import { Personaje } from '../../domain/entities/Personaje';

const personajeSchema = new mongoose.Schema({
  id: String,
  nombre: String,
  altura: String,
  masa: String,
  color_cabello: String,
  color_piel: String,
  color_ojos: String,
  año_nacimiento: String,
  género: String,
  planeta_origen: String,
  películas: [String],
  especies: [String],
  vehículos: [String],
  naves_estelares: [String],
  creado: String,
  editado: String,
  url: String
});

const PersonajeModel = mongoose.model('Personaje', personajeSchema);

export class MongoPersonajeRepository implements IPersonajeRepository {
  private connected = false;

  private async connect() {
    if (!this.connected) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        dbName: 'swapi',
      });
      this.connected = true;
    }
  }

  async create(personaje: Personaje): Promise<void> {
    await this.connect();
    const doc = new PersonajeModel(personaje);
    await doc.save();
  }

  async getById(id: string): Promise<Personaje | null> {
    await this.connect();
    return await PersonajeModel.findOne({ id }).lean() as Personaje;
  }

  async getAll(): Promise<Personaje[]> {
    await this.connect();
    return await PersonajeModel.find().lean() as Personaje[];
  }

  async update(id: string, personaje: Partial<Personaje>): Promise<void> {
    await this.connect();
    await PersonajeModel.updateOne({ id }, { $set: personaje });
  }

  async delete(id: string): Promise<void> {
    await this.connect();
    await PersonajeModel.deleteOne({ id });
  }
}
