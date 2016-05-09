## Introduction
Some panels (e.g. the DiagramDesignerWidget or the PartBrowser) support customization of their node decoration.
These components are called [decorators](https://github.com/webgme/webgme/wiki/GME-Decorators).

## Target
Create a decorator that behaves like the ModelDecorator but with the following additions if the node is a **StateMachine**:
 - Checks if the **StateMachine** has any saved data from a plugin execution at the attribute (`simulator`).
 - If it does NOT have any saved data, a button for invoking the `FSMCodeGenerator` will be enabled.
 - If it has stored data display a message to the user depending on if the stored metadata (commit-hash) matches the current context.

## Create decorator inheriting from ModelDecorator
Using [webgme-cli](https://github.com/webgme/webgme-cli) we can create a decorator that inherits from the ModelDecorator.
 ```
 webgme new decorator FSMDecorator --inherit
 ```
This creates a new decorator at '/src/decorators'. The new decorators is associated with three files.
- `FSMDecorator.js` - Defines the decorator as a javascript class-like object exposed as an requirejs AMD module. Also defines the supported Widgets.
- `/DiagramDesigner/FSMDecorator.DiagramDesignerWidget.js` - Defines the behavior of the decorator when used in e.g. the ModelEditor.
- `/DiagramDesigner/FSMDecorator.PartBrowserWidget.js` - Defines the behavior of the decorator when used in the PartBrowser.

The new decorator is made available for the decorator-manager (as a requirejs module) by adding its path to the `visualization.decoratorPaths` in [config.plugin](https://github.com/webgme/webgme/tree/master/config#visualization).
Lastly the `webgme-setup.json` populated with info that this decorator is defined in this particular repository, this will expose it to other users of [webgme-cli](https://github.com/webgme/webgme-cli).

## Register the decorator
Registering a decorator for a model requires two steps.
#### Project registration
To make the decorator available as a choice for the individual nodes we first need to register it for the entire project. 
This is by adding it to the registry `validDecorators` of the root-node. In the UI it is available under **Meta** in the Property Editor. 
Enable the `FSMDecorator` by selecting the check-box.

#### Node registration
To set the decorator for a node we edit the registry `decorator`. In the UI it is available under **Preferences** in the Property Editor.
Since we want the decorator to be used for **StateMachine**s only, open the **StateMachine** Meta-node and set the decorator to `FSMDecorator`.
(Since the registry follows inheritance all **StateMachine**s will now use the new decorator.)

## Debugging the code
When debugging browser code it is advised to load the page via `debug.html`. That way the non-minified version of the webgme code will be loaded (including the libraries).
To open up the page in debug mode (running locally) go to `http://127.0.0.1:8888/debug.html`.

To enable the logger (based on [debug](https://github.com/visionmedia/debug)) set the debug property of the localStorage to an inclusive regular expression. 
All logger instances of webgme start with `'gme:'` so in the browser console we type `localStorage.debug = 'gme:*'`. For it to have affect we need to refresh the browser. 
To make sure that we only get the logs from our decorator we're better off using the following setting:

```javascript
localStorage.debug = 'gme:Decorators:FSMDecorator'
```


## Modifying the decorator
As mentioned the generated decorator inherits from the ModelDecorator, more specifically the `DiagramDesignerWidget` and `PartBrowserWidget` inherits from the counterparts
defined for the ModelDecorator. In this tutorial we will focus on the `DiagramDesignerWidget`

