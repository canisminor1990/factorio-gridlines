<div align="center"><a name="readme-top"></a>

<img height="160" src="https://github.com/user-attachments/assets/9783264a-8a76-4d8d-abb1-2e09fbc63090">

<h1>Factorio Gridlines</h1>

Enhance your building layouts with a powerful and flexible grid system! Gridlines adds customizable grids to your world, allowing for precise and efficient designs across multiple layers.

[![][factorio-mod-shield]][factorio-mod-link]
[![][typescripttolua-shield]][typescripttolua-link]
[![][github-release-shield]][github-release-link]
[![][github-releasedate-shield]][github-releasedate-link]
[![][github-action-release-shield]][github-action-release-link]<br/>
[![][github-contributors-shield]][github-contributors-link]
[![][github-forks-shield]][github-forks-link]
[![][github-stars-shield]][github-stars-link]
[![][github-issues-shield]][github-issues-link]
[![][github-license-shield]][github-license-link]

[Mod Portal][factorio-mod-link] · [Changelog](./CHANGELOG.md) · [Report Bug][github-issues-link] · [Request Feature][github-issues-link]

![](https://github.com/user-attachments/assets/2e24c083-b538-4ef8-b5c8-50d267671347)

</div>

> \[!NOTE]
> Trying to develop a Factorio mod using TypeScript, with the grid system inspired by the implementation of [ChunkyChunks - Configurable Gridlines](https://mods.factorio.com/mod/ChunkyChunks).

This project relies on two powerful open-source projects: [TypeScriptToLua](https://github.com/TypeScriptToLua/TypeScriptToLua) and [Typed Factorio](https://github.com/GlassBricks/typed-factorio).
This mod is entirely written in **TypeScript**, featuring complete type definitions and debugging capabilities. Additionally, the i18n generation scheme has been optimized to comply with the i18next standard.

<details>
<summary><kbd>Table of contents</kbd></summary>

#### TOC

- [✨ Features](#-features)
- [⌨️ Local Development](#️-local-development)
- [🤝 Contributing](#-contributing)
- [🔗 Credits](#-credits)

####

</details>

## ✨ Features

![Frame 55](https://github.com/user-attachments/assets/5cbb7aa8-ff2e-4c34-a1f3-f85ed6056243)

- [x] **🧇 Flexible Grid System**: Provides three grid layers that support flexible configuration, allowing adjustments for color, size, thickness, and offset.
- [x] **🖍️ Map and Personal Settings**: Setting the grid on the map enables all online players to share the same grid system, while also allowing individual settings to override it.
- [x] **🌐 Internationalization**: Comprehensive i18n translation supporting 17 languages.
- [x] **⌨️ Hotkeys**: Supports button and `F6` hotkey toggling.

<br/>

| Map Settings                                                                         | Player Settings                                                                      |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| ![](https://github.com/user-attachments/assets/a1b59c46-eb15-4288-92ef-d53e3aa5890c) | ![](https://github.com/user-attachments/assets/0a4b9709-aefa-4966-b673-0e614350b4a5) |

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## ⌨️ Local Development

You can use Github Codespaces for online development:

[![][github-codespace-shield]][github-codespace-link]

Or clone it for local development:

[![][bun-shield]][bun-link]

```bash
$ git clone https://github.com/canisminor1990/factorio-gridlines.git
$ cd factorio-gridlines
$ bun install
$ bun dev
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤝 Contributing

Contributions of all types are more than welcome, if you are interested in contributing code, feel free to check out our GitHub [Issues][github-issues-link] to get stuck in to show us what you’re made of.

[![][pr-welcome-shield]][pr-welcome-link]

[![][github-contrib-shield]][github-contrib-link]

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🔗 Credits

- **ChunkyChunks - Configurable Gridlines** - <https://mods.factorio.com/mod/ChunkyChunks>
- **TypescriptToLua** - <https://github.com/TypeScriptToLua/TypeScriptToLua>
- **Typed Factorio** - <https://github.com/GlassBricks/typed-factorio>
- **Factoriomod Debug** - <https://www.npmjs.com/package/factoriomod-debug>

<div align="right">

[![][back-to-top]](#readme-top)

</div>

---

#### 📝 License

Copyright © 2024 [canisminor1990][profile-link]. <br />
This project is [GPL-3.0](./LICENSE) licensed.

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-black?style=flat
[bun-link]: https://bun.sh
[bun-shield]: https://img.shields.io/badge/-speedup%20with%20bun-black?logo=bun&style=for-the-badge
[factorio-mod-link]: https://mods.factorio.com/mod/gridlines
[factorio-mod-shield]: https://img.shields.io/badge/dynamic/json?labelColor=black&color=ffa200&label=Factorio&style=flat&query=downloads_count&suffix=%20downloads&url=https%3A%2F%2Fmods.factorio.com%2Fapi%2Fmods%2Fgridlines&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNhKSI+CjxwYXRoIGQ9Im0xNS4xMjMgNi40MTg3aC0wLjg0ODFjLTAuMTU3Ny0wLjYxNDYyLTAuNDAzOC0xLjE5MDMtMC43MjQ2LTEuNzE2OGwwLjYwOTctMC42MTExNGMwLjE2NDYtMC4xNjQ2MiAwLjI1NTEtMC4zODQyMyAwLjI1NTEtMC42MTc0MSAwLTAuMjMyODMtMC4wOTEyLTAuNDUyNzgtMC4yNTUxLTAuNjE3MDVsLTEuMDE2Mi0xLjAxNTJjLTAuMzI5Ni0wLjMyOTkzLTAuOTA1Ni0wLjMyOTU4LTEuMjMzOC0zLjVlLTRsLTAuNjM1NSAwLjYzMTY4Yy0wLjUyMDctMC4zMDM0OC0xLjA3ODktMC41MzczNi0xLjY5MzktMC42ODc3MXYtMC45MDc2NmMwLTAuNDgxMzItMC4zODQ1OC0wLjg3NzA0LTAuODY1OS0wLjg3NzA0aC0xLjQzNjdjLTAuNDgxMzMgMC0wLjg1OTk4IDAuMzk1NzEtMC44NTk5OCAwLjg3NzA0djAuOTA3MzFjLTAuNjE0NjMgMC4xNS0xLjE3NjQgMC4zODQyMy0xLjY5NzcgMC42ODgwNmwtMC42MzUxNS0wLjYzMTY4Yy0wLjMyOTI0LTAuMzI5OTMtMC45MDU1OC0wLjMyOTU4LTEuMjM1OS0zLjVlLTRsLTEuMDE1NiAxLjAxNTJjLTAuMTYyODggMC4xNjI1My0wLjI1NTggMC4zODczNi0wLjI1NTggMC42MTcwNiAwIDAuMjMyODMgMC4wOTAxNCAwLjQ1MjA5IDAuMjU1MSAwLjYxNjcxbDAuNjA5NzUgMC42MTI1M2MtMC4zMjA1MyAwLjUyNjU3LTAuNTY2OTQgMS4xMDIyLTAuNzI0MjUgMS43MTY4aC0wLjg0ODVjLTAuNDgxNjcgMC0wLjg3MDQyIDAuMzg3MDEtMC44NzA0MiAwLjg2NzN2MS40MzU2YzAgMC40ODE2NyAwLjM4ODc1IDAuODU5OTggMC44NzA0MiAwLjg1OTk4aDAuODQ4NWMwLjE1NzMxIDAuNjE0NTggMC40MDMzNyAxLjE5MzggMC43MjM1NiAxLjcyMDNsLTAuNjA5NzUgMC42MTM2Yy0wLjE2NDk3IDAuMTY0Ni0wLjI1NTQ2IDAuMzg0OS0wLjI1NTQ2IDAuNjE4MXMwLjA5MDg0IDAuNDUzNSAwLjI1NTQ2IDAuNjE4MWwxLjAxNjIgMS4wMTU5YzAuMTY0OTYgMC4xNjQ2IDAuMzgzODcgMC4yNTUxIDAuNjE2NzEgMC4yNTUxIDAuMjMyODMgMCAwLjQ1MjA5LTAuMDkwOCAwLjYxNzA1LTAuMjU1MWwwLjYzNzk0LTAuNjMyYzAuNTIxMzUgMC4zMDM4IDEuMDgzMSAwLjUzNzcgMS42OTc3IDAuNjg4NHYwLjkwNjNjMCAwLjQ4MTMgMC4zNzg2NSAwLjg2OTQgMC44NTk5OCAwLjg2OTRoMS40MzY3YzAuNDgxMzIgMCAwLjg2NTktMC4zODgxIDAuODY1OS0wLjg2OTR2LTAuOTA2NmMwLjYxNDk3LTAuMTUwNCAxLjE3MzItMC4zODQzIDEuNjk0Ni0wLjY4ODFsMC42MzI0IDAuNjMwNmMwLjE2NDkgMC4xNjUzIDAuMzg0MiAwLjI1NTggMC42MTc3IDAuMjU1OCAwLjIzMzIgMCAwLjQ1MjgtMC4wOTA4IDAuNjE3NC0wLjI1NTFsMS4wMTYzLTEuMDE1MmMwLjE2NDYtMC4xNjQzIDAuMjU0Ny0wLjM4MzkgMC4yNTU0LTAuNjE2NyAwLTAuMjMzMi0wLjA5MTItMC40NTIxLTAuMjU1NC0wLjYxN2wtMC42MDkxLTAuNjE2MWMwLjMyMDItMC41MjY5IDAuNTY2My0xLjEwNjQgMC43MjM5LTEuNzIwM2gwLjg0ODVjMC40ODEzIDAgMC44NzcxLTAuMzc4MzEgMC44NzcxLTAuODU5OTh2LTEuNDM1NmMzZS00IC0wLjQ4MDI5LTAuMzk1MS0wLjg2NzMtMC44NzY0LTAuODY3M3ptLTcuMTI3IDQuMzE4Yy0xLjUyMzcgMC0yLjc1OTItMS4yMjQtMi43NTkyLTIuNzMyNyAwLTEuNTA5OCAxLjIzNTUtMi43MzIgMi43NTkyLTIuNzMyIDEuNTI0IDAgMi43NjAyIDEuMjIyMyAyLjc2MDIgMi43MzItNGUtNCAxLjUwOTEtMS4yMzYyIDIuNzMyNy0yLjc2MDIgMi43MzI3eiIgZmlsbD0iI2ZmZiIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImEiPgo8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IiNmZmYiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K
[github-action-release-link]: https://github.com/canisminor1990/factorio-gridlines/actions/workflows/release.yml
[github-action-release-shield]: https://img.shields.io/github/actions/workflow/status/canisminor1990/factorio-gridlines/release.yml?label=release&labelColor=black&logo=githubactions&logoColor=white&style=flat
[github-codespace-link]: https://codespaces.new/canisminor1990/factorio-gridlines
[github-codespace-shield]: https://github.com/codespaces/badge.svg
[github-contrib-link]: https://github.com/canisminor1990/factorio-gridlines/graphs/contributors
[github-contrib-shield]: https://contrib.rocks/image?repo=canisminor1990%2Ffactorio-gridlines
[github-contributors-link]: https://github.com/canisminor1990/factorio-gridlines/graphs/contributors
[github-contributors-shield]: https://img.shields.io/github/contributors/canisminor1990/factorio-gridlines?color=c4f042&labelColor=black&style=flat
[github-forks-link]: https://github.com/canisminor1990/factorio-gridlines/network/members
[github-forks-shield]: https://img.shields.io/github/forks/canisminor1990/factorio-gridlines?color=8ae8ff&labelColor=black&style=flat
[github-issues-link]: https://github.com/canisminor1990/factorio-gridlines/issues
[github-issues-shield]: https://img.shields.io/github/issues/canisminor1990/factorio-gridlines?color=ff80eb&labelColor=black&style=flat
[github-license-link]: https://github.com/canisminor1990/factorio-gridlines/blob/master/LICENSE
[github-license-shield]: https://img.shields.io/github/license/canisminor1990/factorio-gridlines?color=white&labelColor=black&style=flat
[github-release-link]: https://github.com/canisminor1990/factorio-gridlines/releases
[github-release-shield]: https://img.shields.io/github/v/release/canisminor1990/factorio-gridlines?color=369eff&labelColor=black&logo=github&style=flat
[github-releasedate-link]: https://github.com/canisminor1990/factorio-gridlines/releases
[github-releasedate-shield]: https://img.shields.io/github/release-date/canisminor1990/factorio-gridlines?labelColor=black&style=flat
[github-stars-link]: https://github.com/canisminor1990/factorio-gridlines/network/stargazers
[github-stars-shield]: https://img.shields.io/github/stars/canisminor1990/factorio-gridlines?color=ffcb47&labelColor=black&style=flat
[pr-welcome-link]: https://github.com/canisminor1990/factorio-gridlines/pulls
[pr-welcome-shield]: https://img.shields.io/badge/%F0%9F%A4%AF%20PR%20WELCOME-%E2%86%92-ffcb47?labelColor=black&style=for-the-badge
[profile-link]: https://github.com/canisminor1990
[typescripttolua-link]: https://github.com/TypeScriptToLua/TypeScriptToLua
[typescripttolua-shield]: https://img.shields.io/badge/-TypescriptToLua-369eff?labelColor=black&logo=typescript&logoColor=white&style=flat
