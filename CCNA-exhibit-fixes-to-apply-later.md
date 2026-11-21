# CCNA Exhibit Fixes

**Status:** Implemented in the CCNA All Questions Exam source. The sequential local-dev-only “Refer to the exhibit” audit is in progress.

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

## Sequential local-dev review — 2026-11-21

- The offline review ordinals 87, 88, and 89 map to legacy indexes 398, 405, and 406 respectively. These numbers are positions in the Refer-to-Exhibit review list, not question IDs.
- Redrew legacy index 405 (review ordinal 88) with ROUTER-1, the Internet cloud, both switches, all four PCs, the two subnet labels, and the visible `.2`/`.1` labels. The original source image remains available for local review; the regular exam view uses the redraw. The override keys on the legacy index so it does not collide with database question ID 405.
- Checked legacy index 406 (review ordinal 89): its route-table exhibit is present as terminal text and matches the supplied terminal image, so no redraw was needed.
- Review ordinal 90 maps to legacy index 415 and after-exhibit record ID 99. Its original image is marked missing; the available replacement image conflicts with the exhibit text (`EIGRP 4444` vs. `EIGRP 44`). Reconstructed the topology from the mapped text, corrected the R3 label to `EIGRP 44`, and hid the conflicting replacement image. This reconstruction is illustrative because the original image is unavailable.
- Redrew review ordinal 91 (legacy index 421 / mapped record ID 105) from its available original image, including the full `fd00:59:12::/64` and `fd00:59:13::/64` addressing and all four hosts. The previous replacement omitted `59`; it is hidden in exam views, while the original remains in local comparison. The existing answer choices still use the shortened next hops `fd00:12::2` and `fd00:13::3`, so that content mismatch is flagged rather than silently changed.
- Checked review ordinal 92 (legacy index 426): its route-table terminal matches the supplied terminal image. The destination `172.16.1.1` has no more-specific route than the default via `192.168.14.4`, so no redraw was needed.
- Checked review ordinal 93 (legacy index 436): the `192.168.1.0/26` route in the terminal matches the supplied image; no redraw was needed.
- Checked review ordinal 94 (legacy index 452): the OSPF-neighbor terminal is already included inline with the question and supplies the needed DR/BDR states; no additional exhibit was needed.
- Checked review ordinal 95 (legacy index 453): the terminal image matches the routing table; the route to `192.168.10.32/28` has metric 193, consistent with the answer.
- Review ordinal 96 maps to legacy index 460 / record ID 143. The original image says PAgP `desirable` on both switches, which conflicts with the question and answer choices; the corrected record has LACP `passive` on both. Exam views now use the corrected terminal text, and the contradictory original is retained only for local comparison.
- Redrew review ordinal 97 (legacy index 474 / record ID 157) from the question-matched site details. The original image uses different LAN/transit addresses from the prompt and choices; exam views now use the matching native topology, while the original stays available for local comparison.
- Checked review ordinal 98 (legacy index 476): its native R17–R18 IPv6 topology already uses the addresses from the answer choices; no raw image needed replacement.
- Redrew review ordinal 99 (legacy index 478 / record ID 161) as overlapping coverage zones with the three-channel legend. Preserved the source-derived Channel 11 labels on Zones 3 and 4; other per-zone assignments were not recovered. The original is retained for local comparison.
- Checked review ordinal 100 (legacy index 486): the image duplicates the four complete command choices, so the self-contained question now hides that redundant image. Its local review prompt already omits the exhibit lead-in.
- Redrew review ordinal 101 (legacy index 489 / record ID 172) from the source-backed PC/SW1/RTR-1 topology and access-list terminal. Removed the duplicate exhibit lead-in and hid the replacement raster; the original remains in local comparison.
- Checked review ordinal 102 (legacy index 491 / record ID 174): its terminal screenshot and fixed terminal exhibit provide the DHCP-snooping output needed by the question; no redraw was needed.
- Review ordinal 103 (legacy index 494 / record ID 177) already has an option-matched Router A/B/C redraw, but the available original uses different subnets and a next hop (`172.168.177.2`) that conflicts with the prompt's choices. Kept the question-matched redraw for exam use, marked it illustrative, hid the conflicting fixed exhibit, and restored the original source image for local comparison. The source-faithful diagram is not used as the answer exhibit.
- Checked review ordinal 104 (legacy index 495 / record ID 178): the original and fixed R1/R2/R3 internet topology agree on the links, addresses, and primary/backup roles; no redraw change was needed.
- Redrew review ordinal 105 (legacy index 496 / record ID 179) with both management PCs, the router path, all three subnets, visible interface labels, endpoint addresses, and the new server's `172.16.2.2` address. Hid the incomplete fixed raster from exam use and retained the original for local comparison.
- Redrew review ordinal 106 (legacy index 497 / record ID 180) with the IP phone on SW1 and PC on SW2, matching the original topology. Replaced the fixed raster that mislabeled both endpoints as branch hosts; the original remains available for local comparison.
- Checked review ordinal 107 (legacy index 499): the configuration screenshot matches the extracted inline terminal exhibit; no redraw was needed.
- Checked review ordinal 108 (legacy index 500): the inline answer choices already provide the required OSPF configurations, and the existing R14/R86 native topology is present; no source screenshot or further redraw was needed.
- Review ordinal 109 (legacy index 502 / record ID 185) had a fixed terminal that contradicted its source: the original says `10.8.112.46` with mask `0xffffe000`, while the fixed version says `10.8.138.14` with mask `0xffffff00`. Replaced the fixed terminal with a source-faithful text redraw, hid the conflicting fixed image, and retained the original for local comparison. The source values imply `10.8.96.0/19`, which is absent from the choices; the existing answer key was left unchanged and the mismatch is flagged.
- Checked review ordinal 110 (legacy index 504 / record ID 187): the fixed topology includes the printer, both switches, LAN, port labels, and the corresponding SW2 switchport output; no additional redraw was needed.
- Review ordinal 111 (legacy index 505 / record ID 188) had a fixed route table that changed the source's `10.0.1.0/28` EIGRP route to `/29` and its `10.0.1.190/32` OSPF metric from 50 to 5. Replaced the fixed terminal with a source-faithful text redraw, hid the mismatched fixed image, and retained the original for local comparison. The `/28` route correctly covers `10.0.1.15`, matching the existing answer.
- Checked review ordinal 112 (legacy index 506): the inline SiteA/SiteB interface output matches the source terminal image, including the SFP-SR/SFP-LR mismatch; no redraw was needed.
- Review ordinal 113 (legacy index 507 / record ID 190) had an unrelated source image and a fixed triangle of point-to-point networks, neither of which represents the broadcast segment required for OSPF DR election. Replaced them with the existing three-router shared-segment redraw, marked it illustrative, hid the mismatched fixed image, and retained the original for local comparison.
- Checked review ordinal 114 (legacy index 508 / record ID 191): the fixed MAC-learning topology and table agree with the source image. Corrected its accessible exhibit text from `Fa0/11` to `Fa0/1` and restored the source image for local comparison.
- Checked review ordinal 115 (legacy index 509 / record ID 192): the fixed SW1/VLAN 2 topology and command/table output match the source. Corrected the accessible interface label from `Fa0/11` to `Fa0/1`; the original remains available for local comparison.
- Redrew review ordinal 116 (legacy index 510 / record ID 193) with the source's shared `192.24.105.0/24` LAN, R1 Gi0/1 address, and Serial0/1 Internet link. Replaced the mismatched `10.0.1.0/24` star topology, hid the fixed raster, and retained the original for local comparison.
- Checked review ordinal 117 (legacy index 515): its existing native LACP topology already covers both PC groups and both channel members; no original or fixed raster needed replacement.
- Review ordinal 118 (legacy index 519) has no original or fixed image, but its saved explanation contains the three router interface host counts. Added an illustrative native table with those counts so the exhibit lead-in remains useful; the question's 10% growth instruction remains in the prompt and the existing answer stays unchanged.
- Checked review ordinal 119 (legacy index 520 / record ID 203): the source route-table image and fixed terminal agree on the EIGRP-learned `192.168.2.0/24` prefix; no redraw was needed.
- Checked review ordinal 120 (legacy index 521 / record ID 204): the original and fixed EtherChannel topology and all four `channel-group 1 mode on` configurations match. The existing answer choice proposes changing only SW1 to LACP, leaving a potential protocol mismatch with SW2 flagged; choices and grading were not changed.
- Review ordinal 121 (legacy index 522 / record ID 205) had a fixed LLDP terminal showing 30/120 seconds, while the source showed 60/180 seconds. Corrected the exhibit text and raster to match the source, preserving the 2-second reinitialization delay.
- Checked review ordinal 122 (legacy index 523): its OSPF terminal image matches the question's full configuration, and the text/rendered terminal agree; no redraw was needed.
- Review ordinal 123 (legacy index 529 / record ID 212) had a fixed NAT diagram with incorrect PC addresses (`172.16.3.1/.2`) and omitted the source configuration. Added a source-backed shared-LAN topology and complete R1 configuration exhibit; hid the mismatched fixed image while retaining the original for local comparison.
- Checked review ordinal 124 (legacy index 531 / record ID 214): the fixed IP-phone/PC access-port topology and terminal agree with the source VLAN 15 data and VLAN 10 voice setup; no redraw was needed.
- Checked review ordinal 125 (legacy index 533): the terminal image matches its text route list, including the lowest EIGRP metric via F0/11; no redraw was needed.
- Checked review ordinal 126 (legacy index 538): the source terminal correctly shows LACP and port channel 10 members Gi0/0 and Gi0/1; the active/passive selections match the key.
- Review ordinal 127 (legacy index 541 / record ID 224) had a correct shared OSPF topology but omitted its neighbor table. Added the source-backed native topology and exact R1 neighbor output, then hid the incomplete fixed image while retaining the source for comparison.
- Checked review ordinal 128 (legacy index 542): no source image was attached; the existing native R4-to-10.7.54.0 network diagram is sufficient to support the subnet calculation without revealing the mask.
- Review ordinal 129 (legacy index 545 / record ID 228) had a fixed SSH terminal with `CNAC.com` instead of the source's `lab.local`. Corrected the exhibit text and raster to match the source.
- Review ordinal 130 (legacy index 548 / record ID 231) had a fixed exhibit with swapped network labels and an unrelated OSPF neighbor table. Replaced it with the source-backed Management LAN → R1 → R2 → Server topology and exact `show ip route` output. The source route is `10.1.1.0/24` via `172.16.2.2`/Gi0/0; the existing keyed answer is a more-specific `/32` static route, which would take precedence even while OSPF is up. Flagged this answer-choice discrepancy without changing grading.
- Review ordinal 131 (legacy index 551 / record ID 234) had a fixed OSPF topology with unrelated LAN/transit addresses and a `Gii0/11` typo. Replaced it with the source-backed `172.137.191.0/30` Se0/1 link and LANs `172.139.8.0/24` and `10.168.119.0/24`; hid the stale image. The keyed `network 10.0.0.0 0.0.0.255 area 0` choice does not match the source transit network; flagged without changing grading.
- Review ordinal 132 (legacy index 554 / record ID 236) had multiple terminal mismatches, including a false 8,662,416,049 collisions count. Replaced the fixed output with the source-backed interface statistics (`74a0.2f7a.6304`, input/output rates and counts, and zero collisions), and hid the mismatched raster. The keyed duplex-mismatch answer is unsupported by the source's zero-collision output; flagged without changing grading.
- Checked review ordinal 133 (legacy index 558): the existing OSPF neighbor terminal image matches its text, including `EXCHANGE/-`, neighbor address, and Serial0.1; no redraw was needed.
- Checked review ordinal 134 (legacy index 559): the existing terminal image and exhibit text agree on all four route entries and the inbound Serial0/3 detail; the longest-prefix answer `/27` is consistent.
- Review ordinal 135 (legacy index 560 / record ID 242) had the correct PC/switch topology but omitted VLAN 20 and the switch port type/status row. Retained the native topology, added the exact switch status output, and hid the incomplete fixed image; the original remains available locally.
- Review ordinal 136 (legacy index 562 / record ID 244) had a one-router redraw that omitted R0, mislabeled the bottom router, and invented an IPv6 prefix. Rebuilt the source-backed R0–ISP–R1–S2–Host A topology with the `2001:db8:4:1::/64` transit and R1 Fa0/1 MAC `C601.420F.0007`; hid the stale image while retaining the source.
- Review ordinal 137 (legacy index 563 / record ID 245) had a topology-only redraw with malformed interface labels and omitted the source configuration. Retained the correct DHCP client–R1–server topology, added the exact interface configuration, and hid the incomplete image while retaining the source.
- Checked review ordinal 138 (legacy index 564 / record ID 246): the source R14–R86 transit (`10.73.65.64/30`, next hops `.65`/`.66`) and loopbacks match the fixed redraw, which also depicts the prompt's `172.21.34.0/25` LAN behind R86. The keyed static-route choice uses mask `255.255.255.128` and next hop `10.73.65.66`, consistent with the exhibit; no change was needed.
- Review ordinal 139 (legacy index 566 / record ID 248) has a correct primary/backup ISP topology, but its fixed exhibit text had corrupted interface labels (`Gii0/11`, `Gii11/0`, `Gii11/11`). Corrected them to match the source image (`G0/1`, `G1/0`, `G1/1`); the redraw and original topology otherwise agree. The saved primary default-route answer remains unchanged.
- Review ordinal 140 (legacy index 568 / record ID 250) had a redraw showing VLAN 104 where the source clearly says `New VLAN: 300` (on an 802.1Q trunk carrying VLANs 1 and 100–103). Replaced the misleading redraw with source-faithful exhibit text and retained the source image for local comparison. The prompt/options and keyed `add 104` choice conflict with the source; flagged the discrepancy without changing grading.
- Review ordinal 141 (legacy index 569 / record ID 251) had a fixed interface terminal unrelated to the source's ISR interface (`G0/0`, address `74a0.2f7a.1396`) and its counters. Restored the source values, including zero input errors/CRCs, and hid the mismatched raster while retaining the original. The keyed cable-fault answer is unsupported by the source's zero-error output; flagged without changing grading.
- Checked review ordinal 142 (legacy index 570): no source image is attached, but the existing native R1/R2/R3 diagram labels the shared `10.0.4.0/24` network and each router's `Gig0/1` attachment, so it supports the DR-priority question; no change was needed.
- Checked review ordinal 143 (legacy index 572): no source image is attached, but the included route-table terminal has the specific `10.10.13.144/28` route via `10.10.10.9`, which contains host `10.10.13.158`; the keyed next hop is consistent, so no change was needed.
- Checked review ordinal 144 (legacy index 574 / record ID 256): the route-table source and fixed terminal agree on both `10.0.10.0/24` routes, and the keyed EIGRP next hop `10.0.1.5` correctly wins over OSPF; no redraw was needed.
- Review ordinal 145 (legacy index 577 / record ID 259) had a terminal redraw with an incorrect configuration size and punctuation around separators. Restored the source's `1597 bytes` configuration header, hostname, separators, and remaining visible lines; hid the altered raster while retaining the original. The terminal is truncated before SSH settings, so the existing SSH v2 answer was not altered.
- Review ordinal 146 (legacy index 578) had only a raw WLC Security screenshot. Added a source-backed native panel reproducing the visible PMF, WPA/WPA2, encryption, OSEN, and key-management settings, including the unchecked FT 802.1X/FT PSK boxes. Kept the original available for local comparison.
- Review ordinal 147 (legacy index 579 / record ID 261) had a redraw showing VLAN 2, Switch 2's Port-channel in access mode, and invented active/passive LACP commands. The source shows VLAN 20, Switch 2's Port-channel in trunk mode, and no `channel-group` commands. Replaced the mismatched raster with source-faithful configuration text and retained the original. The saved answer's LACP active/passive requirement cannot be verified from this exhibit; flagged without changing grading.
- Checked review ordinal 148 (legacy index 580): no source image is attached, but the inline exhibit lists all four STP priorities and MAC addresses; SW1's lowest priority (`24596`) supports the keyed root-bridge answer.
- Checked review ordinal 149 (legacy index 581): no separate image is attached; the inline R1 configuration clearly shows VLAN 200 in the NAT inside range is missing from `NAT_INSIDE_RANGES`, matching the keyed ACL-update answer. No extra redraw was needed.
- Checked review ordinal 150 (legacy index 586 / record ID 268): the source and redraw agree on the two IP-phone/PC access topologies, data VLAN 50, and voice VLAN 61. Added the exact accessible exhibit text. The keyed command uses voice VLAN 51, so flagged the source/answer mismatch without changing grading.
- Review ordinal 151 (legacy index 588 / record ID 270) had a redraw labeling the OSPF process as area 20, while the source topology says area 10. Corrected the exhibit text; the primary/backup topology and keyed floating-route administrative distance remain consistent.
- Review ordinal 152 (legacy index 591 / record ID 273) had a redraw that replaced the source's two direct router-to-router links with separate WAN clouds. Rebuilt the source layout with direct parallel R1–R2 links on `Gi0/0`/`172.16.0.0/30` and `Gi0/1`/`172.16.0.4/30`, retained the workstation LANs and OSPF configuration, and hid the mismatched raster while keeping the original available locally.
- Review ordinal 153 (legacy index 592 / record ID 274) had a terminal redraw showing CDP packets every 60 seconds, while the source says every 30 seconds. Corrected the text and hid the mismatched raster while retaining the original; no grading discrepancy was found.
- Review ordinal 154 (legacy index 593 / record ID 275) had a redraw that omitted the source's VLAN 100 inter-switch label. Rebuilt it with the original VLAN 5/10 endpoint topology and VLAN 100 link label, plus the exact SW2 Fa0/1 configuration; hid the altered raster and retained the source. The image's VLAN 100 label conflicts with the allowed list `5,10`; preserved both source details and left the keyed trunk answer unchanged.
- Review ordinal 155 (legacy index 599) had only a raw WLC Security screenshot. Added a source-backed native panel for its Enterprise security type, WPA2/WPA3 policies, CCMP128(AES), ASCII PSK, and checked/unchecked key-management settings. Kept the source image for local comparison. The screenshot does not show a PMF control despite the keyed `PMF Required` answer; flagged without changing grading.
- Review ordinal 156 (legacy index 602 / record ID 284) had malformed accessible labels (`Gii11/...`) and a fixed raster rather than the native three-link redraw. Corrected labels to `G1/1`–`G1/3`, switched to the source-backed native topology, and retained the original image for comparison.
- Review ordinal 157 (legacy index 603) had only a raw WLC RADIUS-server screenshot. Added a source-backed native panel reproducing the `192.168.11.2` server, port 1812, timeout 2 seconds, and all visible enabled/disabled fields. The source confirms Network User is unchecked, consistent with the keyed action to enable it; source image remains available locally.
- Review ordinal 158 (legacy index 612) had only a raw WLC Layer 2 screenshot. Added a source-backed native panel reproducing Layer 2 Security `None`, the unchecked WPA/802.1X settings, PMF `Disabled`, and other visible controls. The answer's WPA+WPA2 and 802.1X steps are consistent with the displayed fields; the source remains available for local comparison.
- Checked review ordinal 159 (legacy index 613): the inline LLDP terminal contains the peer name and management address. The keyed command disables only the management-address TLV on Cat9K-2, consistent with hiding that address without disabling LLDP; no extra exhibit was needed.
- Review ordinal 160 (legacy index 616) had only a raw OSPF exhibit. Expanded the source-backed native shared-segment redraw with the complete link labels, network/area ellipse, and exact neighbor table; retained the source image for comparison. The source neighbor addresses (`192.168.100.x`) differ from topology addresses (`10.10.10.x`), so noted that internal inconsistency while leaving the keyed DR priority unchanged.
- Review ordinal 161 (legacy index 618 / record ID 300) had a fixed Puppet exhibit with `auto_cost => '100'`, while the source says `1000`. Corrected the exhibit text and hid the mismatched raster while retaining the original; no issue with the keyed Puppet answer was found.
- Review ordinal 162 (legacy index 621 / record ID 303) had only a raw JSON screenshot. Added a source-backed formatted JSON text exhibit with the Router and Switch arrays and retained the original for local comparison. The keyed “value” answer is consistent.
- Review ordinal 163 (legacy index 622 / record ID 622) had a raw SW4 terminal screenshot. Recreated the two visible interface snippets in a source-backed terminal redraw; retained the original through the local-only source-image comparison list and did not infer text beyond the screenshot.
- Review ordinal 164 (legacy index 624 / record ID 624) says “Refer to the exhibit,” but has no source exhibit or usable option text (options are only “Option A”–“Option D”). The same-numbered `ccna-after-exhibit-624.png` is an unrelated switch configuration, so it was not used. Removed the unsupported exhibit lead-in as requested and left the answer key unchanged; the options still need the missing source material to be made answerable.
- Review ordinal 165 (legacy index 627 / record ID 627) already has an exact inline ARP-inspection terminal exhibit. Hid its duplicate raster, retained the image for local source comparison, and verified the text agrees; no grading discrepancy was found.
- Review ordinal 166 (legacy index 628 / record ID 628) has an existing fixed route-table exhibit. Compared its source and redraw; all route prefixes, protocol codes, next hops, interfaces, and metrics agree, and the keyed internal-EIGRP route is supported.
- Review ordinal 167 (legacy index 629 / record ID 629) had a redraw with incorrect R1/R2 transit ports and omitted all three `.1`/`.2`/`.3` endpoint labels and LAN-side Gi0/0 labels. Corrected the existing native topology, retained the source image for local comparison, and hid the mismatched fixed raster. The keyed next hop `10.0.4.3` now maps to R3.
- Review ordinal 168 (legacy index 635 / record ID 635) had a dual-circuit redraw that omitted the source endpoint addresses `.1`, `.2`, `.5`, and `.6`. Added the endpoint labels and replaced the fixed raster with a native topology plus the exact R1/R2 route tables; the source image remains available locally. The keyed floating routes use the secondary-link next hops `.6` and `.5` with AD 2.
- Review ordinal 169 (legacy index 641 / record ID 641) already has an inline route-table terminal matching the source screenshot, including the default route and both connected subnets. Hid its duplicate raster, retained it for local comparison, and verified the keyed next hop `10.56.0.1`.
- Review ordinal 170 (legacy index 645 / record ID 645) already has a fixed VLAN 200 PC-to-PC topology that matches the original source. Added the original to the local-only source-image comparison list; kept the accurate redraw and grading unchanged.
- Review ordinal 171 (legacy index 646 / record ID 646) had a fixed OSPF topology missing the two IP phones and two PCs per site, using wrong switch names, and placing the transit Gi0/0 labels on the LAN links. Rebuilt it with source switch/endpoint names, the Gi0/0 transit labels and `.1`/`.2` addresses, and both LAN prefixes. Kept the original image available for local comparison and hid the mismatched fixed raster.
- Review ordinal 172 (legacy index 651 / record ID 651) has a fixed four-router OSPF topology matching the source, including router IDs, interface labels, and current DR/BDR. Flagged that setting R2 priority 100 alone will not preempt an already-elected R1 DR; left grading unchanged.
- Review ordinal 173 (legacy index 655) has a source terminal matching its inline configuration. No topology redraw is needed. The keyed answer C is the intended LACP solution, but the original prompt and option described a static EtherChannel changing to passive mode, which is not precise. Clarified the offline-review prompt, option C, and explanation: the first device is LACP active and the neighbor must use LACP passive. Kept answer index C and the source image for local comparison.
- Review ordinal 174 (legacy index 656) has a route-table source and fixed terminal with matching protocol entries, prefixes, next hops, metrics, and interfaces. The destination `10.1.2.126` is covered by the static `10.1.2.112/28` route, so option C (`10.165.20.166`) is correct; no topology or exhibit change was needed. The sequential audit continues at ordinal 175.
- Review ordinal 175 (legacy index 657) has the three-router/three-LAN topology. It shows PC1 (`10.0.0.5`) on the `172.16.0.0/24` branch, the shared `10.0.0.0/24` LAN, and the separate `192.168.0.0/24` branch. Option D correctly routes the broader LAN via `192.168.0.2` and the PC1 `/32` via `172.16.0.2`; no topology or exhibit change was needed. The provided image is already marked as a fixed exhibit, and no separate source image was available for comparison.
- Review ordinal 176 (legacy index 661) has a two-router OSPF DR-election topology and R1 configuration. The WAN is `10.0.0.32/27`, with R1 at `.33` and R2 at `.34`; option D assigns R2 `.34/27` and priority 100, exceeding R1's 99. Left the redraw and key unchanged; noted that an OSPF priority change only affects a subsequent election because an existing DR is not preempted. The supplied image is already labeled as a fixed exhibit, with no separate original available.
- Review ordinal 177 (legacy index 662) had only a fixed four-router topology; the original exhibit is missing, and no route table was provided. Added Host B's `10.10.13.0/25` network and an illustrative R1 route-table terminal reconstructed from the answer options and explanation. Corrected option A's prefix to `0.0.0.0/0`, as the explanation identifies it as the default route. Kept answer D: its static route's AD 108 beats OSPF's 110 for the same `/25`, while the default route is less specific.
- Review ordinal 178 (legacy index 663) uses a Windows IP configuration exhibit. Kept the two DNS server addresses needed to answer the question, redacted the host-specific identifiers from its accessible text, and hid both the raw source image and unredacted fixed image in the offline review. Answer B (`192.168.1.253`) remains correct.
- Review ordinal 179 (legacy index 667) has a route-table terminal in both the prompt and fixed image. Destination `10.1.1.19` matches RIP `10.1.1.16/28`, which is more specific than the competing OSPF `/24` and EIGRP `/8` routes, so option A (`F0/0`) is correct; no redraw or answer change was needed.
- Review ordinal 180 (legacy index 674) had a fixed topology labeling the shared transit as `10.0.0.0/24`, conflicting with the prompt's `10.0.20.0/24`, and omitted the R1 and R3 LANs. Hid that image in the offline review and added an explicitly illustrative R1/R2/R3 topology with R1 LAN `10.0.0.64/26`, shared transit `10.0.20.0/24`, and R3 LAN `10.0.15.0/24` / next hop `10.0.20.3`. Kept answer D; the original topology is unavailable.
- Review ordinal 181 (legacy index 679) shows a WLC Layer 2 security page. The source and fixed images match on WPA+WPA2, Adaptive Fast Transition, Over-the-DS, the timeout, WPA2/AES, and the current key-management selections. The keyed answer C correctly requires enabling Fast Transition and FT 802.1X; no exhibit redraw or answer change was needed.
- Review ordinal 182 (legacy index 682) shows nested JSON data. The original source image and fixed exhibit match; counting the nine JSON objects supports option D (`nine`). No redraw or answer change was needed.
- Review ordinal 183 (legacy index 684) has an inline route-table terminal and a fixed terminal rendering. Both show `10.10.13.160/29`, so option D (`255.255.255.248`) is correct. The separate original image is unavailable; unrelated formatting noise in the terminal does not affect the answer, so no redraw or answer change was made.
- Review ordinal 184 (legacy index 685) has a source-backed R1–R2–R3 neighbor-discovery topology. Corrected the accessible fixed-exhibit text's malformed interface labels to state that R2's Gi0/1 connects to R1 and Gi0/2 to R3. Option D correctly disables CDP on R2's Gi0/2 while retaining its R1 relationship.
- Review ordinal 185 (legacy index 687) has a source-backed switch-to-PC topology and port-security configuration; the fixed redraw matches both. The keyed choices B (`maximum 2`) and E (`violation restrict`) meet the requirements. Corrected the review explanation: sticky learning is dynamic too, but it additionally persists learned addresses in the running configuration, which was not requested.
- Review ordinal 186 (legacy index 689 / record ID 371) had a fixed redraw labeling Router1's serial address as the network address `192.168.0.0/30` and omitting Switch1's `10.10.10.2/24`. Replaced it in the offline review with a source-faithful topology showing Router1/Router2 S0/0 addresses, Router2 Gi0/0, Switch1, and the server. Retained the original for comparison and kept answer A: the host route to `10.10.10.10/32` uses next hop `192.168.0.2`.
- Review ordinal 187 (legacy index 695) has matching source and fixed WLC Advanced-tab exhibits. FlexConnect Local Switching is unchecked, so option B is correct. No redraw or answer change was needed.
- Review ordinal 188 (legacy index 701) had a terminal with a placeholder for missing static-route configuration output. Removed the placeholder and "Refer to the exhibit" lead-in from the offline review, retained the available ping and route-table evidence as text, corrected obvious terminal typos, and hid the incomplete screenshot. Marked the reconstruction illustrative and noted that the missing configuration prevents verifying the static route's exact administrative distance. Kept answer A for the intended floating-static-route behavior.
- Review ordinal 189 (legacy index 702) has no original or fixed exhibit image. The question and explanation already state the local-EAP and unlimited-access requirements, so removed the "Refer to the exhibit" lead-in rather than inventing a WLC screenshot. Answer D (uncheck Guest User) remains correct. The sequential audit continues at ordinal 190 (legacy index 704).
- Review ordinal 190 (legacy index 704) had an unrelated fixed image and an inaccurate redraw: the source shows two separate LANs and PC1's MAC as `00:50:79:66:68:62`, while the keyed option used `...6800`. Replaced the offline-review exhibit with a source-backed topology/table, removed the unrelated fixed exhibit, and corrected the static MAC command to `0050.7966.6862`. The access-mode/port-security answer remains B. The sequential audit continues at ordinal 191 (legacy index 705).
- Review ordinal 191 (legacy index 705) already had a source-faithful redraw; retained it and added an offline-only accessible description. Answer D is the intended global-unicast choice, but `2001:db8::/32` is reserved for documentation, so the literal address cannot provide public Internet access. Added that caveat to the offline explanation without changing the keyed answer. The sequential audit continues at ordinal 192 (legacy index 707).
- Review ordinal 192 (legacy index 708) contains the current and desired OSPF neighbor outputs in both its prompt and exhibit. The exhibit matches the source; retained it and clarified that a point-to-point network type removes DR/BDR election, producing FULL/-. Answer C remains correct. The sequential audit continues at ordinal 193 (legacy index 711).
- Review ordinal 193 (legacy index 711) had a badly scrambled text exhibit, while the prompt contained the source configurations. Rebuilt the four configuration sets as readable source-backed terminal text in the offline review, hid the broken image, and removed the redundant exhibit lead-in. Answer D remains correct: it sets native VLAN 5 on the required trunks, excludes VLAN 1, and retains trunk mode where the required VLANs must pass. The sequential audit continues at ordinal 194 (legacy index 712).
- Review ordinal 194 (legacy index 712) already has an accurate terminal redraw that matches the prompt output; no image changes were needed. The exhibit shows Fa0/1 `down/down` and `notconnect`, supporting the keyed answer D (wrong cable type) among the choices. No corresponding after-exhibit record exists for this item, so the unrelated WLC image file is not part of the review. The sequential audit continues at ordinal 195 (legacy index 714).
- Review ordinal 195 (legacy index 714 / record ID 396) had a fixed link image labeling the interfaces `GigabitEthernet0/0/0`, but the source labels both ends `GigabitEthernet0/0`. Added a source-faithful, offline-only R1–R2 diagram and hid the mismatched fixed image. Added an explanation for answer A: a /29 provides six usable addresses, so after using two for the link, four remain for growth. The sequential audit continues at ordinal 196 (legacy index 716).
- Review ordinal 196 (legacy index 716) showed `2001:0db8:fff:fcf3::/64` in the fixed image, while the prompt's valid command and explanation use `2001:DB8:FFFF:FCF3::/64`. Added an offline-only redraw with the correct prefix; retained the site topology but marked the exhibit partial because the original image is unavailable. Answer A remains correct for EUI-64 address assignment. The sequential audit continues at ordinal 197 (legacy index 717).
- Review ordinal 197 (legacy index 717 / record ID 399) had no original image and a reconstructed topology with a questionable “five-router” description. Used only the available NTP commands in the offline review, removed the unsupported topology and exhibit lead-in, normalized the four answer choices, and corrected the first choice to “R1 and R2”; both have `ntp server` commands, while no R3 client configuration is available. The reconstruction is marked partial. The sequential audit continues at ordinal 198 (legacy index 719).
- Review ordinal 198 (legacy index 719) has a readable terminal redraw that matches the routing table in the prompt. Kept answer D; the route to `192.168.2.2` uses `192.168.2.0/29` because it is more specific than the overlapping /28 route. Added a concise longest-prefix explanation. The sequential audit continues at ordinal 199 (legacy index 720).
- Review ordinal 199 (legacy index 720) showed malformed JSON-like source text. Replaced the unreadable raster with a readable terminal-style exhibit, retained the source's missing commas rather than silently changing its content, and removed the exhibit image. The test confirms the word `warning` is inside `myCar.wheels`; the sequential audit continues at ordinal 200 (legacy index 721).
- Review ordinal 200 (legacy index 721 / record ID 403) had a redraw that replaced the source routers R2 and R3 with generic “primary” and “backup” routers. Redrew the triangle in its source topology and retained the R1/R2/R3 labels, all six source subnets, the two `Gi0/0` labels, and R1's primary and floating-default-route commands. Answer A remains correct: the route via `172.16.20.2` has the default administrative distance and is preferred over the `10.0.0.2` route with distance 20. The next ordinal is 201 (legacy index 723).
- Review ordinal 201 (legacy index 723 / record ID 405) used a redraw that collapsed the four source PCs into one subnet icon per switch. Replaced it in the offline review with the source layout: ROUTER-1 and Internet, both switches, all four PCs, the two `192.168.1.0/24` LANs, and PAT address `209.165.202.129`. Answer D remains correct because it uses the /32 PAT pool address and permits the /24 LAN with wildcard `0.0.0.255`. The next ordinal is 202 (legacy index 724).
- Review ordinal 202 (legacy index 724 / record ID 406) had no original exhibit image; the associated fixed image showed a `cdp run` configuration unrelated to the LLDP question. Removed that image and terminal text from the offline review, removed the redundant exhibit lead-in, and replaced it with a clearly labeled illustrative switch–phone–PC topology using only the available exhibit description. The keyed answer D remains, with the existing explanation noting that the choices omit the global `lldp run` command. The next ordinal is 203 (legacy index 729).
- Review ordinal 203 (legacy index 729) has a readable terminal exhibit that exactly matches the three ACL commands shown in the prompt. Kept it unchanged; answer C is supported because `ip access-list 10 in` is not the interface command for applying the ACL (`ip access-group 10 in` is). The next ordinal is 204 (legacy index 730).
- Review ordinal 204 (legacy index 730) has a readable terminal exhibit that matches the routing table in the prompt. Kept it unchanged; destination `10.10.8.14` matches the connected `10.10.8.0/28` route, so the subnet mask is `255.255.255.240` (answer B). The next ordinal is 205 (legacy index 732).
- Review ordinal 205 (legacy index 732 / matching candidate ID 414) had no matching image asset. Replaced the empty/mismatched image with the existing source-backed WLC settings exhibit for this exact guest-web-authentication question. It shows Layer 2 Security = None, MAC Filtering unchecked, and Layer 3 Web Auth enabled, matching answers A and D. The next ordinal is 206 (legacy index 736).
- Review ordinal 206 (legacy index 736) has a readable source terminal matching its routing table; retained it. Hid the unrelated QoS after-image. For 172.16.0.202, the /25 OSPF route is more specific than the /24 static route and the /29 does not cover the address, so the metric is 32445 (answer C). The next ordinal is 207 (legacy index 738).
- Review ordinal 207 (legacy index 738) has a readable terminal exhibit matching the prompt. Kept it unchanged; 10.10.10.3 matches the /28 route, making option C the best route by longest-prefix match. The next ordinal is 208 (legacy index 747).
- Review ordinal 208 (legacy index 747) embeds matching R1/R2 `show ip ospf interface` output and the four configuration choices directly in the prompt; no separate source image is present. Kept the readable text exhibit. Answer A aligns R2's hello/dead intervals with R1's; the next ordinal is 209 (legacy index 754).
- Review ordinal 209 (legacy index 754 / record ID 436) had an after-image with link subnets and interface labels not supported by the available source. Replaced it in the offline review with a partial three-router diagram using only the two next-hop values, destination subnet, and host from the prompt/options. Answer D is retained, but A and D are both host-specific routes and differ only in administrative distance; with the original exhibit missing, the evidence does not establish why D is uniquely required. Flag this for a later answer-choice audit. The next ordinal is 210 (legacy index 756).
- Review ordinal 210 (legacy index 756) has a readable terminal exhibit matching all four network/mask entries in the prompt. Kept it unchanged; 192.168.10.5 matches entry 2's /26, the most specific matching prefix (answer B). The next ordinal is 211 (legacy index 758).
- Review ordinal 211 (legacy index 758) has a readable route-table terminal matching the prompt. Kept it unchanged; 172.18.32.38 falls in the connected 172.18.32.36/30 route, so the packet exits GigabitEthernet0/0 (answer A). The next ordinal is 212 (legacy index 760).
- Review ordinal 212 (legacy index 760 / record ID 442) had a fixed exhibit showing `255.255.255.248`, which conflicts with the available explanation that the PC has `255.255.255.192` while the gateway is `10.2.2.1/27`. Hid the mismatched image and its related after-image, then added a partial offline redraw with those values and the missing-source caveat. The answer remains A (Subnet Mask).
- Review ordinal 213 (legacy index 769) has no available original image. Kept the existing explicitly illustrative JSON sample because it contains one correctly bracketed JSON object and supports the question; hid the unrelated OSPF after-image.
- Review ordinal 214 (legacy index 770 / question ID 452) had no original image; the associated after-image invented a three-switch layout and three-link channel. Hid it in the offline review and added a clearly labeled partial diagram showing only SW1, SW2, Port Channel 1, and the two SW2 ports named in the prompt. The keyed answer D (`port-channel min-links 2`) remains. The next ordinal is 215 (legacy index 772).
- Review ordinal 215 (legacy index 772) has a readable `show interface` terminal embedded in the prompt and a matching source terminal image. Kept it unchanged; the unusually high output-drop count supports port oversubscription (answer C). The next ordinal is 216 (legacy index 778).
- Review ordinal 216 (legacy index 778) had a cropped terminal image repeating Option A's commands, while the prompt already contains all four configuration choices. Replaced the raw image in the offline review with a readable terminal redraw of the visible source commands. The next ordinal is 217 (legacy index 782).
- Review ordinal 217 (legacy index 782) has a readable `show protocols`, ACL, and NAT-statistics terminal matching the prompt, including the empty outside-interface list. Kept it unchanged; the missing NAT outside interface supports answer B. The next ordinal is 218 (legacy index 788).
- Review ordinal 218 (legacy index 788) has a readable route-prefix exhibit in both the prompt and source image. Kept it unchanged; `192.168.12.16` matches the RIP `/27` but not OSPF `/28`, so the longest matching route is RIP (answer A). The next ordinal is 219 (legacy index 790).
- Review ordinal 219 (legacy index 790) has a readable IPv6 route-table terminal matching the prompt. Kept it unchanged; the existing `::/0` route has administrative distance 2, so the floating route needs a higher value (answer B). The next ordinal is 220 (legacy index 794).
- Review ordinal 220 (legacy index 794) had an unrelated WLAN topology after-image and a web-auth candidate panel that did not match the client-limit question. Hid both in the offline review and added a clearly labeled partial WLC panel showing USERWL's Maximum Allowed Clients = 125, the only values supported by the question and explanation. The keyed answer A remains. The next ordinal is 221 (legacy index 797).
- Review ordinal 221 (legacy index 797) had no original image; the associated after-image showed the supported dual-ISP/CPE/Headquarters topology and next-hop addresses. Replaced it in the offline review with a partial redraw that keeps only those known nodes, links, and addresses and labels the missing-source limitation. The keyed answers B and E remain. The next ordinal is 222 (legacy index 798).
- Review ordinal 222 (legacy index 798) has a readable SSH configuration terminal matching the prompt and source image; the fixed image repeats the same configuration. Kept it unchanged; answer C adds the local user with an encrypted secret. The next ordinal is 223 (legacy index 800).
- Review ordinal 223 (legacy index 800) has a readable route-table terminal matching the prompt and source image, including the source's `GigabitKthernet0/0` typo. Kept it unchanged; `172.16.4.0/21` has mask `255.255.248.0` (answer B). The next ordinal is 224 (legacy index 802).
- Review ordinal 224 (legacy index 802) had no original image; the associated dual-site IPv6 after-image does not show the EUI-64 MAC detail and includes unverified topology. Hid it in the offline review and added a partial R2-LAN exhibit using the explanation's MAC and the prefix from the choices. Flagged the answer inconsistency: `12A0.ABDD.0002` yields `10A0:ABFF:FEDD:0002`, which is not the keyed option A (`...FECC:1`). The answer key is unchanged.
- Review ordinal 225 (legacy index 804) had no original image; the associated after-image adds host groups and a range of member ports not established by the prompt. Replaced it in the offline review with a partial two-switch/channel-group redraw showing only the stated 1000 Mbps/full-duplex settings. Answer D is retained but flagged for the answer audit because `channel-group 1 mode passive` is shown under `interface port-channel 1`; LACP mode is configured on member interfaces. The next ordinal is 226 (legacy index 806).
- Review ordinal 226 (legacy index 806) has a readable JSON exhibit in the prompt and a matching source image. Kept it unchanged; the three array properties match answer B. The next ordinal is 227 (legacy index 807).
- Review ordinal 227 (legacy index 807) has a readable `show interface` terminal matching the prompt and source image, including the collision count. Kept it unchanged; 15,000 collisions support a duplex mismatch (answer A). The next ordinal is 228 (legacy index 808).
- Review ordinal 228 (legacy index 808) has a readable EtherChannel summary in the prompt and matching source terminal. Kept it unchanged; the output shows PAgP, so LACP active on Fa1/1 is appropriate for the multivendor peer (answer D). The same-numbered after-image is mapped to a different legacy question and is not used here. The next ordinal is 229 (legacy index 809).
- Review ordinal 229 (legacy index 809) contains the full four-option configuration table and requirements in the prompt; no separate image asset exists. Kept the readable text. Flagged the answer for later review because the explanation admits Option B requires a separate `enable` step and therefore does not meet the stated full-access-on-login requirement. The next eligible exhibit prompt is after the intervening non-exhibit questions.
- Review ordinal 230 (legacy index 816) has a readable R7 routing-table terminal matching the prompt and source image. Kept it unchanged; the default route exists, the `D EX` entries indicate EIGRP redistribution, and `10.90.8.0/24` is sent to the Null0 `/16` route (answer D). The next ordinal is 231 (legacy index 817).
- Review ordinal 231 (legacy index 817) has a readable route table in the prompt and matching source image. Kept it unchanged; `172.16.3.254` falls in the connected `172.16.2.0/23` route, giving mask `255.255.254.0` (answer B). The next ordinal is 232 (legacy index 824).
- Review ordinal 232 (legacy index 824) had an unrelated fixed image; added a partial R14–R86 floating-route redraw using only the source-supported transit and LAN details, and hid the mismatched images.
- Review ordinal 233 (legacy index 829) reuses the existing source-backed DHCPv6 LAN redraw and hides the unrelated JSON after-image in the offline review. The redraw matches the mapped source image. Focused exhibit regressions, the composite exhibit suite, ESLint, and `git diff --check` passed.
- Review ordinal 234 (legacy index 830) keeps the prompt's readable `show ip route` terminal as the exhibit, hides the duplicate raster exhibit, removes the stale lead-in, and preserves the keyed router-D route. Mirrored the text-exhibit behavior into `applyNativeExhibit()` for live/legacy matching. Resume at the next eligible refer-to-exhibit ordinal.
- Review ordinal 235 (legacy index 834) was already handled out of sequence with a source-backed R14–R86/PC10 host-route redraw.
- Review ordinal 236 (legacy index 835) had a mismatched TCP/UDP source image and reused the wrong PC10 after-image. Replaced it offline and in the shared live/legacy exhibit map with the existing source-backed R86 static route to R14's `172.16.34.0/29` topology, hiding both mismatched images.
- Ordinals 237–375 were completed through a batch pass using the existing source-backed, partial, and illustrative exhibit system. Missing or mismatched rasters were hidden where a prompt terminal or native redraw already provided the needed evidence. Raw and incomplete exhibits were converted or clearly labeled rather than guessed as source-backed facts. Answer keys were preserved; source/answer conflicts remain documented by exhibit quality and focused regressions.
- Added the final unresolved-gap pass: legacy indexes 452 and 747 now use source text from their prompt terminals, while indexes 624, 809, and 1148 have stale exhibit lead-ins and unrelated/missing exhibits removed rather than being guessed. These offline fixes are mirrored into the shared live/legacy exhibit path.
- Added a consistency regression proving every item in the 375-question offline Refer-to-Exhibit bank either has an exhibit or an explicit cleanup. A final live/legacy mirror sweep found 389 refer-to-exhibit legacy prompts, with 95 native-fix contexts and 80 hidden duplicate/mismatched rasters.
- Continued the all-exam pass after the main push. Added source-backed live/offline evidence for legacy/database IDs 840 (missing Site B route) and 870 (802.1Q inter-company trunk). Added source-derived text for legacy/database 624, 1041, and 1067 and hid mismatched rasters. Updated the candidate-reconstruction count and added focused live/offline regressions.
- Source contradictions that cannot be resolved from the available exhibits remain explicitly partial: 848, 856, 876, and 884. No answer keys were changed.
- Improved the remaining partial cases from available evidence: 848 now separates PC1 LAN, R1–R2 transit, and destination routes; 856 identifies MDF-DC-3 and its keyed MAC; 876 preserves the source/answer network mismatch; 884 clearly preserves the DHCP server/helper-address conflict. Answer keys remain unchanged.
- Noah branch alignment: replaced the CCNA exhibit subsystem with the tested `main` versions and reapplied route/trunk source-backed fixes for 840 and 870, plus partial text cleanup for 624, 1041, and 1067. Offline cached-bank and restored-session paths now reapply native exhibits and invalidate the old CCNA cache.
- Final validation passed: all 135 CCNA bank-converter regressions passed, all 37 shared composite-exhibit regressions passed, and `git diff --check` passed. No commit or push was made.
- The user’s supplied production screenshot was handled out of sequence (offline review position 235 / legacy index 834; database question 516). Its R14–R86/PC10 topology was not in the native exhibit map, and the linked fixed image was the unrelated AAA activity. Added a source-backed R14–R86 transit/LAN/PC10 redraw, hid the unrelated fixed exhibit and source raster, and preserved the `/32` host-route answer via `10.73.65.66`.

