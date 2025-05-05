# LUKSO-MCP-Schemas

**LUKSO-MCP-Schemas** is a community-driven repository that collects and provides **schema files** for projects built on the [LUKSO Blockchain](https://lukso.network). It leverages the [FlowMCP framework](https://github.com/a6b8/FlowMCP) to structure and expose project APIs in a way that is AI-friendly and accessible across multiple interfaces.

---

## 🎯 Purpose

The goal of this project is to simplify interactions with LUKSO-based projects for AI systems. By using **FlowMCP schemas**, APIs are normalized and made accessible via text-based interfaces like chatbots, CustomGPTs, or automation pipelines.

---

## 🛠 Supported Technologies

Schemas in this repository allow API interaction through:

- **REST APIs**
- **Node.js modules**
- **ethers.js** / **web3.js**

---

## 🧩 What Is a Schema?

A schema is a structured description of an API or blockchain functionality within a LUKSO project. It contains:

- Route definitions (`GET`, `POST`)
- Validated parameters (via Zod)
- Test cases
- Pre/Post modifiers for data processing
- Metadata for grouping and filtering

> 🔍 **Complex queries are supported** — including dynamic routes, input transformations, or fully custom execution logic using `modifiers.execute`. This makes it possible to support advanced use cases like wallet analysis, on-chain relationships, or token history tracking.

See the [FlowMCP GitHub Repository](https://github.com/a6b8/flowMCP) for more information and usage examples.

---

## ⚡ Quickstart

To use this repository with Claude, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/lukso-mcp-schemas.git
   cd lukso-mcp-schemas
````

2. **Install dependencies (if required by your schema files):**

   ```bash
   npm install
   ```

3. **Connect to Claude with the following configuration:**

   In your Claude config file (e.g. `claude.config.json`):

   ```json
   {
     "globalShortcut": "",
     "mcpServers": {
       "LUKSO-MCP": {
         "command": "node",
         "args": [
           "./path/to/your/lukso-mcp.mjs",
           "--launched-by=claude",
           "--includeNamespaces=",
           "--excludeNamespaces=",
           "--activateTags="
         ],
         "env": {}
       }
     }
   }
   ```

4. **Run Claude with this configuration to start interacting with the schemas.**

---

## 🤖 AI Integration

Thanks to FlowMCP, AIs like ChatGPT or Claude can interact with these APIs using a standardized structure. This allows them to select appropriate tools from a shared schema pool, simplifying even complex blockchain queries.

You can use the interactive [Schema Generator 1.2](https://chatgpt.com/g/g-68066f63ac3c8191aa790ef47f100015-flowmcp-schema-generator-1-2-0) to create schemas quickly — just copy and paste.

---

## 💡 Contributions Welcome!

Are you building something on the LUKSO Blockchain? Submit your schema and make your project AI-compatible!

1. Fork this repository.
2. Add your schema to `/schemas/<your_project>.mjs`.
3. Submit a pull request.

---

## 🔗 Related Resources

* [FlowMCP GitHub Repository](https://github.com/a6b8/flowMCP)
* [Model Context Protocol](https://modelcontext.org)
* [LUKSO Blockchain](https://lukso.network)
* [Official FlowMCP Schema Library](https://github.com/a6b8/flowMCP-schemas)

---

## 📜 License

This project is licensed under the MIT License. Contributions are welcome!

```