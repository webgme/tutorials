## Introduction
[Visualisers](https://github.com/webgme/webgme/wiki/GME-Visualizers) are UI components that typically define the visualization in the 
main canvas. Whereas decorators are part of the context or territory of another widget, visualizers control the territories, i.e., which 
nodes are of interest. To handle this it relies on the [Client API](https://github.com/webgme/webgme/wiki/GME-Client-API#loadingwatching-ie-listening-on-changes-nodes).
Although free to register for changes in an arbitrary territory, the widget is typically bound to the active object (`client.getActiveObject()`) and
sometimes the selection (`client.getActiveSelection()`). For instance in the ModelEditor, the active object is the node that defines the canvas and the highlight children is the
active selection.

## Target
Create a visualizer that uses the generated code from the FSMCodeGenerator to make a simple interactive finite-state-machine simulator.
Using the actual model it should get all the **States** and **Transition**s and build a graph of the model using [d3](https://d3js.org/).
The visualizer should only be used from **StateMachine**s and when activated it will embed the generated simulator code as an
[iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) HTML-element.

An input field with the event will be available in the canvas and users should be able to submit an event and the current state will be
shown by coloring the nodes.

#### Detailed steps

1. Get the available **States** and **Transitions** in the model at start. Notify user about model changes.
2. Build the d3 graph based on the given model.
3. Add input field with submit and make mock function to present result to user.
4. Read the `simulator` attribute of the **StateMachine** and embed the blob-url in an `iframe`.
5. Access the "globally" defined class from the `iframe`.
6. Add input field and hook up events from user to the simulator.

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

### Extracting data from the model using the controller
The controllers main duty is to extract data from the GME model and pass it to the (graphical) widget. Since the data is potentially changing we need to
define a territory within the project-tree from where we want the controller to be notified.


Different UI components, like our visualizer, registers themselves as `users` at the GME client and passes an event handler. A user then defines territories, each starting from one node
and a specific depth of how many level of children is of interest. Whenever there are changes within the user's territory the client will invoke the event handler
with data about those changes. This registration of territory is done inside `selectObjectChanged` (should've been `activeObjectChanged`) in `FSMSimulatorControl.js`.
After the territory has been defined, we request the client to load those nodes (potentially from the server) in `client.updateTerritory`.

For the purpose of this tutorial, we are mainly interested in when the **StateMachine** node and its children all have been loaded. Therefore we will only define one territory
and build up the entire data for the widget when it has loaded. For other events we will simply notify the widget that the model might be outdated.

When we've setup a single territory in the `selectedObjectChanged` we modify the `_eventCallback` to gather all the data for the **StateMachine** and notify the
widget once.

There are three types of events for nodes within a territory:

- `load` - The node was either loaded from the server at an `updateTerritory` or newly created.
- `update` - The (resolved i.e. including bases ) node potentially has changes.
- `unload` - The node was deleted from the territory.

When we encounter the **StateMachine** node, we'd like to get a url for the html file in generated simulator which will make it possible for the
widget to embed the generated code as an `iframe`. We know that the html file is named `index.html` and the blobClient provides a
utility method for getting a url to retrieve content, `blobClient.getViewURL(hash, subpath)`.

At the point where we have all the data we will call the (not yet existing) method `populateGraph` on the widget.

### Visualizing the data in the widget
First we will modify the template by keeping a reference to the header element. This we will use as the indicator when there were
changes detected in the underlying gme model. At start it won't have any text defined, this we will add if we get any events after the initial load.

When we get the state machine data and know we will be updated if there are changes, we proceed with building up the graph.
The first thing we add is a d3 svg container at initialize. 

