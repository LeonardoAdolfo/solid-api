# App

GymPass style app

## RFs (Requisitos Funcionais) 

- [ ] Deve ser possivel se cadastrar;
- [ ] Deve ser possivel autenticar;
- [ ] Deve ser possivel obter o perfil de um usuario logado;
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [ ] Deve ser possivel o usuario obter ser historico de check-ins;
- [ ] Deve ser possivel o usuario buscar academias proximas;
- [ ] Deve ser possivel o usuario buscar academias pelos nome;
- [ ] Deve ser possivel o usuario realizar check-in em uma academia; 
- [ ] Deve ser possivel validar o check-in de um usuario;
- [ ] Deve ser possivel cadastrar uma academia;
 
## RNs (Regras de Negocios)

- [ ] O usuario não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuario não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuario não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in so pode ser validado até 20 minutos apos criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia so pode ser cadastrada por administradores;

 
## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuaro precisa estar criptografadas;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por pagina 
- [ ] O usuario deve ser identificado por um JWT (JSON Web Token)