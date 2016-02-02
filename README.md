# Ryo CDR 

(fork & cut [WebCDR](https://github.com/ipoddubny/webcdr))

## интерфейс проcмотра CDR и прослушивания записей звонков Asterisk

### Возможности

- просмотр CDR, с фильтрацией по времени, номеру телефона, статусу
- встроенный HTML5/flash плеер для прослушивания записей звонков


## Screen 

![Demo](https://raw.githubusercontent.com/antirek/ryocdr/master/images/demo.png)


## Install

> npm install -g --unsafe ryocdr

OR

> git clone https://github.com/antirek/ryocdr.git

> cd ryocdr

> npm install

> bower install

> npm run build


## Run

> ryocdr

OR

> pm2 start /usr/local/bin/ryocdr

OR

> node app.js


## Config 

set env var RYOCDR_CONFIG as path to require


check settings in config.js


## Reqs

Node 4

## Thanks 

[Ivan Poddubny](https://github.com/ipoddubny)
