## 📄 CONTRIBUTION GUIDE

Thank you for your interest in contributing to the `exploits.json` dataset! This file tracks real-world exploits, scams, and rug pulls in the crypto ecosystem. Please follow the instructions below to ensure high-quality and standardized data.

---

### 📁 File Structure

All exploits are stored in a JSON array under the key `exploits_data`. Each entry must follow this structure:

```json
{
  "project_name": "ProjectName",
  "name_categories": "Token | NFT | Protocol | dApp | etc.",
  "token_name": "TOKEN",
  "token_address": "TokenAddressHere",
  "funds_lost": 0,
  "funds_returned": 0,
  "funds_recovered": 0,
  "active": 1,
  "scam_type": {
    "name": "Exit Scam/Rugpull",
    "type": "Rugpull"
  },
  "proof_link": ["https://..."],
  "proof_archive_link": null,
  "technical_issue": null,
  "website_link": null,
  "webarchive_link": null,
  "twitter_link": null,
  "telegram_link": null,
  "discord": null,
  "git_hub": null,
  "git_hub_contract_link": null,
  "bug_bounty_program_link": null,
  "bug_bounty_program_company": null,
  "network": "Ethereum | Solana | BNB | etc.",
  "audit_status": "Audited | Not Audited",
  "auditedBy": [
    {
      "date": "YYYY-MM-DD",
      "audit_link": "https://...",
      "partner": "AuditCompany"
    }
  ],
  "description": {
    "sections": [
      {
        "title": "Quick Summary",
        "content": "Short paragraph summarizing what happened."
      },
      {
        "title": "Details of the Exploit",
        "content": "Detailed breakdown of how the scam or exploit occurred."
      },
      {
        "title": "Block Data Reference",
        "content": "Optional: Include any on-chain proof, attacker addresses, or transaction links."
      }
    ]
  },
  "date": {
    "iso": "YYYY-MM-DD",
    "display": "Month DD, YYYY",
    "timestamp": 0000000000000
  }
}
```

---

### IMPORTANT NOTE:

📌 Important: Always insert your entry at the beginning of the exploits_data array — do not append to the end. The latest incident should always be at index [0].

---

### ✅ Contribution Checklist

- Use proper and consistent JSON formatting (use `null` where applicable).
- Include **at least one credible `proof_link`**.
- Dates must be in **ISO 8601** format and contain a matching UNIX timestamp.
- If applicable, include attacker addresses or transaction links in a `"Block Data Reference"` section.
- Use `"active": 1` for unresolved exploits or `"active": 0` for resolved cases.
- Avoid editorialization — stay factual and source-based.

---

### 🧾 Commit Message Convention

All contributions must follow the **Conventional Commits** standard:

```bash
<type>(scope): short summary
```

**Allowed types:**

- `feat`: A new exploit added
- `fix`: Fixing incorrect data in an existing entry
- `docs`: Updates to documentation only (e.g., this file)
- `refactor`: Minor changes without altering content
- `chore`: Routine work like formatting, cleanup

**Examples:**

- `feat(exploits): add orbit bridge hack`
- `fix(exploits): correct funds_lost for Nomad exploit`
- `docs(contribution): add commit message guidelines`

---

### 🚀 How to Contribute

1. **Fork the repository** and clone it locally.
2. **Add your exploit** entry in the correct format to `exploits.json`.
3. **Validate your JSON** before pushing (`https://jsonlint.com` or IDE formatter).
4. **Create a pull request** with a brief summary of your addition.

---

### 🛠 Example Entry

```json
{
  "project_name": "Example Project",
  "name_categories": "Protocol",
  "token_name": "EXMPL",
  "token_address": "0x123...",
  "funds_lost": 1000000,
  "funds_returned": 0,
  "funds_recovered": 0,
  "active": 1,
  "scam_type": {
    "name": "Flash Loan Exploit",
    "type": "Exploit"
  },
  "proof_link": ["https://example.com/article"],
  ...
}
```

---

## 📚 Contributing to `resources.json`

The `resources.json` file contains educational resources for learning about Solana smart contract security. You can contribute additional tutorials, documentation, blog posts, or videos.

### 📁 File Structure

Each resource must be an object in the `resources` array and follow this format:

```json
{
  "title": "Title of the Resource",
  "description": "Brief overview of what the resource covers.",
  "link": "https://example.com",
  "category": "Blog | Documentation | Course | Video | etc.",
  "languages": ["English", "Other Language"]
}
```

### ✅ Contribution Checklist

- Ensure the **link is valid and publicly accessible**.
- Use **clear, concise titles** and **factual descriptions**.
- Specify **accurate category** (e.g., `Blog`, `Course`, `Documentation`).
- List all **available languages** (English, 中文, etc.)
- Use **consistent formatting and indentation**.

### 🧾 Commit Message Convention

Use the following format:

```bash
feat(resources): add [resource title]
```

**Example:**

```bash
feat(resources): add Solana Smart Contract Security Best Practices
```

### 🚀 How to Contribute

1. **Fork the repository** and clone it locally.
2. **Add your resource** to the beginning of the `resources` array in `resources.json`.
3. **Validate your JSON** before pushing (`https://jsonlint.com`).
4. **Create a pull request** describing your addition.

---

## 📚 Contact Me:

- Email : vikrantsingh202004@gmail.com
- Telegram: https://t.me/Vikrant22dev
