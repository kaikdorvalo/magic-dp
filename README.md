# API Magic 2 bimestre

Para esse segundo bimestre, recriei a documentação contendo apenas o necessário para comtemplar os itens pedidos na issue, facilitando a correção

# Como o projeto funciona o projeto?

O projeto é um backend em nestjs. Algumas funções, como pedido na issue, necessita o envio de notificações para um frontend, o qual foi simulado com um terminal rodando nodejs.

# Como rodo o backend e o terminal simulando o frontend?

Primeiramente, crie um arquivo .env na raíz do projeto e cole dentro dele todo o conteúdo do arquivo .env.example.

Para rodar o backend, basta abrir a pasta do projeto com o terminal e digitar "docker-compose up", isso irá subir o backend, o rabbitmq e o mongodb.

Após subir o backend, rode a simulação de frontend abrindo a pasta "websocket-client" com o terminal. Essa pasta está na raiz do projeto. Ao acessá-la com o terminal, será necessário instalas suas dependências com o comando "npm install". Após isso, digite "npm run start" para que ele se conecte ao websocket. Se der certo, ele exibirá uma mensagem dizendo que foi conectado e exibirá o id do websocket.

# Não consegui subir o docker-compose, e agora?

1. Primeiramente, crie um arquivo .env na raíz do projeto e cole dentro dele todo o conteúdo do arquivo .env.example.
2. para rodar o sistema manualmente, primeiramente instale as dependencias do projeto.
3. Suba o rabbitmq em um docker com os seguinte comandos, executando um de cada vez: "docker pull rabbitmq:3-management"  "docker run -d --hostname my-rabbit --name rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management"
4. Certifique-se de ter o mongodb community server instalado e verificar a url de conexão no arquivo .env criado anteriormente.
5. Rode o backend com o comando "npm run start"
6. Acesse a pasta "websocket_client" e instale as dependencia com "npm install" e depois digite "npm run start". Se der certo, uma mensgaem de conexão estabelecida irá aparecer junstamente com o id do client.

Com isso, tudo estará funcionando.

# Onde estão os itens para avaliar?

A implementação do rabbitmq está na pasta src/modules/rabbitmq, src/modules/card/presentation/cards.controller.ts, e no arquivo src/main.ts

O arquivo contendo somente as requisições necessárias está na raíz do projeto e também no link https://drive.google.com/file/d/1QcjvCoSibmGRSIgnAdmnU4JNYSJozLUR/view?usp=sharing
O arquivo está em formato json e deve ser importado no Insomnia.

# Como realizar as requests?

1. Primeiramente, comece criando usuário com a rota "Create user"
2. Faça o login com a rota "Login"

O token de acesso está configurado dinamicamente após realizar o login, mas caso não funcione deverá ser feito manualmente para que as requests funcionem.

# Quais rotas são de quais requisitos da issue?

1. As rotas "Gnerate deck", "Get my decks", "Export deck by id" são referentes oa primeiro requisito: enviar notificação para o usuário por meio daquela simulação de frontend, por meio de envio de uma mensagem para uma fila rabbitmq, consumo e envio de mensagem por meio do websocket. A rota Generate deck acessa a api de magic, podendo demorar alguns segundos. A rota de "Export deck by id" exporta o deck para um json na pasta dist/src/shared e caso esteja no docker, só será acessível por comandos no conteiner.
2. A rota "Import deck async" faz a importação de um deck de forma assíncrona, contemplando o item 2 da issue. Ele recebe o deck e valida, confirma o recebimento para o usuário, envia o deck para uma fila na qual será consumido e salvo no banco, notificando o usuário ao finalizar por meio daquela simulação de frontend. 
3. O requisito 3 da issue é mais difícil de simular, mas sua implementação pode ser verificada no arquivo src/main.ts, linha 41 e também em src/modules/card/application/use-case/send-deck-to-process.use-case.ts onde é feito a validação se é um admin ou usário comum, definindo a prioridade na fila.
