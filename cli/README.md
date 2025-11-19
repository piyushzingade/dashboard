# NexUI Dashboard CLI

A CLI tool to scaffold the NexUI Dashboard.

## Installation

You can use this CLI directly with `npx`:

```bash
npx nexui-dashboard-cli [project-name]
```

Or install it globally:

```bash
npm install -g nexui-dashboard-cli
nexui-dashboard-cli [project-name]
```

## Usage

1.  Run the CLI:
    ```bash
    npx nexui-dashboard-cli my-dashboard
    ```
2.  Navigate to the project:
    ```bash
    cd my-dashboard
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

## Publishing (For Maintainers)

To publish this package to the NPM registry:

1.  Login to NPM:
    ```bash
    npm login
    ```
2.  Sync the latest template:
    ```bash
    npm run sync
    ```
3.  Publish:
    ```bash
    npm publish --access public
    ```
    (This will make the package publicly available on the NPM registry).
