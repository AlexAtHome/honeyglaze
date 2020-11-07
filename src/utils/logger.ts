import chalk from 'chalk'

export class Logger {
  static log(text: string): void {
    console.log(`${this.getAppTag()} ${text}`)
  }

  static error(text: string): void {
    console.error(`${this.getAppTag()} ${chalk.red(`[ERR] ${text}`)}`)
  }

  static warn(text: string): void {
    console.warn(`${this.getAppTag()} ${chalk.yellow(`[WARN] ${text}`)}`)
  }

  private static getAppTag(): string {
    return chalk.blue('[honeyglaze]')
  }
}
