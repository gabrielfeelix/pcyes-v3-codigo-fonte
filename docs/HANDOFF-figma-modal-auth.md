# Handoff — Modal de autenticação PCYES para Figma

Spec para reconstruir no Figma o modal de login/cadastro já implementado em código.
Origem: commit `90641bb`. Arquivos: `src/app/components/AuthModal.tsx` e
`src/app/components/auth/`.

Tudo abaixo são valores medidos do código, não aproximações. O tema padrão do
protótipo é o **escuro** — desenhe nele primeiro.

---

## 1. Tokens

Do `src/styles/theme.css`. `foreground` no escuro é branco puro, então toda
opacidade abaixo é branco sobre o fundo do modal.

### Cor

| Token | Escuro | Claro |
|---|---|---|
| `--background` | `#121212` | `#FAFAFA` |
| `--foreground` | `#FFFFFF` | `#161616` |
| `--primary` | `#FF2B2E` | `#DC1414` |
| `--primary-foreground` | `#FFFFFF` | `#FFFFFF` |
| `--surface-1` | `#1A1A1A` | `#FFFFFF` |
| Fundo do modal | `#161617` | `#FFFFFF` |
| Borda do modal | `rgba(255,255,255,.06)` | `rgba(0,0,0,.08)` |
| Verde de status | `#10B981` (emerald-500) | igual |

Derivadas por opacidade sobre branco (escuro):

| Uso | Valor |
|---|---|
| Fundo de campo | `rgba(255,255,255,.03)` |
| Borda de campo | `rgba(255,255,255,.08)` |
| Borda de campo em foco/aberto | `rgba(255,255,255,.20)` |
| Texto principal | `#FFFFFF` |
| Valor de campo preenchido | `#FFFFFF` |
| Texto secundário | `rgba(255,255,255,.60)` |
| Rótulo | `rgba(255,255,255,.45)` |
| Meta / apoio | `rgba(255,255,255,.40)` |
| Aba inativa | `rgba(255,255,255,.35)` |
| Placeholder | `rgba(255,255,255,.20)` |
| Letra miúda (termos) | `rgba(255,255,255,.25)` |
| Botão secundário (fundo) | `rgba(255,255,255,.05)` |
| Item de lista em hover | `rgba(255,255,255,.06)` |

### Tipografia

Família única: **Inter**.

| Papel | Tamanho | Peso | Observação |
|---|---|---|---|
| Razão social no card | 15px | 500 | `letter-spacing: -0.01em` |
| Corpo / campo / aba | 14px (`--text-sm`) | 400 | abas e botões em 500 |
| Legenda / meta / rótulo | 12px (`--text-caption`) | 400 | |
| Código de 6 dígitos | 20px | 400 | `letter-spacing: 0.4em`, centralizado |

Pesos disponíveis: 300 / 400 / 500.

**Números de documento** (CNPJ, IE, CEP) usam `font-variant-numeric: tabular-nums`.
No Figma: ative *Tabular figures* nas features da fonte. CNPJ leva
`letter-spacing: 0.02em` a mais.

### Raio e espaço

| Token | Valor | Onde |
|---|---|---|
| `--radius-card-md` | **18px** | canto do modal |
| `--radius-button` | **4px** | campos, botões, painel do dropdown |
| `--radius-card-sm` | 12px | — |

Grid de espaçamento base 4px. Vertical entre campos: **12px**.

---

## 2. Estrutura do modal

- Largura: **420px** (máx.), altura máxima 92vh com rolagem interna
- Padding lateral: **32px**
- Overlay: preto a 70% + `backdrop-blur` 12px

```
┌─────────────────────────────────────┐  ← raio 18px, fundo #161617
│                              [ ✕ ]  │  ✕ em 32×32, canto 16/16
│            [ logo PCYES ]           │  altura 28px, centralizado
│           subtítulo 14px            │  rgba(255,255,255,.40)
│                                     │  ← 24px
├─────────── abas (só cadastro) ──────┤  régua full-bleed .08
│                                     │  ← 24px
│           corpo variável            │
│                                     │
│         rodapé de troca 14px        │  ← 32px até a base
└─────────────────────────────────────┘
```

Topo: 32px. Logo → subtítulo: 20px.

---

## 3. Componentes base

### Campo de texto
- Altura **44px** · fundo `.03` · borda 1px `.08` · raio 4px
- Texto 14px `#FFFFFF`, placeholder `.20`
- Ícone 15px à esquerda, `.20`, a 14px da borda; texto começa em **40px**
- Foco: borda vira `.20`
- Campo de senha tem olho 24×24 à direita (`.20`, hover `.50`)

