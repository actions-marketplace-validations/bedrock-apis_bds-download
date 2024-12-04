## Description

This GitHub Action downloads BDS (Bedrock Dedicated Server) and extracts its contents into a provided directory. It simplifies the process of setting up and managing Minecraft Bedrock Dedicated Servers, making it easier to automate and integrate into your CI/CD pipelines. **Supports only Windows and Linux.** Versions can be specified as `latest` or as a specific version.

## Usage

```yaml
name: "Download BDS Action Example"

on:
  push:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Download and extract BDS
      uses: bedrock-apis/bds-download@v1
      with:
        out_dir: 'bds_bin'
        version: 'latest'
        use_preview: false
```

## Inputs

| Input        | Description                                                    | Required | Default   |
|--------------|----------------------------------------------------------------|----------|-----------|
| `out_dir`    | Directory for BDS installation                                 | true     | `bds_bin` |
| `version`    | Specific BDS version or tag (latest)                           | true     | `latest`  |
| `use_preview`| Whether to use preview or stable version (preview when `true`) | true     | `false`   |

## Outputs

This action does not produce any outputs, (just the BDS files).

## Example Workflow

```yaml
name: "Test BDS Download"

on:
  workflow_dispatch:

jobs:
  main-job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Download BDS
        uses: bedrock-apis/bds-download@v1
        with:
            out_dir: "bin"
            version: 1.21.40.25
            use_preview: true

      - name: List BDS directory contents
        run: ls -R bds_bin
```

## Author

This action was created by [ConMaster2112](https://github.com/ConMaster2112).