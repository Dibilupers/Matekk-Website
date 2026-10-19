# Module 3.6 — Web Application Attacks: SQL Injection, Command Injection, Cross-Site Scripting

**Domain:** 3.0 Security Monitoring | **Level:** Associate | **Study time:** ~75 min

## Learning objectives
- Describe SQL injection, command injection, and cross-site scripting (XSS).
- Recognize their indicators in logs.
- Explain the main defenses.

**Root cause shared by all three:** the application treats **untrusted user input as code or commands** instead of data.

## 1. SQL injection (SQLi)
Input changes the structure of a database query.

**Vulnerable pattern:** building SQL by joining strings with user input.

| Type | Idea |
|---|---|
| **In-band (error/union)** | Results or error messages come back in the page |
| **Blind (boolean/time-based)** | No visible output, attacker infers data from true/false responses or delays |
| **Out-of-band** | Data exfiltrated through another channel (for example DNS) |

**Impact:** read or change data, bypass login, sometimes reach the operating system. Affects confidentiality, integrity, availability.

**Defenses:**
- **Parameterized queries / prepared statements** (primary fix).
- Input validation and allowlists.
- Least-privilege database accounts.
- Hide detailed error messages.
- WAF as an extra layer, not the only one.

**Log indicators:** quotes, `--`, `UNION SELECT`, `OR 1=1`, `SLEEP(` or `WAITFOR DELAY` in URL or form parameters, many 500 errors.

## 2. Command injection
Input is passed to a system shell and extra commands run on the server.

**Vulnerable pattern:** an app that builds a shell command string from user input (for example "ping this host") without separating data from the command.

**Impact:** full server compromise at the web service account's privilege.

**Defenses:**
- Avoid calling the shell. Use language APIs or pass arguments as a list.
- Strict allowlist validation (for example only valid IP/hostname format).
- Run the service with least privilege and sandboxing.

**Log indicators:** shell metacharacters (`;`, `|`, `&&`, backticks, `$(`) in parameters, unexpected child processes spawned by the web server (EDR), outbound connections from the web server.

## 3. Cross-site scripting (XSS)
The application includes untrusted input in a page, so the victim's **browser** runs attacker script in the site's context.

| Type | How it works |
|---|---|
| **Reflected** | Malicious script comes in a request (often a crafted link) and is reflected in the response |
| **Stored (persistent)** | Script is saved on the server (comment, profile) and runs for every visitor |
| **DOM-based** | Client-side JavaScript writes unsafe data into the page without the server involved |

**Impact:** session cookie theft, actions as the victim, defacement, redirects to malware, credential phishing.

**Defenses:**
- **Output encoding/escaping** for the correct context (HTML, attribute, JavaScript, URL).
- Input validation.
- **Content Security Policy (CSP).**
- `HttpOnly` and `Secure` cookie flags.
- Modern frameworks that auto-escape by default.

**Log indicators:** `<script`, `onerror=`, `javascript:` or their encoded forms in parameters and stored fields.

## 4. Related web attacks (know the names)
- **CSRF:** tricks a logged-in user's browser into sending an unwanted request. Defense: anti-CSRF tokens, SameSite cookies.
- **Directory (path) traversal:** `../` sequences to read files outside the web root.
- **File inclusion (LFI/RFI):** forcing the app to load unintended files.
- **Session hijacking/fixation:** stealing or forcing a session ID.
- **Broken authentication / access control:** see the OWASP Top 10.

## 5. Comparison

| | Runs where | Targets | Main fix |
|---|---|---|---|
| SQL injection | Database | Server-side data | Parameterized queries |
| Command injection | Server OS | Server | Avoid shell, allowlists |
| XSS | Victim's browser | Users of the site | Output encoding, CSP |

## Automation lab — vulnerable vs. safe query, plus a log scanner
```python
import re
import sqlite3

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE users (name TEXT, pwd TEXT)")
db.execute("INSERT INTO users VALUES ('alice', 's3cret')")

def login_vulnerable(name, pwd):
    q = f"SELECT * FROM users WHERE name='{name}' AND pwd='{pwd}'"
    return db.execute(q).fetchone() is not None

def login_safe(name, pwd):
    q = "SELECT * FROM users WHERE name=? AND pwd=?"
    return db.execute(q, (name, pwd)).fetchone() is not None

payload = "' OR '1'='1"
print("vulnerable, login bypassed:", login_vulnerable("alice", payload))   # True
print("safe, login bypassed:      ", login_safe("alice", payload))         # False

# Simple detection of suspicious input in web log lines
PATTERNS = {
    "sqli": re.compile(r"('|%27)\s*(or|and)\s+|union\s+select|--|sleep\(", re.I),
    "xss":  re.compile(r"<script|onerror\s*=|javascript:", re.I),
    "cmdi": re.compile(r"(;|\||&&|`|\$\()\s*(cat|ls|id|whoami|wget|curl)\b", re.I),
}

logs = [
    "GET /search?q=shoes 200",
    "GET /login?user=alice&pwd=' OR '1'='1 200",
    "GET /comment?text=<script>alert(1)</script> 200",
    "GET /ping?host=8.8.8.8;whoami 200",
]
for line in logs:
    hits = [name for name, rx in PATTERNS.items() if rx.search(line)]
    print(("ALERT " + ",".join(hits) if hits else "ok   "), "|", line)
```
**Think:** why is a regex scanner a weak *defense* but a useful *detection* aid?

## Exam tips
- SQLi → **parameterized queries**. XSS → **output encoding / CSP**. Command injection → **avoid the shell and validate input**.
- XSS attacks **the user's browser**. SQLi and command injection attack **the server side**.
- A WAF helps but does not replace secure coding.

## Quick check
1. Which attack runs in the victim's browser?
2. What is the primary fix for SQL injection?
3. Which log characters often indicate command injection?

<details><summary>Answers</summary>

1. Cross-site scripting (XSS).
2. Parameterized queries / prepared statements.
3. Shell metacharacters such as `;`, `|`, `&&`, backticks, and `$(`.
</details>
