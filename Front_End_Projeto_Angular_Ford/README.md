# Front_End_Projeto_Angular_Ford

Sistema de Monitoramento de Veículos Ford - Uma aplicação web angular para visualizar e gerenciar dados de veículos conectados da Ford.

## 📋 Sobre o Projeto

Este projeto é uma aplicação **Single Page Application (SPA)** desenvolvida em Angular que permite o monitoramento de uma frota de veículos Ford conectados. O sistema oferece uma interface amigável para visualizar métricas importantes como nível de combustível, localização GPS, quilometragem, status de conectividade e atualizações de software.

### Funcionalidades Principais

- 🔐 **Sistema de Autenticação**: Login seguro para acesso ao sistema
- 📊 **Dashboard Interativo**: Visualização de métricas de frota em tempo real
- 🚗 **Gerenciamento de Veículos**: Suporte aos modelos Ford Ranger, Mustang, Territory e Bronco Sport
- 📍 **Localização GPS**: Acompanhamento da localização dos veículos
- ⛽ **Monitoramento de Combustível**: Nível de combustível atualizado
- 📏 **Dados de Quilometragem**: Registro automático do odômetro
- 🔍 **Busca Avançada**: Filtros por modelo e código VIN
- 📱 **Interface Responsiva**: Compatível com desktop e dispositivos móveis

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Angular 19.2.0** - Framework para aplicações web
- **TypeScript 5.7.2** - Superset do JavaScript para tipagem
- **RxJS 7.8.0** - Programação reativa
- **Angular Forms** - Formulários reativos e validação

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js 5.1.0** - Framework web para criação da API
- **CORS** - Controle de acesso cross-origin

## 📂 Estrutura do Projeto

```
Front_End_Projeto_Angular_Ford/
├── src/
│   ├── app/
│   │   ├── auth/login/          # Componente de autenticação
│   │   ├── dashboard/           # Dashboard principal com métricas
│   │   ├── home/                # Página inicial
│   │   ├── models/veiculo.model.ts # Modelos de dados TypeScript
│   │   ├── services/            # Serviços (API, autenticação)
│   │   └── app.routes.ts        # Configuração de rotas
│   ├── assets/                  # Imagens e recursos estáticos
│   └── public/                  # Imagens de veículos Ford
├── backend/
│   ├── api.js                   # Servidor Express.js
│   ├── db.json                  # Dados simulados (JSON Server)
│   └── package.json
└── README.md
```

## 🚀 Instalação e Configuração

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- Navegador web moderno

### Instalação do Frontend

1. **Clone o repositório** (se aplicável):
   ```bash
   git clone https://github.com/seu-usuario/Sprint_Angular_Jadson_Yan.git
   cd Sprint_Angular_Jadson_Yan/Front_End_Projeto_Angular_Ford
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

### Instalação do Backend

1. **Navegue para a pasta backend**:
   ```bash
   cd ../backend
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

## ▶️ Como Executar

### Executar o Backend

1. **Inicie o servidor da API**:
   ```bash
   npm start
   # ou
   npm run backend
   ```
   O servidor estará executando em `http://localhost:3002`

2. **(Opcional) Usar JSON Server para desenvolvimento**:
   ```bash
   npm run json-server
   ```
   Simula dados em `http://localhost:3001`

### Executar o Frontend

1. **Volte para a pasta do frontend**:
   ```bash
   cd ../Front_End_Projeto_Angular_Ford
   ```

2. **Inicie o servidor de desenvolvimento**:
   ```bash
   ng serve
   # ou
   npm start
   ```

3. **Acesse a aplicação**:
   Abra seu navegador e navegue para `http://localhost:4200`

## 🔗 API Endpoints

### Autenticação
- `POST /login` - Realizar login

### Veículos
- `GET /vehicles` - Listar todos os modelos de veículos disponíveis
- `GET /vehicleData?limit=&offset=` - Listar dados de veículos com paginação
- `GET /vehicleData/:vin` - Obter dados específicos de um veículo por VIN

### Exemplo de Payload da API

#### Login
```json
{
  "nome": "admin",
  "senha": "123456"
}
```

#### Dados de Veículo
```json
{
  "id": 1,
  "vin": "2FRHDUYS2Y63NHD22454",
  "odometro": 23344,
  "nivelCombustivel": 76,
  "status": "ON",
  "lat": -12.2322,
  "long": -35.2314
}
```

## 📊 Dados de Exemplo

O sistema inclui dados simulados para os seguintes modelos Ford:

- **Ford Ranger**: Utilitário robusto
- **Ford Mustang**: Esportivo icônico
- **Ford Territory**: SUV familiar
- **Ford Bronco Sport**: SUV aventureiro

## 🧪 Testes

### Executar testes unitários:
```bash
ng test
```

### (Planejado) Executar testes end-to-end:
```bash
ng e2e
```

## 📦 Build para Produção

1. **Gerar build otimizado**:
   ```bash
   ng build
   ```

2. **Os arquivos de produção estarão disponíveis em** `dist/front-end-projeto-angular-ford/`

## 🐛 Tratamento de Erros

O sistema inclui tratamento robusto de erros:
- **Fallback para API offline**: Interface específica quando a API não está disponível
- **Mensagens de erro amigáveis**: Notificações claras para o usuário
- **Carregamento assíncrono**: Estados de loading para melhor UX

## 📱 Funcionalidades Responsivas

- **Menu Hamburguer**: Navegação otimizada para mobile
- **Layout Adaptativo**: Interface que se ajusta a diferentes telas
- **Busca Responsiva**: Filtros e buscas funcionam em todos os dispositivos

## 👥 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra uma Pull Request

## 📚 Recursos Adicionais

- [Documentação Angular](https://angular.dev/)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [Express.js Documentation](https://expressjs.com/)

## 📄 Licença

Este projeto está sob a licença ISC.

---

**Desenvolvido para demonstrar capacidades de monitoramente de frota de veículos conectados.**
