import { render, h } from "preact";
import { UIRouter, UIRouterPlugin } from "@uirouter/core";
import { StateSelector } from "./selector/StateSelector";
import { StateVisualizer } from "./statevis/StateVisualizer";
import { StateTree } from "./statevis/tree/StateTree";
import { TransitionVisualizer } from "./transition/transitionVisualizer";

const visualizer = (router: UIRouter) => new Visualizer(router, {});

export interface Options {
  state?: boolean;
  transition?: boolean;
}

function unmountComponent(node) {
  let Nothing = () => null;
  render(h(Nothing as any, null), document.body, node);
}

const DEFAULTS = {
  state: true,
  transition: true,
};

class Visualizer implements UIRouterPlugin {
  name: string = "visualizer";
  private stateVisualizerEl: Element;
  private transitionVisualizerEl: Element;

  dispose(router?: UIRouter): any {
    this.stateVisualizerEl && unmountComponent(this.stateVisualizerEl);
    this.transitionVisualizerEl && unmountComponent(this.transitionVisualizerEl);
    this.stateVisualizerEl = null;
    this.transitionVisualizerEl = null;
  }

  constructor(public router: UIRouter, options: Options) {
    options = Object.assign({}, DEFAULTS, options);
    if (options.state) {
      this.stateVisualizerEl = StateVisualizer.create(router);
    }
    if (options.transition) {
      this.transitionVisualizerEl = TransitionVisualizer.create(router);
    }
  }
}

export {
    Visualizer,           // router.plugin(Visualizer);
    visualizer,           // visualizer(router);

    StateVisualizer,      // StateVisualizer.create(router, el?, props?)
    StateTree,            // StateTree.create(router, el?, props?)
    TransitionVisualizer, // TransitionVisualizer.create(router, el?, props?)

    StateSelector,        // React State Selector component
};
