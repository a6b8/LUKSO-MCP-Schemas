export const schema = {
    namespace: "luksoNetwork",
    name: "Contract",
    description: "API for interacting with smart contract metadata and state on LUKSO chains.",
    docs: ["https://explorer.execution.mainnet.lukso.network/api-docs", "https://explorer.execution.testnet.lukso.network/api-docs"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://explorer.execution.--chain--.lukso.network/api",
    requiredServerParams: [],
    headers: {},
    routes: {
      listcontracts: {
        requestMethod: "GET",
        description: "List sorted contracts, optionally filtered.",
        route: "/",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "module", value: "contract", location: "query" } },
          { position: { key: "action", value: "listcontracts", location: "query" } },
          { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
          { position: { key: "offset", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
          { position: { key: "filter", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(verified,unverified,empty,1,2,3)", options: ["optional()"] } },
          { position: { key: "verified_at_start_timestamp", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
          { position: { key: "verified_at_end_timestamp", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } }
        ],
        tests: [
            { _description: "List verified contracts", chainName: "LUKSO_MAINNET", page: 1, offset: 10, filter: "verified" }
        ],
        modifiers: [
          { phase: "pre", handlerName: "modifyQuery" },
          { phase: "post", handlerName: "defaultHandler" }
        ]
      },
      getabi: {
        requestMethod: "GET",
        description: "Get ABI for a verified contract.",
        route: "/",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "module", value: "contract", location: "query" } },
          { position: { key: "action", value: "getabi", location: "query" } },
          { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
            { _description: "Get ABI for known address", chainName: "LUKSO_MAINNET", address: "0xd9db270c1b5e3bd161e8c8503c55ceabee709552" }
        ],
        modifiers: [
          { phase: "pre", handlerName: "modifyQuery" },
          { phase: "post", handlerName: "defaultHandler" }
        ]
      },
      getsourcecode: {
        requestMethod: "GET",
        description: "Get contract source code.",
        route: "/",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "module", value: "contract", location: "query" } },
          { position: { key: "action", value: "getsourcecode", location: "query" } },
          { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
            { _description: "Fetch source code for contract", chainName: "LUKSO_MAINNET", address: "0xd9db270c1b5e3bd161e8c8503c55ceabee709552" }
        ],
        modifiers: [
          { phase: "pre", handlerName: "modifyQuery" },
          { phase: "post", handlerName: "defaultHandler" }
        ]
      },
      getcontractcreation: {
        requestMethod: "GET",
        description: "Get contract creator and creation tx hash.",
        route: "/",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "module", value: "contract", location: "query" } },
          { position: { key: "action", value: "getcontractcreation", location: "query" } },
          { position: { key: "contractaddresses", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
            { _description: "Get creation data for contracts", chainName: "LUKSO_MAINNET", contractaddresses: "0xd9db270c1b5e3bd161e8c8503c55ceabee709552" }
        ],
        modifiers: [
          { phase: "pre", handlerName: "modifyQuery" },
          { phase: "post", handlerName: "defaultHandler" }
        ]
      }
    },
    handlers: {
        modifyQuery: async ({ struct, payload, userParams }) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" };
            payload['url'] = payload['url']
                .replace("--chain--", alias[userParams.chainName]);
            return { struct, payload }
          },
        defaultHandler: async ( { struct, payload } ) => {
            if( struct['data']?.message !== 'OK' ) {
                struct['messages'].push( struct['data']?.message )
                struct['status'] = false
            } else if( typeof struct['data']?.message ) {
                struct['data'] = struct['data']?.result
            }
            return { struct, payload }
        }
    }
  };
  