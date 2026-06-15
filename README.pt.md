# 🤖 Mineflayer AFK Bot

> 🇧🇷 Português | [🇺🇸 English](./README.md)

Bot AFK para servidores Minecraft com suporte a múltiplas contas, login automático e reconexão automática.

> ☁️ **Recomendado:** hospedar em um serviço de nuvem para manter o bot online 24/7 sem precisar deixar seu PC ligado.

## ✨ Funcionalidades

- Conecta múltiplas contas simultaneamente
- Login automático com senha via `/login`
- Reconexão automática após queda (5 segundos)
- Detecção de login bem-sucedido por mensagem do servidor
- Delay escalonado entre conexões para evitar ban por flood

## 📦 Requisitos

- [Node.js](https://nodejs.org/) v16 ou superior
- npm

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/lucrazy-fn/minecraft-afk.git
cd minecraft-afk

# Instale as dependências
npm install
```

## ⚙️ Configuração

Edite as seguintes variáveis no início do arquivo `index.js`:

```js
const SERVER   = "Servidor.Desejado"  // IP ou domínio do servidor
const PORT     = 25565                // Porta do servidor
const PASSWORD = "SuaSenha"           // Senha usada no /login

const CONTAS = [
  "Conta1",
  "Conta2"
]
```

## ▶️ Uso local

```bash
node index.js
```

Cada conta será conectada com um intervalo de 4 segundos entre elas. Após o spawn, o bot tentará fazer login automaticamente a cada 500ms até receber a confirmação do servidor.

## ☁️ Hospedagem em nuvem (recomendado)

Para manter o bot rodando 24/7 sem precisar deixar seu computador ligado, hospede em um destes serviços:

---

### 🚄 [Railway](https://railway.app) — *mais fácil, recomendado*

Plano gratuito disponível. Deploy direto pelo GitHub em poucos cliques.

1. Crie uma conta em [railway.app](https://railway.app)
2. Clique em **New Project → Deploy from GitHub repo**
3. Selecione este repositório
4. Vá em **Variables** e adicione as variáveis de ambiente (veja abaixo)
5. O bot sobe automaticamente

---

### 🟣 [Render](https://render.com)

Plano gratuito com 750h/mês. Boa alternativa ao Railway.

1. Crie uma conta em [render.com](https://render.com)
2. Clique em **New → Background Worker**
3. Conecte seu repositório GitHub
4. Build Command: `npm install`
5. Start Command: `node index.js`
6. Adicione as variáveis de ambiente e clique em **Create**

---

### 🔷 [Koyeb](https://www.koyeb.com)

Plano gratuito com instâncias sempre ativas (sem sleep).

1. Crie uma conta em [koyeb.com](https://www.koyeb.com)
2. Clique em **Create App → GitHub**
3. Selecione o repositório
4. Run command: `node index.js`
5. Adicione as variáveis e faça o deploy

---

### 🌊 [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)

Pago, mas estável e confiável para uso contínuo.

1. Crie um app em **Apps → Create App**
2. Conecte o repositório GitHub
3. Tipo: **Worker**
4. Adicione as variáveis de ambiente
5. Escolha o plano e faça o deploy

---

### 🖥️ VPS (avançado)

Se preferir controle total, use qualquer VPS (DigitalOcean Droplet, Contabo, Hostinger VPS etc.) com Node.js instalado e rode o bot com [PM2](https://pm2.keymetrics.io/):

```bash
npm install -g pm2
pm2 start index.js --name afk-bot
pm2 save
pm2 startup
```

---

### 🔐 Variáveis de ambiente (recomendado para nuvem)

Em vez de deixar senha e IP hardcoded no código, use variáveis de ambiente:

```js
const SERVER   = process.env.SERVER   || "Servidor.Desejado"
const PORT     = process.env.PORT     || 25565
const PASSWORD = process.env.PASSWORD || "SuaSenha"
```

Configure no painel do serviço escolhido:

| Variável   | Exemplo              |
|------------|----------------------|
| `SERVER`   | `mc.servidor.com`    |
| `PORT`     | `25565`              |
| `PASSWORD` | `minha_senha`        |

## 📋 Exemplo de saída

```
[Conta1] Spawnou, tentando login...
[Conta1] ✔ Logado e AFK
[Conta2] Spawnou, tentando login...
[Conta2] ✔ Logado e AFK
[Conta1] Caiu, reconectando em 5s...
```

## 🔧 Como funciona

1. Para cada conta em `CONTAS`, um bot é criado com delay de `índice × 4000ms`
2. Ao fazer spawn, o bot envia `/login <senha>` a cada 500ms (até 15 tentativas)
3. O bot monitora o chat do servidor em busca das palavras-chave `logado`, `sucesso` ou `bem vindo`
4. Quando detecta o login, para de enviar o comando e fica em modo AFK
5. Se a conexão cair, reconecta automaticamente após 5 segundos

## 📁 Estrutura do projeto

```
.
├── index.js      # Script principal
├── package.json  # Dependências e configuração do projeto
├── README.md     # Português
└── README.en.md  # English
```

## 📦 package.json

O projeto usa um `package.json` simples com apenas uma dependência:

```json
{
  "name": "minecraft-afk",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "mineflayer": "^4.16.0"
  }
}
```

Para serviços de nuvem como Railway e Render, é importante que o `package.json` esteja na raiz do repositório — eles detectam automaticamente que é um projeto Node.js e rodam `npm install` antes de iniciar.

## ⚠️ Aviso

Use este bot apenas em servidores onde você tem permissão. O uso indevido pode resultar em ban da conta ou do IP.

## 📄 Licença

MIT# 🤖 Mineflayer AFK Bot

> 🇧🇷 Português | [🇺🇸 English](./README.en.md)

Bot AFK para servidores Minecraft com suporte a múltiplas contas, login automático e reconexão automática.

> ☁️ **Recomendado:** hospedar em um serviço de nuvem para manter o bot online 24/7 sem precisar deixar seu PC ligado.

## ✨ Funcionalidades

- Conecta múltiplas contas simultaneamente
- Login automático com senha via `/login`
- Reconexão automática após queda (5 segundos)
- Detecção de login bem-sucedido por mensagem do servidor
- Delay escalonado entre conexões para evitar ban por flood

## 📦 Requisitos

- [Node.js](https://nodejs.org/) v16 ou superior
- npm

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/lucrazy-fn/minecraft-afk.git
cd minecraft-afk

# Instale as dependências
npm install
```

