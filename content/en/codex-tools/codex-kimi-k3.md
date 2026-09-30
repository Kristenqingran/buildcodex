---
title: Install Codex from Scratch and Connect Kimi K3
description: A beginner guide to Codex CLI, CC Switch, and Kimi K3 for users in mainland China.
category: Installation guide
slug: codex-kimi-k3
publishedAt: '2026-09-28'
---

For people who know only basic computer operations, live in mainland China, and want to use Codex and Kimi K3 on Windows or Mac. Checked on September 28, 2026. Software interfaces may change; look for buttons by meaning when labels differ.

> **Important correction: I cannot guarantee that every software product can be downloaded or used in mainland China.** OpenAI's currently published ChatGPT/API supported-country list does not include mainland China. Obtaining a desktop installer elsewhere does not guarantee account login or service availability. Complete the “Mainland environment check” below first. If the ChatGPT desktop app is unavailable, you can still try **Codex CLI + a Kimi Open Platform API key**; if the Codex CLI package cannot be obtained either, it would not be accurate to promise a local “Codex + Kimi” setup. Do not buy unofficial “domestic versions” or shared accounts.

## Read these three points first

1. Codex is an application that can read files, write code, and run tasks. This guide installs existing software and configures your own Kimi model; it does not train a new model.
2. The mainland-China path in this guide is **Codex CLI + CC Switch + a Kimi Open Platform API key**. The ChatGPT desktop app is optional and should be added only if you can lawfully obtain, log into, and use it. Do not modify `.codex/config.toml` using another guide at the same time; configurations may overwrite each other.
3. **ChatGPT Plus and the Kimi API are billed separately.** Requests made with a Kimi Open Platform key are charged under Kimi's rules. Check balance and pricing before a short test.

## What you will install

