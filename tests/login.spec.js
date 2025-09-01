import { test, expect } from '@playwright/test'
import { obterCodigo2FA } from '../support/db'
import { LoginPage } from '../pages/LoginPage'
import { DashPage } from '../pages/DashPage'
import { getJob, cleanJobs } from '../support/redis'

test('Não deve logar quando o codigo de autenticação é inválido', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const user = {
    cpf: '00000014141',
    pass: '147258'
  }

  await loginPage.acessaPagina()
  await loginPage.informaCPF(user.cpf)
  await loginPage.informaSenha(user.pass)
  await loginPage.informa2FA('123456')
  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.')
})

test('Deve acessar a conta do usuário', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const dashPage = new DashPage(page)

  const user = {
    cpf: '00000014141',
    pass: '147258'
  }

  await cleanJobs()

  await loginPage.acessaPagina()
  await loginPage.informaCPF(user.cpf)
  await loginPage.informaSenha(user.pass)

  await page.getByRole('heading', { name: 'Verificação em duas etapas' }).waitFor({ state: 'visible', timeout: 3000 })

  const code  = await getJob()
  // const code = await obterCodigo2FA(user.cpf)
  await loginPage.informa2FA(code)

  await expect(await dashPage.obterSaldo()).toHaveText('R$ 5.000,00')
})
