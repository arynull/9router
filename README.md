# 9router on Faable

Runs the 9router gateway (npm package `9router`, pinned) as a Faable Deploy app.

`start.js` launches the 9router CLI headless on the platform-assigned `$PORT`, bound to `0.0.0.0`, with its data directory under `data/` in the app workspace.

Set the dashboard password before the first deploy by adding an `INITIAL_PASSWORD` secret to the app; the gateway uses it to seed its auth database on first boot.
