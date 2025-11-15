---
title: How to install legacy-peer-deps while deploying in vercel
description: >-
  how to tell vercel to install legacy-peer-deps while deploying your
  application
date: 2025-11-15T00:00:00.000Z
author: Izzaz
tags:
  - vecel
  - legacy-peer-deps
slug: how-to-install-legacy-peer-deps-while-deploying-in-vercel
---

The most simple way to let vercel know that you want to install an npm package with legacy dependencies while deploying it to vercel it by doing the following:

Step 1. Create a file and named it `.npmrc`  in the root folder of your project.

Step 2. Inside it add this line:

```
legacy-peer-deps=true
```

This simple code will do the following:

➡️ Vercel will automatically read this.

➡️ This forces all installs (local + Vercel) to use legacy peer deps.
