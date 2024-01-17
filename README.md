# App

GymPass style app

## RFs (Requisitos Funcionais) 

- [X] Deve ser possivel se cadastrar;
- [X] Deve ser possivel autenticar;
- [X] Deve ser possivel obter o perfil de um usuario logado;
- [x] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [x] Deve ser possivel o usuario obter ser historico de check-ins;
- [x] Deve ser possivel o usuario buscar academias proximas (até 10km);
- [x] Deve ser possivel o usuario buscar academias pelos nome;
- [X] Deve ser possivel o usuario realizar check-in em uma academia; 
- [x] Deve ser possivel validar o check-in de um usuario;
- [x] Deve ser possivel cadastrar uma academia;
 
## RNs (Regras de Negocios)

- [X] O usuario não deve poder se cadastrar com um e-mail duplicado;
- [X] O usuario não pode fazer 2 check-ins no mesmo dia;
- [X] O usuario não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in so pode ser validado até 20 minutos apos criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia so pode ser cadastrada por administradores;

 
## RNFs (Requisitos não-funcionais)

- [X] A senha do usuaro precisa estar criptografadas;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] Todas listas de dados precisam estar paginadas com 20 itens por pagina 
- [ ] O usuario deve ser identificado por um JWT (JSON Web Token)