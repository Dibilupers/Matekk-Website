# 5.6 Extract Files from a TCP Stream (PCAP + Wireshark)

**Domain 5.0 Network Intrusion Analysis | CyberOps Associate (200-201)**

## Learning Objectives
- Follow a TCP stream and reconstruct a conversation
- Export files from HTTP, SMB, FTP and other protocols
- Hash and triage extracted files safely

## 1. Why Extract Files?
Attackers deliver malware, steal documents, and drop tools over the network. Recovering the file from a PCAP lets you **hash it, scan it, sandbox it, and build IoCs**, even without endpoint logs.

## 2. TCP Stream Basics
- TCP delivers a byte stream split into segments. Wireshark **reassembles** segments by sequence number into a single stream.
- A stream is identified by the 4-tuple (src IP, src port, dst IP, dst port) and is assigned a **stream index** (`tcp.stream eq N`).
- Handshake: SYN → SYN-ACK → ACK. Teardown: FIN/ACK or RST.

## 3. Method A: Follow TCP Stream
1. Open the PCAP in Wireshark.
2. Filter to the suspect traffic, for example `http` or `ip.addr == 10.1.1.50 && tcp.port == 80`.
3. Right-click a packet → **Follow → TCP Stream** (or `Ctrl+Alt+Shift+T`).
4. Read the conversation: **red** = client to server, **blue** = server to client.
5. Look at the HTTP headers: `Content-Type`, `Content-Length`, `Content-Disposition`.
6. Set **Show data as: Raw**, select only the **server to client** direction, then **Save as...** to dump the bytes.
7. **Important:** the saved raw data still includes HTTP response headers. Remove them (hex editor) up to the blank line (`0d 0a 0d 0a`) so the file starts at its real header. Example: Windows executables start with `4D 5A` (**MZ**); PDFs with `%PDF`; ZIP/DOCX with `50 4B` (PK).

## 4. Method B: Export Objects (easiest)
- **File → Export Objects →** HTTP, SMB, TFTP, DICOM, IMF (email).
- A list appears with packet number, host, content type, size, and filename. Select and **Save** (or **Save All**).
- Handles chunked transfer and gzip for HTTP automatically in most cases.

## 5. Method C: Other Protocols
- **FTP data channel:** filter `ftp-data`, follow the TCP stream of the data connection, save raw.
- **SMTP/IMAP/POP3 attachments:** Export Objects → IMF, or follow stream and Base64-decode the attachment (`base64 -d`).
- **SMB:** Export Objects → SMB.
- **TLS:** payload is encrypted. You need the session keys (**SSLKEYLOGFILE**) or a server private key (RSA key exchange only) to decrypt. Otherwise only metadata (SNI, certificate) is visible.

## 6. Useful Filters
| Goal | Display filter |
|---|---|
| HTTP requests | `http.request` |
| Downloads of executables | `http.content_type contains "application"` |
| Specific stream | `tcp.stream eq 4` |
| File names in URI | `http.request.uri contains ".exe"` |
| POST uploads | `http.request.method == "POST"` |
| Reset connections | `tcp.flags.reset == 1` |
| SMB file operations | `smb2` |

## 7. Verify and Triage the Extracted File
```
file extracted.bin            # identify type by magic bytes
sha256sum extracted.bin       # compute hash
md5sum extracted.bin
strings extracted.bin | less  # quick static look
```
- Look up the hash in **VirusTotal** (hash only, avoid uploading sensitive files).
- Run in a **sandbox/detonation chamber** for dynamic analysis.
- Handle in an **isolated VM**; never run on the analysis host.
- Record hashes in chain of custody notes.

## 8. Common Pitfalls
- Forgetting to remove HTTP headers, corrupting the file.
- Out-of-order or missing packets (capture loss) cause truncated files.
- HTTP **chunked** or **gzip** encoding requires decoding.
- File names in `Content-Disposition` may differ from the URL name.
- Encrypted traffic cannot be carved without keys.

## 9. Worked Example
1. Filter `http.request.uri contains ".exe"` → packet 214: `GET /update/setup.exe` to `198.51.100.7`.
2. Follow TCP stream 6; response header shows `Content-Type: application/octet-stream`, `Content-Length: 245760`.
3. Export Objects → HTTP → save `setup.exe`.
4. `file setup.exe` → `PE32 executable`. `sha256sum` → submit hash to threat intel.
5. Record IoCs: IP 198.51.100.7, URI, hash, user agent.

## 10. Review Questions
1. Which menu quickly saves HTTP files from a PCAP? *(File → Export Objects → HTTP)*
2. What bytes identify a Windows executable? *(4D 5A "MZ")*
3. Why can saved raw stream data be corrupt? *(HTTP headers still attached)*
4. What is needed to decrypt TLS in a PCAP? *(Session key log file or server private key with RSA key exchange)*
5. Which filter isolates stream number 3? *(tcp.stream eq 3)*
