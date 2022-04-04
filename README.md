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

#### ngrok tunelling

ngrok http -auth="tazo90:pass" -region eu 3000

#### Mobile debugging (remote)

1. Make sure that firewall (ESET antivirus) is turned off
2. Set IP_ADDRESS=<ip_address> of your device in .env
3. Connect phone with your computer via usb
4. Go to chrome://inspect/#devices
5. Wait until your phone will be found
6. Allow USB debugging on your phone via notification
7. Type website address on computer or mobile phone
