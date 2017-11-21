# Tree View Auto-Collapse

[![GitHub Stars][stars-badge]]()

[![Version][version-badge]][package] [![Downloads][downloads-badge]][package]
[![GitHub issues][issues-badge]][issues]
[![MIT License][license-badge]][license]

Helps to keep the tree view clean and clear by collapsing currently unused
entries.

## Installation

Open **Settings** → **Install** and search for `tree-view-auto-collapse` or
install through command-line:

    apm install tree-view-auto-collapse

Make sure to restart Atom after the package is installed.

### Optional Setup

* Package works the best with `Auto Reveal` and `Focus on Reveal` options
  enabled (**Packages** → **tree-view**).
* Works even better with [ZenTabs](https://atom.io/packages/zentabs) package
  installed.

## Usage

There are two modes you can use:

* **Default:** Automatically clean tree view after closing a text editor tab
  (you can disable this behaviour in **Packages** → **tree-view-auto-collapse**
  → **Auto-Collapse on Editor Tab Closing**).
* Invoke manually using command `tree-view-auto-collapse:clean-up`.

## Issues

Feel free to [submit issues][issues-new] and [enhancement requests][pr-new].

## Contributing

Please refer to each project's style guidelines and guidelines for submitting
patches and additions. In general, we follow the "fork-and-pull" Git workflow.

* Fork the repo on GitHub
* Clone the project to your own machine
* Commit changes to your own branch
* Push your work back up to your fork
* Submit a Pull request so that we can review your changes
* **NOTE:** Be sure to merge the latest from "upstream" before making a pull
  request!

## Maintainers

[Paweł Golonko][greenek]

## LICENSE

[MIT](./LICENSE.md)

[downloads-badge]: https://img.shields.io/apm/dm/tree-view-auto-collapse.svg
[greenek]: https://github.com/Greenek
[issues]: https://github.com/Greenek/atom-tree-view-auto-collapse/issues/
[issues-badge]: https://img.shields.io/github/issues/Greenek/atom-tree-view-auto-collapse.svg
[issues-new]: https://github.com/Greenek/atom-tree-view-auto-collapse/issues/new
[license]: ./LICENSE.md
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[package]: https://atom.io/packages/tree-view-auto-collapse
[pr-new]: https://github.com/Greenek/atom-tree-view-auto-collapse/compare
[stars-badge]: https://img.shields.io/github/stars/greenek/atom-tree-view-auto-collapse.svg?style=social&label=Star
[version-badge]: https://img.shields.io/apm/v/tree-view-auto-collapse.svg
