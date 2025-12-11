const mineflayer = require('mineflayer')

function startBot() {
  const bot = mineflayer.createBot({
    host: "kowamc.com",
    port: 25565,
    username: "LuanzinRtx",
    version: false
  })

  const password = "trocar123"

  bot.once('login', () => {
    console.log("Bot conectou ao Kowamc, tentando logar...")
  })

  // LOGIN AUTOMÁTICO SPAM (10 segundos)
  bot.on('spawn', () => {
    console.log("Spawn detectado, iniciando spam de login...")
    let attempts = 0
    const interval = setInterval(() => {
      bot.chat(`/login ${password}`)
      attempts++
      if (attempts >= 20) clearInterval(interval)
    }, 500)
  })

  // DEBUG: ver mensagens do servidor
  bot.on('message', msg => {
    console.log("Servidor:", msg.toString())
  })

  bot.on('end', () => {
    console.log("Bot caiu, reconectando em 5s...")
    setTimeout(startBot, 5000)
  })

  bot.on('error', err => {
    console.log("Erro:", err)
  })
}

startBot()
