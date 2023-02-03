import JogoEntity from './domain/JogoEntity';
import TorreEntity from './domain/TorreEntity';
import TorresEnum from './domain/TorresEnum';
import Question from './util/question';
// TODO: mudar o código para inglês e refatorar essa desgraça.

const question = new Question();

function printarLinha(): void {
  console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
}

function getLinhaComun(): string {
  return '__________________________________________________\n';
}

function printarJogadas(jogadas: number): void {
  console.log(`Você já fez ${jogadas} movimento${jogadas > 1 ? 's' : ''}`)
}

function desenhoTorre(torre: TorreEntity): string {
  const quantidadeDeDiscos = torre.discos.length;
  let texto = `${getLinhaComun()}\n${quantidadeDeDiscos === 0 ? 'Torre vazia\n' : ''}`;
  for (let i = quantidadeDeDiscos -1; i >= 0; i--) {
    const disco = torre.discos[i];
    texto += `Disco com diâmetro ${disco.diametro} \n`;
  }
  return `${texto} \n Torre ${torre.nome + 1}`
}

function printarTorres(jogo: JogoEntity): void {
  console.log(`${desenhoTorre(jogo.torreUm)} ${desenhoTorre(jogo.torreDois)} ${desenhoTorre(jogo.torreTres)} \n ${getLinhaComun()}`);
}

function getTorreName(torre: number): TorresEnum {
  if (torre === 1) {
    return TorresEnum.TORRE_UM;
  }
  if (torre === 2) {
    return TorresEnum.TORRE_DOIS;
  }

  if (torre === 3) {
    return TorresEnum.TORRE_TRES;
  }

  throw new Error('Opção de torre inválida');

}

async function escolherTorre(torreAescolher: string): Promise<TorresEnum> {
  let decisaoInvalida = true;
  let resultado: TorresEnum;
  while (decisaoInvalida) {
    try {
      const input = await question.execute(`Informe a torre de ${torreAescolher}: `) || '0';
      resultado = getTorreName(parseInt(input));
      decisaoInvalida = false;
    } catch (error) {
      let message = 'Erro não identificado';
      if (error instanceof Error) {
        message = error.message;
      }
      console.log(message);
    }
  }
  return resultado!;
}

async function jogar(jogo: JogoEntity): Promise<void> {
  printarLinha();
  console.log('Informe a torre(1, 2 ou 3) de origem e a torre destino do seu disco');
  printarLinha();
  let jogadaInvalida = true;
  while (jogadaInvalida) {
    const origem = await escolherTorre('origem');
    const destino = await escolherTorre('destino');
    try {
      jogo.mudarDisco(origem!, destino!);
      jogadaInvalida = false;
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  console.log('Jogada concluida!!');
}

async function main(): Promise<void> {
  printarLinha();
  console.log('Torre de hanoi');
  printarLinha();
  const jogo = new JogoEntity(3);

  while (!jogo.vitoria) {
    printarLinha();
    printarJogadas(jogo.jogadas);
    printarLinha();

    printarTorres(jogo);
    await jogar(jogo);
  }
  console.log(`Parabéns você ganhou com ${jogo.jogadas}`);
}

main();
