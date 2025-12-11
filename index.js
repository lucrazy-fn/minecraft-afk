const mineflayer = require('mineflayer')

function startBot() {
  const bot = mineflayer.createBot({
    host: "kowamc.com",
    port: 25565,
    username: "LuanzinRtx",
    version: false
  })

  const password = "trocar123"

  // Login automático
  bot.on('message', msg => {
    const t = msg.toString().toLowerCase()
    if (t.includes("/login")) {
      bot.chat(`/login ${password}`)
      console.log("🔐 Logando...")
    }
  })

  // Quando o bot spawna
  bot.once('spawn', () => {
    console.log("🧭 Spawnou! Clicando a bússola...")
    setTimeout(() => bot.activateItem(), 2000) // botão direito

    // Depois abrir o menu e clicar no SMP
    setTimeout(clickSMP, 4000)
  })

  function clickSMP() {
    const win = bot.currentWindow
    if (!win) {
      console.log("❌ Menu não abriu, tentando de novo...")
      return setTimeout(clickSMP, 1500)
    }

    // Procura item "Muda de Carvalho" (oak sapling)
    const sapling = win.slots.find(
      slot =>
        slot &&
        (slot.name.includes("sapling") ||
         slot.displayName?.toLowerCase().includes("carvalho") ||
         slot.displayName?.toLowerCase().includes("smp"))
    )

    if (!sapling) {
      console.log("❌ Muda de Carvalho não encontrada, tentando...")
      return setTimeout(clickSMP, 1500)
    }

    console.log("🌱 Clicando para entrar no SMP...")
    bot.simpleClick.leftMouse(sapling.slot)
  }

  bot.on('end', () => {
    console.log("Bot caiu, reconectando em 5s...")
    setTimeout(startBot, 5000)
  })
}

startBot()
