import DiscoEnity from "./DiscoEnity";
import TorreEntity from "./TorreEntity";
import TorresEnum from "./TorresEnum";

class JogoEntity {
  private _numeroDeDiscos: number;
  private _torreUm: TorreEntity= new TorreEntity();
  private _torreDois: TorreEntity= new TorreEntity();
  private _torreTres: TorreEntity= new TorreEntity();
  private _jogadas: number = 0;
  
  constructor(numeroDeDiscos: number) {
    this._numeroDeDiscos = numeroDeDiscos;
    this._init();
  }

  private _init() {
    for (let i = 0; i < this._numeroDeDiscos; i++) {
      this._torreUm.adicionarDisco(new DiscoEnity(i + 1));
    }
  }

  get discosTorreUm(): DiscoEnity[] {
    return this._torreUm.discos;
  }

  get discosTorreDois(): DiscoEnity[] {
    return this._torreDois.discos;
  }

  get discosTorreTres(): DiscoEnity[] {
    return this._torreTres.discos;
  }

  get jogadas():number {
    return this._jogadas;
  }

  get vitoria(): boolean {
    return this._torreTres.discos.length === this._numeroDeDiscos;
  }

  public mudarDisco(origem: TorresEnum, destino: TorresEnum) {
    const torreOrigem = this.getTorre(origem);
    const torreDestino = this.getTorre(destino);
    const discoMovimentado = torreOrigem.ultimoDisco;
    torreDestino.adicionarDisco(discoMovimentado);
    torreOrigem.removerDisco();
    this._jogadas++;
  }

  private getTorre(torre:TorresEnum): TorreEntity {
    if (torre === TorresEnum.TORRE_UM) {
      return this._torreUm;
    }
    if(torre === TorresEnum.TORRE_DOIS) {
      return this._torreDois;
    }
    return this._torreTres;
  }

}

export default JogoEntity;