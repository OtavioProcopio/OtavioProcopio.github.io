# Auditoria Técnica: IA Course Agent Frontend

Este documento apresenta uma análise profunda da engenharia, arquitetura e decisões de design do projeto **course-agent-frontend**, servindo como base técnica para **portfólio**, **currículo** e **preparação para entrevistas**.

---

## SEÇÃO 1: Mapeamento para Currículo (Venda do Projeto)

### Nome do Projeto & One-Liner
**IA Course Agent Frontend** – Interface reativa de alta performance para orquestração da criação de cursos digitais automatizados por IA.

### Domínio de Negócio
**EdTech e Automação de Conteúdo**  
O sistema resolve o gargalo de produção de cursos ao automatizar:
- Planejamento pedagógico  
- Escrita de roteiros  
- Geração de áudio (TTS) via IA  

### Stack Tecnológica

**Linguagens / Frameworks**
- React 18  
- TypeScript  
- Vite  

**Estado Global**
- Zustand  

**Comunicação**
- Axios com Interceptors  

**Estilização**
- Tailwind CSS  
- PostCSS  

**UI / UX**
- Lucide React  
- Design Responsivo  

### Hard Skills Evidenciadas (Bullets para CV)

- Arquitetou uma solução de gerenciamento de estado escalável utilizando **Zustand**, reduzindo boilerplate em comparação ao Redux e otimizando a performance de renderização.
- Implementou um sistema de **Polling Assíncrono** para monitoramento em tempo real de processos de IA de longa duração (geração de roteiros e síntese de voz).
- Desenvolveu uma camada de serviços desacoplada com **Axios + TypeScript**, utilizando interceptors para tratamento global de erros e logging de requisições.
- Construiu interfaces ricas e responsivas com **Tailwind CSS**, focadas na experiência do usuário para dashboards de monitoramento e fluxos de aprovação de conteúdo.

### Soft Skills Implícitas

- **Pensamento Sistêmico:** Estrutura clara de pastas e separação de responsabilidades (*Separation of Concerns*).
- **Atenção a Detalhes:** Tipagem rigorosa com TypeScript garantindo integridade entre frontend e backend.
- **Pragmatismo Técnico:** Adoção de ferramentas modernas (Vite, Zustand) priorizando velocidade de desenvolvimento e manutenibilidade.

---

## SEÇÃO 2: Engenharia & Arquitetura (Deep Dive)

### Padrão Arquitetural

Arquitetura em Camadas (*Layered Architecture*) adaptada para React:

- **types** → Definição de Domínio (Single Source of Truth para interfaces)
- **services** → Camada de Infraestrutura/Dados (Comunicação com API)
- **store** → Camada de Business Logic / Estado (Orquestração do fluxo de dados)
- **pages / components** → Camada de Apresentação

### Design Patterns Identificados

- **Singleton (Store):** Zustand garante uma instância única do estado do curso.
- **Repository / Service:** Abstração da complexidade de chamadas HTTP (`courseService.ts`).
- **Interceptor:** Implementado em `api.ts` para lógica transversal (*cross-cutting concerns*).
- **Higher-Order Components (Layouts):** Uso de `MainLayout` para encapsular estrutura comum da aplicação.

### Fluxo de Dados (Caminho Feliz)

1. O usuário dispara uma ação na **Page** (ex: `generateScripts`).
2. A Page chama a **action** no Zustand Store (`useCourseStore`).
3. O Store invoca o **Service** (`courseService`) com os parâmetros necessários.
4. O Service realiza a chamada HTTP via **Axios**.
5. O **Interceptor** captura a resposta (ou erro) e a devolve ao Service.
6. O Store atualiza o estado reativo.
7. A UI sofre **re-render automático** refletindo o novo estado.

### Decisões Técnicas (O “Porquê”)

**Por que Zustand?**  
Redux seria excessivo para este cenário. Zustand oferece:
- API minimalista  
- Sem Providers aninhados  
- Acesso simples ao estado fora dos componentes  

**Por que Polling em vez de WebSockets?**  
Implementado em `CourseDetails.tsx:55`. Escolha baseada em:
- Simplicidade de implementação  
- Resiliência para processos de 30s a 2min  
- Evita a complexidade de manter conexões WebSocket persistentes  

**Por que TypeScript Estrito?**  
Para mitigar erros em runtime ao lidar com múltiplos status de curso (`DRAFT`, `PLANNING_COMPLETE`, etc.), garantindo que a UI reflita fielmente o estado do backend.

---

## SEÇÃO 3: Preparação para Entrevista (O “Pulo do Gato”)

### Funcionalidades Críticas

- **CourseDetails.tsx:** Lógica de polling e gestão de estado complexo.
- **courseStore.ts:** Núcleo da inteligência de transição de estados.
- **api.ts:** Centralização da resiliência e tratamento de falhas de rede.

### Roleplay com Recrutador (Perguntas Difíceis)

**Pergunta 1 – Arquitetura**  
> *Como você lidaria com a escalabilidade se o número de status de um curso aumentasse muito no futuro?*

**Resposta Ideal:**  
Utilizaria o padrão **State Machine** ou **uniões discriminadas no TypeScript**, garantindo que cada componente trate apenas os status relevantes. Também criaria hooks customizados para encapsular a lógica de transição no Zustand.

---

**Pergunta 2 – Decisão Técnica**  
> *Por que você moveu a lógica de chamada de API para dentro das actions do Zustand em vez de usá-las diretamente nos componentes?*

**Resposta Ideal:**  
Para garantir **separação de responsabilidades**. Componentes disparam intenções de UI, enquanto o Store centraliza a lógica de negócio, facilitando reuso, testes e manutenção.

---

**Pergunta 3 – Desafio / Complexidade**  
> *Como você garantiu que o polling não causasse memory leaks ou race conditions?*

**Resposta Ideal:**  
Utilizando `useEffect` com função de cleanup, limpando corretamente o `setInterval` e controlando o estado de `isPolling`. Além disso, o polling verifica se o processo já foi concluído antes de agendar novos ciclos.

---

## SEÇÃO 4: Honestidade Técnica (Pontos de Melhoria)

### Análise de Gaps

- **Ausência de Testes:**  
  Falta de testes unitários (Vitest) para stores e testes de integração (Playwright / Cypress) para fluxos críticos.
  
- **Server-State Management:**  
  Zustand funciona, mas **React Query (TanStack Query)** seria mais eficiente para cache, revalidação e polling nativo.

- **Internacionalização (i18n):**  
  Textos hardcoded em Português limitam a escalabilidade internacional.

### Sugestões de Refatoração

- Extrair a lógica de polling de `CourseDetails.tsx` para um **Custom Hook reutilizável** (`useCoursePolling`).
- Implementar um **ErrorBoundary global** para capturar falhas críticas de renderização.
- Migrar chamadas manuais do Zustand para **React Query**, mantendo o Zustand apenas para **UI State** (temas, modais, flags visuais).

---
