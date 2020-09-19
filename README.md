# Projeto desenvolvido durante o bootcamp GoStack da Rocketseat

## Para rodar a aplicação siga os seguintes procedimentos:

### Obs: Para rodar essa aplicação será necessário fazer a instalação do Docker.

- Rodar o seguinte comando para criar uma imagem do PostgreSQL: <br/>
sudo docker run --name goStackPostgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
- Rodar o seguinte comando para criar uma imagem do MongoDB: <br/>
sudo docker run --name mongodb -p 27017:27017 -d -t mongo
- Rodar o seguinte comando para criar uma imagem do Redis: <br/>
sudo docker run --name redis -p 6379:6379 -d -t redis:alpine
- Iniciar o container do PostgreSQL: <br/>
sudo docker start goStackPostgres
- Iniciar o container do MongoDB: <br/>
sudo docker start mongo
- Iniciar o container do Redis: <br/>
sudo docker start redis
- Criar um banco de dados postgres atráves de alguma ferramenta (utilizo o DBeaver) com o nome: <br/>
goStackGoBarber
- Clone o repositório para a sua máquina usando o comando **git clone**.
- Acesse a pasta criada.
- Instale as dependências usando o comando **yarn**.
- Rode as migrations para o banco de dados usando o comando: **yarn typeorm migration:run**
- Para iniciar o backend digite o comando **yarn dev:server**.
