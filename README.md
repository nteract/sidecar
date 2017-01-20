# sidecar

[![Greenkeeper badge](https://badges.greenkeeper.io/nteract/sidecar.svg)](https://greenkeeper.io/)

Little side HTML display of Jupyter kernel rich output.

![Sidecar in Electron](https://files.gitter.im/jupyter/notebook/ivzi/sidecar.gif)

## Installation

This package requires node or [iojs](https://iojs.org/en/index.html), [zmq](http://zeromq.org/intro:get-the-software), and [`jupyter_console`](https://github.com/jupyter/jupyter_console).


```
$ npm install -g electron-prebuilt
$ npm install -g jupyter-sidecar
```

## Usage

```
$ sidecar
```

Sidecar will open as many display areas as there are kernels running, which means if you run

```
$ jupyter console
```

in separate terminals, sidecar views will pop up automagically.

## Building


After cloning this repository and `cd`ing into the directory, run this:

```
$ npm install -g electron-prebuilt
$ npm install
```

To run the local copy, use `npm run start`

