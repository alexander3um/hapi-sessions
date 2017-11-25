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
- `expiresIn` TTL for the session cookie and the cache record.
- `password` Passowrd for cookie encryption.
- `cache` Cache name created within `server.cache`.
- `isSecure`, `isHttpOnly` the same as in server.state options.
## API
- `request.session.get()` – gets the session data, stored in cache.
- `request.session.set(value)` – sets the session data.
- `request.session.addOrChange(value)` – use only when the session data stored as an object. It merges passed object with stored in session one.
- `request.sessionsCache` – a link to a catbox policy with all the sessions. You can take the session id from `request.state.session`.

The plugin has been made by a total rookie for personal purposes. Any critics are welcome.
