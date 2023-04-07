import { promises as fs } from 'fs'
const { readFile, writeFile } = fs

async function insertAccount(account) {
  const data = JSON.parse(await readFile(fileName))
  account = {
    id: data.nextId++,
    name: account.name,
    balance: account.balance
  }

  data.accounts.push(account)

  await writeFile(fileName, JSON.stringify(data, null, 2))

  return account
}

async function getAccounts() {
  const data = JSON.parse(await readFile(fileName))
  return data.accounts
}

async function getAccount(id) {
  const accounts = await getAccounts()

  const accountData = accounts.find(account => account.id === parseInt(id))
  if (accountData) {
    return accountData
  }
  throw new Error('Registro não encontrado')
}

async function deleteAccount(id) {
  const data = JSON.parse(await readFile(fileName))
  const accountDeleted = data.accounts.find(
    account => account.id === parseInt(id)
  )
  data.accounts = data.accounts.filter(account => account.id != parseInt(id))

  await writeFile(fileName, JSON.stringify(data, null, 2))
  return accountDeleted
}

async function updateAccount(account) {
  const data = JSON.parse(await readFile(fileName))

  const index = data.accounts.findIndex(a => a.id === account.id)
  console.log(`index: ${index}`)

  if (index === -1) {
    throw new Error('Erro! Conta não encontrada!')
  }

  data.accounts[index].name = account.name
  data.accounts[index].balance = account.balance

  await writeFile(fileName, JSON.stringify(data, null, 2))
  return data.accounts[index]
}



export default {
  insertAccount,
  getAccounts,
  getAccount,
  deleteAccount,
  updateAccount
}
