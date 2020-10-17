import chalk from 'chalk'

export class Logger {
  static log(text: string): void {
    console.log(`${chalk.blue('[some-project]')} ${text}`)
  }
}
