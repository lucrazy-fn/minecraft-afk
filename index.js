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

  // Login com spam (única forma de entrar no Kowamc cracked)
  bot.on('spawn', () => {
    console.log("Spawn detectado, iniciando spam de login...")
    let attempts = 0

    const interval = setInterval(() => {
      if (logged) return clearInterval(interval)
      bot.chat(`/login ${password}`)
      attempts++
      if (attempts >= 25) clearInterval(interval)
    }, 400)

    setTimeout(() => tryOpenCompass(), 6000)
  })

  // Detecta mensagem do servidor
  bot.on('message', msg => {
    const text = msg.toString().toLowerCase()
    console.log("Servidor:", text)

    if (text.includes("logado") || text.includes("sucesso") || text.includes("bem vindo")) {
      logged = true
      console.log("✔ Logado com sucesso!")
      setTimeout(() => tryOpenCompass(), 2000)
    }
  })

  // Clica a bússola (botão direito)
  function tryOpenCompass() {
    console.log("🧭 Clicando a bússola...")
    bot.activateItem()
    setTimeout(clickSMP, 3500)
  }

  // Acha e clica o oak_sapling
  function clickSMP() {
    const win = bot.currentWindow
    if (!win) {
      console.log("❌ Menu não abriu, tentando de novo...")
      return setTimeout(clickSMP, 1000)
    }

    const smpItem = win.slots.find(slot =>
      slot &&
      slot.name === "oak_sapling"  // <<< GARANTIDO
    )

    if (!smpItem) {
      console.log("❌ SMP (oak_sapling) não encontrado, tentando novamente...")
      return setTimeout(clickSMP, 1000)
    }

    console.log("🌱 SMP encontrado! Clicando para entrar...")
    bot.simpleClick.leftMouse(smpItem.slot)
  }

  bot.on('end', () => {
    console.log("Bot caiu, reconectando em 5s...")
    setTimeout(startBot, 5000)
  })

  bot.on('error', err => console.log("Erro:", err))
}

startBot()
