# Viola CDR 

(fork & cut [WebCDR](https://github.com/ipoddubny/webcdr))

## интерфейс проcмотра CDR и прослушивания записей звонков Asterisk

### Возможности

- просмотр CDR, с фильтрацией по времени, номеру телефона, статусу
- встроенный HTML5/flash плеер для прослушивания записей звонков


## Screen 

![Demo](https://raw.githubusercontent.com/antirek/viola-cdr/master/images/demo.png)


## Install

> npm install -g --unsafe violacdr

OR

> git clone https://github.com/antirek/viola-cdr.git

> cd viola-cdr

> npm install

> bower install

> npm run build


## Run

> violacdr

OR

> pm2 start /usr/local/bin/violacdr

OR

> node app.js


## Config 

set env var VIOLA_CDR_CONFIG as path to require


check settings in config.js


## Reqs

Node 4

## Thanks 

[Ivan Poddubny](https://github.com/ipoddubny)