### Botão primário
- Largura total · altura **48px** · fundo `--primary` · texto branco 14px/500
- Raio 4px · rótulo + seta `→` 15px, gap 8px
- Desabilitado: opacidade 40%

### Botão voltar
- **48×48** · fundo `.05` · seta `←` 15px em `.60` · raio 4px
- Fica à esquerda do primário, gap 10px

### Abas de tipo de conta
- Duas etiquetas centralizadas, **gap 32px**, 14px/500
- Ativa `#FFFFFF` com **sublinhado de 2px em `--primary`** colado na régua
- Inativa `.35`
- Régua de 1px `.08` atravessando o modal inteiro
- Padding inferior da etiqueta: 12px
- Estados: `Pessoa Física` (padrão) · `Pessoa Jurídica`

> Nunca desenhar como pílula preenchida: vira sósia do par Apple|Discord logo abaixo, e um é modo, o outro é ação.

### Dropdown com busca (`SearchableSelect`)
Componente próprio — **não** é o Select do design system.

**Fechado:** igual ao campo de texto, com chevron 15px `.30` à direita.
Placeholder `.20`, valor escolhido `#FFFFFF`.

**Aberto:**
- Chevron gira 180°, borda do gatilho vira `.20`
- Painel **sobreposto** (flutua sobre os campos de baixo, não empurra), 8px abaixo
- Fundo `--surface-1` `#1A1A1A` · borda `.10` · raio 4px · sombra grande preta 40%
- Campo de busca no topo (só quando houver **8+ opções**): 12px, ícone de lupa 14px, régua embaixo
- Lista: altura máxima **132px** com rolagem — mostra ~3 itens e corta o 4º
- Item: padding 16px/8px, texto 12px `.70`, hover `.06`
- Item selecionado: texto branco/500 + check 14px em `--primary` à direita
- Item com apoio (CNAE): segunda linha 12px `.30`

### Botões sociais
- Google: largura total, altura 44px, **fundo branco, texto preto**, raio 4px
- Apple e Discord: grid 2 colunas, gap 10px, fundo `.05`, texto `.70`, 12px/500
- Só existem no **login** e no **cadastro PF**. Ausentes no cadastro PJ.

---

## 4. Telas a desenhar

### A. Login
Logo · `Bem-vindo de volta` · sem abas · sociais · divisória `ou` · E-mail · Senha ·
`Esqueceu a senha?` (12px `.30`, alinhado à direita) · botão `Entrar` ·
rodapé `Não tem conta? Cadastre-se`.

Divisória: linha `.05` — texto `ou` 12px `.20` — linha, gap 16px, margem vertical 20px.

### B. Recuperar senha — 4 telas
Subtítulo vira `Recuperar senha`. Sem abas, sem sociais, sem rodapé de troca.
Todas terminam com `← Voltar pro login` (12px `.30`, centralizado).

1. **E-mail** — apoio: `Digite o e-mail da sua conta. Enviamos um código de 6 dígitos pra ele.` · campo E-mail · botão `Enviar código`
2. **Código** — apoio: `Código enviado para {email}.` · campo de 6 dígitos centralizado (20px, tracking 0.4em, placeholder `000000`) · `Reenviar em 30s` / `Reenviar código` · botão `Confirmar`
3. **Nova senha** — apoio: `Escolha a senha nova.` · `Nova senha` · `Repita a nova senha` · `Mínimo de 8 caracteres.` · botão `Salvar senha`
4. **Sucesso** — círculo 48px verde a 15% com check 22px · `Senha alterada` (14px/500) · `Levando você pro login…` (12px `.40`)

### C. Cadastro PF
Abas com `Pessoa Física` ativa · sociais · divisória · Nome completo · E-mail · Senha ·
botão `Criar conta` · linha de termos · rodapé `Já tem conta? Faça login`.

### D–G. Cadastro PJ — 4 passos
Abas com `Pessoa Jurídica` ativa. **Sem botões sociais.**

Cabeçalho de passo, acima dos campos:
- Esquerda: rótulo 12px/500 `.50`
- Direita: **trilha de 4 traços** de 3px, raio total — atual `20×3` em `--primary`; concluídos `10×3` em `--primary` a 40%; futuros `10×3` em `.10`; gap 6px

