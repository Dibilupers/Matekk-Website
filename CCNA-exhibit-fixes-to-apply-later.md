# CCNA Exhibit Fixes

**Status:** Implemented in the CCNA All Questions Exam source on `fix/ccna-recreate-exhibit-images`. Changes are not committed or pushed.

## Implementation summary

- Corrected the native exhibit diagrams and configuration text described below.
- Kept Question 299 and Question 1305 as interactive matching questions, including their unused distractor choices.
- Updated the bundled offline overrides for Questions 299, 1305, and 1321 to match the online bank behavior.

## Question 299 — DC-1 and HQ-1 interface addressing

- Keep the question as an interactive matching item with targets `DC-1 Gi1/0`, `DC-1 Gi1/1`, `DC-1 Gi1/2`, and `HQ-1 Gi1/3`.
- Map the targets to command choices 2, 5, 4, and 6 respectively; leave the other three commands unused.
- The source commands include the `209.165.202.130/30`, `192.168.4.9/29`, and `192.168.3.14` addresses.

The PDF includes 161 of the 166 mapped question comparisons plus a cover page. Entries without a replacement exhibit are omitted from both the PDF and this repair list; remaining comparison headers retain the original 166-question order.

## Full-set review status

- The exhibit mapping contains 166 question IDs. The PDF has 162 landscape pages total: one cover and 161 comparisons; entries without a replacement exhibit are omitted.
- This workspace has matching original exhibit image files for 100 mapped IDs. The included comparisons contain 99 original images; the 62 included questions without a local original are marked “Exhibit Missing” rather than using guessed source material.
- Five mappings have no replacement exhibit and are omitted from the PDF and this repair list.

## Why some labels were missing

The diagram renderer does not infer labels from the original screenshot; topology labels and host details must be entered in the exhibit mapping. Paired interface labels are split into endpoint labels only when separated by `↔`. The printer topology used a middle dot instead, and its SW2-to-LAN port was unlabeled. Other examples had link labels but omitted or mismatched MAC-address details.

## Question 105 — IPv6 LAN hosts

- Restore the lower host portion of the original exhibit in the fixed diagram.
- Show the three-PC group and the separate PC connected to the shared `2001:db8:23::/64` LAN.
- Include `2001:db8:23::14/64` on the separate PC.
- Keep R2 and R3 connected to that same LAN.

## Question 172 — RTR-1 access-list exhibit

- Match the topology and configuration to the supplied exhibit: RTR-1 Gi0/0 is `10.150.1.254/24`, PC-1 is `10.150.1.1/24`, PC-2 is `10.150.1.2/24`, and the access switch is SW1.
- Ensure the configuration uses the `10.150.1.0/24` network and denies host `10.150.1.1`; verify remaining configuration lines against the original exhibit.
- Keep the full configuration visible with the topology in the PDF, including the final `end`.

## Question 178 — Primary and backup Internet paths

- Restore all exhibit details: the switch and PC1 (`192.150.16.1`), R1 interfaces (`192.150.16.2`, `10.151.9.226`, `172.73.189.4`), R2 (`10.151.9.230`), and R3 (`172.73.189.5`).
- Label the LAN `192.150.16.0/24`, the backup path `10.151.9.224/27`, and the primary path `172.73.189.0/27`.
- Use the one available original exhibit image as the reference; do not imply that a separate second source image exists.

## Question 187 — Printer and DTP switch topology

- Split the inter-switch port label into endpoint labels (`Ethernet0/2 ↔ Ethernet0/2`) and label SW2's link toward the LAN as `Ethernet0/2`.
- Match the original switch output, including `Trunking VLANs Enabled: 5`.
- Keep the complete `show interfaces Ethernet0/2 switchport` output with the fixed topology in the PDF.

## Question 191 — Host-to-switch MAC table

- Keep the `Fa0/1`–`Fa0/4` host links labeled.
- Include the complete original MAC table for Fa0/1 through Fa0/3 with the topology; Host D has no learned entry in the supplied table.
- Use the source MACs `887a.a2b6.735c`, `0d59.5d3a.deaa`, and `1d62.9a53.cc85` on Fa0/1, Fa0/2, and Fa0/3 respectively.

