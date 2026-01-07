const mineflayer = require('mineflayer')

const SERVER = "jogar.heavensmp.xyz"
const PORT = 25565
const PASSWORD = "LuanzinXD"

const CONTAS = [
  "LuanzinRtx",
  "101br",
  "102us",
  "mamypepo",
  "LosPepittos",
  "bebedupzao",
  "bayernkklego",
  "qQ199_",
  "xantagos",
  "puredeervilha",
  "juliokieto_",
  "manoeusoulegal",
  "ilovedrdon",
  "krigrj"
]

function criarBot(username) {
  const bot = mineflayer.createBot({
    host: SERVER,
    port: PORT,
    username: username,
    version: false
  })

  let logado = false

  bot.on('spawn', () => {
    console.log(`[${username}] Spawnou, tentando login...`)

    let tentativas = 0
    const interval = setInterval(() => {
      if (logado) return clearInterval(interval)
      bot.chat(`/login ${PASSWORD}`)
      tentativas++
      if (tentativas >= 15) clearInterval(interval)
    }, 500)
  })

  bot.on('message', msg => {
    const texto = msg.toString().toLowerCase()

    if (
      texto.includes("logado") ||
      texto.includes("sucesso") ||
      texto.includes("bem vindo")
    ) {
      if (logado) return
      logado = true
      console.log(`[${username}] ✔ Logado e AFK`)
    }
  })

  bot.on('end', () => {
    console.log(`[${username}] Caiu, reconectando em 5s...`)
    setTimeout(() => criarBot(username), 5000)
  })

  bot.on('error', err => {
    console.log(`[${username}] Erro:`, err.message)
  })
}

// cria os bots com delay (pra não cair tudo de uma vez)
CONTAS.forEach((nick, i) => {
  setTimeout(() => {
    criarBot(nick)
  }, i * 4000)
})
