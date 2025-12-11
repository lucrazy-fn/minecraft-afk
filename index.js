const mineflayer = require('mineflayer')

function startBot() {
  const bot = mineflayer.createBot({
    host: "kowamc.com",
    port: 25565,
    username: "LuanzinRtx",
    version: false
  })

  const password = "trocar123"

  bot.once('spawn', () => {
    console.log("Bot entrou no servidor, tentando logar...")
    let attempts = 0
    const interval = setInterval(() => {
      bot.chat(`/login ${password}`)
      attempts++
      if (attempts >= 20) clearInterval(interval)
    }, 500)
  })

  // Quando conseguir logar e o bot estiver realmente no mundo
  bot.on('spawn', async () => {
    console.log("Spawn final detectado, entrando no SMP...")

    setTimeout(async () => {
      try {
        // 1. Achar a bússola no inventário
        const compass = bot.inventory.items().find(item => item.name.includes("compass"))
        if (!compass) return console.log("❌ Não achei a bússola no inventário!")

        console.log("📍 Bússola encontrada:", compass.name)

        // 2. Segurar a bússola
        await bot.equip(compass, "hand")

        // 3. Abrir o menu com botão direito
        console.log("📂 Abrindo menu com a bússola...")
        bot.activateItem() // clique direito
        bot.deactivateItem()

      } catch (err) {
        console.log("Erro ao abrir GUI:", err)
      }
    }, 3000) // esperar login terminar
  })

  // 4. Detectar quando a GUI abrir
  bot.on("windowOpen", async (window) => {
    console.log("GUI aberta:", window.title)

    // procurar muda de carvalho (oak sapling)
    const slot = window.slots.findIndex(item => item && item.name === "oak_sapling")

    if (slot === -1) {
      console.log("❌ Não achei a muda de carvalho na GUI.")
      return
    }

    console.log("🌱 Muda de carvalho encontrada no slot", slot, " — entrando no SMP!")

    try {
      await bot.simpleClick.leftMouse(slot)
    } catch (err) {
      console.log("Erro ao clicar na muda:", err)
    }
  })

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
