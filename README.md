# 🛣️ ViaSegura — Mapeamento Colaborativo de Danos Asfálticos

> Plataforma web colaborativa para reportar buracos e danos em vias públicas de Governador Celso Ramos (SC), com geolocalização automática e mapa em tempo real.

[![Site ao Vivo](https://img.shields.io/badge/🌐%20Site%20ao%20vivo-fabricioosm.github.io%2FViaSeguros-4cff7a?style=for-the-badge)](https://fabricioosm.github.io/ViaSeguros/)
[![Status](https://img.shields.io/badge/status-MVP%20ativo-green?style=for-the-badge)]()
[![Instituição](https://img.shields.io/badge/UNIVALI-Trabalho%20Acadêmico-blue?style=for-the-badge)]()

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Demonstração](#-demonstração)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Estrutura de Dados](#-estrutura-de-dados)
- [Como Usar o Site](#-como-usar-o-site)
- [Contexto Acadêmico](#-contexto-acadêmico)
- [Canvas do Projeto](#-canvas-do-projeto)
- [Análise Competitiva](#-análise-competitiva)
- [Equipe](#-equipe)

---

## 📌 Sobre o Projeto

O **ViaSegura** é uma plataforma de mapeamento colaborativo de danos asfálticos desenvolvida como MVP (Minimum Viable Product) para a cidade de **Governador Celso Ramos, SC**. O sistema permite que cidadãos reportem buracos e outros problemas em vias públicas em menos de 30 segundos, utilizando foto e GPS automático, gerando um mapa público acessível pela secretaria de obras municipal para priorização de intervenções.

### Problema que resolve

- **Prejuízo aos veículos:** buracos danificam pneus, suspensão e carroceria.
- **Acidentes graves:** falhas na pavimentação aumentam o risco para condutores e pedestres.
- **Processo burocrático:** sem canal direto, reportes levam semanas para chegar à secretaria de obras.

### Proposta de valor

Qualquer cidadão com um smartphone pode reportar um dano em 3 etapas simples: fotografar → GPS automático → enviar. O reporte aparece instantaneamente no mapa público, visível pela prefeitura.

---

## 🌐 Demonstração

🔗 **[https://fabricioosm.github.io/ViaSeguros/](https://fabricioosm.github.io/ViaSeguros/)**

O site conta com um **demo interativo completo** que simula o fluxo real do aplicativo, incluindo:
- Mapa com pins de buracos reportados
- Tela de câmera com leitura de GPS simulada
- Tela de confirmação do reporte
- Tela de sucesso com protocolo gerado
- Formulário real de reporte com pin dinâmico no mapa

---

## ✅ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 🗺️ Mapa colaborativo | Visualização de todos os buracos reportados na cidade |
| 📍 GPS automático | Captura de coordenadas com precisão inferior a 5 metros |
| 📷 Captura de foto | Registro visual do dano diretamente pelo celular |
| 📋 Formulário de reporte | Envio com endereço, bairro, gravidade e descrição |
| 🎯 Severidade | Classificação em Baixa, Média e Alta gravidade |
| 🆕 Pin dinâmico | Novo pin aparece no mapa após submissão do formulário |
| 📊 Canvas interativo | Visualização do Business Model, Proposta de Valor e Canvas MVP |
| 📱 Demo interativo | Simulação completa do fluxo do app mobile |
| 🏆 Análise competitiva | Comparação com Waze e Colab.re |
| 📈 Progresso de navegação | Barra de progresso de leitura na navbar |

---

## 🛠️ Tecnologias Utilizadas

O projeto é inteiramente **front-end estático** — sem backend, banco de dados real ou frameworks JavaScript. Toda a lógica roda no navegador.

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura semântica das páginas e seções |
| **CSS3** | Estilização completa com variáveis CSS, animações e layout responsivo |
| **JavaScript (Vanilla ES6+)** | Toda a interatividade: simulador, formulário, mapa, toast, drag & drop |
| **SVG** | Mapa interativo de Governador Celso Ramos com pins animados |
| **CSS Animations & Keyframes** | Animações dos pins no mapa, pulso GPS, transições de tela |
| **Geolocation API (Web)** | Captura simulada de coordenadas GPS via `navigator.geolocation` |
| **Google Fonts** | Famílias tipográficas `Space Mono` e `Syne` |
| **GitHub Pages** | Hospedagem estática gratuita |

### Decisões técnicas relevantes

- **Sem frameworks:** React, Vue ou Angular foram descartados para manter o MVP leve e simples de hospedar.
- **Sem backend:** Os dados são simulados no front-end. Em produção, seria integrado a uma API REST com banco de dados geoespacial (ex: PostGIS + Node.js).
- **PWA-ready:** A estrutura HTML/CSS/JS pura facilita futura conversão para Progressive Web App, tornando o app instalável no celular.
- **Responsivo:** Layout adaptado para mobile via media queries, fundamental para uso em campo.

---

## 📁 Estrutura do Projeto

```
ViaSeguros/
│
├── index.html        # Estrutura principal — todas as seções da landing page
├── style.css         # Estilos globais, variáveis CSS, componentes e responsividade
└── main.js           # Toda a lógica JavaScript da aplicação
```

O projeto adota uma arquitetura de **arquivo único por responsabilidade**, mantendo HTML, CSS e JS separados porém sem necessidade de bundler ou build step.

---

## 🗂️ Estrutura de Dados

Como o projeto é um MVP estático, os dados são representados como objetos JavaScript em memória. Abaixo estão as estruturas principais utilizadas:

### Reporte de Dano (Report)

```javascript
{
  id: "VS-2025-4821",          // Protocolo único gerado aleatoriamente
  address: "Rua das Acácias, 142",  // Endereço / referência
  bairro: "AREIAS",            // Bairro selecionado pelo usuário
  severity: "Alta",            // "Baixa" | "Média" | "Alta"
  description: "Buraco...",    // Texto livre descritivo
  reporter: "Cidadão anônimo", // Nome opcional do reportante
  coordinates: {
    lat: -27.3401,             // Latitude (WGS84)
    lng: -48.5642              // Longitude (WGS84)
  },
  gpsAccuracy: 4,              // Precisão em metros
  photo: "foto_buraco.jpg",    // Nome da foto capturada
  timestamp: "14:32",          // Horário do reporte
  status: "Pendente"           // "Pendente" | "Em análise" | "Resolvido"
}
```

### Pin do Mapa (MapPin)

```javascript
{
  cx: 90,              // Coordenada X no SVG viewBox (0–900)
  cy: 110,             // Coordenada Y no SVG viewBox (0–300)
  address: "Rua das Acácias, 142",
  severity: "Alta",    // Define a cor: Alta = #ff5c5c | Média = #ffb84c | Baixa/Resolvido = #4cff7a
  status: "Pendente"
}
```

### Dados pré-carregados no mapa

| Endereço | Região | Gravidade | Status |
|---|---|---|---|
| Rua das Acácias, 142 | AREIAS | Alta | Pendente |
| Av. Beira Mar, 87 | GANCHOS | Média | Em análise |
| Rua do Porto, 33 | AREIAS | Alta | Pendente |
| Rua das Flores, 210 | GANCHOS | Baixa | Resolvido |
| Rua Nova, 55 | PALMAS | Média | Em análise |
| Av. Central, 400 | PALMAS | Alta | Pendente |

### Estado do Simulador (Simulator State)

```javascript
{
  currentScreen: 0,    // Índice da tela ativa: 0=Mapa, 1=Câmera, 2=Confirmação, 3=Sucesso
  gpsCoords: {
    lat: -27.3401,
    lng: -48.5642,
    accuracy: 4        // metros
  },
  reportId: 7342       // ID aleatório exibido na tela de sucesso
}
```

---

## 🖥️ Como Usar o Site

### Navegação geral

1. Acesse **[https://fabricioosm.github.io/ViaSeguros/](https://fabricioosm.github.io/ViaSeguros/)**
2. Use a **navbar fixa** no topo para navegar entre as seções: Problema, Solução, Canvas, Demo e Reportar.
3. A **barra de progresso** na navbar indica quantos % da página já foram percorridos.

### Demo Interativo (Simulador do App)

1. Clique em **"Ver Demo Interativo"** na hero section ou acesse a seção **Demo** pela navbar.
2. Use os **4 passos** na coluna esquerda ou interaja diretamente com o celular simulado:
   - **Tela 1 — Mapa:** clique nos pins para ver os buracos já reportados. Clique em **"+ Reportar"** para avançar.
   - **Tela 2 — Câmera:** observe o GPS piscando com coordenadas reais. Clique no **botão branco (shutter)** para capturar.
   - **Tela 3 — Confirmação:** revise os dados (localização, foto, gravidade, horário) e clique **"Enviar Reporte ✓"**.
   - **Tela 4 — Sucesso:** veja o protocolo gerado e a notificação da prefeitura. Clique **"← Voltar ao Mapa"** para recomeçar.

### Mapa de Danos

1. Role até a seção **"Mapa de Danos"**.
2. Clique nos **pins coloridos** para ver detalhes (endereço, gravidade, status).
3. Após enviar um reporte no formulário, um **pin verde 🆕** aparecerá automaticamente no mapa.

### Formulário de Reporte

1. Role até a seção **"Reportar"** ou clique em **"Reportar Buraco"** na hero.
2. Preencha:
   - Endereço / referência (obrigatório)
   - Bairro (obrigatório)
   - Gravidade: 🟢 Baixa | 🟡 Média | 🔴 Alta
   - Descrição do problema (obrigatório)
   - Nome (opcional)
   - Coordenadas GPS: clique no campo para simular a captura automática
3. Clique em **"📍 Enviar Reporte ao ViaSegura"**.
4. Um protocolo **VS-XXXX-XXXX** será gerado e um pin novo aparecerá no mapa.

### Canvas do Projeto

- Acesse a seção **Canvas** e use as **abas** para alternar entre:
  - **Proposta de Valor** — mapa de valor e perfil do cliente
  - **Business Model** — os 9 blocos do modelo de negócio
  - **Canvas MVP** — validação mínima e estratégia go-to-market

---

## 🎓 Contexto Acadêmico

Este projeto foi desenvolvido como **trabalho acadêmico** para o curso de **Análise e Desenvolvimento de Sistemas (ADS)** da **UNIVALI — Universidade do Vale do Itajaí**, campus de Governador Celso Ramos, SC.

O objetivo foi aplicar na prática conceitos de:
- **Empreendedorismo e Inovação:** uso de ferramentas como Canvas de Proposta de Valor e Business Model Canvas
- **Desenvolvimento de MVP:** foco na solução mínima viável para validar a hipótese central
- **UX/UI:** fluxo de apenas 3 etapas para garantir usabilidade em campo
- **Gestão ágil:** estruturação do backlog e sprints com metodologia Scrum

---

## 📊 Canvas do Projeto

### Proposta de Valor

| Mapa de Valor | Perfil do Cliente |
|---|---|
| App de reporte geolocalizado com foto + GPS | Reportar danos às vias de forma rápida |
| Elimina burocracia — reporte em 30 segundos | Canal de denúncia burocrático e sem retorno |
| Mapa de calor que prioriza manutenções | Vias conservadas, menos acidentes, cidadania ativa |

### Modelo de Negócio (resumo)

- **Segmentos:** Moradores de GCR e municípios de pequeno/médio porte; secretarias de obras
- **Canais:** PWA mobile, redes sociais locais, associações de bairro
- **Receita:** Licenciamento SaaS para prefeituras com painel analítico
- **Parcerias:** Prefeitura de GCR, UNIVALI, provedores de nuvem
- **Métricas do MVP:** Reporte em <30s por 80% dos usuários no teste de usabilidade

---

## ⚔️ Análise Competitiva

| Concorrente | O que fazem | Ponto fraco vs ViaSegura |
|---|---|---|
| **Waze** | Navegação GPS e alertas de trânsito | Foco no desvio do buraco, não na solução |
| **Colab.re** | Plataforma de zeladoria urbana | Fluxo burocrático e lento |
| **ViaSegura ★** | Mapeamento de danos asfálticos | Foco viário 100% + simplicidade máxima |

---

## 👥 Equipe

| Nome | Papel |
|---|---|
| **Eduardo Sabino Marques** | Desenvolvimento & Ideação |
| **Fabricio Medeiros** | Desenvolvimento & Ideação |

**Instituição:** UNIVALI — Universidade do Vale do Itajaí  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS)  
**Cidade:** Governador Celso Ramos, SC, Brasil

---

## 📄 Licença

Projeto acadêmico — uso educacional. Para uso comercial ou adaptação, entre em contato com os autores.

---

<p align="center">
  Feito com 💚 em Governador Celso Ramos, SC &nbsp;·&nbsp; UNIVALI · ADS
</p>