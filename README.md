# Documentação do projeto de testes Cypress Test Trinca App

Projeto de automação de testes utilizando Cypress para validar e assegurar a funcionalidade do Trinca App.

## Instalação

O primeiro passo é que você tenha instalado o Node.js e o NPM.
O Node.js pode ser baixado diretamente do site oficial. Aqui está o link para a página de download:
https://nodejs.org/en/download/
Ao acessar essa página, você verá diferentes versões do Node.js disponíveis para download. Recomendo escolher a que é usada neste projeto.

Caso queira gerar os relatórios dos testes com o Allure, você precisa instalá-lo em sua máquina. Para instala-lo navegue para página abaixo:
[Allure Framework Releases](https://github.com/allure-framework/allure2/releases)
Ao acessar essa página, você verá diferentes versões do Allure disponíveis para download. Recomendo escolher a que é usada neste projeto.

Para instalar as dependências do projeto, você deve estar na raiz do projeto e executar o seguinte comando:
```npm install```

## Execução dos testes
### Modo Headless 
Para executar todos os testes no modo Headless execute o comando abaixo:
```npm run cy:run``` 

Para executar todos os testes no modo Headless e gerar o relatório Allure execute o comando abaixo:
```npm run cy:run:allure```

Para visualizar o relatório gerado pelo Allure execute o comando:
```npm run allure:results``` 

### Modo Interactive
Para executar os testes no modo Interactive execute o comando abaixo:
```npm run cy:open```

## Padronização de codificação
Para padronizar a codificação foi inserido a validação do eslint.
Caso queira cooperar com a automação, antes de subir um pr, execute o comando ```npm run lint:all``` para verificar alterações necessárias e/ou execute o comando ```npm run lint:fix:all``` para que algumas alterações sejam feita pelo próprio eslint. Caso fique ainda algum alerta do eslint, corrija-o manualmente e só após abra o pr.

## Construído com:
* Versão do Node.js: v20.11.0
* Versão do Gerenciador de acotes Node Package Manager(NPM): 10.2.4
* Versão do Cypress: 12.14.0
* Versão do Allure: 2.25.0


**Observações:** 
* O arquivo cypress.env.json ficaria indisponível num projeto real.
* Não foi usado uma versão mais nova do Cypress, pois o cypress-allure-plugin só é compatível até a versão 12.14.0 do Cypress.
* Os BUGs e Melhorias se encontram no arquivo melhorias.md na raiz do projeto. Não foram inseridos mais cenários porque seria necessário mais algumas definições de regras de negócio, porém, foram rastreadas melhorias que exigiriam novos testes automatizados e adaptações testes já existentes.
