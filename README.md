# CardController API - Documentation

Este projeto foi realizado utilizando o framework Nestjs, em Nodejs

# Banco de dados
O banco de dados é o mongodb, sua connection string está predefinida no app.module, caso seja necessário alguma alteração

# configurando o token JWT
Crie um arquivo .env na raíz do projeto e cole nele tudo do arwuivo .env.example. Após isso, coloque uma string qualquer para o token

# Iniciar o projeto
Para iniciar o projeto, clone o repositório, instale as dependências com npm install e digite o seguinte comando

```bash
npm run start:dev
```

## Relatório de autocannon, cache e cluster

Os relatórios estão na pasta relatorio_autocannon na raíz do projeto

## Endpoints
### 1. POST /cards/commander
- Request Body:
  - CreateDeckDto: Contains the information needed to create the deck, such as the commanderName and landsAmount.
- Authentication: Required.
Example Request Body:
{
  "commanderName": "Drizzt Do'Urden",
  "landsAmount": 36
}

### 2. GET /cards/decks
- Path Parameter:
  - id: The ID of the deck.
- Authentication: Required.

  
### 3. GET /cards/decks/exports
- Path Parameter:
  - id: The ID of the deck.
- Authentication: Required.

### 4 POST /cards/validate
- Request Body:
  - JSON object containing the deck data to be validated.
- Authentication: Required.

### 5. GET /cards/decks/get/all
- Retrieves all decks belonging to the authenticated user. Results are cached for efficiency.
  - Authentication: Required.
 
### 6. GET /cards/decks/get/getall
- Retrieves all decks in the system. This endpoint is restricted to users with the ADMIN role.
  - Authentication: Required.
  - Role: ADMIN.


# Observações
Para que o autocannon seja executado, alterações precisam ser feitas, como desabilitar a autenticação e simular sub de usuário válido

