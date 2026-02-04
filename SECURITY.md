# Security Policy

## 🔐 Protecting Your Credentials

This project requires Discord API credentials. Follow these guidelines to keep them secure:

### What Should NEVER Be Committed

1. **`.env`** - Contains backend secrets (Client Secret)
2. **`config.js`** - Contains frontend Client ID
3. **Any file with actual credentials**

These files are listed in `.gitignore` to prevent accidental commits.

### What's Safe to Commit

- ✅ `.env.example` - Template file
- ✅ `config.example.js` - Template file
- ✅ Source code without credentials
- ✅ Documentation

## 🚨 If You Accidentally Committed Secrets

If you accidentally committed your `.env` or `config.js` with real credentials:

1. **Immediately regenerate your secrets:**
   - Go to Discord Developer Portal
   - Navigate to your application
   - Reset your Client Secret
   - Generate a new one

2. **Remove from Git history:**
```bash
# Remove the file from history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env config.js" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (WARNING: This rewrites history)
git push origin --force --all
```

3. **Update your secrets:**
   - Update `.env` locally with new credentials
   - Update GitHub Secrets if using Actions
   - Update environment variables on hosting platform

## 🔑 Client ID vs Client Secret

### Client ID (Less Sensitive)
- Used in frontend code
- Identifies your Discord application
- Can be visible in browser/network requests
- Still recommended to hide via config

### Client Secret (HIGHLY SENSITIVE)
- MUST remain private
- Only used in backend code
- Never expose in frontend
- Never commit to repository
- Treat like a password

## 🛡️ Best Practices

1. **Use Environment Variables**
   - Backend: Use `.env` file (gitignored)
   - Frontend: Use `config.js` (gitignored) or GitHub Secrets

2. **Separate Development and Production**
   - Use different Discord apps for dev/prod
   - Regenerate secrets if dev credentials leaked

3. **Regular Audits**
   - Check your commit history occasionally
   - Use `git log -p | grep -i "client_secret"` to search
   - Monitor Discord Developer Portal for unusual activity

4. **GitHub Actions**
   - Store secrets in Repository Secrets
   - Never echo secrets in logs
   - Use `${{ secrets.NAME }}` syntax

5. **Host-Specific Security**
   - Railway/Render: Use their environment variable systems
   - Never hardcode credentials in deployment configs

## 📞 Reporting Security Issues

If you discover a security vulnerability in this project:

1. **Do NOT open a public issue**
2. Email the repository owner privately
3. Include details about the vulnerability
4. Allow time for a fix before public disclosure

## ✅ Checklist Before Deploying

- [ ] `.env` and `config.js` are in `.gitignore`
- [ ] No credentials in git history (`git log -p`)
- [ ] GitHub Secrets configured (if using Actions)
- [ ] Environment variables set on hosting platform
- [ ] Different credentials for dev/prod environments
- [ ] OAuth redirects properly configured in Discord

## 🔄 Rotating Credentials

Rotate your credentials periodically (every 3-6 months):

1. Generate new Client Secret in Discord Portal
2. Update backend environment variables
3. Redeploy backend
4. Test authentication flow
5. (Optional) Update Client ID and create new config

Stay secure! 🔒
