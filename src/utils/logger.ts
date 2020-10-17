import chalk from 'chalk'

export class Logger {
  static log(text: string): void {
    console.log(`${this.getAppTag()} ${text}`)
  }

  static error(text: string): void {
    console.error(`${this.getAppTag()} ${chalk.red(text)}`)
  }

  private static getAppTag(): string {
    return chalk.blue('[some-project]')
  }
}
