# hapi-sessions
Sessions plugin for [hapi](https://github.com/hapijs/hapi). It relies on [catbox](https://github.com/hapijs/catbox), so you can use whatever storage for them that catbox provides.
## Example
```javascript
await server.register([
    {
        plugin: require(`./hapi-sessions`),
        options: {
            expiresIn: 3 * 24 * 60 * 60 * 1000,
            password: ``, // 32 symbol password should be passed
            cache: `cache-name`
        }
    }
]);
```
## Options
`expiresIn` TTL for the session cookie and the cache record.
`password` Passowrd for cookie encryption.
`cache` Cache name created within `server.cache`;

The plugin has been made by a total rookie for personal purposes. Any critics are welcome.
