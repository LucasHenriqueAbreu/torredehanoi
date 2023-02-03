import DiscoEnity from "../../src/domain/DiscoEnity";
import TorreEntity from "../../src/domain/TorreEntity";

describe('Testes para TorreEntity', () => {
  test('Deve ser possível criar uma instância de TorreEntity', () => {
    const torre = new TorreEntity();
    expect(torre).toBeInstanceOf(TorreEntity);
  });

  test('Deve ser possível adicionar discos em uma torre', () => {
    const torre = new TorreEntity();
    torre.adicionarDisco(new DiscoEnity(3));
    torre.adicionarDisco(new DiscoEnity(2));
    torre.adicionarDisco(new DiscoEnity(1));
    expect(torre.discos.length).toEqual(3);
  });

  test('Não deve ser possível alterar o array de discos da classe torre por métodos do array', () => {
    const torre = new TorreEntity();
    torre.adicionarDisco(new DiscoEnity(3));
    torre.adicionarDisco(new DiscoEnity(2));
    torre.adicionarDisco(new DiscoEnity(1));
    expect(torre.discos.length).toEqual(3);
    torre.discos.pop();
    expect(torre.discos.length).toEqual(3);
  });

  test('Deve ser possível remover discos de uma torre, porém deve sempre ser o último adicionado', () => {
    const torre = new TorreEntity();
    torre.adicionarDisco(new DiscoEnity(3));
    torre.adicionarDisco(new DiscoEnity(2));
    torre.adicionarDisco(new DiscoEnity(1));
    torre.removerDisco();
    expect(torre.discos.length).toEqual(2);
    expect(torre.discos[0].diametro).toEqual(3);
    expect(torre.discos[1].diametro).toEqual(2);
  });

  test('Não deve ser possível adicionar um disco em uma torre, caso este disco seja maior que o seu antecessor', () => {
    const torre = new TorreEntity();
    torre.adicionarDisco(new DiscoEnity(3));
    expect(() => torre.adicionarDisco(new DiscoEnity(4))).toThrow('Disco com diâmetro maior que o antecessor');
  });

});