## Question 192 — VLAN 2 workstation and MAC table

- Keep the VLAN 2 and Fa0/1/Fa0/2 labels on the workstation links.
- Show PC1 `0007.ec53.3390` and PC2 `0007.ec89.2748` as host details.
- Include the original interface configuration and MAC-table entry with the fixed topology.

## Question 204 — FastEthernet EtherChannel

- Keep the Fa0/1 and Fa0/2 endpoint labels on both switches.
- Match all four interface outputs to the original: each uses `channel-group 1 mode on`. The website mapping now corrects both SW2 interfaces.

## Question 246 — R14–R86 static-route exhibit

- Replace the source exhibit with a separate, newly arranged route-path diagram: R14 routes through R86 to destination LAN `172.21.34.0/25`.
- Show the Fa0/0 transit subnet `10.73.65.64/30`, endpoint addresses `.65` at R14 and `.66` at R86, and both loopbacks: R14 `10.10.1.14/32` and R86 `10.10.1.86/32`.

## Question 273 — Dual-WAN workstation sites

- Rebuild the exhibit with a distinct hub-and-spoke layout: two separate WAN subnet nodes connect R1 and R2; each router also connects to its branch switch.
- Keep both WAN networks and their interfaces: `172.16.0.0/30` on G0/0 and `172.16.0.4/30` on G0/1.
- Preserve SW3 and SW4, the two IP-phone/workstation pairs at each site, the `172.16.1.0/24` and `172.16.2.0/27` LANs, and both OSPF network statements.
- Hide the original image when showing the rebuilt topology in the website and replace only the “after” panel in the comparison PDF.

## Question 275 — VLAN 5 and VLAN 10 access ports

- Keep PC1 and PC2 in the upper VLAN 5 group, and PC3 and PC4 in the lower VLAN 10 group. Preserve the access-port labels: `Fa0/2` for the upper PCs and `Fa0/3` for the lower PCs on their respective switches.
- Keep the inter-switch `Fa0/1` links and the original Switch2 configuration: `switchport mode dynamic auto` and `switchport trunk allowed vlan 5,10`.
- Correct the inconsistent `VLAN 100` inter-switch annotation to `Trunk VLANs 5, 10`, matching the allowed-VLAN command. Do not relabel PC3/PC4 as VLAN 100.
- The website replacement diagram now uses the corrected trunk label and hides the contradictory source image.

## Question 369 — switch port-security exhibit

- Keep the original SW-to-PC link labeled `Gig0/1` and preserve the exact `GigabitEthernet0/1` access and port-security commands.
- Do not substitute the unrelated `PC1`/`Fa0`/`Fa0/1` topology or add speed/duplex details that are absent from the source.
- The comparison PDF's after panel now uses a distinct SW-to-PC Gig0/1 drawing and retains the exact IOS commands; the original before panel is preserved. The website uses the same dedicated topology without changing Question 242's shared diagram.

## Question 387 — dual-site IPv6 network with ISP

- Preserve the original two-router layout and the ISP connection: `Int G0/0` labels the inter-router link, and `Int G0/1` labels the second router's link to the ISP.
- Keep SW1 with the File Server and Network Management Server on `2001:DB8:D8D2:1008::/64`; keep SW2 with the IP phones and workstations on `2001:DB8:D8D2:1009::/64`.
- Do not omit the ISP link, move the LAN prefixes onto the inter-router or switch links, or add router IPv6 addresses absent from the source.
- The comparison PDF retains the original Question 387 image 1:1; the website topology now includes the ISP link and both endpoint groups without adding router IPv6 addresses.

## Question 339 — three-router routed links and PCs

- Preserve the original branching layout: the left router connects separately to the upper router, the lower router, and the switch.
- Keep the link labels as shown: `172.16.0.0/24` on the upper-router link, `192.168.0.0/24` on the lower-router link, and `10.0.0.0/24` on the switch link.
- Keep PC1 (`10.0.0.5`), PC2 (`10.0.0.8`), and PC3 (`10.0.0.12`) on their original connections. Do not collapse the whole exhibit into a switch-centered star or add router names absent from the source.
- The comparison PDF retains the original Question 339 image 1:1; the website topology now preserves its three routed branches and separate PC/switch connections.