## User-supplied image bundle audit — 2026-11-20

- Added 349 original exhibit images and 81 corrected exhibit images from `Images.zip`, plus a 349-row mapping from legacy question indexes to live question-bank IDs. The 81 corrected images include 71 new files and 10 updated versions.
- The bundled legacy bank has 1,319 questions, including 388 “Refer to the exhibit” prompts. The ZIP provides original images for 348 of those prompts; 40 still have no matching source or corrected image and were not guessed: 340, 341, 452, 519, 624, 702, 732, 747, 769, 799, 809, 836, 844, 883, 888, 911, 920, 962, 963, 982, 1028, 1041, 1067, 1076, 1110, 1112, 1114, 1143, 1148, 1152, 1154, 1159, 1170, 1188, 1199, 1206, 1227, 1232, 1245, and 1281.
- The local built-in bank now retains 349 refer-to-exhibit legacy questions; the 40 without exhibits remain excluded rather than shown without required context. The offline legacy bank includes 339 valid refer-to-exhibit questions; nine additional image-backed prompts remain excluded by its existing question validation.
- The live question-bank API was unavailable during this pass. The local fallback mapping is covered by regression tests, but live Supabase question rows were not verified. These changes have not been pushed.
- Legacy question 102 (index 1138) has a source image that repeats the answer choices instead of showing the referenced switch configuration. The misleading exhibit reference is now removed and the duplicate image hidden rather than inventing a topology.

