# M1 Adventures

## Out of the box:

**Environment**

- node version v16.15.1
- npm version v8.11.0

**Steps**

- `npm install`
- `cd ios && pod install && cd ../`
- `npm run ios`

**Build**

Build fails with the following [error](./errors/node16.txt)

## Second attempt:

**Environment**

- node version v15.14.0
- npm version v7.7.6

**Steps**

- `npm install`
- `cd ios && pod install && cd ../`
- `npm run ios`

**Build**

Build succeeds.

`doSodium`, `doCrypto`, and `doDHT` work (after fixing `EventEmitter.off()`)

**Issues**

- `EventEmitter.off()` is not a function, so an error throws on `dht.ready()`. I solved this by manually change all `off()` to `removeListener()` in the `@hyperswarm/dht-relay` in `node_modules`.

- Hyperswarm discovery fails throwing this [error](./errors/swarmiter.txt) in the debugger or in the console.

- `URL.hostname` is not available in RN, but easily solved.

- `doSlashtag` works fine after `EventEmitter.off()` is fixed. But fails to connect, because of the same error as above in Hyperswarm, only that it thrown in an non-awaited promise.