## Question 403 — three-router floating default routes

- Redraw the topology as a route-focused diagram: R1 above two distinct next-hop routers, with the primary and floating routes visually differentiated; keep PC1, PC3, and the switch/PC2 on their original LANs.
- Preserve the original network labels: `172.16.30.0/24` (PC1 LAN), `172.16.20.0/24` (left-to-upper router), `172.16.10.0/24` (PC3 LAN), `209.165.201.0/27` (upper-to-right router), `10.0.0.0/24` (left-to-right router), and `192.168.200.0/24` (PC2 LAN).
- Keep R1's primary default route via `172.16.20.2` and its floating backup via `10.0.0.2` with administrative distance 20; do not invent additional IPs or interface labels.
- The website now uses a distinct three-router layout, hides the source image, and keeps both route commands. The comparison PDF's after panel now uses this redraw; the original before panel is preserved on page 77 of the 162-page PDF.

## Question 624 — LACP configuration exhibit

- Show the four interface configuration outputs only; Question 624 has no topology in its supplied exhibit.
- Do not reuse Question 204's two-switch EtherChannel topology in Question 624.
- Keep Question 204's topology with Question 204.

## Questions 516 and 517 — distinct matching activities

- Question 516 matches AAA services; Question 517 matches TCP/UDP characteristics. They are different questions and must retain their own drag-and-drop choices and answers.
- Removed the unrelated R14–R86 static-route diagram that had been assigned to both; neither matching activity needs that topology.
- The comparison PDF now gives each question its own matching-activity panel; the original before panels remain unchanged.

## Question 1099 — four-switch spanning-tree ring

- The original exhibit has four switches, not three: S1, S2, S3, and S4 form a four-link ring. Preserve only the perimeter links S1–S4, S4–S3, S3–S2, and S2–S1; do not redraw it as a three-switch triangle.
- Match the original bridge data: S1 priority 30000 / MAC `AA:AA:AA:AA:AA:AA`; S2 priority 4096 / MAC `BB:BB:BB:BB:BB:BB`; S3 priority 28672 / MAC `CC:CC:CC:CC:CC:CC`; S4 priority 8192 / MAC `DD:DD:DD:DD:DD:DD`.
- The website topology now uses the original four-switch ring and bridge data.
- The comparison PDF's after panel now uses a distinct four-switch ring redraw with the same bridge data; the original before panel remains unchanged.

## Questions 851 and 852 — distinct spanning-tree data

- The local assets do not contain matching original images for either ID. The PDF's earlier after panels reused one generic four-switch ring, which made those pages look duplicated and included unverified host placements.
- Keep the exhibits separate. Question 851 has priorities SW1 8192, SW2 8192, SW3 4096, and SW4 4096; SW3 wins the priority tie with SW4 by MAC address. Question 852 has SW2 at priority 4096, lower than SW1 32768, SW3 8192, and SW4 12288.
- The website shows each question's distinct bridge data without asserting a topology; no original images are available to verify separate diagrams.

## Question 1011 — DHCP configuration only

- The source exhibit is IOS DHCP configuration, not a network topology. Do not add a CPE, client PCs, company network, or central DHCP server diagram.
- Preserve the original commands and values: excluded range `192.168.10.1`–`192.168.10.20`; pool `LAN-POOL`; network `192.168.10.0/24`; default router `192.168.10.1`; DNS `8.8.8.8`; lease 3; and `GigabitEthernet0/1` with `192.168.10.1/24` and helper address `172.20.255.11`.
- The comparison PDF's after panel now presents the same commands in an IOS terminal-style exhibit; the original before panel is preserved. The website keeps its configuration-only terminal exhibit.

## Question 1199 — R1/R2 database topology

- Keep `Gi0/0` on the database-switch-to-R1 link and `Gi0/1` on the R1-to-LAN-switch link.
- Match the original exhibit's subnet labels and single R1–R2 `S0/0/0` link; do not add a second serial link or substitute other subnets.
- The comparison PDF's after panel now uses a custom redraw with the same single serial link, subnet labels, and Gi0/0/Gi0/1 placements; the original before panel is preserved.

