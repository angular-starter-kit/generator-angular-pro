# Updating npm dependencies

- Install update tool (if not already done)
```sh
npm install -g npm-check-updates
```

- Check outdated packages
```sh
npm-check-updates 
```

- Update packages in `package.json`
```sh
npm-check-updates -u
```

- Update local packages regarding `package.json`
```sh
npm udpate
```

# Updating bower libraries

- Install update tool (if not already done)
```sh
npm install -g npm-check-updates
```

- Check outdated packages
```sh
npm-check-updates -m bower
```

- Update packages in `bower.json`
```sh
npm-check-updates -u -m bower
```

- Update local packages regarding `package.json`
```sh
bower update
```

## Locking package versions

- Lock down version using `npm-shrinkwrap.json`
```sh
npm shrinkwrap --dev
```