| Item | Purpose | Official entry point |
| --- | --- | --- |
| ChatGPT desktop app (includes Codex) | Optional GUI; availability and login are not guaranteed in mainland China | [Mac download](https://chatgpt.com/download/); Windows via Microsoft Store |
| Codex CLI | Lets CC Switch recognize and manage local Codex configuration; start it once | Prefer CC Switch “Settings → About” |
| CC Switch | GUI for storing the key, selecting K3, and enabling local routing | [Website](https://ccswitch.io/) or [GitHub Releases](https://github.com/farion1231/cc-switch/releases) |
| Kimi Open Platform | Create an API key and view balance and usage | [Platform](https://platform.kimi.com/) |

**An API key is a password, not your Kimi login password. Never show it in chat, screenshots, or public videos.**

## 0. Mainland environment check: do this before adding credit

1. Open [Kimi Open Platform](https://platform.kimi.com/). If its login page loads, continue; otherwise you cannot currently create and use a Kimi Open Platform key through this guide.
2. Open [CC Switch](https://ccswitch.io/) and click Download. Check that the installer really finishes downloading. The project says its website uses Cloudflare distribution and does not depend on the GitHub page being reachable, but this is **not a guarantee for every mainland network**. If it fails, try the [only official repository's Releases](https://github.com/farion1231/cc-switch/releases). If both fail, stop here; do not use unknown file-sharing sites.
3. On Mac, if you want the desktop interface, try [the ChatGPT download page](https://chatgpt.com/download/); on Windows, search ChatGPT in Microsoft Store. Neither entry point is guaranteed to work in mainland China. A successful download does not mean login will work.
4. Record the results: can Kimi open? Did the CC Switch installer finish? Can the ChatGPT entry point open? If the first two work, try the CLI path first; the desktop app is not required.

## A. If you use Mac

### A1. Identify your Mac chip

Click Apple menu `` → About This Mac. If Chip or Processor says `M1/M2/M3/M4/...`, you have **Apple Silicon**; `Intel` means an **Intel Mac**.

### A2. Optional: install the ChatGPT desktop app

Open [https://chatgpt.com/download/](https://chatgpt.com/download/) and choose the Mac version for your chip. Open the downloaded `.dmg` and drag ChatGPT to Applications; for a `.pkg`, follow Continue → Install. Open the app and sign in. If it reports an unsupported region, repeatedly fails to sign in, or cannot connect, stop the desktop-app steps and continue with A3. **Pass condition: the app is installed and you can actually sign in and enter Codex.**

### A3. Install CC Switch

Open [the CC Switch download page](https://ccswitch.io/), or use [Releases](https://github.com/farion1231/cc-switch/releases) if the site is unavailable. Download the package whose filename contains `macOS.dmg`, open it, drag **CC Switch** to Applications, and launch it. **Pass condition: the CC Switch main window is visible and has a Codex tab.**

### A4. Install and start Codex CLI once

1. In CC Switch, open Settings → About and find **Codex**. Click Install if shown; if it says Update or is already installed, do not reinstall it.
2. Open Terminal and run `codex --version`. A version number means it is installed; then run `codex`. If it opens a ChatGPT login screen that you cannot use, exit and retry after sections C and D.
3. Once the Codex input screen appears, enter `/exit` or press `Control + C`. If CC Switch cannot download Codex and Node.js/npm is already installed, you may try:

```bash
npm install -g @openai/codex --registry=https://registry.npmmirror.com
```

This is an npm package mirror and depends on mirror synchronization. Verify with `codex --version`. **Pass condition: `codex --version` prints a version.**

## B. If you use Windows

### B1. Install the ChatGPT desktop app

Open Microsoft Store, search for ChatGPT, verify the publisher, and install it. If the Store cannot find it in your region, skip to B2. You can also run the official documented command in Terminal or PowerShell:

```powershell
winget install --id 9PLM9XGG6VKS -s msstore
```

Open it, sign in, and confirm that Codex is visible. If the Store says the region is unavailable or login reports a region issue, skip this section. Do not change your system region to pretend availability was verified.

### B2. Install CC Switch

Open [the website](https://ccswitch.io/) or [Releases](https://github.com/farion1231/cc-switch/releases). For a regular Windows PC download a filename containing `Windows.msi`; for an ARM computer download `Windows-arm64.msi`. Open the `.msi`, follow Next/Install/Finish, and launch CC Switch from Start. **Pass condition: the main window has a Codex tab.**

### B3. Install and start Codex CLI once

CC Switch → Settings → About → Codex → Install. Open Terminal or PowerShell and run `codex --version`; after a version appears, run `codex`. If the first run requests a login you cannot complete, exit and retry after C and D. **Pass condition: `codex --version` prints a version.**

## C. Both Mac and Windows: create a Kimi key

1. Open [https://platform.kimi.com/](https://platform.kimi.com/) and register or sign in.
2. Find **API Key management** in the console and create a key, for example `Codex-K3`.
3. Copy it immediately and save it in a trusted password manager; some platforms show it in full only once.
4. Check balance, cost, and usage, and confirm that your account can call `kimi-k3`. Kimi web-chat membership and Open Platform API quota are not automatically shared. **Pass condition: you have a new API key and can see its usage or quota in the platform console.**

## D. Connect Kimi K3 in CC Switch

### D1. Add the provider

Open CC Switch → **Codex** → **+** → Add Provider → choose the **Kimi** preset. Because this uses a `platform.kimi.com` Open Platform key, choose **Kimi**, not **Kimi For Coding**. Paste the API key, fetch the model list, choose `Kimi K3` or `kimi-k3`, and set it as default. If `Kimi K2.7 Code` is selected by default, change it to K3. Save. **Pass condition: Kimi appears in the provider list with `kimi-k3` selected.**

### D2. Enable local routing

CC Switch → Settings → Routing → Local Routing. Turn on the routing master switch and the Codex switch; Claude and Gemini are not needed. Return to the Codex provider list and enable Kimi. **Pass condition: local routing is running, Codex routing is on, and Kimi is enabled.** The default local address is `127.0.0.1:15721`; it is your computer's own address, not a browser login site.

### D3. Restart and run two small tests

Keep CC Switch and local routing running, fully quit Codex/ChatGPT, and run `codex` in Terminal. Check `/model` or the top model label for Kimi K3. Enter “Please answer only: connection successful.” Then use an empty test folder and ask Codex to create `hello.txt`, writing “Test successful”, and report the path. Check CC Switch routing records or usage and Kimi platform usage. **All-success condition: the CLI replies, `hello.txt` exists, and CC Switch shows Kimi with a new request record.**

## E. Troubleshooting by symptom

| Symptom | First check |
| --- | --- |
| Desktop app will not open or sign in | Desktop availability is not guaranteed in mainland China; skip it and continue with CLI + Kimi |
| `codex` is not found | Confirm Codex in CC Switch Settings → About; close and reopen Terminal |
| K3 is missing | Update CC Switch, fetch the model list again, and confirm the Open Platform account supports `kimi-k3` |
| `401 Unauthorized` | Is the key complete? Is it from `platform.kimi.com`? Did you choose Kimi rather than Kimi For Coding? |
| `403` or `429` | Check model permission, balance, rate, or concurrency limits |
| `/responses` returns `404` | Check routing master switch, Codex switch, and enabled provider; fully restart Codex |
| You do not know which service answered | Check the active provider and request records; do not infer model identity from the reply alone |
| Configuration keeps changing back | CC Switch manages configuration while routing is enabled; do not also edit `config.toml` |

Record the **original error text** and take screenshots, but hide the API key first. `401`, `403`, `404`, and `429` are more useful for diagnosis than “cannot open”.

## F. Availability boundaries you must know

- Kimi Open Platform is intended for mainland users, but your account's model permission and quota must be confirmed in your own console.
- CC Switch offers a website download and GitHub Releases, but neither guarantees a successful download on your current mainland network.
- Codex CLI can be obtained through CC Switch or npm; successful installation does not mean ChatGPT services are supported in mainland China.
- The OpenAI supported-country list does not include mainland China. Even if the ChatGPT/Codex desktop file downloads, login or service calls may fail. Switching to Kimi does not automatically solve desktop-app login or regional restrictions.
- This guide checks publishing channels and configuration documentation; it did not individually install and test every component on your Shenzhen network or your Mac/Windows device. No one can guarantee that every item downloads in mainland China based only on web information.

## G. Extra software mentioned in videos

Third-party GitHub installer repositories, GitHub accelerators, and system-update tools shown in videos are not required above. Start with the respective OpenAI, Kimi, and CC Switch entry points. If you only connect Codex, there is no need to enable Claude or Gemini routing in CC Switch.

## Sources checked

- OpenAI download and Windows installation: [download](https://chatgpt.com/download/) and [Windows documentation](https://learn.chatgpt.com/docs/windows/windows-app) (the second is for traceability, not required for the steps)
- [Codex CLI](https://learn.chatgpt.com/docs/codex/cli)
- [Kimi official Codex K3 guide](https://platform.kimi.com/docs/guide/codex-kimi)
- [CC Switch installation guide](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/en/1-getting-started/1.2-installation.md)
- [CC Switch Kimi routing guide](https://github.com/farion1231/cc-switch/blob/main/docs/guides/codex-kimi-routing-guide-zh.md)
- [OpenAI supported countries](https://help.openai.com/en/articles/8983035-why-cant-i-sign-up-due-to-unsupported-country)

**Note:** Kimi now supports direct Codex connections through the Responses API. This article chooses the CC Switch path so beginners can manage the key and model in a GUI; CC Switch is a third-party tool and its interface may change by version.
