# www.solarCollector
A Quasar/Vue frontend for my solarCollector project.<br />
The project uses MQTT to transmit data from my Victron Energy CCGX to a Node.js server using websockets. This data is then sent again through websockets to the frontend.<br />
A demo to the frontend for this project can be found [here](https://www.solar.mc.hzuccon.com/#/demo)<br />
The demo channel and password are 'demo'.
- [MQTT SolarCollector](https://github.com/harvmaster/SolarCollector)
- [Backend SolarCollector](https://github.com/harvmaster/api.solarCollector)

## Installation
```bash
git clone git@github.com:harvmaster/www.solarCollector.git
cd www.solarCollector
npm install
quasar dev
```
