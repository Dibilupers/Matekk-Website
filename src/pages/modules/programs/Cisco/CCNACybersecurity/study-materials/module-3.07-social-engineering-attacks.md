# Module 3.7 — Social Engineering Attacks

**Domain:** 3.0 Security Monitoring | **Level:** Associate | **Study time:** ~50 min

## Learning objectives
- Describe the main social engineering attack types.
- Explain the psychological principles attackers exploit.
- Identify defenses and red flags.

## 1. What it is
Manipulating **people**, not systems, to reveal information, grant access, or take an action. It targets the human attack surface (Module 3.1) and often starts the chain of a larger attack.

## 2. Attack types

| Attack | Description | Example |
|---|---|---|
| **Phishing** | Mass fraudulent messages (usually email) that imitate trusted sources | "Your account will be suspended, click to verify" |
| **Spear phishing** | Phishing aimed at a specific person using researched details | Email that mentions your manager and a real project |
| **Whaling** | Spear phishing aimed at executives | Fake legal notice sent to the CEO |
| **Business email compromise (BEC)** | Impersonating an executive or vendor to request payments or data | "Wire the invoice today, I'm in a meeting" |
| **Vishing** | Voice (phone) phishing | Caller posing as IT support asking for your password |
| **Smishing** | SMS phishing | Text about a "failed package delivery" with a link |
| **Pretexting** | Invented scenario to gain trust and information | Pretending to be an auditor needing records |
| **Baiting** | Offering something tempting | USB drive labeled "Salaries" left in a parking lot |
| **Quid pro quo** | Offering a service or favor in exchange for access | "Free tech support if you disable your antivirus" |
| **Tailgating / piggybacking** | Following someone through a secured door | Carrying boxes and asking you to hold the door |
| **Shoulder surfing** | Watching someone enter credentials or read data | Looking over a shoulder in a café |
| **Dumpster diving** | Searching trash for sensitive information | Discarded printouts with account numbers |
| **Watering hole** | Compromising a site the target group commonly visits | Infected industry forum |
| **Impersonation** | Posing as an authority (IT, police, vendor) | Fake "help desk" badge |

## 3. Why it works: psychological principles
- **Authority:** people comply with apparent officials.
- **Urgency / scarcity:** "act now or lose access" reduces careful thinking.
- **Fear:** threats of account closure or penalties.
- **Trust / liking / familiarity:** messages that look like colleagues or brands.
- **Social proof:** "everyone else already did this."
- **Reciprocity / greed:** free gifts or rewards.
- **Curiosity:** the unexplained USB or link.

## 4. Red flags in a message
- Unexpected request with pressure or a deadline.
- Sender address that does not match the display name or domain (for example `micr0soft-support.example`).
- Links whose real destination differs from the text (hover to check).
- Generic greeting, odd grammar, or unusual tone from a known contact.
- Unexpected attachments (especially macros, `.exe`, `.iso`, archives).
- Requests for credentials, payments, or gift cards.
- Failing **SPF/DKIM/DMARC** checks.

## 5. Defenses

| Layer | Controls |
|---|---|
| **People** | Security awareness training, simulated phishing, easy "report phishing" button |
| **Process** | Call-back verification for payment changes, dual approval for transfers, clear help-desk identity checks |
| **Technology** | Email filtering and sandboxing, SPF/DKIM/DMARC, MFA (phished passwords alone fail), web filtering, link rewriting |
| **Physical** | Badges, mantraps, visitor escorts, shredding, privacy screens |

**MFA note:** standard MFA reduces credential phishing damage but can be bypassed by real-time proxy attacks and MFA fatigue. Phishing-resistant methods (FIDO2/security keys) are stronger.

## 6. Monitoring angle (Domain 3.0)
- Email gateway logs: spoofed senders, newly registered domains, malicious attachments.
- Web proxy/DNS logs: users clicking known-bad or newly seen domains.
- Endpoint logs: Office apps spawning PowerShell or scripts after an attachment is opened.
- Identity logs: logins from unusual locations right after a phishing wave.

## Automation lab — simple phishing score
```python
import re

def phishing_score(mail):
    score = 0
    if re.search(r"urgent|immediately|verify your account|suspended|gift card", mail["body"], re.I):
        score += 2
    if mail["from_domain"] != mail["reply_to_domain"]:
        score += 2
    if re.search(r"https?://\d{1,3}(\.\d{1,3}){3}", mail["body"]):
        score += 3                       # link to a raw IP address
    if mail["attachment"].lower().endswith((".exe", ".js", ".iso", ".scr")):
        score += 3
    if mail["spf"] != "pass":
        score += 1
    return score

suspect = {
    "body": "URGENT: verify your account at http://203.0.113.5/login",
    "from_domain": "bank-support.example",
    "reply_to_domain": "freemail.example",
    "attachment": "invoice.exe",
    "spf": "fail",
}
normal = {
    "body": "Notes from today's meeting are attached.",
    "from_domain": "company.example",
    "reply_to_domain": "company.example",
    "attachment": "notes.pdf",
    "spf": "pass",
}
print("suspect:", phishing_score(suspect))
print("normal: ", phishing_score(normal))
```
**Think:** which signals would a real gateway add that this toy score lacks?

## Exam tips
- Spear phishing = **targeted**. Whaling = **executives**. Vishing = **voice**. Smishing = **SMS**.
- Tailgating is **physical** social engineering.
- The strongest single technical control against stolen passwords is **MFA** (phishing-resistant is best). Awareness training is the main control for the human layer.

## Quick check
1. A phishing email addressed to the CFO using details of a real deal is what?
2. Someone follows an employee through a badge-controlled door. What attack?
3. Name two email authentication standards that help spot spoofed senders.

<details><summary>Answers</summary>

1. Whaling (a form of spear phishing).
2. Tailgating (piggybacking).
3. Any two of SPF, DKIM, DMARC.
</details>
