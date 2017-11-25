const uuid = require(`uuid`);
const Boom = require(`boom`);
const Hoek = require(`hoek`);

module.exports.plugin = {
    name: `hapi-sessions`,
    register: async function (server, options) {
        const sessionsCache = server.cache({
            segment: `sessions`,
            expiresIn: options.expiresIn,
            generateFunc: async function (id, flags) {
                flags.ttl = options.expiresIn;
                return {};
            },
            generateTimeout: 5000,
            cache: options.cache
        });
        
        server.state(`session`, {
            isSecure: options.isSecure,
            isHttpOnly: options.isHttpOnly,
            ttl: options.expiresIn,
            path: `/`,
            encoding: `iron`,
            password: options.password
        });
        
        server.decorate(`request`, `sessionsCache`, sessionsCache);
        
        server.decorate(`request`, `session`, function (request) {
            return {
                set: async (value) => {
                    return sessionsCache.set(request.state.session, value);
                },
                addOrChange: async (value) => {
                    return sessionsCache.set(request.state.session, Hoek.merge(await sessionsCache.get(request.state.session), value, true, false));
                },
                get: async () => {
                    return sessionsCache.get(request.state.session);
                }
            };
        }, { apply: true });

        server.ext(`onPreAuth`, async function (request, h) {
            let session = request.state.session;
            if (!request.state.session) {
                session = uuid.v4();
            }

            try {
                await sessionsCache.get(session);
            } catch (error) {
                throw Boom.badImplementation();
            }

            h.state(`session`, session);
            return h.continue;
        });
    },
    once: true
};