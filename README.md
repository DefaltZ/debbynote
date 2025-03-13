# Debbynote
version 0.0.1

**✍️ Note taking software for debators by debators**

Debbynote utilises custom markdown syntax to make notetaking for speakers and adjudicators easier, extended syntax highlights arguments, rebuttals and auto-blockquotes speaker positions such as PM and DPM speeches. Can be utilised for British Parliamentary, Asian Parliamentary and Conventional Debating formats.

Debbynote (white mode)
![Debbynote white mode](/assets/debbynote%20white%20mod.png)

Debbynote (dark mode)
![Debbynote dark mode](/assets/debbynote%20dark%20mode.png)

## 🔎 Syntax list
**general**
1. !r to highlight a rebuttal
2. !a to highlight an argument
3. !wb to highlight a worldbuilding point

**speaker specific - British Parliamentary**
1. !og1 to create custom blockquote of Opening Government 1st speaker
2. !og2 to create custom blockquote of Opening Government 2nd speaker
3. !oo1 to create custom blockquote of Opening Opposition 1st speaker
4. !oo2 to create custom blockquote of Opening Opposition 2nd speaker
5. !cg1 to create custom blockquote of Closing Government 1st speaker 
6. !cg2 to create custom blockquote of Closing Government 2nd speaker
7. !co1 to create custom blockquote of Closing Opposition 1st speaker
8. !co2 to create custom blockquote of Closing Oppositio 2nd speaker

**speaker specific - Asian Parliamenatary** 
1. !pm to create custom blockquote of PM's speech
2. !dpm to create custom blockqyite of DPM's speech
3. !gwhip to create custom blockquote of Gov whip's speech

## ⬇️ How to download and use this software

Currently, as of this date, there is no executables or github releases in the repository yet, which means the only way to download and use Debbynote is git pulling this repo and building from source. 

**Prerequisites:**
1. Nodejs version 18+
2. Rust and Cargo (latest stable version)
3. Git

**Build Instructions:**

1. Clone the repository
```bash
git clone https://github.com/yourusername/debbynote.git
cd debbynote
```

2. Install dependencies
```bash
npm install
```

3. Build the application
```bash
npm run tauri build
```

The built application will be available in the `src-tauri/target/release` directory. You can find the following:
- For macOS: `.dmg` installer or `.app` bundle
- For Windows: `.msi` installer or `.exe` executable
- For Linux: `.deb`, `.rpm`, or AppImage formats

**Development Setup:**

If you want to run the application in development mode:
```bash
npm run tauri dev
```
This will start the application in development mode with hot-reload enabled.


## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)


## ❗️List of issues (as of 13/03/2025):
1. Broken custom blockquote in some of the British Parliamentary syntax highlights
2. Not all APD speaker blockquotes are finished
3. The toggle darkmode button is not in the best place
4. Colors in darkmode are non optimised to eye comfort
5. File save option was broken - hence removed
6. Need to add github releases

