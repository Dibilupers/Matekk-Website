# Module 2.6 — Access Control Models

**Domain:** 2.0 Security Concepts | **Level:** Associate | **Study time:** ~60 min

## Learning objectives
Compare discretionary, mandatory, nondiscretionary, rule-based, time-based, and role-based access control, and explain AAA.

## 1. AAA first
- **Authentication:** who are you? (password, certificate, biometrics, MFA)
- **Authorization:** what may you do?
- **Accounting:** what did you do? (logs, audit trails)

**AAA protocols**

| | RADIUS | TACACS+ |
|---|---|---|
| Transport | UDP (1812/1813) | TCP 49 |
| Encryption | Password only | Entire payload |
| AAA | Combines authentication and authorization | Separates all three |
| Typical use | Network access (802.1X, VPN, Wi-Fi) | Device administration (router/switch CLI) |

## 2. The models

| Model | Who decides access? | Key idea | Example |
|---|---|---|---|
| **DAC** (Discretionary) | The **resource owner** | Owner grants permissions to others | File permissions on Windows/Linux you set yourself |
| **MAC** (Mandatory) | The **system/policy** | Labels/clearances (Secret, Top Secret) enforced centrally. Users cannot override | Military, SELinux |
| **Nondiscretionary** | A **central authority** | Umbrella term: access is not set by the owner. Includes MAC, role-based, rule-based | Centrally administered access policy |
| **RBAC** (Role-based) | Access follows **job role** | Permissions assigned to roles, users assigned to roles | "Network-Admin" role vs "Helpdesk" role |
| **Rule-based** | Predefined **rules/conditions** | Same rules apply to everyone, regardless of identity | Firewall ACL: permit TCP/443 from this subnet |
| **Time-based** | **Time/date** conditions | Access only in specific windows | Contractor login allowed Mon–Fri 08:00–17:00 |
| **ABAC** (Attribute-based) *(bonus)* | Policy over **attributes** | Combines user, device, location, time, resource | Allow if user=HR AND device=managed AND location=office |

## 3. Quick comparison tips
- **DAC** = flexible but easy to misconfigure. **MAC** = strict, rigid.
- **RBAC** scales well in organizations, since changing a job changes the role, not 50 permissions.
- Rule-based ≠ role-based. Rule-based looks at *conditions*, role-based looks at *who you are in the organization*.
- Models can be **combined**. For example, RBAC with time-based restrictions.

## 4. Link to other concepts
- Implements **least privilege** (Module 2.3) and supports **accountability** (Module 2.1).
- Cisco ISE uses authorization rules/profiles (VLAN, dACL, SGT) built on user, device, and posture, which is attribute- and role-based in practice.

## Automation lab — role and time check
```python
from datetime import datetime

ROLE_PERMS = {
    "admin":    {"read", "write", "reboot"},
    "helpdesk": {"read"},
}

def allowed(role, action, now=None):
    now = now or datetime.now()
    if action not in ROLE_PERMS.get(role, set()):          # role-based
        return False
    if role == "helpdesk" and not (8 <= now.hour < 17):    # time-based
        return False
    return True

print(allowed("helpdesk", "read"))
print(allowed("helpdesk", "reboot"))
```
Extend it with a rule-based condition, for example allow only from the management subnet.

## Exam tips
- "Owner grants access" → **DAC**. "Labels and clearances" → **MAC**.
- "Based on job function" → **RBAC**. "Based on conditions like source/time" → **rule-based/time-based**.
- TACACS+ for **device admin**, RADIUS for **network access**.

## Quick check
1. A file owner shares a document with a coworker. Which model?
2. A contractor account only works during business hours. Which model?
3. Which AAA protocol encrypts the whole packet body?

<details><summary>Answers</summary>

1. DAC.
2. Time-based access control.
3. TACACS+.
</details>
