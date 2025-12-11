const mineflayer = require('mineflayer')
const { Vec3 } = require('vec3')

function startBot() {
  const bot = mineflayer.createBot({
    host: "kowamc.com",
    port: 25565,
    username: "LuanzinRtx",
    version: false
  })

  const password = "trocar123"

  bot.once('spawn', () => {
    console.log("Spawnou, aguardando menus carregarem...")
    setTimeout(openCompass, 3000)
  })

  bot.on('message', msg => {
    const text = msg.toString().toLowerCase()

    if (text.includes("/login")) {
      bot.chat(`/login ${password}`)
      console.log("🔑 Logando...")
    }
  })

  function openCompass() {
    const item = bot.inventory.items().find(i => i.name.includes("compass"))
    if (!item) {
      console.log("❌ Bússola não encontrada, tentando novamente...")
      return setTimeout(openCompass, 1500)
    }

    console.log("🧭 Abrindo bússola...")
    bot.activateItem()  // botão direito segurando item na mão

    setTimeout(selectSMP, 3000)
  }

  function selectSMP() {
    const window = bot.currentWindow
    if (!window) {
      console.log("❌ Janela do servidor não abriu")
      return setTimeout(selectSMP, 1500)
    }

    // Procura a muda de carvalho
    const slot = window.slots.find(slot =>
      slot && slot.name && (slot.name.includes("sapling") || slot.displayName?.toLowerCase().includes("carvalho"))
    )

    if (!slot) {
      console.log("❌ Muda de Carvalho não encontrada, tentando de novo...")
      return setTimeout(selectSMP, 1500)
    }

    console.log("🌱 Entrando no SMP...")
    bot.simpleClick.leftMouse(slot.slot)

    setTimeout(() => {
      console.log("✔️ Clique enviado, deve entrar no SMP agora.")
    }, 1000)
  }

  bot.on('end', () => {
    console.log("Bot caiu, reconectando...")
    setTimeout(startBot, 5000)
  })

  bot.on('error', err => console.log("Erro:", err))
}

startBot()
