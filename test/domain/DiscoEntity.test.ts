import DiscoEnity from "../../src/domain/DiscoEnity";

describe('Testes para DiscoEntity', () => {
  test('Deve ser possível criar uma intância de Disco', () => {
    const disco = new DiscoEnity(1);
    expect(disco).toBeInstanceOf(DiscoEnity);
  });

  test('Não deve ser possível criar um disco dom diâmetro menor ou igual a zero', () => {
    expect(() => new DiscoEnity(0)).toThrow('Disco com diâmentro inválido');
  })
});