const mineflayer = require('mineflayer')

function startBot() {
  const bot = mineflayer.createBot({
    host: "kowamc.com",
    port: 25565,
    username: "LuanzinRtx",
    version: false
  })

  const password = "trocar123" // sua senha fixa

  bot.once('login', () => {
    console.log("Bot entrou no Kowamc!")
  })

  // Detecta mensagem do servidor e faz login automático
  bot.on('message', msg => {
    const text = msg.toString().toLowerCase()
    console.log("Servidor:", text)

    if (text.includes("/login") || text.includes("logar") || text.includes("login")) {
      bot.chat(`/login ${password}`)
      console.log("🔑 Logando...")
    }
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
