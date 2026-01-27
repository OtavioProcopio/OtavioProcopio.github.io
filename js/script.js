// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

// ===================================
// SMOOTH SCROLL WITH OFFSET
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards and skill categories
document.querySelectorAll('.project-card, .skill-category, .info-card').forEach(el => {
    observer.observe(el);
});

// ===================================
// PROJECT MODAL FUNCTIONALITY
// ===================================
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// Project data with images and detailed information
const projectData = {
    vshape: {
        title: 'VShape API - Sistema para Academias',
        icon: 'fas fa-dumbbell',
        description: 'API REST completa para gestão de academias',
        fullDescription: `
            <p>Desenvolvi uma API REST completa para gestão de academias focada em treinos personalizados, 
            controle nutricional e acompanhamento de evolução física. O sistema possui arquitetura modular 
            bem estruturada com separação clara de responsabilidades.</p>
        `,
        features: [
            {
                title: 'Gestão de Treinos',
                description: 'CRUD completo de exercícios e treinos personalizados com acompanhamento de evolução e histórico detalhado',
                icon: 'fas fa-dumbbell'
            },
            {
                title: 'Controle Nutricional',
                description: 'Sistema de dietas com gerenciamento de refeições, alimentos e cálculos automáticos de macronutrientes',
                icon: 'fas fa-utensils'
            },
            {
                title: 'Autenticação e Segurança',
                description: 'Sistema completo de autenticação JWT com Spring Security e controle de acesso baseado em roles',
                icon: 'fas fa-shield-alt'
            },
            {
                title: 'Gestão de Usuários',
                description: 'Sistema de cadastro e perfis de usuários com informações corporais e objetivos fitness',
                icon: 'fas fa-users'
            },
            {
                title: 'Arquitetura em Camadas',
                description: 'Organização modular por domínios facilitando manutenção e futuras evoluções do sistema',
                icon: 'fas fa-layer-group'
            },
            {
                title: 'Qualidade de Código',
                description: 'Cobertura de testes com JUnit e JaCoCo, aplicação de design patterns e boas práticas',
                icon: 'fas fa-check-circle'
            }
        ],
        techStack: [
            { name: 'Java 21', icon: 'fab fa-java' },
            { name: 'Spring Boot 3.5+', icon: 'fas fa-leaf' },
            { name: 'Spring Security', icon: 'fas fa-shield-alt' },
            { name: 'Spring Data JPA', icon: 'fas fa-database' },
            { name: 'PostgreSQL', icon: 'fas fa-elephant' },
            { name: 'Docker', icon: 'fab fa-docker' },
            { name: 'JUnit & JaCoCo', icon: 'fas fa-vial' }
        ],
        images: [
            { src: 'assets/projects/images/vshape/swagger user.png', caption: 'API de Usuários - Endpoints de cadastro, autenticação e perfil' },
            { src: 'assets/projects/images/vshape/swagg treinos.png', caption: 'API de Treinos - CRUD completo de exercícios e programas de treinamento' },
            { src: 'assets/projects/images/vshape/swagg dietes.png', caption: 'API de Dietas - Sistema de gerenciamento nutricional personalizado' },
            { src: 'assets/projects/images/vshape/swagg refeicoes.png', caption: 'API de Refeições - Controle detalhado de alimentação e horários' },
            { src: 'assets/projects/images/vshape/swagg alimentos.png', caption: 'Catálogo de Alimentos - Base de dados com informações nutricionais completas' },
            { src: 'assets/projects/images/vshape/testes.png', caption: 'Cobertura de Testes - JUnit com análise de qualidade via JaCoCo' }
        ],
        highlights: [
            'Arquitetura Modular Monolith organizada por domínios (auth, user, workout, diet)',
            'Padrões de projeto aplicados: Repository, DTO, Service Layer',
            'Spring Data JPA com relacionamentos complexos entre entidades',
            'Documentação completa da API com Swagger/OpenAPI',
            'Containerização com Docker para facilitar deploy e desenvolvimento'
        ]
    },
    ia4j: {
        title: 'IA4J - Integrated Audio Course Factory',
        icon: 'fas fa-graduation-cap',
        description: 'Plataforma que desenvolvi para automação de cursos em áudio com IA generativa',
        fullDescription: `
            <p>Desenvolvi uma plataforma inovadora que automatiza completamente a criação de cursos em áudio, desde o planejamento 
            pedagógico até a geração de áudio profissional. Implementei orquestração de agentes de IA e arquitetura 
            orientada a eventos para processar tarefas assíncronas de forma escalável.</p>
        `,
        features: [
            {
                title: 'Orquestração de Agentes IA',
                description: 'Implementação de CoursePlannerAgent e ScriptWriterAgent usando LangChain4j com Google Gemini para design instrucional automatizado',
                icon: 'fas fa-robot'
            },
            {
                title: 'Geração de Áudio TTS',
                description: 'Integração com ElevenLabs para síntese de voz de alta qualidade, convertendo roteiros em áudios profissionais',
                icon: 'fas fa-microphone'
            },
            {
                title: 'Arquitetura Event-Driven',
                description: 'Sistema de mensageria com RabbitMQ (Producer/Consumer) para desacoplar geração de áudio e aumentar resiliência',
                icon: 'fas fa-exchange-alt'
            },
            {
                title: 'Processamento Assíncrono',
                description: 'Filas de mensagens garantem que operações demoradas não bloqueiem o sistema, com retry automático em falhas',
                icon: 'fas fa-sync'
            },
            {
                title: 'Persistência Robusta',
                description: 'Spring Data JPA com PostgreSQL e Flyway para versionamento de esquema e consistência entre ambientes',
                icon: 'fas fa-database'
            },
            {
                title: 'Containerização Otimizada',
                description: 'Docker multi-stage builds reduzindo tamanho de imagem e aumentando segurança com execução non-root',
                icon: 'fab fa-docker'
            }
        ],
        techStack: [
            { name: 'Java 21', icon: 'fab fa-java' },
            { name: 'Spring Boot 3.3.4', icon: 'fas fa-leaf' },
            { name: 'LangChain4j', icon: 'fas fa-link' },
            { name: 'Google Gemini', icon: 'fas fa-gem' },
            { name: 'ElevenLabs TTS', icon: 'fas fa-microphone' },
            { name: 'RabbitMQ', icon: 'fas fa-exchange-alt' },
            { name: 'PostgreSQL', icon: 'fas fa-elephant' },
            { name: 'Flyway', icon: 'fas fa-code-branch' },
            { name: 'Docker Compose', icon: 'fab fa-docker' },
            { name: 'Swagger/OpenAPI', icon: 'fas fa-book' }
        ],
        images: [
            { src: 'assets/projects/images/ia4j/dashboard cursos.png', caption: 'Dashboard Principal - Visão geral dos cursos em produção e status de processamento' },
            { src: 'assets/projects/images/ia4j/criar novo curso.png', caption: 'Interface de Criação - Formulário para iniciar novo curso com tema e configurações' },
            { src: 'assets/projects/images/ia4j/antes-gerar-roteiro.png', caption: 'Antes da Geração - Curso em status DRAFT aguardando processamento da IA' },
            { src: 'assets/projects/images/ia4j/depois-gerar-roteiro.png', caption: 'Após Geração - Plano de curso estruturado criado pelo agente de IA' },
            { src: 'assets/projects/images/ia4j/roteiros-aulas.png', caption: 'Roteiros Detalhados - Scripts pedagógicos gerados para cada lição do curso' },
            { src: 'assets/projects/images/ia4j/lessons.png', caption: 'Gestão de Lições - Lista de aulas com controle de status e aprovação de roteiros' },
            { src: 'assets/projects/images/ia4j/rabbitMQ.png', caption: 'Interface RabbitMQ - Monitoramento de filas e mensagens em processamento' },
            { src: 'assets/projects/images/ia4j/fila-audio-rabbitmq.png', caption: 'Fila de Áudio - Mensagens aguardando processamento TTS na fila do RabbitMQ' },
            { src: 'assets/projects/images/ia4j/storage-audios.png', caption: 'Storage de Áudios - Arquivos MP3 gerados pela API ElevenLabs armazenados' },
            { src: 'assets/projects/images/ia4j/supabase-lessontable.png', caption: 'Banco de Dados - Tabela de lições no PostgreSQL via Supabase' },
            { src: 'assets/projects/images/ia4j/postman.png', caption: 'Testes de API - Collection Postman com todos os endpoints documentados' },
            { src: 'assets/projects/images/ia4j/swagg ai.png', caption: 'Documentação Swagger - API completa com endpoints de IA e gerenciamento' },
            { src: 'assets/projects/images/ia4j/console-operaçao concluida.png', caption: 'Log de Sucesso - Console mostrando conclusão de processamento de áudio' },
            { src: 'assets/projects/images/ia4j/criando-curso-pelo-terminal.png', caption: 'CLI Interaction - Criação de curso via linha de comando para testes' },
            { src: 'assets/projects/images/ia4j/gerando som terminal.png', caption: 'Processamento TTS - Terminal exibindo geração de áudio em tempo real' },
            { src: 'assets/projects/images/ia4j/get curso.png', caption: 'Endpoint GET - Resposta JSON com dados completos do curso' },
            { src: 'assets/projects/images/ia4j/inspect curso.png', caption: 'Inspeção Detalhada - Visualização de todas as propriedades do curso' },
            { src: 'assets/projects/images/ia4j/iaconfig.png', caption: 'Configuração de IA - Parâmetros de integração com Gemini e ElevenLabs' },
            { src: 'assets/projects/images/ia4j/monitoramento do sistema.png', caption: 'Health Check - Atuator endpoints para observabilidade do sistema' }
        ],
        highlights: [
            'Arquitetura em Camadas (Layered Architecture) com componentes de Event-Driven',
            'Design Patterns: Agentic AI, Producer/Consumer, DTO, Repository',
            'LangChain4j permite trocar modelos de IA sem alterar lógica de negócio',
            'RabbitMQ evita timeouts HTTP e permite retries automáticos em falhas de APIs externas',
            'Java Records garantem imutabilidade e código limpo para DTOs e planos de curso'
        ]
    },
    soarmusic: {
        title: 'Soar Music Studios',
        icon: 'fas fa-music',
        description: 'Plataforma institucional em produção para rede de escolas de música',
        fullDescription: `
            <p>Desenvolvi este projeto real para cliente, atualmente em produção ativa. Criei uma plataforma web institucional 
            de alta performance que unifica informações de 4 unidades físicas da rede Soar Music Studios 
            (Arceburgo, Guaranésia, Guaxupé, Juruaia) em uma interface moderna e responsiva.</p>
        `,
        features: [
            {
                title: 'Projeto Real em Produção',
                description: 'Sistema ativo sendo utilizado por cliente real, gerando valor e recebendo feedback contínuo de usuários',
                icon: 'fas fa-rocket'
            },
            {
                title: 'Arquitetura Data-Driven',
                description: 'Conteúdo institucional centralizado em configurações TypeScript, preparando terreno para migração futura para CMS',
                icon: 'fas fa-database'
            },
            {
                title: 'Design System Customizado',
                description: 'Tailwind CSS com tema personalizado garantindo identidade visual consistente e manutenibilidade',
                icon: 'fas fa-palette'
            },
            {
                title: 'Performance Otimizada',
                description: 'Bundle final de ~120KB gzipped com Vite, garantindo carregamento rápido mesmo em conexões lentas',
                icon: 'fas fa-tachometer-alt'
            },
            {
                title: 'Mobile-First',
                description: 'Design responsivo priorizando experiência mobile, onde está a maioria dos acessos',
                icon: 'fas fa-mobile-alt'
            },
            {
                title: 'Cultura de Qualidade',
                description: 'TDD com Vitest garantindo integridade de fluxos críticos de navegação',
                icon: 'fas fa-check-circle'
            }
        ],
        techStack: [
            { name: 'React 19.2', icon: 'fab fa-react' },
            { name: 'TypeScript 5.8', icon: 'fab fa-js' },
            { name: 'Vite 6.2', icon: 'fas fa-bolt' },
            { name: 'Tailwind CSS 3.4', icon: 'fab fa-css3-alt' },
            { name: 'React Router 7', icon: 'fas fa-route' },
            { name: 'Lucide React', icon: 'fas fa-icons' },
            { name: 'Vitest', icon: 'fas fa-vial' },
            { name: 'PostCSS', icon: 'fab fa-css3' },
            { name: 'ESLint', icon: 'fas fa-code' }
        ],
        images: [
            { src: 'assets/projects/images/soarmusic/home.png', caption: 'Página Inicial - Hero section com apresentação institucional e call-to-action' },
            { src: 'assets/projects/images/soarmusic/sobre.png', caption: 'Sobre a Escola - História e filosofia pedagógica da rede Soar Music' },
            { src: 'assets/projects/images/soarmusic/cursos.png', caption: 'Catálogo de Cursos - Apresentação visual de todos os cursos oferecidos' },
            { src: 'assets/projects/images/soarmusic/teachers.png', caption: 'Corpo Docente - Perfis dos professores com especialidades e experiências' },
            { src: 'assets/projects/images/soarmusic/unidades.png', caption: 'Nossas Unidades - Cards das 4 unidades com endereços e mapas integrados' },
            { src: 'assets/projects/images/soarmusic/plans.png', caption: 'Planos e Preços - Diferentes modalidades de matrícula e investimento' },
            { src: 'assets/projects/images/soarmusic/faq.png', caption: 'FAQ - Perguntas frequentes com accordion interativo' },
            { src: 'assets/projects/images/soarmusic/contatos.png', caption: 'Contato - Formulário e informações de contato de todas as unidades' },
            { src: 'assets/projects/images/soarmusic/rodape.png', caption: 'Rodapé - Links rápidos, redes sociais e informações institucionais' },
            { src: 'assets/projects/images/soarmusic/tools.png', caption: 'Stack de Ferramentas - Tecnologias utilizadas no desenvolvimento' },
            { src: 'assets/projects/images/soarmusic/soar-music-vercel-overview.png', caption: 'Deploy Vercel - Dashboard de produção com métricas de performance' },
            { src: 'assets/projects/images/soarmusic/DSN-management-Cloudflare.png', caption: 'DNS Cloudflare - Gestão de domínio e CDN para alta disponibilidade' }
        ],
        highlights: [
            'Arquitetura Component-Based com padrão Layout/Wrapper para consistência visual',
            'Configuration Pattern: dados tratados como configuração, não código hardcoded',
            'React 19 + TypeScript para longevidade e performance otimizada',
            'Vite 6 com HMR sub-segundo aumentando produtividade de desenvolvimento',
            'Lazy loading em IFrames (mapas/vídeos) para otimizar LCP (Largest Contentful Paint)'
        ]
    },
    'rap-cqs': {
        title: 'RAP-CQS - Sistema de Controle de Qualidade',
        icon: 'fas fa-industry',
        description: 'Sistema de gestão de qualidade industrial com experiência real',
        fullDescription: `
            <p>Desenvolvi um sistema fullstack que aplica minha experiência real da indústria metalúrgica em desenvolvimento 
            de software. Implementei gestão completa de controle de qualidade industrial incluindo não conformidades, 
            ações corretivas, controle de ferramental e relatórios analíticos.</p>
        `,
        features: [
            {
                title: 'Gestão de Não Conformidades',
                description: 'Registro, rastreamento e análise de causas raiz de não conformidades com workflow completo de aprovação',
                icon: 'fas fa-exclamation-triangle'
            },
            {
                title: 'Ações Corretivas',
                description: 'Sistema de gestão de ações corretivas e preventivas com acompanhamento de eficácia',
                icon: 'fas fa-tools'
            },
            {
                title: 'Controle de Ferramental',
                description: 'Rastreabilidade completa de ferramentas com histórico de manutenções e calibrações',
                icon: 'fas fa-wrench'
            },
            {
                title: 'Fluxos de Inspeção',
                description: 'Workflows customizados para diferentes tipos de inspeção com checklist digital',
                icon: 'fas fa-clipboard-check'
            },
            {
                title: 'Dashboards Analíticos',
                description: 'Visualizações gráficas de indicadores de qualidade e tendências de não conformidades',
                icon: 'fas fa-chart-line'
            },
            {
                title: 'Gestão de Peças',
                description: 'Controle detalhado de peças produzidas com status de qualidade e transferências',
                icon: 'fas fa-cogs'
            }
        ],
        techStack: [
            { name: 'React', icon: 'fab fa-react' },
            { name: 'TypeScript', icon: 'fab fa-js' },
            { name: 'Supabase', icon: 'fas fa-fire' },
            { name: 'PostgreSQL', icon: 'fas fa-elephant' },
            { name: 'Vercel', icon: 'fas fa-cloud' },
            { name: 'Tailwind CSS', icon: 'fab fa-css3-alt' }
        ],
        images: [
            { src: 'assets/projects/images/rap-cqs/dashboard1.png', caption: 'Dashboard Principal - Visão geral de indicadores de qualidade e KPIs' },
            { src: 'assets/projects/images/rap-cqs/dashboard2.png', caption: 'Analytics - Gráficos de tendências e análise de não conformidades' },
            { src: 'assets/projects/images/rap-cqs/nc.png', caption: 'Listagem de NCs - Gerenciamento de não conformidades com filtros e busca' },
            { src: 'assets/projects/images/rap-cqs/ncdetail.png', caption: 'Detalhes da NC - Informações completas com histórico e evidências' },
            { src: 'assets/projects/images/rap-cqs/acao corretiva.png', caption: 'Ações Corretivas - Registro e acompanhamento de ações preventivas' },
            { src: 'assets/projects/images/rap-cqs/ferramental.png', caption: 'Gestão de Ferramental - Lista de ferramentas com status de calibração' },
            { src: 'assets/projects/images/rap-cqs/ferramental detal.png', caption: 'Detalhes do Ferramental - Histórico completo de uso e manutenções' },
            { src: 'assets/projects/images/rap-cqs/cadastro manutençao.png', caption: 'Cadastro de Manutenção - Formulário para registro de intervenções' },
            { src: 'assets/projects/images/rap-cqs/peca.png', caption: 'Gestão de Peças - Controle de produção e qualidade de peças' },
            { src: 'assets/projects/images/rap-cqs/peca detalhe.png', caption: 'Detalhes da Peça - Informações técnicas e histórico de inspeções' },
            { src: 'assets/projects/images/rap-cqs/fluxos.png', caption: 'Fluxos de Trabalho - Diagrama de processos de inspeção e aprovação' },
            { src: 'assets/projects/images/rap-cqs/fluxo inspecao.png', caption: 'Fluxo de Inspeção - Workflow detalhado do processo de qualidade' },
            { src: 'assets/projects/images/rap-cqs/fluxo transferencia.png', caption: 'Fluxo de Transferência - Processo de movimentação entre setores' },
            { src: 'assets/projects/images/rap-cqs/fluxo finalizacao.png', caption: 'Fluxo de Finalização - Etapas de conclusão e aprovação final' },
            { src: 'assets/projects/images/rap-cqs/relat1.png', caption: 'Geração de Relatórios - Interface para criação de reports personalizados' },
            { src: 'assets/projects/images/rap-cqs/relatorio.png', caption: 'Relatório Detalhado - Documento completo com dados analíticos' },
            { src: 'assets/projects/images/rap-cqs/tables.png', caption: 'Estrutura de Banco - Schema PostgreSQL com relacionamentos' },
            { src: 'assets/projects/images/rap-cqs/triggers.png', caption: 'Triggers e Functions - Lógica de banco para automações' },
            { src: 'assets/projects/images/rap-cqs/storage.png', caption: 'Storage Supabase - Armazenamento de evidências e documentos' },
            { src: 'assets/projects/images/rap-cqs/dev-tools-loggings.png', caption: 'DevTools - Logs de desenvolvimento e debugging' },
            { src: 'assets/projects/images/rap-cqs/vercel.png', caption: 'Deploy Vercel - Configuração de produção e CI/CD' }
        ],
        highlights: [
            'Aplicação prática de experiência industrial em software',
            'Backend-as-a-Service com Supabase (PostgreSQL + Auth + Storage)',
            'Row Level Security (RLS) para controle de acesso baseado em funções',
            'Triggers e Functions SQL para automação de processos',
            'Deploy contínuo com Vercel e integração Git'
        ]
    },
    tibiadex: {
        title: 'Tibiadex Android',
        icon: 'fab fa-android',
        description: 'Aplicativo Android nativo para consulta de dados do MMORPG Tibia',
        fullDescription: `
            <p>Desenvolvi um aplicativo Android nativo em Java que consome a TibiaData API v4 em tempo real. 
            Implementei consulta rápida de informações sobre mundos, jogadores, criaturas, magias e mais, com 
            interface Material Design e sistema avançado de filtragem.</p>
        `,
        features: [
            {
                title: 'Material Design 3',
                description: 'Interface moderna seguindo guidelines do Google com tema customizado Dark/Gold',
                icon: 'fas fa-palette'
            },
            {
                title: 'Integração com API REST',
                description: 'Consumo da TibiaData API (v4) com Volley Singleton para otimização de conexões',
                icon: 'fas fa-plug'
            },
            {
                title: 'Sistema de Filtragem Avançado',
                description: 'Filtros em dois níveis (texto e categoria) em RecyclerViews para busca fluida em datasets volumosos',
                icon: 'fas fa-filter'
            },
            {
                title: 'RecyclerView Otimizado',
                description: 'Implementação do padrão Adapter/ViewHolder para performance em listas grandes',
                icon: 'fas fa-list'
            },
            {
                title: 'Arquitetura MVC',
                description: 'Estrutura tradicional Android otimizada para aplicação read-only sem persistência local complexa',
                icon: 'fas fa-layer-group'
            },
            {
                title: 'Gradle Version Catalogs',
                description: 'Gerenciamento moderno de dependências via libs.versions.toml para manutenibilidade',
                icon: 'fas fa-book'
            }
        ],
        techStack: [
            { name: 'Java 11', icon: 'fab fa-java' },
            { name: 'Android SDK', icon: 'fab fa-android' },
            { name: 'Material Design 3', icon: 'fas fa-palette' },
            { name: 'Volley', icon: 'fas fa-network-wired' },
            { name: 'RecyclerView', icon: 'fas fa-list' },
            { name: 'JSON Parsing', icon: 'fas fa-code' },
            { name: 'Gradle', icon: 'fas fa-cog' }
        ],
        images: [
            { src: 'assets/projects/images/tibiadex/main.png', caption: 'Tela Principal - Menu inicial com acesso a todas as funcionalidades' },
            { src: 'assets/projects/images/tibiadex/creatures.png', caption: 'Catálogo de Criaturas - Lista completa com imagens e informações' },
            { src: 'assets/projects/images/tibiadex/spells.png', caption: 'Grimório de Magias - Todas as spells do jogo com detalhes' },
            { src: 'assets/projects/images/tibiadex/houses.png', caption: 'Mercado Imobiliário - Casas disponíveis nos mundos' },
            { src: 'assets/projects/images/tibiadex/fansites.png', caption: 'Fansites Oficiais - Lista de sites parceiros da comunidade' },
            { src: 'assets/projects/images/tibiadex/ambiente-bestiarios.png', caption: 'Bestiário - Interface detalhada de monstros e drops' },
            { src: 'assets/projects/images/tibiadex/java-entities.png', caption: 'Código Java - Estrutura de entidades POJO para parsing' },
            { src: 'assets/projects/images/tibiadex/api-constants.png', caption: 'API Constants - Centralização de endpoints da TibiaData API' },
            { src: 'assets/projects/images/tibiadex/spell-androidstudio-ambient.png', caption: 'Android Studio - Ambiente de desenvolvimento da activity de Spells' },
            { src: 'assets/projects/images/tibiadex/ambieente dev android.png', caption: 'DevTools Android - IDE configurado para desenvolvimento' },
            { src: 'assets/projects/images/tibiadex/Screenshot 2025-12-08 202455.png', caption: 'Screenshot do App - Interface em execução no emulador' }
        ],
        highlights: [
            'Singleton Pattern aplicado em VolleySingleton para RequestQueue global',
            'Adapter/ViewHolder desacoplando dados da UI em listas',
            'Campos públicos em Models para performance em parsing de JSON',
            'Filtro local em memória evitando múltiplas chamadas à API',
            'Volley com ImageRequest para carregamento de imagens de criaturas'
        ]
    }
};