## Legacy question 476 — R17/R18 IPv6 WAN reachability

- Replace the unavailable placeholders with the addresses in the answer choices: R17 Fa0/0 `2001:DB8:2::201/64`, R17 Fa1/0 `2001:DB8:3::201/64`, R18 transit `2001:DB8:3::301/64`, and R18 WAN `2001:DB8:4::302/64`.
- Show the R17–R18 transit as `2001:DB8:3::/64` and the WAN network as `2001:DB8:4::/64`.

## Answer-derived topology details

- SW11's correct configuration uses Data VLAN 8 on Gi1/1 and Gi1/3, with Voice VLAN 9 on Gi1/3.
- SW1's Gi1/1 uses Data VLAN 300 and Voice VLAN 400.
- Router A disables CDP on Gi0/0/0, leaving Gi0/0/1 enabled toward Router C.
- The SW1/SW2 EtherChannel uses trunking on Gi0/1 and Gi0/2, with LACP active on SW1 and passive on SW2.
- PC2 is `192.168.2.10`; ACL 1 is applied outbound on R2 Gi0/1 to deny PC2 and permit other traffic.

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

## Legacy question 835 — R86 static route to R14

- Replace the source screenshot with a native topology showing R86 reaching `172.16.34.0/29` through R14 over `10.73.65.64/30`.
- Label R14 as `.65` and R86 as `.66` on Fa0/0; place the destination network on R14 and hide the source image's unrelated R86 LAN.

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
