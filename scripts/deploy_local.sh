dfx deps deploy;
dfx deploy backend_core;
dfx generate backend_core;
dfx deploy portfolio;
dfx generate portfolio;
npm run dev;