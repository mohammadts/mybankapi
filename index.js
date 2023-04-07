import express from 'express'
import winston from "winston"
const app = express()
app.use(express.json())
import accountsRouter from './routes/account.routes.js'
import { promises as fs } from 'fs'
const { readFile, writeFile } = fs
global.fileName = "accounts.json"
const {combine, timestamp, label, printf}=winston.format

const myFormat = printf(({level, message, label, timestamp}) =>{
  return `${timestamp} [${label}] ${level} ${message}`
})
global.logger = winston.createLogger({
  level: "silly",
  transports:[
    new(winston.transports.Console)(),
    new(winston.transports.File)({filename:"my-bank-api.log"})
  ],
  format: combine(
    label({label:"my-bank-api"}),
    timestamp(),
    myFormat
  )
})



app.use('/account', accountsRouter)

app.listen(3000, async () => {
  try {
    await readFile(global.fileName)
    logger.info("API started")
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: []
    }
    writeFile(fileName, JSON.stringify(initialJson))
      .then(() => {
        logger.info('Online and file created')
      })
      .catch(err => {
        logger.error(err)
      })
  }
})
