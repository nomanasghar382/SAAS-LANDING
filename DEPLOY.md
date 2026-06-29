# Deploy SellPilot AI to Vercel (Go Live)

Your repo: **https://github.com/nomanasghar382/SAAS-LANDING**

Follow these steps exactly. Takes about **10 minutes**.

---

## Step 1 — Create Vercel account

1. Go to **https://vercel.com/signup**
2. Click **Continue with GitHub**
3. Login with account: **nomanasghar382**
4. Allow Vercel to access your repositories

---

## Step 2 — Import your project

1. Go to **https://vercel.com/new**
2. Find **SAAS-LANDING** in the list
3. Click **Import**
4. Settings (leave defaults):
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (if repo root has package.json)
   - **Build Command:** `npm run build`
   - **Output:** default

> **If your GitHub repo has nested folders:** set Root Directory to `SAAS LANDING` only if package.json is inside a subfolder. For **nomanasghar382/SAAS-LANDING**, package.json is at the root — leave as `./`.

---

## Step 3 — Add environment variables (IMPORTANT)

Before clicking Deploy, expand **Environment Variables** and add:

| Name | Value |
|------|--------|
| `AUTH_SECRET` | Paste a random secret (see below) |
| `NEXT_PUBLIC_APP_NAME` | `SellPilot AI` |

### Generate AUTH_SECRET

On your PC (PowerShell):

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
```

Copy the output and paste as `AUTH_SECRET`.

Or use any random string **at least 32 characters**, e.g.:
```
SellPilot2026_Ehsan_Secret_Key_ChangeThis_32chars
```

---

## Step 4 — Deploy

1. Click **Deploy**
2. Wait 2–4 minutes
3. You'll get a URL like: `https://saas-landing-xxxxx.vercel.app`

---

## Step 5 — Update app URL (after first deploy)

1. Vercel Dashboard → your project → **Settings** → **Environment Variables**
2. Add:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_APP_URL` | `https://your-actual-url.vercel.app` (copy from Vercel) |

3. Go to **Deployments** → click **⋯** on latest → **Redeploy**

---

## Step 6 — Test your live site

Open your Vercel URL:

| Page | Path |
|------|------|
| Landing | `/` |
| Login | `/login` |
| Dashboard | `/dashboard` |
| LinkedIn promo | `/promo` |

**Demo login:**
- Email: `you@company.com`
- Password: `12345678` (8+ characters)

---

## Step 7 — Custom domain (optional)

1. Vercel → **Settings** → **Domains**
2. Add your domain (e.g. `sellpilot.ai` or `sellpilot.com`)
3. Follow DNS instructions at your domain registrar
4. Update `NEXT_PUBLIC_APP_URL` to your custom domain
5. Redeploy

---

## Auto-deploy on every push

Already enabled by default. When you push to GitHub `main`:

```powershell
git add .
git commit -m "Update site"
git push origin main
```

Vercel rebuilds automatically.

---

## Troubleshooting

### Build failed
- Check Vercel build logs
- Run locally: `npm run build`
- Ensure `AUTH_SECRET` is set (32+ chars)

### Login doesn't work on live site
- Set `AUTH_SECRET` in Vercel env vars
- Redeploy after adding env vars
- `trustHost: true` is already configured in the project

### Dashboard data resets
- Demo uses in-memory storage — normal on serverless
- For persistent data, add a database later (Supabase, PlanetScale)

### 404 on routes
- Ensure you deployed from the folder that contains `app/` and `package.json`

---

## Your live URLs to share

After deploy, share on LinkedIn:

```
🚀 SellPilot AI is live!

AI-powered sales automation for modern teams.
→ Smart lead CRM
→ AI sales assistant  
→ Campaign automation

Try it: https://YOUR-URL.vercel.app

#SaaS #AI #SalesAutomation
```

---

## Need help?

If deploy fails, screenshot the **Vercel build log** error and share it.
