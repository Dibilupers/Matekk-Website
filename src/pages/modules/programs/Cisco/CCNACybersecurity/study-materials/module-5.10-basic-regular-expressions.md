# 5.10 Basic Regular Expressions (Regex)

**Domain 5.0 Network Intrusion Analysis | CyberOps Associate (200-201)**

## Learning Objectives
- Read and write basic regex patterns
- Use regex to search logs, build IDS content rules, and extract IoCs
- Avoid common mistakes

## 1. What Is a Regex?
A pattern language for matching text. Analysts use it in `grep`, SIEM queries (Splunk, ELK), Snort/Suricata `pcre` options, Wireshark filters (`matches`), and scripting.

## 2. Core Syntax

### Literals and the Dot
| Pattern | Meaning | Matches |
|---|---|---|
| `abc` | Literal text | "abc" |
| `.` | Any single character (except newline) | "a", "5", "-" |
| `\.` | Literal dot (escaped) | "." |

### Anchors
| Pattern | Meaning |
|---|---|
| `^` | Start of line |
| `$` | End of line |
| `\b` | Word boundary |

### Quantifiers
| Pattern | Meaning |
|---|---|
| `*` | 0 or more |
| `+` | 1 or more |
| `?` | 0 or 1 (optional) |
| `{n}` | Exactly n |
| `{n,}` | n or more |
| `{n,m}` | Between n and m |

### Character Classes
| Pattern | Meaning |
|---|---|
| `[abc]` | One of a, b, or c |
| `[a-z]` | Any lowercase letter |
| `[0-9]` | Any digit |
| `[^abc]` | **Not** a, b, or c (negation inside brackets) |
| `\d` / `\D` | Digit / non-digit |
| `\w` / `\W` | Word char (letters, digits, underscore) / non-word |
| `\s` / `\S` | Whitespace / non-whitespace |

### Groups and Alternation
| Pattern | Meaning |
|---|---|
| `(abc)` | Capture group |
| `(?:abc)` | Non-capturing group |
| `a|b` | a **or** b |
| `\1` | Back-reference to group 1 |

### Escaping
Special characters `. * + ? ^ $ ( ) [ ] { } | \` must be escaped with `\` to match literally.

## 3. Greedy vs Lazy
- `.*` is **greedy** (matches as much as possible). `.*?` is **lazy** (as little as possible).
- Input `<b>one</b><b>two</b>`: `<b>.*</b>` matches the whole string; `<b>.*?</b>` matches each tag pair.

## 4. Security-Relevant Examples
| Goal | Pattern | Notes |
|---|---|---|
| IPv4 address (simple) | `\b\d{1,3}(\.\d{1,3}){3}\b` | Matches 999.999.999.999 too; validate separately |
| Strict IPv4 octet | `(25[0-5]\|2[0-4]\d\|1?\d?\d)` | Range-checked |
| MAC address | `([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}` | |
| MD5 hash | `\b[a-fA-F0-9]{32}\b` | |
| SHA-256 hash | `\b[a-fA-F0-9]{64}\b` | |
| Email | `[\w.+-]+@[\w-]+\.[\w.-]+` | Simplified |
| URL | `https?://[^\s"']+` | |
| Executable in URI | `\.(exe\|dll\|scr\|bat)\b` | |
| Failed SSH login | `Failed password for (invalid user )?\w+ from \d+\.\d+\.\d+\.\d+` | |
| SQLi indicator | `(\%27)\|(')\|(\-\-)\|(\%23)\|(#)` | Quote, comment markers |
| SQLi `OR 1=1` | `(?i)'\s*or\s*'?1'?\s*=\s*'?1` | `(?i)` = case-insensitive |
| Directory traversal | `(\.\./\|\.\.\\\|%2e%2e%2f)` | |
| Base64 PowerShell | `-(enc\|encodedcommand)\s+[A-Za-z0-9+/=]{20,}` | |
| Credit card (basic) | `\b(?:\d[ -]?){13,16}\b` | DLP use |
| Windows SID | `S-1-5-\d+(-\d+)+` | |

## 5. Using Regex in Tools

### grep
```
grep -E "Failed password" /var/log/auth.log
grep -Eo "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b" auth.log | sort | uniq -c | sort -nr
```
- `-E` extended regex, `-o` print only the match, `-i` ignore case, `-v` invert.

### Wireshark
```
http.request.uri matches "(?i)\.(exe|dll|scr)$"
dns.qry.name matches "^[a-z0-9]{20,}\.com$"
```

### Snort / Suricata
```
alert tcp any any -> $HOME_NET 80 (msg:"SQLi attempt"; content:"select"; nocase; pcre:"/union\s+select/i"; sid:1000001;)
```

### Splunk (example)
```
index=auth "Failed password" | rex "from (?<src_ip>\d+\.\d+\.\d+\.\d+)" | stats count by src_ip
```

## 6. Worked Walkthrough
Log line: `Oct 17 02:14:03 srv sshd[2212]: Failed password for root from 203.0.113.5 port 51130 ssh2`
Pattern: `Failed password for (\w+) from (\d+\.\d+\.\d+\.\d+)`
- Group 1 = `root`, Group 2 = `203.0.113.5`.

## 7. Common Mistakes
- Forgetting to escape the dot: `10.1.1.1` also matches `10X1Y1Z1`; use `10\.1\.1\.1`.
- Overly broad `.*` that causes false positives or slow matching.
- Not anchoring (`^`/`$`) so partial matches slip in.
- Case sensitivity: attackers vary case, so use `(?i)` or `-i`.
- **Catastrophic backtracking** with nested quantifiers like `(a+)+`, which can freeze tools (ReDoS).
- Differences between flavors (basic vs extended vs PCRE); test in your tool.

## 8. Practice
1. Match any 5-digit number: `\b\d{5}\b`.
2. Match lines starting with "ERROR": `^ERROR`.
3. Match "color" or "colour": `colou?r`.
4. Match a URL ending in `.php`: `https?://\S+\.php`.
5. Match anything that is not a digit: `\D` or `[^0-9]`.

## 9. Review Questions
1. What does `^` mean outside brackets? *(Start of line)*
2. What does `[^0-9]` match? *(Any non-digit character)*
3. Difference between `*` and `+`? *(0 or more vs 1 or more)*
4. How do you match a literal dot? *(`\.`)*
5. What does `colou?r` match? *(color and colour)*
6. Why is `.*` risky in a detection rule? *(Greedy; can cause false positives and performance issues)*