## ⚙️ Configuração

Edite as seguintes variáveis no início do arquivo `index.js`:

```js
const SERVER   = "Servidor.Desejado"  // IP ou domínio do servidor
const PORT     = 25565                // Porta do servidor
const PASSWORD = "SuaSenha"           // Senha usada no /login

const CONTAS = [
  "Conta1",
  "Conta2"
]
```

## ▶️ Uso local

```bash
node index.js
```

Cada conta será conectada com um intervalo de 4 segundos entre elas. Após o spawn, o bot tentará fazer login automaticamente a cada 500ms até receber a confirmação do servidor.

## ☁️ Hospedagem em nuvem (recomendado)

Para manter o bot rodando 24/7 sem precisar deixar seu computador ligado, hospede em um destes serviços:

---

### 🚄 [Railway](https://railway.app) — *mais fácil, recomendado*

Plano gratuito disponível. Deploy direto pelo GitHub em poucos cliques.

1. Crie uma conta em [railway.app](https://railway.app)
2. Clique em **New Project → Deploy from GitHub repo**
3. Selecione este repositório
4. Vá em **Variables** e adicione as variáveis de ambiente (veja abaixo)
5. O bot sobe automaticamente

---

### 🟣 [Render](https://render.com)

Plano gratuito com 750h/mês. Boa alternativa ao Railway.

1. Crie uma conta em [render.com](https://render.com)
2. Clique em **New → Background Worker**
3. Conecte seu repositório GitHub
4. Build Command: `npm install`
5. Start Command: `node index.js`
6. Adicione as variáveis de ambiente e clique em **Create**

---

### 🔷 [Koyeb](https://www.koyeb.com)

Plano gratuito com instâncias sempre ativas (sem sleep).

1. Crie uma conta em [koyeb.com](https://www.koyeb.com)
2. Clique em **Create App → GitHub**
3. Selecione o repositório
4. Run command: `node index.js`
5. Adicione as variáveis e faça o deploy

---

### 🌊 [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)

Pago, mas estável e confiável para uso contínuo.

1. Crie um app em **Apps → Create App**
2. Conecte o repositório GitHub
3. Tipo: **Worker**
4. Adicione as variáveis de ambiente
5. Escolha o plano e faça o deploy

---

### 🖥️ VPS (avançado)

Se preferir controle total, use qualquer VPS (DigitalOcean Droplet, Contabo, Hostinger VPS etc.) com Node.js instalado e rode o bot com [PM2](https://pm2.keymetrics.io/):

```bash
npm install -g pm2
pm2 start index.js --name afk-bot
pm2 save
pm2 startup
```

---

### 🔐 Variáveis de ambiente (recomendado para nuvem)

Em vez de deixar senha e IP hardcoded no código, use variáveis de ambiente:

```js
const SERVER   = process.env.SERVER   || "Servidor.Desejado"
const PORT     = process.env.PORT     || 25565
const PASSWORD = process.env.PASSWORD || "SuaSenha"
```

Configure no painel do serviço escolhido:

| Variável   | Exemplo              |
|------------|----------------------|
| `SERVER`   | `mc.servidor.com`    |
| `PORT`     | `25565`              |
| `PASSWORD` | `minha_senha`        |

## 📋 Exemplo de saída

```
[Conta1] Spawnou, tentando login...
[Conta1] ✔ Logado e AFK
[Conta2] Spawnou, tentando login...
[Conta2] ✔ Logado e AFK
[Conta1] Caiu, reconectando em 5s...
```

## 🔧 Como funciona

1. Para cada conta em `CONTAS`, um bot é criado com delay de `índice × 4000ms`
2. Ao fazer spawn, o bot envia `/login <senha>` a cada 500ms (até 15 tentativas)
3. O bot monitora o chat do servidor em busca das palavras-chave `logado`, `sucesso` ou `bem vindo`
4. Quando detecta o login, para de enviar o comando e fica em modo AFK
5. Se a conexão cair, reconecta automaticamente após 5 segundos

## 📁 Estrutura do projeto

```
.
├── index.js      # Script principal
├── package.json  # Dependências e configuração do projeto
├── README.md     # Português
└── README.en.md  # English
```

## 📦 package.json

O projeto usa um `package.json` simples com apenas uma dependência:

```json
{
  "name": "minecraft-afk",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "mineflayer": "^4.16.0"
  }
}
```

Para serviços de nuvem como Railway e Render, é importante que o `package.json` esteja na raiz do repositório — eles detectam automaticamente que é um projeto Node.js e rodam `npm install` antes de iniciar.

## ⚠️ Aviso

Use este bot apenas em servidores onde você tem permissão. O uso indevido pode resultar em ban da conta ou do IP.

## 📄 Licença

MIT
