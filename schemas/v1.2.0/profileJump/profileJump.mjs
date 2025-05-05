export const schema = {
    namespace: "profilejump",
    name: "ProfileJump",
    description: "Schema for interacting with the ProfileJump API",
    docs: ["https://profilejump.com"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://api.profilejump.com",
    requiredServerParams: [],
    headers: {
      Referer: "https://profilejump.com/"
    },
    routes: {
      prices: {
        requestMethod: "GET",
        description: "Fetch price data",
        route: "/api/prices",
        parameters: [],
        tests: [{ _description: "Fetch default prices" }],
        modifiers: [{ phase: "post", handlerName: "modifyResult" }]
      },
      hotProfiles: {
        requestMethod: "GET",
        description: "Fetch hot profiles",
        route: "/api/profiles/hot-profiles",
        parameters: [],
        tests: [{ _description: "Fetch trending profiles" }],
        modifiers: [{ phase: "post", handlerName: "modifyResult" }]
      },
      tokensList: {
        requestMethod: "GET",
        description: "Fetch list of tokens with pagination",
        route: "/api/tokens-list",
        parameters: [
          { position: { key: "limit", value: "100", location: "query" } },
          { position: { key: "offset", value: "0", location: "query" } }
        ],
        tests: [{ _description: "Fetch tokens list" }],
        modifiers: [{ phase: "post", handlerName: "modifyResult" }]
      },
      profilesList: {
        requestMethod: "GET",
        description: "Fetch list of profiles filtered by view",
        route: "/api/profiles-list",
        parameters: [
          { position: { key: "limit", value: "100", location: "query" } },
          { position: { key: "offset", value: "0", location: "query" } },
          { position: { key: "view", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(social,wealth)", options: [] } }
        ],
        tests: [
          { _description: "Fetch social view", view: "social" },
          { _description: "Fetch wealth view", view: "wealth" }
        ],
        modifiers: [{ phase: "post", handlerName: "modifyResult" }]
      },
      profileByAddress: {
        requestMethod: "GET",
        description: "Fetch profile details by wallet address",
        route: "/api/profiles/:address",
        parameters: [
            { position: { key: "address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } }
        ],
        tests: [
            { _description: "Valid address profile fetch", address: "0x02e2ae57Ed6058e41F19C402173939d99ecC05C3" }
        ],
        modifiers: [
            { phase: "post", handlerName: "modifyResult" }
        ]
      }
    },
    handlers: {
      modifyResult: async ({ struct, payload }) => {
        return { struct, payload };
      }
    }
  };
  