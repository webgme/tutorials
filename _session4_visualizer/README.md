## Introduction
[Visualisers](https://github.com/webgme/webgme/wiki/GME-Visualizers) are UI components that typically define the visualization in the 
main canvas. Whereas decorators are part of the context or territory of another widget, visualizers control the territories, i.e., which 
nodes are of interest. To handle this it relies on the [Client API](https://github.com/webgme/webgme/wiki/GME-Client-API#loadingwatching-ie-listening-on-changes-nodes).
Although free to register for changes in an arbitrary territory, the widget is typically bound to the active object (`client.getActiveObject()`) and
sometimes the selection (`client.getActiveSelection()`). For instance in the ModelEditor, the active object is the node that defines the canvas and the highlighted children is the
active selection.

## Target
Create a visualizer that uses the generated code from the FSMCodeGenerator to make a simple interactive finite-state-machine simulator.
Using the actual model it should get all the **State** and **Transition** objects and build a graph of the model using a [d3](https://d3js.org/) svg container.
The visualizer should only be used from **StateMachine** nodes, and when activated, it will embed the generated simulator code as an
[iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) HTML-element.

An input field for entering the `event` of the **Transition** object will be available in the canvas and users should be able to submit an event and the current state will be
shown by coloring the nodes.

#### Detailed steps

The detailed walkthrough for this tutorial can be found at [WebGME Tutorial Session 4 - Visualizer](https://www.youtube.com/watch?v=3OeFfOrrST8&list=PLhvSjgKmeyjhp4_hnf-xPdCgES56dnMJb&index=6).

1. Get the available **States** and **Transitions** in the model at start. Notify user about model changes.
2. Build the d3 graph based on the given model.
3. Add input field with submit and make mock function to present result to user.
4. Read the `simulator` attribute of the **StateMachine** and embed the blob-url in an `iframe`.
5. Access the "globally" defined `FSM.Simulator` class from the `iframe`.
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
Visualizers are registered at nodes and are stored under the registry `validVisualizers`. In the UI it is available under the **META** tab in the Property Editor.
Since we want the decorator to be used for **StateMachine** nodes only, open the **StateMachine** Meta-node and add `FSMSimulator` right after `ModelEditor` in the string `validVisualizers`
(Again, since the registry follows inheritance all **StateMachine**s will now have the option `FSMSimulator`.)

## Debugging the code
When debugging browser code it is advised to load the page via `debug.html`. That way the non-minified version of the webgme code will be loaded (including the libraries).
To open up the page in debug mode (running locally) go to `http://127.0.0.1:8888/debug.html`.

To enable the logger (based on [debug](https://github.com/visionmedia/debug)) set the debug property of the localStorage to an inclusive regular expression. 
All logger instances of webgme start with `'gme:'` so in the browser console we type `localStorage.debug = 'gme:*'`. For the change to take effect we need to refresh the browser. 
To make sure that we only get the logs from our decorator, we are better off using the following setting:

```javascript
localStorage.debug = 'gme:FSMSimulator*'
```

## Modifying the visualizer

### Extracting data from the model using the controller
The controller's main duty is to extract data from the GME model and pass it to the (graphical) widget. Since the data is potentially changing we need to
define a territory within the project-tree from where we want the controller to be notified.


Different UI components, like our visualizer, register themselves as users at the GME client and pass an event handler, (`client.addUI`). A user then defines territories, each starting from one node
and a specific depth of how many levels of children are of interest.

Whenever there are changes within the user's territory, the client will invoke the event handler
with data about those changes. This registration of territory is done inside `selectObjectChanged` (should have been `activeObjectChanged`) in `FSMSimulatorControl.js`.
After the territory has been defined, we request the client to load those nodes (potentially from the server) in `client.updateTerritory`.
(This call is were the actual registration of the territory takes place.)

For the purpose of this tutorial, we are mainly interested in when the **StateMachine** node and its children all have been loaded. Therefore, we will only define one territory
and build up the entire data for the widget when it has loaded. For other events we will simply notify the widget that the model might be outdated.

When we have set up a single territory in the `selectedObjectChanged`, we modify the `_eventCallback` to gather all the data for the **StateMachine** and notify the
widget once.

There are three types of events for nodes within a territory:

- `load` - The node was either loaded (potentially from the server) at an `updateTerritory` or newly created.
- `update` - The (resolved i.e. including bases) node potentially has changes.
- `unload` - The node was deleted from the territory.

When we encounter the **StateMachine** node, we'd like to get a url for the html file in generated simulator which will make it possible for the
widget to embed the generated code as an `iframe`. We know that the html file is named `index.html` and the blobClient provides a
utility method for getting a url to retrieve content from the blob storage, `blobClient.getViewURL(hash, subpath)`.

To access attributes and other node properties we use the GME Client node-getters (and can use utility methods for the client).
At the point where we have all the data we will call the (not yet existing) method `populateGraph` on the widget.

### Visualizing the data in the widget
First we will modify the template by keeping a reference to the header element. This we will use as the indicator when there were
changes detected in the underlying gme model. At the start, it will not have any text defined; we will add text if we get any events after the initial load.

When we get the state machine data and know we will be updated if there are changes, we proceed with building up the graph.
The first thing we add is a d3 svg container at initialize and make sure to set the `width` and `height` correctly (and maintain it
on resize).

In `populateGraph` we build up two maps `_idToState` and `_idToTransition` and populate them based on the data from the controller.
With the mappings we then add the nodes and transitions as svg elements to our d3 svg container.

The final step is to embed the generated simulator stored on the blob. For this we define two properties `_simEl` and `_simulator`. The former
will be a reference to the embedded iframe and the latter the instantiate `FSM.Simulator` "class" from the global scope of the iframe.

Once the iframe has loaded and since the `program.js` is defined in the `<header>`, we have access to the `FSM.Simulator`. Since it's an iframe
we can access it using the `contentWindow` of the html element.

At this stage we have access to everything we need and the details of creating an input field with action buttons and hooking them up
with the `_simulator` can be seen in the code. It also displays how we can use d3 to transition neatly between states.

