# Conta Corrente

Aplicativo React Native (Expo) para simulacao de conta corrente com:

- entrada de dinheiro
- saida de dinheiro
- saldo positivo ou devedor
- pagina inicial
- pagina About
- pagina Contact

Tambem possui navegacao por abas e rodape com creditos.

## Tecnologias

- React Native
- Expo
- React Navigation (Bottom Tabs)
- Ionicons (via @expo/vector-icons)

## Pre-requisitos

- Node.js 20+
- npm
- Expo Go no celular (opcional)
- Android Studio ou emulador Android (opcional)

## Instalacao

1. Entre na pasta do projeto:

```bash
cd /home/tellys/projects/projeto-interdisciplinar
```

2. Instale as dependencias:

```bash
npm install
```

## Como executar

Iniciar servidor Expo:

```bash
npm start
```

Executar no Android:

```bash
npm run android
```

Executar na Web:

```bash
npm run web
```

## Roteiro de teste manual

1. Abra a aba Inicio:
- Verifique o titulo Conta Corrente.
- Verifique o saldo inicial e a situacao Positivo.

2. Teste entrada de dinheiro:
- Abra a aba Entrada.
- Digite um valor valido, por exemplo 100.
- Clique em Registrar Entrada.
- Volte para Inicio e confirme aumento do saldo.

3. Teste saida de dinheiro:
- Abra a aba Saida.
- Digite um valor valido, por exemplo 50.
- Clique em Registrar Saida.
- Volte para Inicio e confirme reducao do saldo.

4. Teste situacao devedor:
- Registre uma saida maior que o saldo atual.
- Confirme que a situacao muda para Devedor.
- Confirme que a aba inicial muda para cor de alerta.

5. Teste validacao basica:
- Tente registrar 0, valor negativo ou texto invalido.
- Confirme que nao ha mudanca no saldo.

6. Teste navegacao:
- Navegue por Inicio, Entrada, Saida, Sobre e Contato.
- Confirme que os icones e labels aparecem corretamente.

7. Teste rodape:
- Em todas as paginas, confirme o texto de creditos:
  Aluno Tellys - If Sul de Minas - Pocos de Caldas.

## Estrutura principal

- App.js: telas, navegacao e logica de saldo
- app.json: configuracao do app Expo

## Observacoes

- Projeto voltado para fins didaticos.
- Nao usa persistencia local de dados nesta versao.

## Troubleshooting

### Erro ao rodar npm run web: dependencias ausentes

Se aparecer o erro abaixo:

```
CommandError: It looks like you're trying to use web support but don't have the required dependencies installed.
Install react-dom@x.x.x, react-native-web@x.x.x
```

Execute dentro da pasta do projeto:

```bash
cd /home/tellys/projects/projeto-interdisciplinar
npx expo install react-dom react-native-web
```

### Avisos EBADENGINE no npm

Avisos como `npm warn EBADENGINE` indicam incompatibilidade de versao do Node.js com os pacotes do Expo SDK 56. Nao bloqueiam a execucao. Para elimina-los, use Node.js 20 LTS ou 22 LTS:

```bash
nvm install 22
nvm use 22
```

### Erro ENOENT package.json

Certifique-se de estar dentro da pasta correta antes de rodar qualquer comando:

```bash
cd /home/tellys/projects/projeto-interdisciplinar
npm run web
```
