# ICP Tokens dApp

## Quick Start (Run locally)

Install:

- NodeJS 18.\* or higher https://nodejs.org/en/download/
- Internet Computer dfx CLI https://internetcomputer.org/docs/current/developer-docs/setup/install/
- Visual Studio Code (Recommended Code Editor) https://code.visualstudio.com/Download
- VSCode extension - Motoko (Recommended) https://marketplace.visualstudio.com/items?itemName=dfinity-foundation.vscode-motoko

```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

Clone this Git repository:

```bash
git clone git@github.com:ICP-Bulgaria/icp-tokens-dapp.git
```

Open command terminal:
Enter the commands to start dfx local server in background:

```bash
cd icp-tokens-dapp
dfx start --background
```

Note: If you run it in MacOS, you may be asked to allow connections from dfx local server.

Enter the commands to install dependencies, deploy canister and run Next.js dev server:

```bash
npm install
dfx deploy
npm run dev
```

http://localhost:3000/

Cleanup - stop dfx server running in background:

```bash
dfx stop
```

## Project Structure

Internet Computer has the concept of [Canister](https://smartcontracts.org/docs/current/concepts/canisters-code/) which is a computation unit. This project has 1 canister:

- hello_assets (frontend)

Canister configurations are stored in dfx.json.

### Frontend

Frontend code follows Next.js folder convention with /pages storing page React code, /public storing static files including images. This project uses CSS modules for styling which is stored in /ui/styles. React Components are stored in /ui/components

### External dependencies

Laravel API to collect data from standard webserver. In our future versions of this software we will transfer a big part of these dependencies direct to Backend canister written on Motoko

### Backend

Backend code is inside /backend/ written in [Motoko language](https://internetcomputer.org/docs/current/motoko/main/motoko-introduction). Motoko is a type-safe language with modern language features like async/await and actor build-in. It also has [Orthogonal persistence](https://internetcomputer.org/docs/current/motoko/main/motoko/#orthogonal-persistence) which I find very interesting.

## Frontend dev - Next.js Static Code

Next.js developers are familiar with the handy hot code deployed in the Next.js dev environment when making changes in frontend code.

After deploying your backend code as shown above, you can run Next.js local dev server **npm run dev** and edit your frontend code with all the benefits of hot code deploy.

## Deploy and run frontend in local DFX server

In order to simulate the whole Internet Computer experience, you can deploy and run frontend code to local DFX server by running:

```bash
dfx start --background
npm run build
dfx deploy hello_assets
```

**hello_assets** is the frontend canister defined in dfx.json.

**npm run build** builds and export Next.js as static code storing in **/out** folder which would be picked up by **dfx deploy hello_assets** as defined in dfx.json with **/out** as the source.

When it completes, you can open Chrome and browse to:  
http://localhost:8000/?canisterId=[canisterId]

Replace [canisterId] with the hello_assets canister ID which you can find by running:

```bash
dfx canister id hello_assets
```

## Environment Configuration

There are three key configs following Next.js [Environment Variables](https://nextjs.org/docs/basic-features/environment-variables) configuration:

**.env.development** stores configs for use in local dev.

```
NEXT_PUBLIC_IC_HOST=http://localhost:8000
```

**.env.production** is used when building and exporting static code using **npm run build**

```
NEXT_PUBLIC_IC_HOST=http://localhost:8000
```

Notice both files are identical if we want the Next.js dapp to interact with the local dfx server.

Note **NEXT_PUBLIC** is the prefix used by Next.js to make env vars available to client side code through [build time inlining](https://nextjs.org/docs/basic-features/environment-variables).

**.env.icprod** is included for deployment to Internet Computer ic network which would be covered below.