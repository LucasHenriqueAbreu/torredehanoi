class TorreEntity {
  private _discos: number[] = [];

  get discos(): number[] {
    return [...this._discos]
  };

  get ultimoDisco(): number {
    return this._discos[this.discos.length - 1] | 0;
  }

  public adicionarDisco(disco: number): void {
    if (disco < this.ultimoDisco) {
      throw new Error('Disco com diâmetro menor que o antecessor');
    }
    this._discos.push(disco);
  }

  public removerDisco(): void {
    this._discos.pop();
  }
}

export default TorreEntity;