'use babel';

import { CompositeDisposable } from 'atom';

function debounce(func, wait, immediate) {
  let timeout;

  return function debounceFn(...args) {
    const later = () => {
      timeout = null;

      if (!immediate) {
        func.call(this, ...args);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.call(this, ...args);
    }
  };
}

function log(...args) {
  if (atom.inDevMode()) {
    console.log('tree-view-auto-collapse', ...args);
  }
}

export default {
  config: null,
  ignore: null,
  subscriptions: null,
  treeView: null,

  activate() {
    Promise.resolve(atom.packages.activatePackage('tree-view'))
      .then(({ mainModule: treeViewModule }) => {
        const { Minimatch } = require('minimatch');

        this.treeView = treeViewModule.treeView;

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Get package config
        const config = atom.config.get('tree-view-auto-collapse');

        const debounceCleanUp = debounce(
          (...args) => this.cleanUpTreeView(...args),
          100
        );

        // Register command that toggles this view
        this.subscriptions.add(
          atom.commands.add('atom-workspace', {
            'tree-view-auto-collapse:clean-up': debounceCleanUp,
          })
        );

        this.subscriptions.add(
          atom.config.observe('tree-view-auto-collapse.keepExpanded', value => {
            const matches = [...value].map(
              pattern => new Minimatch(pattern, { dot: true, matchBase: true })
            );

            this.ignore = v => matches.some(m => m.match(v));
            debounceCleanUp();
          })
        );

        this.subscriptions.add(
          atom.project.onDidChangePaths(() => {
            debounceCleanUp();
          }),
          atom.workspace.onDidDestroyPaneItem(() => {
            if (config.triggerOnTextEditorClose) {
              debounceCleanUp();
            }
          })
        );

        debounceCleanUp();
      })
      .catch(() => {
        atom.notifications.addError('Failed to load package `tree-view`', {
          detail:
            "tree-view-auto-collapse: Could not activate because the tree-view package doesn't seem to be loaded",
        });
      });
  },

  cleanUpTreeView() {
    log('cleanUpTreeView start');

    if (!this.treeView || !this.treeView.roots.length) {
      return;
    }

    const expandedNodes = this.treeView.roots.reduce(
      (acc, rootNode) =>
        acc.concat(...rootNode.getElementsByClassName('expanded')),
      []
    );

    const openedNodes = [];
    const openedKeepExtendedNodes = expandedNodes.filter(node =>
      this.ignore(atom.project.relativize(node.getPath()))
    );

    if (openedKeepExtendedNodes.length) {
      openedNodes.push(...openedKeepExtendedNodes);
    }

    const openedBufferNodes = atom.workspace
      .getTextEditors()
      .map(editor => this.treeView.entryForPath(editor.getPath()))
      .filter(node => !openedNodes.includes(node));

    if (openedBufferNodes.length) {
      openedNodes.push(...openedBufferNodes);
    }

    expandedNodes
      .reverse()
      .filter(node => !openedNodes.some(n => node.contains(n)))
      .forEach(node => node.collapse());
  },

  deactivate() {
    if (this.subscriptions) {
      this.subscriptions.dispose();
    }

    this.treeView = null;
  },
};
