import JogoEntity from '../../src/domain/JogoEntity';
import TorresEnum from '../../src/domain/TorresEnum';

describe('Testes para JogoEntity', () => {
  test('Deve ser possível criar uma instância de jogo', () => {
    const jogo = new JogoEntity(3);
    expect(jogo).toBeInstanceOf(JogoEntity);
  });

  test('Deve conter 3 discos na primeira torre ao iniciar o jogo', () => {
    const jogo = new JogoEntity(3);
    expect(jogo.discosTorreUm.length).toEqual(3);
  });

  test('Deve ser possível mudar o menor disco para torre dois', () => {
    const jogo = new JogoEntity(3);
    jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_DOIS);
    expect(jogo.discosTorreUm.length).toEqual(2);
    expect(jogo.discosTorreDois.length).toEqual(1);
    expect(jogo.discosTorreTres.length).toEqual(0);
  });

  test('Deve ser possível mudar o menor disco para torre 3', () => {
    const jogo = new JogoEntity(3);
    jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_TRES);
    expect(jogo.discosTorreUm.length).toEqual(2);
    expect(jogo.discosTorreDois.length).toEqual(0);
    expect(jogo.discosTorreTres.length).toEqual(1);
  });

  test('A cada mudança de jogo deve ser contada uma nova jogada', () => {
    const jogo = new JogoEntity(3);
    jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_DOIS);
    jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_TRES);
    expect(jogo.jogadas).toEqual(2);
  });

  test('Deve ser possível mudar o menor disco para torre 3 e voltar para torre 1', () => {
    const jogo = new JogoEntity(3);
    jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_TRES);
    expect(jogo.discosTorreUm.length).toEqual(2);
    expect(jogo.discosTorreDois.length).toEqual(0);
    expect(jogo.discosTorreTres.length).toEqual(1);
    jogo.mudarDisco(TorresEnum.TORRE_TRES, TorresEnum.TORRE_UM);
  });

  describe('Nenhum disco pode ficar sobre um disco de diâmetro menor', () => {
    test('Primeira tentativa', () => {
      const jogo = new JogoEntity(3);
      jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_DOIS);
      expect(() => jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_DOIS)).toThrow('Disco com diâmetro maior que o antecessor');
    });

    test('Segunda tentativa', () => {
      const jogo = new JogoEntity(3);
      jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_DOIS);
      jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_TRES);
      expect(() => jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_DOIS)).toThrow('Disco com diâmetro maior que o antecessor');
    });

    test('Terceira tentativa', () => {
      const jogo = new JogoEntity(3);
      jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_DOIS);
      jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_TRES);
      expect(() => jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_TRES)).toThrow('Disco com diâmetro maior que o antecessor');
    });
  });

  test('O jogador deve ganhar quando a torre 3 estiver completa', () => {
    const jogo = new JogoEntity(3);
    jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_TRES);
    jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_DOIS);
    jogo.mudarDisco(TorresEnum.TORRE_TRES, TorresEnum.TORRE_DOIS);
    jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_TRES);
    jogo.mudarDisco(TorresEnum.TORRE_DOIS, TorresEnum.TORRE_UM);
    jogo.mudarDisco(TorresEnum.TORRE_DOIS, TorresEnum.TORRE_TRES);
    jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_TRES);
    expect(jogo.vitoria).toBeTruthy();
  });

  test('Deve mover sempre o útimo disco de uma torre', () => {
    const jogo = new JogoEntity(3);
    jogo.mudarDisco(TorresEnum.TORRE_UM, TorresEnum.TORRE_DOIS);
    expect(jogo.torreUm.discos[0].diametro).toEqual(3);
    expect(jogo.torreDois.discos[0].diametro).toEqual(1);
  });

});