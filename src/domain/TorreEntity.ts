import DiscoEnity from './DiscoEnity';
import TorresEnum from './TorresEnum';

class TorreEntity {
  private _nome: TorresEnum;
  private _discos: DiscoEnity[] = [];

  constructor(nome: TorresEnum = TorresEnum.TORRE_UM) {
    this._nome = nome;
  }
  
  get nome(): TorresEnum {
    return this._nome;
  }

  get discos(): DiscoEnity[] {
    return [...this._discos]
  };

  get ultimoDisco(): DiscoEnity {
    if (this._discos.length === 0) {
      throw new Error('Torre vazia');
    }
    return this._discos[this._discos.length - 1];
  }

  public adicionarDisco(disco: DiscoEnity): void {
    const diametroUltimoDisco = this._getDiametroUltimoDisco();
    if (diametroUltimoDisco !== 0 && disco.diametro >= diametroUltimoDisco) {
      throw new Error('Disco com diâmetro maior que o antecessor');
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