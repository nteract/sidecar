FROM ubuntu:14.04

RUN apt-get update -y
RUN apt-get install -q -y libzmq3-dev pkg-config
RUN apt-get install -q -y nodejs-legacy npm
RUN npm install -g node-gyp

ADD . /srv/sidecar
WORKDIR /srv/sidecar

RUN npm run build
