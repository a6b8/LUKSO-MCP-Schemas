const schema = {
    namespace: "gridartist",
    name: "Authentication and Profile Update API",
    description: "Handles Ethereum-based login requests and profile script updates.",
    docs: ["http://localhost:3000/api"],
    tags: ["development", "authentication", "profile"],
    flowMCP: "1.2.0",
    root: "http://localhost:3000",
    requiredServerParams: [],
    headers: {},
    routes: {
        requestAuth: {
            requestMethod: "POST",
            description: "Initiates an authentication request using a wallet address.",
            route: "/api/auth-request",
            parameters: [
                { position: { key: "address", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Send authentication request", address: "0xabc123456789abcdef123456789abcdef1234567" }
            ],
            modifiers: []
        },
        updateProfileScript: {
            requestMethod: "POST",
            description: "Updates the profile script for a user.",
            route: "/api/0xProfileAddress/update-script",
            parameters: [
                { position: { key: "script", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Update profile with simple HTML", script: "<html><body>Hello</body></html>" }
            ],
            modifiers: []
        }
    },
    handlers: {}
};


export { schema }
