# RELATÓRIO DE AUDITORIA TÉCNICA: VSHAPE API

## SEÇÃO 1: Mapeamento para Currículo (Venda do Projeto)

*   **Nome do Projeto & One-Liner:** **Vshape API** – Ecossistema backend de alta performance para saúde preditiva e fitness, utilizando IA Generativa para personalização extrema de treinos e dietas.
*   **Domínio de Negócio:** Saúde (HealthTech). Resolve o problema de engajamento e personalização em massa para usuários de fitness que não possuem acesso a personal trainers humanos.
*   **Stack Tecnológica:**
    *   **Linguagem:** Java 21 (LTS).
    *   **Framework:** Spring Boot 3.5+, Spring Security, Spring Data JPA, Spring AOP.
    *   **Inteligência Artificial:** Integração via Google Gemini API (WebClient/Reactive).
    *   **Banco de Dados:** PostgreSQL (Produção), H2 (Testes).
    *   **DevOps/Infra:** Docker, Docker Compose, Makefile, JaCoCo (Code Coverage).
*   **Hard Skills Evidenciadas (Bullets para CV):**
    *   **Arquitetou** um motor de IA generativa integrado com Google Gemini para gerar relatórios de progresso e dicas diárias personalizadas, aumentando o valor percebido do produto.
    *   **Implementou** controle de acesso granulado (RBAC) via **Spring AOP** com anotações customizadas (`@RequirePremium`), desacoplando regras de monetização da lógica de negócio.
    *   **Desenvolveu** integração resiliente com o gateway de pagamento **PagSeguro**, gerenciando o ciclo de vida de assinaturas através de Webhooks e verificações assíncronas.
    *   **Otimizou** a camada de persistência com Spring Data JPA e PostgreSQL, garantindo integridade referencial em um domínio complexo de múltiplas relações (Treinos, Exercícios, Dietas e Refeições).
    *   **Estabeleceu** uma cultura de qualidade com **JaCoCo** para cobertura de testes unitários e automatização de tarefas via **Makefile** e **Docker**.
*   **Soft Skills Implícitas:**
    *   **Foco em Clean Code:** Organização impecável de pacotes por domínio (Feature-driven).
    *   **Pensamento Sistêmico:** Antecipação de necessidades de negócio (Monetização via Premium).
    *   **Pragmatismo:** Uso de padrões de mercado (JPA, JWT) para acelerar o Time-to-Market.

---

## SEÇÃO 2: Engenharia & Arquitetura (Deep Dive)

*   **Padrão Arquitetural:** **Modular Monolith (Monolito Modular)**. O projeto é organizado por domínios (`ai`, `auth`, `diet`, `subscription`, `user`, `workout`). Isso facilita uma futura migração para Microserviços, pois as dependências entre módulos são claras.
*   **Design Patterns Identificados:**
    *   **Aspect (AOP):** Aplicado no `PremiumAccessAspect` para interceptar chamadas e validar privilégios.
    *   **Repository:** Abstração completa do acesso a dados via interfaces `JpaRepository`.
    *   **DTO (Data Transfer Object):** Desacoplamento rigoroso entre as entidades de banco de dados e os contratos da API.
    *   **Strategy/Client:** Implementado em `GeminiClient` e `PagSeguroClient` para isolar integrações com APIs externas.
*   **Fluxo de Dados (Caminho Feliz):**
    1.  **Request:** O usuário solicita um relatório via `AiController`.
    2.  **Auth:** `JwtAuthenticationFilter` valida o token; `PremiumAccessAspect` verifica se o usuário é Premium.
    3.  **Service:** `AiReportService` orquestra a coleta de dados (Perfil, Metas, Histórico Corporal).
    4.  **Client:** `GeminiClient` envia o prompt via WebClient e processa a resposta da IA.
    5.  **Response:** O DTO é retornado ao Controller e entregue ao usuário em JSON.
*   **Decisões Técnicas (O "Porquê"):**
    *   **Uso de AOP para Premium:** Evita que cada service ou controller precise de um `if (user.isPremium())`, mantendo o código limpo e centralizado.
    *   **WebClient (WebFlux):** Escolhido em vez de RestTemplate por ser o padrão moderno do Spring para chamadas HTTP não-bloqueantes.
    *   **Java 21 Records:** Utilizados para DTOs, garantindo imutabilidade e concisão de código.

---

## SEÇÃO 3: Preparação para Entrevista (O "Pulo do Gato")

*   **Funcionalidades Críticas:**
    *   `PremiumAccessAspect.java`: O coração da estratégia de monetização.
    *   `AiReportService.java`: Onde o "ouro" do projeto (IA) é lapidado.
    *   `SecurityConfig.java`: Toda a blindagem Stateless via JWT.
*   **Roleplay com Recrutador (3 Perguntas Difíceis):**
    *   **Pergunta 1 (Arquitetura):** Por que você usou AOP em vez de um simples Filter do Spring Security para o Premium?
        *   **Resposta:** O AOP me permite aplicar a regra de "Somente Premium" em métodos específicos de qualquer Service ou Controller, e não apenas em rotas URL. É mais granular e me dá acesso direto ao ID do usuário via JoinPoint, o que facilita consultas de negócio no banco no meio da execução.
    *   **Pergunta 2 (Decisão Técnica):** O seu GeminiClient usa .block() no WebClient. Isso não mata a performance em um ambiente reativo?
        *   **Resposta:** Como o restante da aplicação é construída sobre o Spring MVC (Servlet Stack) e não WebFlux puro, o .block() é necessário para integrar a resposta da IA no fluxo síncrono da requisição. Em uma escala maior, eu moveria a geração de relatórios para um processo assíncrono com mensageria.
    *   **Pergunta 3 (Desafio/Complexidade):** Como você lida com a variabilidade e possíveis alucinações da IA nos relatórios?
        *   **Resposta:** Implementei um buildPrompt rigoroso que fornece contexto técnico (altura, peso, objetivo) para "ancorar" a IA. Além disso, incluí mecanismos de fallback no GeminiClient para garantir que o usuário nunca receba um erro 500, mesmo que a API externa falhe.

---

## SEÇÃO 4: Honestidade Técnica (Pontos de Melhoria)

*   **Análise de Gaps:**
    *   **Mensageria:** A geração de relatórios de IA é pesada. O ideal seria usar RabbitMQ ou Kafka para processar isso em background e notificar o usuário via WebSocket ou Push.
    *   **Observabilidade:** Falta implementação de Micrometer/Prometheus para monitorar a latência das chamadas para a API do Gemini.
    *   **Testes de Integração:** Existem muitos testes unitários, mas o projeto se beneficiaria de Testcontainers para validar as queries do PostgreSQL de forma real.
*   **Sugestão de Refatoração:**
    *   Implementar um circuit breaker (como Resilience4j) nas chamadas do PagSeguro e Gemini para evitar o efeito cascata em caso de indisponibilidade das APIs externas.
