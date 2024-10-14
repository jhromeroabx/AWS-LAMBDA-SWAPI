import { Personaje } from '../../domain/entities/Personaje';
import { IPersonajeRepository } from '../../domain/repositories/IPersonajeRepository';

export class CreatePersonajeUseCase {
  constructor(private personajeRepository: IPersonajeRepository) {}

  async execute(data: any): Promise<void> {
    const personaje = new Personaje(
      data.id,
      data.nombre,
      data.altura,
      data.masa,
      data.color_cabello,
      data.color_piel,
      data.color_ojos,
      data.año_nacimiento,
      data.género,
      data.planeta_origen,
      data.películas,
      data.especies,
      data.vehículos,
      data.naves_estelares,
      data.creado,
      data.editado,
      data.url
    );
    await this.personajeRepository.create(personaje);
  }
}
