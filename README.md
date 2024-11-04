<div align="center"><a name="readme-top"></a>

<img height="160" src="https://github.com/user-attachments/assets/9783264a-8a76-4d8d-abb1-2e09fbc63090">

<h1>Factorio Gridlines</h1>

Enhance your building layouts with a powerful and flexible grid system! Grid Planner Deluxe adds customizable grids to your Factorio world, allowing for precise and efficient designs across multiple layers.

[![][factorio-mod-shield]][factorio-mod-link]
[![][github-release-shield]][github-release-link]
[![][github-releasedate-shield]][github-releasedate-link]
[![][github-action-release-shield]][github-action-release-link]
[![][typescripttolua-shield]][typescripttolua-link]<br/>
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

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-black?style=flat-square
[bun-link]: https://bun.sh
[bun-shield]: https://img.shields.io/badge/-speedup%20with%20bun-black?logo=bun&style=for-the-badge
[factorio-mod-link]: https://mods.factorio.com/mod/gridlines
[factorio-mod-shield]: https://img.shields.io/badge/-Factorio%20Mod-FFB31B?textColor=black&labelColor=black&style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANxSURBVHgBbVNLbBtFGP5nd/1cZ/3auGliR3k2SXk0VVSFAE1DpSKEBAciuCAhcYELBy4VxzaVEFzgiHqrhAQSXLggAW2BClIqmpiCUidqbOwkjR3Lznp3vV7Pvqdjp6mqqr/ml0Yz8803//f9w8JjQQDQ0sEUdTL/6fw777+Y/DbE8xMrhYaP7sfpukzTPsRwj8AfzPh+SgROh75YabnI1pbODmFZdxdV3X6OsRAhDKiMB0CHTo/nDvgOmIBcWOC0XnJpX7fPf5dVcmO8Y4yLPROFJhvT5CYUNWTofi93Nbu3PJMO1Y/Ee9Nf/bpxrWW5u2yXfmEL6sWBMy1VO5MQU30Q5NNNywwiYkAPz0IshLijfq7/1WOxmZOZyCueQ04ZEI4UakqE6eAvLgEZ8NvXZZSAaDwEvNMA0zDBsjxiYIf0hmnRrAu7dd1XLKmcpGNtdae+3dGC6wiXu3DcN+knH4POgVEpQV0D2CjUnW0FlyOs5w0nw5mRkSNcfyoAhR0MV7ccSdHaEr3A5Ha/PDfvb+HZMomcU+QKkjEDa+tl54cCvnJfNXepaP9dXkBlVWr+nEwJyUxfGMYbRqYkBIQ9BQPDs9aPxZr2ecVieMu2QWo55J5k3tlWzTIFd0rMfXijnU0Koe99rI/EeIAUa3OvjYmnnx9IDnK3d4zrfxXxbMaS+4IEUIAaZWBbO3ToMPxDw2VPVQEcE3ifDdMT0ZMQCk8ztyJ/Lwbj4bd5n0NcShiL+NF4wj8ZZJgOPaI2PXsRwJceTL8VA4wQvXet7sBveU0u1PV8l+XPz16Oa3V7ea+hTwlBFzUkG9Y3q4V/9s1bCSECn3z0xhiWpBfsah6tFm248q8ulWr7lz3Pk7qdGCrhlsmz/zcUcyqaZEGI+2H2RGZ02vBGxVQPUTfuMiHagAomcOc+Jm0T36Zgh0Kz3T5Ywcy7qxX8elzg0O8bLaI1XWCDCPX3MiiIdCaM2rC3b8Efd1U4MRQBAdnyQ2nGuy+4WdCXZdO+Z7YbzbWqVb1RdueeESB1XGSprS5sqkDWa23z7KTgIoeEA9HEHDQqeQotPlJ6ZiQezRblzgfBU6Iozh0LfzM7xC/8kpOVa5vqsmGaxZ4AuzXYL85Xaq2va5q2Ss9W4WnR6c73Xhq99OapYWfyaOwmXTpPc5Gm+KS9DwBIOKSHXtTw9wAAAABJRU5ErkJggg==
[github-action-release-link]: https://github.com/canisminor1990/factorio-gridlines/actions/workflows/release.yml
[github-action-release-shield]: https://img.shields.io/github/actions/workflow/status/canisminor1990/factorio-gridlines/release.yml?label=release&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-codespace-link]: https://codespaces.new/canisminor1990/factorio-gridlines
[github-codespace-shield]: https://github.com/codespaces/badge.svg
[github-contrib-link]: https://github.com/canisminor1990/factorio-gridlines/graphs/contributors
[github-contrib-shield]: https://contrib.rocks/image?repo=canisminor1990%2Ffactorio-gridlines
[github-contributors-link]: https://github.com/canisminor1990/factorio-gridlines/graphs/contributors
[github-contributors-shield]: https://img.shields.io/github/contributors/canisminor1990/factorio-gridlines?color=c4f042&labelColor=black&style=flat-square
[github-forks-link]: https://github.com/canisminor1990/factorio-gridlines/network/members
[github-forks-shield]: https://img.shields.io/github/forks/canisminor1990/factorio-gridlines?color=8ae8ff&labelColor=black&style=flat-square
[github-issues-link]: https://github.com/canisminor1990/factorio-gridlines/issues
[github-issues-shield]: https://img.shields.io/github/issues/canisminor1990/factorio-gridlines?color=ff80eb&labelColor=black&style=flat-square
[github-license-link]: https://github.com/canisminor1990/factorio-gridlines/blob/master/LICENSE
[github-license-shield]: https://img.shields.io/github/license/canisminor1990/factorio-gridlines?color=white&labelColor=black&style=flat-square
[github-release-link]: https://github.com/canisminor1990/factorio-gridlines/releases
[github-release-shield]: https://img.shields.io/github/v/release/canisminor1990/factorio-gridlines?color=369eff&labelColor=black&logo=github&style=flat-square
[github-releasedate-link]: https://github.com/canisminor1990/factorio-gridlines/releases
[github-releasedate-shield]: https://img.shields.io/github/release-date/canisminor1990/factorio-gridlines?labelColor=black&style=flat-square
[github-stars-link]: https://github.com/canisminor1990/factorio-gridlines/network/stargazers
[github-stars-shield]: https://img.shields.io/github/stars/canisminor1990/factorio-gridlines?color=ffcb47&labelColor=black&style=flat-square
[pr-welcome-link]: https://github.com/canisminor1990/factorio-gridlines/pulls
[pr-welcome-shield]: https://img.shields.io/badge/%F0%9F%A4%AF%20PR%20WELCOME-%E2%86%92-ffcb47?labelColor=black&style=for-the-badge
[profile-link]: https://github.com/canisminor1990
[typescripttolua-link]: https://github.com/TypeScriptToLua/TypeScriptToLua
[typescripttolua-shield]: https://img.shields.io/badge/-TypescriptToLua-369eff?labelColor=black&logo=typescript&logoColor=white&style=flat-square
