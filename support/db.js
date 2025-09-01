import pgPromise from 'pg-promise'

const pgp = pgPromise()
const db = pgp('postgresql://dba:dba@paybank-db:5432/UserDB')

export async function obterCodigo2FA(cpf) {
  const query = `
        SELECT t.code
        FROM public."TwoFactorCode" as t
		    JOIN public."User" as u ON u."id" = t."userId"
		    WHERE u."cpf" = '${cpf}'
        ORDER BY t.id DESC 
        LIMIT 1;
    `
  const result = await db.oneOrNone(query)
  return result.code
}
