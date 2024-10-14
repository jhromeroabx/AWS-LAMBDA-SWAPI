export class Personaje {
    constructor(
      public id: string,
      public nombre: string,
      public altura: string,
      public masa: string,
      public color_cabello: string,
      public color_piel: string,
      public color_ojos: string,
      public año_nacimiento: string,
      public género: string,
      public planeta_origen: string,
      public películas: string[],
      public especies: string[],
      public vehículos: string[],
      public naves_estelares: string[],
      public creado: string,
      public editado: string,
      public url: string
    ) {}
  }
  