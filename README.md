## Business Radar UI

### Embeeded widgets

All widgets are inside `/widgets` package.

Webpack config and dedicated tsconfig.json is in `/widgets/config/`

#### Build widgets

1. To build your widgets run:

`npm run build:widgets`

2. Bundled widgets will goes to

`public/static/widgets`

3. You can get access to them using

`http://localhost:3000/static/widgets/simple-map.js`

#### Run local server

npm run dev -- -H 192.168.0.104
