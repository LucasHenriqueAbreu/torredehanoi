class DiscoEnity {
  private _diametro: number;

  constructor(diametro: number) {
    if (diametro <= 0) {
      throw new Error('Disco com diâmentro inválido');
    }
    this._diametro = diametro;
  }

  get diametro(): number {
    return this._diametro;
  }
}

export default DiscoEnity;