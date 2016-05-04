## Introduction
[Visualisers](https://github.com/webgme/webgme/wiki/GME-Visualizers) are UI components that typically define the visualization in the 
main canvas. Whereas decorators are part of the context or territory of another widget, visualizers control the territories, i.e., which 
nodes are of interest. To handle this it relies on the [Client API](https://github.com/webgme/webgme/wiki/GME-Client-API#loadingwatching-ie-listening-on-changes-nodes).
Although free to register for changes in an arbitrary territory, the widget is typically bound to the active object (`client.getActiveObject()`) and
sometimes selection (`client.getActiveSelection()`). For instance in the ModelEditor, the active object is the node that defines the canvas and the highlight children is the
active selection.

## Target
Create a visualizer that uses the generated code from the FSMCodeGenerator to make a simple interactive finite-state-machine simulator.

#### Detailed steps
The visualizer should only be used from **StateMachine**s and when activated it will embed the generated simulator code as an
[iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) HTML-element.

Using the actual model it should get all the **States** and **Transition**s and build a graph of the model using [d3](https://d3js.org/).

## Generate template code for a visualizer
Using [webgme-cli](https://github.com/webgme/webgme-cli) we can create the visualizer template code using:
 ```
 webgme new viz FSMSimulator
 ```
This creates a new visualizer at '/src/visualizers'. 
- `/panels/FSMSimulator/FSMSimulatorPanel.js` - Defines the visualizer as a javascript class-like object exposed as an requirejs AMD module. It glues the controller and widget together.
- `/panels/FSMSimulator/FSMSimulatorControl.js` - This is where the interaction with gme-client takes place, e.g., defining territories and accessing data from the nodes.
- `/widgets/FSMSimulator/FSMSimulatorWidget.js` - Defines the behavior of the visualization based on input from the controller.

The new visualizer is made available for the UI (as a requirejs module) by adding metadata to `visualizers/Visualizers.json` which in turn is 
made available in `visualizerDescriptors` in [config.visualization](https://github.com/webgme/webgme/tree/master/config#visualization).
Again, the `webgme-setup.json` is populated with info that this visualizer is defined in this particular repository. This will expose it to other users of [webgme-cli](https://github.com/webgme/webgme-cli).

## Register the visualizer
Visualizers are registered to nodes and are stored under the registry `validVisualizers`. In the UI it is available under **META** in the Property Editor.
Since we want the decorator to be used for **StateMachine**s only, open the **StateMachine** Meta-node and add `FSMSimulator` right after `ModelEditor` in the string `validVisualizers`
(Again, since the registry follows inheritance all **StateMachine**s will now have the option `FSMSimulator`.)

## Debugging the code
When debugging browser code it is advised to load the page via `debug.html`. That way the non-minified version of the webgme code will be loaded (including the libraries).
To open up the page in debug mode (running locally) go to `http://127.0.0.1:8888/debug.html`.

To enable the logger (based on [debug](https://github.com/visionmedia/debug)) set the debug property of the localStorage to an inclusive regular expression. 
All logger instances of webgme start with `'gme:'` so in the browser console we type `localStorage.debug = 'gme:*'`. For it to have affect we need to refresh the browser. 
To make sure that we only get the logs from our decorator we're better off using the following setting:

```javascript
localStorage.debug = 'gme:Decorators:FSMDecorator'
```


## Modifying the visualizer

