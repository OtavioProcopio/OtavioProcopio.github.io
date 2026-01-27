# Relatório de Auditoria Técnica: Tibiadex Android

Como Senior Tech Lead, realizei uma auditoria profunda no repositório Tibiadex. Este documento serve como a "Fonte da Verdade" para o seu portfólio, fornecendo a semântica técnica necessária para vender sua experiência e se preparar para desafios de nível Sênior.

---

## SEÇÃO 1: Mapeamento para Currículo (Venda do Projeto)

* **Nome do Projeto & One-Liner:** Tibiadex Android | Aplicativo nativo de alta performance para consulta de dados em tempo real do MMORPG Tibia via API REST.
* **Domínio de Negócio:** Gaming Data Analytics & Real-time Information Services.
* **Stack Tecnológica:** Java 11, Android SDK (Min SDK 29), Material Design 3, Volley (Networking), RecyclerView, JSON Parsing, Library Version Catalogs (Gradle/TOML).

### Hard Skills Evidenciadas (Bullets para CV):
* Arquitetou a integração com a TibiaData API (v4), implementando um sistema de consumo assíncrono via Volley com padrão Singleton para otimizar o gerenciamento de conexões.
* Implementou lógica de filtragem de dados em dois níveis (texto e categoria) em RecyclerViews, garantindo uma experiência de busca fluida em datasets volumosos de jogadores online.
* Otimizou a interface de usuário com Material Design Components, criando uma experiência temática personalizada (Dark/Gold) com suporte a estados complexos de visibilidade dinâmica.
* Padronizou o sistema de Build utilizando Gradle Version Catalogs (libs.versions.toml), facilitando a manutenção e atualização centralizada de dependências do projeto.

### Soft Skills Implícitas:
* **Pragmatismo Técnico:** Escolha consciente de uma arquitetura centrada em Activities para entrega rápida e baixo overhead em uma aplicação focada em leitura (Read-only).
* **Atenção à UX:** Foco em feedback visual imediato (Toasts) e navegação intuitiva baseada em Intents.

---

## SEÇÃO 2: Engenharia & Arquitetura (Deep Dive)

**Padrão Arquitetural:** Android MVC (Traditional). A estrutura é orientada a Activities, onde estas assumem as responsabilidades de Controller (interação com API e lógica de negócio) e View (gerenciamento do ciclo de vida da UI). Essa abordagem foi escolhida para reduzir a complexidade de estados em uma aplicação que não requer persistência de dados local exaustiva.

### Design Patterns Identificados:
* **Singleton:** Aplicado em `VolleySingleton.java` para garantir uma única RequestQueue global, vital para a performance de rede em Android.
* **Adapter/ViewHolder:** Presente em todos os componentes de listagem (ex: `WorldAdapter.java`), desacoplando a representação dos dados da lógica de reciclagem de views.
* **Data Transfer Object (DTO):** Modelos como `World.java` usam campos públicos para reduzir o consumo de memória e boilerplate em operações intensivas de parsing JSON.

### Fluxo de Dados:
1. **Trigger:** `Activity.onCreate()` ou ação do usuário dispara requisição.
2. **Request:** `VolleySingleton` despacha a URL configurada em `ApiConstants.java`.
3. **Parse:** O callback `onResponse` da Activity converte o JSONObject bruto nos Modelos POJO.
4. **Update:** A lista filtrada do Adapter é atualizada e o método `notifyDataSetChanged()` reflete os dados na UI.

### Decisões Técnicas (O "Porquê"):
* **Campos Públicos nos Models:** Decisão de design focada em performance e simplicidade de acesso, eliminando o overhead de chamadas de métodos (getters/setters) em loops de renderização de listas extensas.
* **Filtro Local vs Server-side:** Ao carregar todos os dados e filtrar localmente em memória (`allItems` vs `filteredItems`), o app reduz a latência percebida pelo usuário durante a busca, evitando múltiplas chamadas à API.

---

## SEÇÃO 3: Preparação para Entrevista (O "Pulo do Gato")

### Funcionalidades Críticas:
* **WorldDetailActivity:** Revisar a lógica de abas customizadas e troca de visibilidade.
* **BossesActivity:** Estudar a implementação do Infinite Scroll (ScrollListener com flag `isLoading`).

### Roleplay com Recrutador (3 Perguntas Difíceis):

**Pergunta 1 (Arquitetura): "Por que você não usou ViewModel ou LiveData aqui?"**
> **Resposta Ideal:** "O projeto foi concebido como um 'Information Hub' leve e stateless. A complexidade do ViewModel traria um custo de desenvolvimento maior sem um benefício imediato, já que não temos persistência local em Room ou fluxos de dados reativos. Optei pela simplicidade do MVC para garantir uma aplicação com baixo footprint de memória."

**Pergunta 2 (Networking): "O que acontece se o usuário girar a tela enquanto uma requisição do Volley está em curso?"**
> **Resposta Ideal:** "O Volley está vinculado ao contexto da aplicação via VolleySingleton, o que evita vazamentos de memória básicos. No entanto, para evitar que o resultado tente atualizar uma UI já destruída, poderíamos cancelar as requisições no `onStop()` da Activity usando Tags do Volley."

**Pergunta 3 (Performance): "Como o carregamento de imagens de criaturas é gerenciado?"**
> **Resposta Ideal:** "Atualmente, utilizamos o `ImageRequest` do Volley. Em uma escala maior, o 'próximo nível' seria introduzir o Glide ou Coil para gerenciar o cache em disco de forma mais agressiva, economizando dados do usuário."

---

## SEÇÃO 4: Honestidade Técnica (Pontos de Melhoria)

### Análise de Gaps:
* **Persistência Offline:** O app depende 100% de conectividade. A inclusão de um cache local (SharedPreferences ou Room) para mundos e favoritos elevaria o nível do projeto.
* **Testes:** Ausência de testes unitários para a lógica de filtragem e parsing, que são o coração da aplicação.
* **Injeção de Dependências:** O uso de Singletons estáticos pode dificultar o teste. Migrar para Hilt/Dagger seria o passo para uma maturidade Sênior.

### Sugestão de Refatoração:
* **Separação de Preocupações:** Mover o código de parsing JSON (atualmente dentro do `onResponse` das Activities) para classes Mapper ou um Repository especializado.
* **Modernização de Layout:** Migrar estruturas de LinearLayout aninhados para ConstraintLayout para achatar a hierarquia da View e melhorar o tempo de renderização (inflacting).