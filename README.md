# jupyter-sidecar

Little side HTML display of Jupyter kernel rich output.

![Sidecar in Electron](https://files.gitter.im/ipython/ipython/wiaB/sidecar.gif)

This is a WIP that requires building it yourself and connecting directly to a running Jupyter kernel.

## Building

This package requires iojs and zmq.

Install ZeroMQ headers for your platform.
Install iojs

Install node-gyp:

```
npm install -g node-gyp
```

Clone this repository, `cd` into it, and run `npm install`.

In order to get Electron to come up, zmq has to be built with Electron headers. After doing an `npm install`, you'll have to `cd` into `./node_modules/zmq` and run:

```
node-gyp rebuild --target=0.28.1 --arch=x64 --dist-url=https://atom.io/download/atom-shell
```

Now that it's built, get ready for MORE YAK SHAVING!

Start an ipython kernel with:

```
ipython kernel
```

This should spit out some text like:

```
NOTE: When using the `ipython kernel` entry point, Ctrl-C will not work.

To exit, you will have to explicitly quit this process, by either sending
"quit" from a client, or using Ctrl-\ in UNIX-like environments.

To read more about this, see https://github.com/ipython/ipython/issues/2049


To connect another client to this kernel, use:
    --existing kernel-20139.json   # Your kernel number will probably be different
```

Then open a console connected to that kernel:

```
ipython console --existing kernel-20139.json
```

Then you'll need to locate where that kernel config was written to disk. This can vary based on what IPython you're running. In my case, since I'm running from the master branch of all the Jupyter and IPython repos (after the big split :tm:), they're located at `~/Library/Jupyter/runtime/`.

Yours are likely in `~/.ipython/profile_default/security/`. One way to find it on a *nix system is `find ~/ -name kernel-20139.json`.

Finally, run it with `electron . {path to kernel-###.json}`
