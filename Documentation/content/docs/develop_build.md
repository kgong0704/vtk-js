title: Building vtk.js
---

VTK.js is a library and should be used as ES6 dependency but it is worth building it to validate the style and/or generate the actual JavaScript file for external script usage like described [here](intro_vtk_as_external_script.html).

The library can be build by simply gathering all the dependencies inside a bundle without modification or you can build it for production which will minify the generated file.

## Building vtk.js

In order to build the library you can run `npm run build` for quick style validation or `npm run build:release` for production usage.


{% note warn For Windows users %}
You can not use the previous command line for building a production ready bundle.
Instead you will need to run: `npm run build -- -p`
{% endnote %}

This will generate a `dist/vtk.js` file that can then be used as an external script.

## Building Web site

VTK.js comes with its tools to build the web site that get published on [github.io](https://kitware.github.io/vtk-js/) which enable you to write documentation and see what it could look like once published.

In order to run the tests and build the full web site with its examples you can run the following command line:

```sh
$ npm run doc:www
```

Then you will be able to browse the content on `http://localhost:4000/vtk-js` which will contains the test results and coverage.

But if you want to skip the tests you can run the following command:

```sh
$ npm run doc -- -s
```

And if you want to skip tests and examples:

```sh
$ npm run doc -- -s -f ExampleNameThatDoesNotExist
```