| Passo | Rótulo | Conteúdo |
|---|---|---|
| 1 | `Sua empresa` | campo CNPJ |
| 2 | `Dados da empresa` | card + Atividade principal + Ramo de atividade |
| 3 | `Seus dados` | Nome · Sobrenome (2 colunas, gap 10px) + Celular |
| 4 | `Seu acesso` | E-mail + Senha + Confirmar senha + `Mínimo de 8 caracteres.` |

Botão: `Continuar →` nos passos 1–3, `Criar conta →` no 4. Voltar aparece do 2 em diante.
Termos só no passo 4.

#### Passo 1 — os 5 estados
1. **Vazio** — campo `CNPJ`, botão desabilitado
2. **Consultando** — spinner 15px `.30` girando à direita do campo
3. **Encontrado** — card de confirmação:
   fundo `.03`, borda `.08`, raio 4px, padding 14px
   · círculo 20px verde a 15% com check 12px
   · razão social 14px/500 branco (**em Caixa de Título**)
   · `Ativa · Maringá/PR` 12px `.40`
   · `trocar` 12px `.30` à direita
4. **Erro** — ícone de alerta 14px + texto 12px em `--primary`. Quando for limite de API ou rede, some `↻ tentar de novo` sublinhado
5. **Já cadastrado** — mesmo formato de erro: `Esse CNPJ já tem conta na PCYES.` + `Faça login` sublinhado

#### Passo 2 — o card de dados
**Sem caixa.** Régua vertical de **2px em `--primary` a 40%** à esquerda, conteúdo recuado 16px.

```
│  Oderco Distribuidora de Eletronicos LTDA        ● Ativa
│  09.301.845/0001-91 · IE 9055023015
│  ─────────────────────────────────────────────────────
│  Avenida Paranavai, 1906 · Parque Industrial Bandeirantes
│  — 87070-130 · Maringá/PR
```

- Razão social: 15px/500 branco, `letter-spacing -0.01em`, entrelinha 1.35
- Status: ponto 6px + rótulo, 12px verde, alinhado ao topo à direita
- Documentos: 12px `.50`, tabular, `letter-spacing 0.02em`, 4px abaixo
- Régua de 1px `.08` com 12px acima e 10px abaixo
- Endereço: 12px `.40`, entrelinha 1.65, tabular

> **Travessão (—) separa local de localização.** Ponto médio (·) separa itens dentro de cada metade. Nada aqui é editável.

Abaixo: dois dropdowns, cada um com rótulo 12px `.45` e 6px de respiro.
- `Atividade principal` — placeholder `Selecione`, busca ativa (9 CNAEs), item com código na segunda linha
- `Ramo de atividade` — placeholder `O que sua empresa faz com o produto?`, **sem busca** (7 opções)

Opções de ramo: Revenda / loja de informática · Assistência técnica ·
Montagem de PC / integrador · Lan house / centro de games · Distribuidor ·
Uso interno da empresa · Outro

---

## 5. Regras que mudam o desenho

1. **Login nunca pergunta PF/PJ.** A conta já sabe. Abas só existem no cadastro.
2. **Caixa de Título em tudo que vem da Receita.** A API devolve `AVENIDA PARANAVAI` e a tela mostra `Avenida Paranavai`. Siglas ficam em caixa alta: LTDA, ME, EPP, EIRELI, MEI, SA, CIA. Conectivos em minúscula: de, da, do, dos, das, e, em.
3. **Dados da Receita não são editáveis** — desenhe como texto, nunca como campo.
4. **Entrega PJ só no endereço do CNPJ.** Regra de sistema, sem aviso na interface.
5. **Erro é sempre `--primary`** com ícone de alerta 14px à esquerda.
6. **Mensagem de erro oferece saída** quando existe: `tentar de novo` ou `Faça login`.

---

## 6. Não desenhar

- Inscrição estadual como campo — vem da Receita, exibida só no card
- Endereço como campo no cadastro — vem da Receita, coletado no checkout
- Checkbox de aceite de termos — é linha de texto com links, 12px `.25`
- Botões sociais na aba PJ
- Frases removidas a pedido: "Dados da Receita Federal. Não editáveis." e "Entregamos apenas neste endereço…"

---

## 7. Pendências (fora deste modal)

- Checkout precisa bloquear endereço diferente do CNPJ
- Badge "Revenda" no menu da conta logada
- `/revendedor` tem dois funis concorrentes: formulário de lead + atalho de cadastro instantâneo
- Empresa com mais de uma IE ativa: hoje o sistema pega a do estado da matriz sem perguntar
