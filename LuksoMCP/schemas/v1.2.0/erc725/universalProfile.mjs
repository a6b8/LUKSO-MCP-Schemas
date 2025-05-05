import { ERC725 } from '@erc725/erc725.js'

const erc725_schema = [
  { name: 'SupportedStandards:LSP3Profile', key: '0xeafec4d89fa9619884b600005ef83ad9559033e6e941db7d7c495acdce616347', keyType: 'Mapping', valueContent: '0x5ef83ad9', valueType: 'bytes' },
  { name: 'LSP3Profile', key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5', keyType: 'Singleton', valueContent: 'VerifiableURI', valueType: 'bytes' },
  { name: 'LSP1UniversalReceiverDelegate', key: '0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47', keyType: 'Singleton', valueContent: 'Address', valueType: 'address' },
  { name: 'LSP3IssuedAssets[]', key: '0x3a47ab5bd3a594c3a8995f8fa58d0876c96819ca4516bd76100c92462f2f9dc0', keyType: 'Array', valueContent: 'Address', valueType: 'address' },
]

export const schema = {
  namespace: "luksoNetwork",
  name: "ERC725UniversalProfile",
  description: "Minimal schema for reading Universal Profile data via getData and fetchData",
  docs: ["https://github.com/ERC725Alliance/erc725.js", "https://docs.lukso.tech/learn/overview"],
  tags: [],
  flowMCP: "1.2.0",
  root: "https://rpc.--chain--.lukso.network",
  requiredServerParams: [],
  headers: {},
  routes: {
    readProfileData: {
      requestMethod: "GET",
      description: "Calls getData() to retrieve full profile data",
      route: "/",
      parameters: [
        { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
        { position: { key: "address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } }
      ],
      tests: [
        { _description: "Full getData() from testnet", address: "0x7b2C957209897bc4423162e57D8C3CA863DCfBCc", chainName: "LUKSO_TESTNET" },
        { _description: "Full getData() from mainnet", address: "0x7b035f7cDBB0e44E52722dd2e89917232908e962", chainName: "LUKSO_MAINNET" }
      ],
      modifiers: [
        { phase: "pre", handlerName: "modifyQuery" },
        { phase: "execute", handlerName: "readProfileData" },
        { phase: "post", handlerName: "getDataPost" }
      ]
    },
    fetchProfileMetadata: {
      requestMethod: "GET",
      description: "Calls fetchData() to retrieve LSP3Profile metadata",
      route: "/",
      parameters: [
        { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
        { position: { key: "address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } }
      ],
      tests: [
        { _description: "fetchData() with LSP3Profile from testnet", address: "0x7b2C957209897bc4423162e57D8C3CA863DCfBCc", chainName: "LUKSO_TESTNET" },
        { _description: "fetchData() with LSP3Profile from mainnet", address: "0x7b035f7cDBB0e44E52722dd2e89917232908e962", chainName: "LUKSO_MAINNET" }
      ],
      modifiers: [
        { phase: "pre", handlerName: "modifyQuery" },
        { phase: "execute", handlerName: "fetchProfileMetadata" },
        { phase: "post", handlerName: "getDataPost" }
      ]
    },
    getUniversalReceiverAddress: {
      requestMethod: "GET",
      description: "Calls getData() to retrieve LSP1UniversalReceiverDelegate address",
      route: "/",
      parameters: [
        { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
        { position: { key: "address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } }
      ],
      tests: [
        { _description: "getData() LSP1UniversalReceiverDelegate on testnet", address: "0xFF7E89acaBce3ed97Ed528288D3b8F113557A8c8", chainName: "LUKSO_TESTNET" },
        { _description: "getData() LSP1UniversalReceiverDelegate on mainnet", address: "0x7b035f7cDBB0e44E52722dd2e89917232908e962", chainName: "LUKSO_MAINNET" }
      ],
      modifiers: [
        { phase: "pre", handlerName: "modifyQuery" },
        { phase: "execute", handlerName: "getUniversalReceiverAddress" },
        { phase: "post", handlerName: "getDataPost" }
      ]
    }
  },
  handlers: {
    modifyQuery: async ({ struct, payload, userParams }) => {
      const alias = { 'LUKSO_MAINNET': 'mainnet', 'LUKSO_TESTNET': 'testnet' }
      payload.url = payload.url.replace('--chain--', alias[userParams.chainName])
      return { struct, payload }
    },
    readProfileData: async ({ struct, payload, userParams }) => {
      const myERC725 = new ERC725(erc725_schema, userParams.address, payload.url)
      try { struct.data = await myERC725.getData() }
      catch (e) { struct.messages.push(e?.message) }
      struct.status = struct.messages.length === 0
      return { struct, payload }
    },
    fetchProfileMetadata: async ({ struct, payload, userParams }) => {
      const myERC725 = new ERC725(erc725_schema, userParams.address, payload.url)
      try { struct.data = await myERC725.fetchData('LSP3Profile') }
      catch (e) { struct.messages.push(e?.message) }
      struct.status = struct.messages.length === 0
      return { struct, payload }
    },
    getUniversalReceiverAddress: async ({ struct, payload, userParams }) => {
      const myERC725 = new ERC725(erc725_schema, userParams.address, payload.url)
      try { struct.data = await myERC725.getData('LSP1UniversalReceiverDelegate') }
      catch (e) { struct.messages.push(e?.message) }
      struct.status = struct.messages.length === 0
      return { struct, payload }
    },
    getDataPost: async ({ struct, payload }) => {
      if (struct.status) {
        // struct.data = Object.entries(struct.data).reverse().reduce((acc, [k, v]) => { acc[k] = v; return acc }, {})
      }
      return { struct, payload }
    }
  }
}
