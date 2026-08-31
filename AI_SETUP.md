# Portfolio AI concierge

The **Ask Nirupam** concierge is served by the Cloudflare Worker at:

`https://nirupam-portfolio-ai.nirupampal.workers.dev/ask`

## Security design

- `GEMINI_API_KEY` is stored as an encrypted Cloudflare Worker secret.
- The secret is not included in the website bundle, Git, Worker source, Wrangler config, or Firebase.
- The Worker accepts browser requests only from `inirupampal.in`, the portfolio's Firebase Hosting domains, and local development.
- Cloudflare limits each visitor IP to eight questions per minute.
- The Worker reads the current public portfolio content directly from Firestore and removes unpublished blog posts before prompting Gemini.
- Questions, history, request size, response length, and model output are bounded.

## Rotate the key or redeploy

Update `GEMINI_API_KEY` in the root `.env`, then run:

```powershell
npm run deploy:ai
```

The deployment script uploads only `GEMINI_API_KEY` as a Cloudflare secret and redeploys the Worker without printing the value.
