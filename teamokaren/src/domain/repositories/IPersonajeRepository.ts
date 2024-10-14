import { Personaje } from '../entities/Personaje';

export interface IPersonajeRepository {
  create(personaje: Personaje): Promise<void>;
  getById(id: string): Promise<Personaje | null>;
  getAll(): Promise<Personaje[]>;
  update(id: string, personaje: Partial<Personaje>): Promise<void>;
  delete(id: string): Promise<void>;
}
