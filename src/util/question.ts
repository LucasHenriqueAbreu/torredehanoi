import { createInterface, Interface } from "readline";

class Question {
  private _readline: Interface;

  constructor() {
    this._readline = createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  public execute(questionText: string): Promise<string> {
    return new Promise<string>((resolve) => {
      this._readline.question(questionText, (resposta) => {
        // TODO: verificar como fechar o readline.
        // this._readline.close();
        resolve(resposta);
      });
    });
  }
}

export default Question;