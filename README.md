# Projeto Forender

O projeto "Forender" é uma aplicação desenvolvida como parte de um desafio técnico, mas também serviu como oportunidade de aprendizado em diversas tecnologias. O nome é uma junção das palavras "for" e "render", refletindo o propósito do projeto em explorar renderização de elementos em um contexto específico.

## Tecnologias Utilizadas

### Frontend (APP)

- **Expo v50+**: Plataforma para construção de aplicativos móveis com React Native.
- **React v18+**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Typescript v5+**: Superset da linguagem JavaScript que adiciona tipagem estática opcional.

### Backend

- **Firebase Authentication**: Serviço de autenticação fornecido pelo Firebase.
- **Firebase Realtime Database**: Banco de dados NoSQL hospedado na nuvem fornecido pelo Firebase.

## Arquitetura

O projeto segue uma arquitetura baseada em rotas, inspirada na arquitetura de rotas do Expo a partir da versão 49. Essa abordagem organiza o código em pastas, onde cada pasta representa uma rota da aplicação, tornando o projeto mais estruturado e legível.

### Estrutura de Pastas


- config/: Contém os arquivos de configuração do projeto.
- app/: Contém o código-fonte do aplicativo.
    - auth/: Módulo de autenticação do usuário.
        - tests/: Testes para o módulo de autenticação.
        - _layout.tsx: Layout da tela de autenticação.
    - tabs/: Módulo de abas.
        - _layout.tsx: Layout das abas.
        - config.tsx: Configurações das abas.
        - index.tsx: Página principal das abas.
    - _layout.tsx: Layout principal do aplicativo.
    - html.tsx: Componente HTML.
    - not-found.tsx: Página 404.
- assets/: Contém os recursos estáticos do projeto, como imagens e CSS.
- components/: Contém os componentes reutilizáveis do projeto.
    - tests/: Testes para os componentes.
- constants/: Contém as constantes do projeto.
- hooks/: Contém os hooks customizados do projeto.


## Bibliotecas e Ferramentas Adicionais

O projeto faz uso das seguintes bibliotecas e ferramentas para facilitar o desenvolvimento e melhorar a experiência do usuário:

- **Zod**: Biblioteca para validação de tipos de dados.
- **Hook Form**: Biblioteca para controle de formulários e suas validações.
- **React Native Paper**: Conjunto de componentes UI para React Native.
- **React Native Color Picker**: Componente para seleção de cores em aplicativos React Native.
- **Expo**: Plataforma que simplifica o desenvolvimento e implantação de aplicativos móveis.

# Tutorial Básico para Rodar o Projeto

## Pré-requisitos:
- Node.js instalado em sua máquina.
- Yarn ou npm instalado em sua máquina.
- Configurações do firebase adicionadas no arquivo “firebaseConfig.js” na raiz do projeto.

## Instalação das dependências:
1. Navegue até a pasta do projeto.
2. Execute o seguinte comando no terminal:

`yarn install`


## Rodando o projeto:
1. Inicie o servidor de desenvolvimento com o seguinte comando:
`yarn start`

2. O projeto estará disponível para ser rodado em um emulador apertando “d” no terminal, ou escaneando o QR Code do terminal no app Expo Go.

## Observações:
- O projeto foi desenvolvido com o Expo versão 50.
- O código do projeto está organizado em pastas e arquivos, seguindo a estrutura descrita anteriormente.
- O projeto utiliza diversas bibliotecas e ferramentas, que estão listadas na seção "Bibliotecas e Ferramentas Adicionais".


## Conclusão

O projeto "Forender" é um exemplo de aplicação que combina tecnologias modernas para criar uma experiência de usuário robusta e agradável. A arquitetura baseada em rotas, juntamente com o uso de bibliotecas e ferramentas adicionais, contribuem para a organização do código e a eficiência do desenvolvimento. Este projeto serviu não apenas como um teste técnico, mas também como uma oportunidade de aprendizado e experimentação em novas tecnologias.
