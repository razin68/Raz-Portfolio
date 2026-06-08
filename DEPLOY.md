# Deploying ahmedrazin.me

The site is a Next.js static export hosted on DreamHost. CI deploys the
prebuilt `out/` folder over SSH whenever it changes on `main`.

## One-time setup

1. **Create the GitHub repo** and push:
   ```
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

2. **Make a deploy SSH key** (no passphrase so CI can use it):
   ```
   ssh-keygen -t ed25519 -C "github-deploy" -f deploy_key -N ""
   ```
   - Add `deploy_key.pub` to DreamHost (Panel → Users → your shell user → SSH key,
     or append it to `~/.ssh/authorized_keys` on the server).
   - Keep `deploy_key` (private) for the GitHub secret below. Do not commit it.

3. **Add GitHub Actions secrets** (repo → Settings → Secrets and variables → Actions):
   | Secret | Value |
   |---|---|
   | `DEPLOY_HOST` | DreamHost server hostname (Panel → Users) |
   | `DEPLOY_USER` | DreamHost shell username |
   | `DEPLOY_PATH` | web root for the domain, e.g. `/home/<user>/ahmedrazin.me/` (trailing slash) |
   | `DEPLOY_SSH_KEY` | full contents of the private `deploy_key` |

   The deploy uses `rsync --delete`, so `DEPLOY_PATH` must be the site's web root.

4. In DreamHost, enable HTTPS (Panel → Secure Hosting → free Let's Encrypt).

## Updating the live site

```
npm run build          # regenerates out/
git add -A
git commit -m "Update site"
git push               # GitHub Action uploads out/ to DreamHost
```

You can also trigger a deploy manually from the repo's **Actions** tab
(Deploy to DreamHost → Run workflow).
