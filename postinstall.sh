#!/bin/bash

sudo mkdir -p -m 0777 /etc/viola-cdr && \
sudo chmod 0777 /etc/viola-cdr && \
sudo cp ./config.js /etc/viola-cdr/config.js
