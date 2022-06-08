# M1 Adventures

## Third attempt (Rosetta + exclude arm64 + comment flipper):

**Environment**

- node version v16.15.1
- npm version v8.11.0

**Steps**

- `npm install`
- `cd ios && rm -rf ~/Library/Caches/CocoaPods && rm -rf Pods && rm -rf ~/Library/Developer/Xcode/DerivedData/* && pod deintegrate && pod setup && pod install && cd ../`
- `npm run ios`

**Build**

Build succeeds.

`doSodium`, `doCrypto`, and `doDHT` work (after installing `events`).

**Issues**

- Hyperswarm discovery fails throwing this [error](./errors/swarmiter.txt) in the debugger or in the console.

- `doSlashtag` works fine But fails to connect, because of the same error as above in Hyperswarm, only that it thrown in an non-awaited promise.