// Open modal on project card click
document.querySelectorAll('.project-card').forEach(card => {
    const expandBtn = card.querySelector('.project-expand');
    
    expandBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = card.dataset.project;
        openProjectModal(projectId);
    });
});

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    let imagesHTML = '';
    if (project.images && project.images.length > 0) {
        imagesHTML = `
            <div class="modal-images">
                <h3><i class="fas fa-images"></i> Screenshots & Demonstrações</h3>
                <div class="image-gallery">
                    ${project.images.map(img => `
                        <div class="gallery-item">
                            <img src="${img.src}" alt="${img.caption}" loading="lazy">
                            <p class="image-caption">${img.caption}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    const modalHTML = `
        <div class="modal-header">
            <div class="modal-icon">
                <i class="${project.icon}"></i>
            </div>
            <div>
                <h2>${project.title}</h2>
                <p class="modal-subtitle">${project.description}</p>
            </div>
        </div>
        
        <div class="modal-description">
            ${project.fullDescription}
        </div>
        
        <div class="modal-features">
            <h3><i class="fas fa-star"></i> Funcionalidades Principais</h3>
            <div class="features-grid">
                ${project.features.map(feature => `
                    <div class="feature-card">
                        <i class="${feature.icon}"></i>
                        <h4>${feature.title}</h4>
                        <p>${feature.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="modal-tech">
            <h3><i class="fas fa-code"></i> Stack Tecnológica</h3>
            <div class="tech-grid">
                ${project.techStack.map(tech => `
                    <div class="tech-badge">
                        <i class="${tech.icon}"></i>
                        <span>${tech.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        ${imagesHTML}
        
        <div class="modal-highlights">
            <h3><i class="fas fa-lightbulb"></i> Destaques Técnicos</h3>
            <ul class="highlights-list">
                ${project.highlights.map(highlight => `
                    <li><i class="fas fa-check-circle"></i> ${highlight}</li>
                `).join('')}
            </ul>
        </div>
    `;
    
    modalBody.innerHTML = modalHTML;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===================================
// TYPING EFFECT FOR HERO
// ===================================
const typingText = document.querySelector('.typing-text');
const roles = [
    'Fullstack Developer',
    'Backend Developer',
    'Java Developer',
    'React Developer'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        typingDelay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 500;
    }
    
    setTimeout(typeEffect, typingDelay);
}

// Start typing effect after page load
setTimeout(typeEffect, 1000);

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// IMAGE LIGHTBOX
// ===================================
const lightbox = document.getElementById('imageLightbox');
const lightboxImg = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.querySelector('.lightbox-close');

function openLightbox(src, caption) {
    lightbox.classList.add('active');
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxImg) {
        closeLightbox();
    }
});

// Close lightbox with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Add click event to gallery images (delegated to modal body for dynamic content)
document.addEventListener('click', (e) => {
    if (e.target.matches('.gallery-item img')) {
        const caption = e.target.closest('.gallery-item').querySelector('.image-caption')?.textContent || e.target.alt;
        openLightbox(e.target.src, caption);
    }
});

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log('%c🚀 Olá, Dev Curioso! ', 'font-size: 20px; font-weight: bold; color: #64ffda; background: #0a192f; padding: 10px;');
console.log('%cGostou do portfólio? Este site foi desenvolvido 100% sem frameworks, usando apenas HTML, CSS e JavaScript puro.', 'font-size: 14px; color: #8892b0;');
console.log('%cVamos conversar? GitHub: @OtavioProcopio', 'font-size: 14px; color: #64ffda;');
