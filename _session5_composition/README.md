## Introduction
[Libraries](https://github.com/webgme/webgme/wiki/GME-Libraries) are essential elements of language composing. We can use existing projects as libraries during our work and they will add not just the language definitions, but also all the other components to our project.

## Target
The sessions target is to compose the already created components with another language (our example uses the Signal Flow System) and create a plugin that can facilitate the code generator plugin without changing it.

#### Detailed steps

1. Create the new plugin `SignalMachine`.
1. Create SignalMachine project starting from SignalFlowSystem seed.
1. Add FSM as library ('from the URL of the FSM project').
1. Extend the rules of `Primitive` to allow containment of `StateMachine`.
1. Go into FM Receiver example and copy the `DeploymenProcess` into some of the `Primitive`s.
1. Code the `SignalMachineExplorer` plugin
   1. require `FSMCodeGenerator`
   1. show how to call plugin from plugin
   1. write the simple traversing code
1. execute the finished plugin and show that it generated every code
1. show that visualizar and decorator still works
1. register the final project as seed


