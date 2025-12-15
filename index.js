const mineflayer = require('mineflayer')

function startBot() {
  const bot = mineflayer.createBot({
    host: "kowamc.com",
    port: 25565,
    username: "LuanzinRtx",
    version: false
  })

  const password = "trocar123"
  let logged = false

  bot.on('spawn', () => {
    console.log("Spawn detectado, iniciando login...")

    // spam de login
    let tries = 0
    const loginInterval = setInterval(() => {
      if (logged) return clearInterval(loginInterval)
      bot.chat(`/login ${password}`)
      tries++
      if (tries >= 20) clearInterval(loginInterval)
    }, 400)
  })

  bot.on('message', msg => {
    const text = msg.toString().toLowerCase()
    console.log("Servidor:", text)

    if (
      text.includes("logado") ||
      text.includes("sucesso") ||
      text.includes("bem vindo")
    ) {
      if (logged) return
      logged = true

      console.log("✔ Logado! Indo até o NPC do SMP...")

      setTimeout(irProNPC, 3000)
    }
  })

  function irProNPC() {
  console.log("Indo até o NPC (sem virar a câmera)")

  // ANDAR PRA FRENTE 3.36s (W)
  bot.setControlState('forward', true)
  setTimeout(() => {
    bot.setControlState('forward', false)

    // ANDAR PRA DIREITA 1.75s (D)
    bot.setControlState('right', true)
    setTimeout(() => {
      bot.setControlState('right', false)

      // CLIQUE DIREITO
      console.log("Clicando no NPC...")
      bot.activateEntity(bot.nearestEntity())

    }, 1750)

  }, 3360)
}


  bot.on('end', () => {
    console.log("Bot caiu, reconectando em 5s...")
    setTimeout(startBot, 5000)
  })

  bot.on('error', err => console.log("Erro:", err))
}

startBot()
