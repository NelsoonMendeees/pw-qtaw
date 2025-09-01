export class LoginPage {
  constructor(page) {
    this.page = page
  }

  async acessaPagina() {
    await this.page.goto('/')
  }

  async informaCPF(cpf) {
    await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf)
    await this.page.getByRole('button', { name: 'Continuar' }).click()
  }

  async informaSenha(pass) {
    for (const digito of pass) {
      await this.page.getByRole('button', { name: digito }).click()
    }
    await this.page.getByRole('button', { name: 'Continuar' }).click()
  }

  async informa2FA(code) {
    await this.page.getByRole('textbox', { name: '000000' }).fill(code)
    await this.page.getByRole('button', { name: 'Verificar' }).click()
  }


}
