# Relatório de Auditoria Técnica: Soar Music Studios

> **Propósito:** Este documento serve como a "Fonte da Verdade" técnica para o projeto Soar Music Studios, consolidando decisões de engenharia, arquitetura e qualidade para uso em currículos, portfólios e preparação para entrevistas.

---

## SEÇÃO 1: Mapeamento para Currículo (Venda do Projeto)

### Visão Geral
* **Nome do Projeto & One-Liner:** Soar Music Studios Web Ecosystem – Plataforma institucional de alta performance desenvolvida com React 19 e Vite, focada em escalabilidade de conteúdo e experiência do usuário mobile-first.
* **Domínio de Negócio:** EdTech e Presença Digital para redes de ensino musical. O projeto resolve a fragmentação de informações de múltiplas unidades físicas (Arceburgo, Guaranésia, Guaxupé, Juruaia) em uma interface única e otimizada.

### Stack Tecnológica
* **Core:** React 19.2 (Functional Components, Hooks), TypeScript 5.8.
* **Build & Tooling:** Vite 6.2, PostCSS, ESLint.
* **UI/UX:** Tailwind CSS 3.4 (Design System customizado), Lucide React.
* **Routing:** React Router DOM 7.
* **Testes:** Vitest, React Testing Library, JSDOM.

### Hard Skills Evidenciadas (Bullets para CV)
* **Arquitetou** uma infraestrutura de frontend moderna utilizando **React 19 e Vite**, reduzindo o tempo de build e garantindo compatibilidade com as funcionalidades mais recentes do ecossistema.
* **Implementou** uma arquitetura **Data-Driven UI**, centralizando regras de negócio e conteúdos institucionais em configurações tipadas com **TypeScript**, facilitando a manutenção e futuras migrações para headless CMS.
* **Desenvolveu** um design system responsivo e performático com **Tailwind CSS**, alcançando um bundle final otimizado de ~120KB gzipped e garantindo acessibilidade em dispositivos móveis.
* **Estabeleceu** uma cultura de qualidade via **TDD (Test Driven Development)**, alcançando cobertura de testes unitários e de integração com **Vitest**, garantindo a integridade do fluxo de navegação.

### Soft Skills Implícitas
* **Pensamento Sistêmico:** Estrutura de pastas modular que separa claramente componentes, páginas, tipos e configurações.
* **Atenção aos Detalhes:** Implementação de feedbacks visuais (animações de fade-in, hover states) e tratamento de estados de erro em embeds (mapas/vídeos).
* **Foco em Manutenibilidade:** Uso rigoroso de TypeScript para evitar bugs em tempo de execução e facilitar o onboarding de novos desenvolvedores.

---

## SEÇÃO 2: Engenharia & Arquitetura (Deep Dive)

### Padrão Arquitetural
**Modular Component-Based Architecture.** A aplicação utiliza um padrão de "Shell" via `Layout.tsx`, que encapsula as rotas. A separação em `pages` (containers) e `components` (apresentação) segue o princípio de separação de interesses (SoC).

### Design Patterns Identificados
1.  **Configuration Pattern (Data-Driven):** Visível em `constants.ts`, onde o conteúdo do site é tratado como dado, não como código hardcoded.
2.  **Layout/Wrapper Pattern:** Centralização de elementos globais (Navbar, Footer, SEO) para garantir consistência visual.
3.  **DTO (Data Transfer Objects):** Interfaces em `types.ts` que definem o contrato de dados consumido pelos componentes.

### Fluxo de Dados (Caminho Feliz)
`User Interaction` -> `React Router (URL Match)` -> `Layout.tsx` -> `Page Component (ex: StudiosPage.tsx)` -> `Local/Global Config (constants.ts)` -> `UI Render`

### Decisões Técnicas (O "Porquê")
* **React 19 + TypeScript:** Escolha por "Bleeding Edge" para garantir longevidade ao código e aproveitar melhorias de performance no motor de renderização.
* **Vite 6:** Substituição de ferramentas legadas (CRA/Webpack) para obter tempos de Hot Module Replacement (HMR) sub-segundos, elevando a produtividade.
* **Centralização de Dados em Constants:** Decisão estratégica para permitir que o site seja atualizado rapidamente sem deploy de código complexo, preparando o terreno para uma API real.

---

## SEÇÃO 3: Preparação para Entrevista (O "Pulo do Gato")

### Funcionalidades Críticas
* `constants.ts`: O "cérebro" da aplicação. Entenda como os arrays de `PLANS`, `TEACHERS` e `STUDIOS` alimentam a UI.
* `StudiosPage.tsx`: Lógica complexa de renderização condicional de IFrames (Google Maps) e layouts alternados.

### Roleplay com Recrutador (3 Perguntas Difíceis)

#### Pergunta 1 (Arquitetura)
**"Como você lidaria com a escalabilidade se o número de unidades (Studios) passasse de 4 para 400?"**

> **Resposta Ideal:** "A arquitetura atual já está preparada para isso através das interfaces em `types.ts`. Eu migraria o arquivo de `constants.ts` para um serviço de Backend (como Supabase ou Node.js), utilizaria **React Query** para fetching e implementaria uma busca/filtro no frontend para melhorar a UX."

#### Pergunta 2 (Decisão Técnica)
**"Por que usar Tailwind CSS em vez de Styled Components neste projeto?"**

> **Resposta Ideal:** "Pela performance e simplicidade. O Tailwind gera um CSS estático em tempo de build, eliminando o overhead de runtime do CSS-in-JS. Além disso, a consistência visual é garantida pelo arquivo de configuração sem a necessidade de criar centenas de wrappers de estilo."

#### Pergunta 3 (Desafio)
**"Como você garantiu que o site fosse rápido mesmo com vários embeds de vídeo e mapas?"**

> **Resposta Ideal:** "Utilizei estratégias de **lazy loading** nativas no browser para os IFrames (`loading="lazy"`) e priorizei o carregamento do conteúdo textual (LCP) através da otimização do bundle do Vite, garantindo que o JavaScript pesado não bloqueasse a renderização inicial."

---

## SEÇÃO 4: Honestidade Técnica (Pontos de Melhoria)

### Análise de Gaps
* **Falta de State Management Global:** Atualmente não é necessário, mas se houver um "Carrinho de Matrícula", seria necessário Context API ou Zustand.
* **Internacionalização (i18n):** O site está 100% em português. Implementar `react-i18next` seria o próximo passo para profissionalização.
* **Error Boundaries:** Falta um tratamento global de erros para caso um componente específico (como o vídeo do YouTube) falhe.

### Sugestão de Refatoração
* **Image Optimization:** Substituir as tags `<img>` padrão por um componente customizado que suporte `srcset` ou integração com serviços de otimização de imagem (Cloudinary/Vercel OG).
* **Separation of Concerns:** Extrair a lógica de mapeamento de URLs do Google Maps em `constants.ts` para um utilitário de domínio separado.