## Question 1305 — drag-and-drop routing-table matching

- Keep this as an interactive drag-and-drop matching question; do not flatten the routing output and answers into static text.
- Preserve the five exhibit targets and their matches: A = route source (`B*`), B = administrative distance (`20`), C = metric (`0`), D = timestamp (`6w3d`), and E = outbound interface (`GigabitEthernet0/0/1`).
- Keep `next-hop interface` and `subnet mask` as unused choices, as shown in the source image. The next hop `10.111.11.93` is an IP address, not an interface.
- The website exhibit now reproduces the routing output and places the A–E markers on their corresponding values, including the full `GigabitEthernet0/0/1` interface.

## Question 1321 — PAT overload configuration

- This is a configuration-only exhibit, not a static-NAT web-server topology.
- Match the original: permit `192.168.10.0/24`, overload on `Gi0/1`, mark `Gi0/0` as NAT inside, and mark `Gi0/1` as NAT outside.
- Do not substitute the unrelated `172.16.1.2` web-server exhibit or its `172.16.1.0/24` ACL.

## Question 1329 — DHCP relay link labels

- Put `Gi0/0` directly on the switch-to-R2 wire and `Gi0/1` directly on the R2-to-DHCP-server wire.
- Keep `192.0.2.2` and `198.51.100.1` as separate address labels below their respective wires instead of combining them with the interface labels above the wires.
- Keep interface labels fixed to the cable when resolving collisions; do not let automatic label placement move them off the wire.

## PDF validation

- Latest PDF: `CCNA Refer-to-the-Exhibit Fixes Before and After.pdf`
- Verified as 162 landscape pages: one cover and 161 before-and-after comparisons.
- Includes 99 original images and 62 explicit “Exhibit Missing” before panels; the five entries without replacement exhibits are omitted.
- Remaining comparison headers retain the original 166-question sequence.
- Refreshed the after panels for Questions 65, 70, 177, 246, 268, 275, 441, 1012, and 1305 from the current website exhibits. The before panels, cover, and page order are preserved; Question 441 is labeled as an illustrative reconstruction because its original image is unavailable.
- Question 273's after panel now uses the rebuilt two-WAN, two-site topology; its original “before” exhibit is preserved.
- Question 369's after panel now uses a custom SW-to-PC Gig0/1 drawing and terminal; its original before panel is pixel-identical to the previous PDF (page 144 of 162).
- Question 275's after panel now labels its inter-switch trunk with the configured VLANs 5 and 10 instead of the contradictory VLAN 100.
- Question 246's after panel now uses a distinct route-path layout and replaces the source image with the R14-to-R86-to-destination topology.
- Question 273's after panel now retains the full original dual-WAN topology 1:1.
- Question 339's after panel now retains the original three-router exhibit 1:1 instead of the incorrect switch-centered star.
- Question 387's after panel now retains the original dual-site IPv6/ISP exhibit 1:1 instead of the incomplete redraw.
- Question 403's after panel now uses the route-focused three-router redraw; its original before panel is pixel-identical to the previous PDF.
- Question 1011's after panel now uses a terminal-style redraw of the DHCP configuration; its original before panel is pixel-identical to the previous PDF (page 113 of 162).
- Questions 851 and 852's after panels show their distinct bridge-priority/MAC data without the shared unverified topology; neither original image is available locally.
- Question 624's after panel shows configuration only; Question 204 retains its two-switch topology.
- Question 1099's after panel now uses a distinct four-switch ring redraw; its original before panel is pixel-identical to the previous PDF (page 116 of 162).
- Question 1199's after panel now uses a custom topology redraw with interface labels attached to their links; its original before panel is pixel-identical to the previous PDF (page 121 of 162).
- Question 1321's after panel is configuration-only and matches the original PAT overload exhibit.
- Question 1329 was visually checked: both interface labels sit on their wires, with IP addresses below.
- Focused CCNA tests, targeted lint, and the production build passed after implementation. No commit or push was made.
