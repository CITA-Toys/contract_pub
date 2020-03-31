# CITA Testnet Faucet

## Project Introduction

The project is based on Node.js and Koa.js development

Test tokens for the developer's CITA test chain ( [http://node.citahub.com](http://node.citahub.com/) )

[Project address](https://dapp.citahub.com/faucet/) : <https://dapp.citahub.com/faucet/>

[Github repository address](https://github.com/citahub/cita-testnet-faucet.git) : <https://github.com/citahub/cita-testnet-faucet.git>

### Get test tokens

- After accessing the [page](https://dapp.citahub.com/faucet/) , enter the account address and the correct verification code for the test token.
- Then click the Get Testnet Token button, the background server will automatically transfer 10,000 tokens to the specified address (10^22 quota)

> Sign in with the Cyton wallet to automatically enter your account address

## Deployment process

### Download project

```
git clone https://github.com/citahub/cita-testnet-faucet.git
```

### Installation dependency

#### Switch to the project root directory

```
cd cita-testnet-faucet
```

#### Installation dependency

```
yarn install
```

#### Set the .env variable

Set the appropriate parameters based on the contents of .env.example

- CHAIN
  - Chain address, complete protocol required, host, port
- PRIVATE_KEY
  - Private key of the currency address
- APP_SESSION_KEY
  - Cookie key, random string
  - Length greater than 0
- APP_KEYS
  - app keys, a plurality of random string using `,`spaced
  - Set at least one string longer than 0
- TRANSFER_COUNT
  - The amount of a single transfer, hexadecimal number, in quotea
  - The default is `0x021e19e0c9bab2400000`

### Startup project

#### Method 1: pm2 startup project

Pm2 requires a global installation,

If pm2 already installed (you can enter `pm2`to confirm whether the installation), do not need to execute the next instruction

```
yarn global add pm2
```

Start project with pm2

```
pm2 start
```

#### Method 2: docker launch project

1. Start the docker daemon
2. Terminal performs `yarn run docker:build`Construction mirroring
3. Terminal performs `yarn run docker:run`Run docker container, the service runs by default on port 8095

### Management project

For more details, please refer to the [official](http://pm2.keymetrics.io/docs/usage/process-management/) pm2 [documentation.](http://pm2.keymetrics.io/docs/usage/process-management/)

#### Suspend project

```
pm2 stop cita_testnet_faucet
```

#### Restart project

```
pm2 reload cita_testnet_faucet
```

#### Startup project

```
pm2 start cita_testnet_faucet
```

#### Delete item

After executing the following command need to re-enter into the project root directory `pm2 start`to restart

```
pm2 delete cita_testnet_faucet
```

#### List all items

```
pm2 list
```

## Development related

### Startup project

After downloading the project and installing the dependencies, execute the following command to start the project watch mode.

```
yarn start:watch
```

Automatically restart the project after changing the code

### Directory and file description

`/docs` Related documents

`/public` In the static file, the front end needs to use scripts, styles, pictures, etc.

`/src` Is the main file of the program

`/src/config` Medium is the basic configuration of the project

`/src/controllers` In the middle of each file corresponds to different pages, control the content and interaction of the page, etc.

`/src/log` Is the encapsulation of console.log

`/src/routes` Is the configuration of the route

`/src/utils` In the middle are some functions, such as some packages that interoperate with the chain.

`/src/views` Is the Pug template engine file, generating front-end html information

`/src/index.js` Is the entry file for the project, which contains the configuration for koa

### Related documents

[Koa.js](https://koa.bootcss.com/)

[Pug](https://pugjs.org/api/getting-started.html)
