import DiscoEnity from "./DiscoEnity";

class TorreEntity {
  private _discos: DiscoEnity[] = [];

  get discos(): DiscoEnity[] {
    return [...this._discos]
  };

  get ultimoDisco(): DiscoEnity {
    const disco = this._discos[this.discos.length - 1];
    if (!disco) {
      throw new Error('Torre vazia');
    }
    return disco;
  }

  public adicionarDisco(disco: DiscoEnity): void {
    if (disco.diametro < this._getDiametroUltimoDisco()) {
      throw new Error('Disco com diâmetro menor que o antecessor');
    }
    this._discos.push(disco);
  }

  public removerDisco(): void {
    this._discos.pop();
  }

  private _getDiametroUltimoDisco():number {
    let diametroUltimoDisco: number;
    try {
      diametroUltimoDisco = this.ultimoDisco.diametro;
    } catch (error) {
      diametroUltimoDisco = 0;
    }
    return diametroUltimoDisco;
  }
}

export default TorreEntity;