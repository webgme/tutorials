## Introduction
Some panels (e.g. the DiagramDesignerWidget or the PartBrowser) support customization of their node decoration.
These components are called [decorators](https://github.com/webgme/webgme/wiki/GME-Decorators).

## Target
Create a decorator that behaves like the ModelDecorator but with the following additions if the node is a **StateMachine**:
 - Checks if the **StateMachine** has any saved data from a plugin execution.
 - If it does NOT have any saved data, a button for invoking the `FSMCodeGenerator` will be enabled.
 - If it has stored data it will color code the box depending on if the stored metadata (commit-hash) matches the current context.

## Create decorator inheriting from ModelDecorator
Using [webgme-cli](https://github.com/webgme/webgme-cli) we can create a decorator that inherits from the ModelDecorator.
 ```
 webgme new decorator FSMDecorator --inherit // TODO: The inherit param does not work!
 ```
This creates a new decorator at '/src/decorators'. The new decorators is associated with three files.
- `FSMDecorator.js` - Defines the decorator as a javascript class-like object exposed as an requirejs AMD module. Also defines the supported Widgets.
- `/DiagramDesigner/FSMDecorator.DiagramDesignerWidget.js` - Defines the behavior of the decorator when used in e.g. the ModelEditor.
- `/DiagramDesigner/FSMDecorator.PartBrowserWidget.js` - Defines the behavior of the decorator when used in the PartBrowser.

The new decorator is made available for the decorator-manager (as a requirejs module) by adding its path to the `visualization.decoratorPaths` in [config.plugin](https://github.com/webgme/webgme/tree/master/config#visualization).
Lastly the `webgme-setup.json` populated with info that this decorator is defined in this particular repository, this will expose it to other users of [webgme-cli](https://github.com/webgme/webgme-cli).

## Modifying the decorator
As mentioned the generated decorator inherits from the ModelDecorator, more specifically the `DiagramDesignerWidget` and `PartBrowserWidget` inherits from the counterparts
defined for the ModelDecorator. In this tutorial we will focus on the `DiagramDesignerWidget`

