# RELATÓRIO DE AUDITORIA TÉCNICA: PROJETO IA4J (AUDIO COURSE FACTORY)

## SEÇÃO 1: Mapeamento para Currículo (Venda do Projeto)

*   **Nome do Projeto & One-Liner:** **IA4J - Integrated Audio Course Factory** | Plataforma de geração automatizada de cursos em áudio orquestrada por IA Generativa e processamento assíncrono escalável.
*   **Domínio de Negócio:** Automação de *EdTech* e *Content Creation*. Resolve o gargalo de planejamento instrucional e produção de mídia (áudio) através de agentes de IA.
*   **Stack Tecnológica:**
    *   **Linguagens:** Java 21 (Record types, Modern JVM).
    *   **Frameworks:** Spring Boot 3.3.4, LangChain4j (IA Orchestration), Spring Data JPA.
    *   **IA:** Google Gemini (LLM), ElevenLabs (TTS).
    *   **Mensageria & Persistence:** RabbitMQ (Processamento Assíncrono), PostgreSQL, Flyway (Migrations).
    *   **DevOps:** Docker (Multi-stage builds), Docker Compose, OpenAPI/Swagger.
*   **Hard Skills Evidenciadas (Bullets para CV):**
    *   **Desenvolveu** uma arquitetura orientada a eventos utilizando **RabbitMQ** para desacoplar a geração de áudio (TTS) do fluxo principal da API, aumentando a resiliência e a escalabilidade global do sistema.
    *   **Orquestrou** agentes de IA Generativa via **LangChain4j**, implementando design instrucional automatizado com **Google Gemini** para criar planos de curso e roteiros pedagógicos estruturados.
    *   **Implementou** persistência de dados robusta com **Spring Data JPA** e **PostgreSQL**, utilizando **Flyway** para garantir versionamento de esquema e consistência entre ambientes de desenvolvimento e produção.
    *   **Otimizou** o ciclo de entrega via **Docker** com **multi-stage builds**, reduzindo o tamanho da imagem de runtime e aumentando a segurança operacional através da execução em contextos de usuário não-root.
*   **Soft Skills Implícitas:**
    *   **Visão Sistêmica:** Integração complexa de múltiplos serviços externos (LLM e TTS) e internos (Messaging e DB).
    *   **Foco em Qualidade:** Uso extensivo de DTOs, Records para imutabilidade e documentação viva via Swagger.

## SEÇÃO 2: Engenharia & Arquitetura (Deep Dive)

*   **Padrão Arquitetural:** **Layered Architecture (Service-Oriented)** com componentes de **Event-Driven Architecture**. A estrutura de pacotes prova uma clara separação de preocupações (Separation of Concerns).
*   **Design Patterns Identificados:**
    *   **Agentic AI Pattern:** Uso do `CoursePlannerAgent` e `ScriptWriterAgent` como interfaces declarativas via LangChain4j para isolar a lógica de prompts.
    *   **Producer/Consumer:** Implementado em `AudioMessageProducer.java` e `AudioGenerationConsumer.java` para lidar com tarefas I/O intensive.
    *   **Data Transfer Object (DTO):** Uso rigoroso em toda a API para desacoplar a camada de visão da camada de persistência.
    *   **Repository Pattern:** Abstração completa do acesso ao banco de dados via Spring Data.
*   **Fluxo de Dados (Caminho Feliz):**
    1.  **Controller:** Recebe `CourseInputDTO`.
    2.  **Service:** Cria a entidade `Course` (Status: DRAFT) e invoca o `CoursePlannerAgent`.
    3.  **IA Agent:** Processa o tema e retorna um `CoursePlan` (JSON).
    4.  **Service:** Mapeia o plano para múltiplas `Lesson` e salva no DB.
    5.  **Messaging:** Após aprovação do roteiro, uma mensagem é enviada ao RabbitMQ.
    6.  **Consumer:** Consome a mensagem, chama a ElevenLabs API, faz upload do áudio e atualiza a lição para `AUDIO_READY`.
*   **Decisões Técnicas (O "Porquê"):**
    *   **LangChain4j vs API Direta:** Escolhido para permitir a troca fácil de modelos de IA (ex: de Gemini para OpenAI) sem alterar a lógica de negócio, graças ao desacoplamento via interfaces.
    *   **RabbitMQ vs Processamento Síncrono:** A geração de áudio pode levar segundos ou minutos. O uso de mensageria evita *timeouts* HTTP e permite retries automáticos em caso de falha de APIs externas.
    *   **Java 21 (Records):** Uso de `record` para DTOs e Planos de Curso garante imutabilidade e código mais limpo e legível.

## SEÇÃO 3: Preparação para Entrevista (O "Pulo do Gato")

*   **Funcionalidades Críticas:**
    *   `CourseService.java`: O coração da orquestração. Entenda como as transações são gerenciadas aqui.
    *   `AudioGenerationConsumer.java`: Ponto de falha crítica (Integração com serviços externos). Revise o bloco `try-catch` e a atualização de status.
*   **Roleplay com Recrutador (3 Perguntas Difíceis):**
    *   **Pergunta 1 (Arquitetura):** "Como você lida com a natureza não-determinística da IA para garantir que o JSON retornado pelo Agent seja sempre válido?"
        *   *Resposta:* "Eu utilizo o LangChain4j que faz o parsing automático para Java Records. Além disso, a aplicação valida a integridade do `CoursePlan` logo após o retorno e, caso a IA falhe em estruturar o JSON, possuo um tratamento de erro que permite o retry ou falha controlada da transação."
    *   **Pergunta 2 (Decisão Técnica):** "Se a API da ElevenLabs cair no meio do processamento de 20 aulas, o que acontece?"
        *   *Resposta:* "Graças ao RabbitMQ, a mensagem volta para a fila (ou vai para uma DLQ se esgotar os retries). O status da lição permanece em processamento, e o sistema não perde o estado, garantindo a consistência eventual assim que o serviço for restabelecido."
    *   **Pergunta 3 (Desafio/Complexidade):** "Por que você usou Flyway em vez de deixar o JPA gerar o banco automaticamente?"
        *   *Resposta:* "Em um ambiente profissional, o controle sobre o esquema é vital. O Flyway permite versionar o banco de dados assim como o código, facilitando rollbacks, migrações seguras em produção e garantindo que todos os desenvolvedores tenham exatamente a mesma estrutura de dados."

## SEÇÃO 4: Honestidade Técnica (Pontos de Melhoria)

*   **Análise de Gaps:**
    *   **Observabilidade:** O projeto possui Actuator, mas falta um dashboard (ex: Grafana/Prometheus) para monitorar custos de tokens de IA e créditos de áudio.
    *   **Testes de Integração:** Há poucos testes que simulam o fluxo completo de mensageria (usando Testcontainers e RabbitMQ real).
    *   **Idempotência:** O consumidor de áudio precisa de uma verificação mais rigorosa de idempotência para evitar gastos dobrados em APIs externas caso a mesma mensagem seja processada duas vezes.
*   **Sugestão de Refatoração:**
    *   Implementar a **Saga Pattern** (ou um State Machine) mais formal para o ciclo de vida do curso, já que ele passa por vários estados (Draft, Planning, Scripting, Audio, Ready).
    *   Adicionar **Circuit Breaker** (Resilience4j) nas chamadas de IA e TTS para evitar o consumo de recursos quando os serviços externos estiverem instáveis.

---
FIM DO RELATÓRIO
