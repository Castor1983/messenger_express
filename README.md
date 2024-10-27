<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Опис

# Проєкт на ExpressJS з підключенням до Firebase. Являє собою серверну частину веб застосунку чат-мессенджеру.
Основні можливості:
1. створення чату з можливістю спілкування один на один
2. прикріплення файлів до повідомлення
3. редагування, видалення свого повідомлення

## Вимоги
Перед початком переконайтеся, що у вас встановлені наступні інструменти:
```bash
- [Node.js](https://nodejs.org/)
- Firebase CLI
- Обліковий запис у [Firebase](https://firebase.google.com/)
```

## Налаштування Firebase
```bash
### Firebase

1. Зайдіть на [консоль Firebase](https://console.firebase.google.com/) та створіть новий проєкт.
2. Додайте до проєкту додаток (Web), дотримуючись інструкцій.

## Інсталяція

1. Клонуйте репозиторій:

```bash
git clone https://github.com/Castor1983/messenger-express


2. Встановіть залежності
$ npm install
```
## Налаштування оточення

```bash
 створіть файл .env у кореневій папці  проєкту 
 заповніть його необхідними змінними оточення відповідно до файлу .env.example

```
## Компіляція та старт проєкту

```bash
## Запустіть скрипт у файлі package.json
"start:dev": "rimraf dist && tsc-watch --onSuccess \"npm run watch:server\"",
## або виконайте команду в терміналі 
 npm run start:dev
 
 ## Сервер запуститься на  http://localhost: PORT,
 ## PORT дорівнюватиме значенню яке зазначено у файлі .env
```





