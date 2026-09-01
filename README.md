# Volatiles in Deep Planets — Front End

Front-end application for the Volatiles in Deep Planets (VDP) database.

VDP is developed and maintained as an independent ZJU project. This repository
was derived from the ZJUEarthData High-T Geochemistry Database front end and
retains its Git history for provenance.

Production website: https://volatiles-in-deep-planets.top/

## Technology

- Vue 2
- Vue CLI 5
- Element UI
- Axios

## Development

Install dependencies:

```bash
npm ci
```

Start the local development server:

```bash
npm run serve
```

Create a production build:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

Generated production files are written to `build/dist/` and are not committed
to the source repository.

## Repository Structure

```text
public/                 Static public assets
src/                    Vue application source code
build/nginx.conf        Nginx configuration used for deployment
build/dist/             Generated production files, not tracked by Git
.github/workflows/      GitHub Actions workflows
```

## Deployment

The deployment workflow is currently manual-only.

Before enabling automatic production deployment:

1. Review the GitHub Actions workflow.
2. Configure repository secrets.
3. Confirm the Alibaba Cloud server paths.
4. Confirm the Nginx deployment and rollback procedure.
5. Test the production build before release.

Never commit server passwords, SSH keys, database credentials, access tokens,
or other secrets.