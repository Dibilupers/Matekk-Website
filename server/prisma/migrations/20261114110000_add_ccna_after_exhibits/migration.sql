ALTER TABLE "Questions"
  ADD COLUMN "afterExhibitComparisonNo" INTEGER,
  ADD COLUMN "afterExhibitOriginalStatus" TEXT,
  ADD COLUMN "afterExhibitTitle" TEXT,
  ADD COLUMN "afterExhibitText" TEXT,
  ADD COLUMN "afterExhibitImageUrl" TEXT,
  ADD COLUMN "afterExhibitNeedsCheck" BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN "afterExhibitCheckNote" TEXT;

DO $$
DECLARE
  missing_question_ids INTEGER[];
BEGIN
  SELECT array_agg(expected.id) INTO missing_question_ids
  FROM unnest(ARRAY[1305, 1317, 1012, 441, 23, 65, 70, 99, 177, 506, 534, 187, 190, 191, 214, 234, 250, 268, 270, 328, 333, 386, 452, 476, 486, 538, 580, 707, 724, 740, 769, 773, 811, 870, 1001, 1081, 1089, 1121, 1128, 15, 38, 73, 89, 105, 157, 172, 178, 179, 180, 192, 193, 212, 224, 231, 242, 244, 245, 246, 248, 261, 273, 275, 284, 311, 317, 327, 339, 343, 344, 356, 367, 371, 387, 396, 399, 403, 405, 406, 436, 442, 479, 484, 516, 517, 520, 522, 530, 552, 558, 566, 574, 594, 646, 647, 671, 725, 728, 736, 749, 751, 799, 808, 833, 837, 851, 852, 864, 895, 909, 934, 996, 1011, 1084, 1088, 1099, 1119, 1125, 1167, 1194, 1199, 1321, 13, 34, 39, 143, 174, 185, 188, 203, 204, 624, 205, 228, 236, 251, 256, 259, 274, 300, 310, 338, 345, 369, 920, 928, 933, 1014, 1082, 1097, 1108, 1109, 1127, 1141, 1146, 1148, 1149, 1157, 1168, 1169, 1174, 1329]::INTEGER[]) AS expected(id)
  WHERE NOT EXISTS (SELECT 1 FROM "Questions" q WHERE q.id = expected.id);

  IF missing_question_ids IS NOT NULL THEN
    RAISE EXCEPTION 'Cannot load CCNA after exhibits; missing question IDs: %', missing_question_ids;
  END IF;
END $$;

WITH after_exhibits (question_id, comparison_no, original_status, exhibit_title, exhibit_text, image_url, needs_check, check_note) AS (
VALUES
  (1305, 5, 'present', NULL, NULL, NULL, TRUE, 'no text extracted - check PDF'),
  (1317, 7, 'present', NULL, 'C:\> ipconfig /all
Windows IP Configuration
 Host Name . . . . . . . . . . . . : CCNA-LAB
 Node Type . . . . . . . . . . . . : Mixed
 IP Routing Enabled. . . . . . . . : No
 WINS Proxy Enabled. . . . . . . . : No
Wireless LAN adapter Local Area Connection* 6:
 Description . . . . . . . . . . . : Microsoft Wi-Fi Direct Virtual Adapter
 Physical Address. . . . . . . . . : [redacted]
 DHCP Enabled. . . . . . . . . . . : Yes
 Autoconfiguration Enabled . . . . : Yes
Wireless LAN adapter Wi-Fi:
 Description . . . . . . . . . . . : Intel(R) Dual Band Wireless-AC 8260
 Physical Address. . . . . . . . . : [redacted]
 DHCP Enabled. . . . . . . . . . . : No
 Autoconfiguration Enabled . . . . : Yes
 IPv4 Address. . . . . . . . . . . : 192.168.1.20 (Preferred)
 Subnet Mask . . . . . . . . . . . : 255.255.255.0
 Default Gateway . . . . . . . . . : 192.168.1.1
 DNS Servers . . . . . . . . . . . : 192.168.1.15
 192.168.1.16
 NetBIOS over Tcpip. . . . . . . . : Enabled', NULL, FALSE, NULL),
  (1012, 8, 'present', NULL, NULL, 'questions/ccna-after-exhibit-1012.png', TRUE, 'no text extracted - check PDF'),
  (441, 9, 'missing', NULL, NULL, 'questions/ccna-after-exhibit-441.png', TRUE, 'no text extracted - check PDF'),
  (23, 10, 'present', 'HEADQUARTERS SPANNING-TREE TOPOLOGY', 'Four switches connect two HQ hosts across the same LAN.
HQ1 HQ2
Switch 1 Switch 2
Switch 3 Switch 4', 'questions/ccna-after-exhibit-23.png', FALSE, NULL),
  (65, 11, 'missing', NULL, NULL, 'questions/ccna-after-exhibit-65.png', TRUE, 'no text extracted - check PDF'),
  (70, 12, 'missing', NULL, NULL, 'questions/ccna-after-exhibit-70.png', TRUE, 'no text extracted - check PDF'),
  (99, 13, 'missing', 'R4 MIXED-PROTOCOL ROUTING TOPOLOGY', 'R4 connects to R1 with OSPF, R2 with BGP, and R3 with EIGRP; the server is 10.10.10.10.
R1
OSPF area 20
R4
BGP AS 65513
R2
BGP AS 65512
R3
EIGRP 44
Server LAN
10.10.10.10
OSPF area 20
BGP
EIGRP 777', 'questions/ccna-after-exhibit-99.png', FALSE, NULL),
  (177, 14, 'present', NULL, NULL, 'questions/ccna-after-exhibit-177.png', TRUE, 'no text extracted - check PDF'),
  (506, 15, 'missing', 'R14–R86 EIGRP ROUTE TOPOLOGY', 'R14 reaches R86 over 10.73.65.64/30; the destination LAN on R86 is 10.80.65.0/29.
R14
Loopback0 · 10.10.1.14/32
R86
Loopback0 · 10.10.1.86/32
10.80.65.0/29
10.73.65.64/30 · .65 ↔ .66 · Fa0/0
Fa0/1 · LAN', 'questions/ccna-after-exhibit-506.png', FALSE, NULL),
  (534, 16, 'missing', 'R1–R2–R3 EIGRP TOPOLOGY', 'PC1, PC2, and the application server use separate /24 LANs; R1–R2 and R2–R3 use /30 links.
R1 R2 R3
SW1 SW2 SW3
PC1
192.168.10.10
PC2
192.168.20.20
Application Server
192.168.30.30
10.10.10.0/30 · .1 ↔ .2 10.10.10.4/30 · .5 ↔ .6
192.168.10.0/24 192.168.20.0/24 192.168.30.0/24
R2#show ip route
10.0.0.0/30 is subnetted, 2 subnets
C 10.10.10.0 is directly connected, Serial0/0/0
C 10.10.10.4 is directly connected, Serial0/0/1
D 192.168.10.0/24 [90/2172416] via 10.10.10.1, Serial0/0/0
C 192.168.20.0/24 is directly connected, FastEthernet0/0
D 192.168.30.0/24 [90/30720] via 10.10.10.6, FastEthernet0/1', 'questions/ccna-after-exhibit-534.png', FALSE, NULL),
  (187, 17, 'present', 'PRINTER AND DTP SWITCH TOPOLOGY', 'SW1 connects the printer to SW2; SW2 uses dynamic trunk negotiation on the inter-switch link.
Printer SW1 SW2
Ethernet1/1 Ethernet0/2 Ethernet0/2 Ethernet0/2 LAN
SW2#show interfaces Ethernet0/2 switchport
Name: Ethernet0/2
Switchport: Enabled
Administrative Mode: dynamic auto
Operational Mode: trunk
Administrative Trunking Encapsulation: negotiate
Operational Trunking Encapsulation: dot1q
Negotiation of Trunking: On
Access Mode VLAN: 1 (default)
Trunking Native Mode VLAN: 1 (default)
Administrative Native VLAN tagging: enabled
Voice VLAN: none
Operational private-vlan: none
Trunking VLANs Enabled: 5
Pruning VLANs Enabled: 2-1001
Capture Mode: Disabled', 'questions/ccna-after-exhibit-187.png', FALSE, NULL),
  (190, 18, 'present', 'OSPF DR ELECTION TOPOLOGY', 'Routers A, B, and C share an Ethernet transit network.
Router A Router B
Router C
192.168.2.0/24 · .1 ↔ .2
192.168.1.0/24 · .1 ↔ .2 192.168.3.0/24 · .1 ↔ .2', 'questions/ccna-after-exhibit-190.png', FALSE, NULL),
  (191, 19, 'present', 'HOST-TO-SWITCH MAC LEARNING TOPOLOGY', 'Hosts A–D connect to the access switch on FastEthernet0/1–0/4.
Switch A
Host A Host B Host C Host D
Fa0/11 Fa0/2 Fa0/3 Fa0/4
SwitchA#show mac-address-table
VLAN MAC Address Type Ports
2 887a.a2b6.735c DYNAMIC Fa0/1
2 0d59.5d3a.deaa DYNAMIC Fa0/2
2 1d62.9a53.cc85 DYNAMIC Fa0/3', 'questions/ccna-after-exhibit-191.png', FALSE, NULL),
  (214, 20, 'present', 'IP PHONE AND PC ACCESS-PORT TOPOLOGY', 'The switch access port carries data VLAN 15 and voice VLAN 10 to the IP phone and PC.
SW
IP phone
PC
Data VLAN 15 · Voice VLAN 10
SW#show running-config
interface FastEthernet0/1
switchport access vlan 15
end', 'questions/ccna-after-exhibit-214.png', FALSE, NULL),
  (234, 21, 'present', 'R1–R2 OSPF POINT-TO-POINT TOPOLOGY', 'Transit network 10.0.0.0/30; R1 and R2 each connect to a /24 LAN.
R1 R2
10.0.1.0/24 10.0.2.0/24
Se0/1 · 10.0.0.0/30 · Se0/1
Gii0/11 Gii0/11', 'questions/ccna-after-exhibit-234.png', FALSE, NULL),
  (250, 22, 'present', 'VLAN 104 TRUNK TOPOLOGY', 'Add VLAN 104 to the existing 802.1Q trunk carrying VLANs 1 and 100–103.
SW1 SW2
VLANs 1, 100–103 · 802.1Q · add VLAN 104', 'questions/ccna-after-exhibit-250.png', FALSE, NULL),
  (268, 23, 'present', NULL, NULL, 'questions/ccna-after-exhibit-268.png', TRUE, 'no text extracted - check PDF'),
  (270, 24, 'present', 'OSPF PRIMARY AND BACKUP-ROUTE TOPOLOGY', 'R1 reaches R2 and R3 through OSPF area 20; the R2–R3 LAN is 192.168.20.0/24.
R1
R2 R3
192.168.10.0/24 192.168.30.0/24
192.168.20.0/24', 'questions/ccna-after-exhibit-270.png', FALSE, NULL),
  (328, 25, 'present', 'R1–R2 OSPF WORKSTATION NETWORKS', 'R1 and R2 share 10.0.0.0/30 and each serves a workstation LAN.
R1 R2
SW1 SW2
Workstations
10.0.1.0/24
Workstations
10.0.2.0/24
10.0.0.0/30
Gii0/0 Gii0/0', 'questions/ccna-after-exhibit-328.png', FALSE, NULL),
  (333, 26, 'present', 'OSPF DR AND BDR ELECTION TOPOLOGY', 'Four routers share one OSPF 1 broadcast network; R1 is DR and R3 is BDR.
R1 · DR
RID 192.168.2.8
R2
RID 192.168.2.1
R4
RID 192.168.2.4
R3 · BDR
RID 192.168.2.6
OSPF 1
Gii0/11
Gii0/0
Gii0/11
Gii0/0', 'questions/ccna-after-exhibit-333.png', FALSE, NULL),
  (386, 27, 'present', 'TWO-ROUTER WORKSTATION TOPOLOGY', 'R1 and R2 connect two access switches and four PCs on the 10.0.1.0/24 LAN.
R1 R2
SW1 SW2
PC1 PC2 PC3 PC4
10.0.0.0/30
Gii0/11 Gii0/11
Gii0/2 Gii0/3 Gii0/2 Gii0/3
Workstation MAC address
PC1 00:50:79:66:68:00
PC2 28:39:26:34:52:51
PC3 00:50:79:66:68:78
PC4 00:50:79:66:68:44', 'questions/ccna-after-exhibit-386.png', FALSE, NULL),
  (452, 28, 'missing', 'THREE-SWITCH LACP ETHERCHANNEL TOPOLOGY', 'PC1 and the server connect through a three-switch network with Port Channel 1 between SW1 and SW2.
PC1
SW1 SW2
SW3
Server
LACP Port Channel 11 · 33 links', 'questions/ccna-after-exhibit-452.png', FALSE, NULL),
  (476, 29, 'missing', 'WLAN ACCESS POINT AND CONTROLLER TOPOLOGY', 'The user WLAN connects through an access point, network cloud, and WLC to VLAN 20 (172.16.10.0/24).
Wireless client
Access Point
SSID USERWL
Network Cloud WLC
VLAN 20 · 172.16.10.0/24', 'questions/ccna-after-exhibit-476.png', FALSE, NULL),
  (486, 30, 'missing', 'LACP ETHERCHANNEL BETWEEN TWO SWITCHES', 'Switch A and Switch B are joined by Port Channel 1; host groups connect to both switches.
Switch A Switch B
Hosts Hosts
Group 1 · Gi0/0/0 – Gi0/0/1 (Port Channel 1)', 'questions/ccna-after-exhibit-486.png', FALSE, NULL),
  (538, 31, 'missing', 'FOUR-SWITCH SPANNING-TREE TOPOLOGY', 'All four MDF-DC switches participate in the same VLAN.
MDF-DC-1 MDF-DC-2
MDF-DC-3 MDF-DC-4', 'questions/ccna-after-exhibit-538.png', FALSE, NULL),
  (580, 32, 'missing', 'SWITCH A TO SWITCH B ETHERNET LINK', 'The tested 99-meter (325-foot) Cat5 cable connects access ports with mismatched speed and duplex settings.
Switch A
Port 1 · 100 Mbps · half duplex
Switch B
Port 2 · 10 Mbps · full duplex
Tested Cat5 cable', 'questions/ccna-after-exhibit-580.png', FALSE, NULL),
  (707, 33, 'missing', 'R14 AND R86 OSPF NETWORK', 'R14 and R86 share OSPF area 0; PC10 is on the 10.120.10.0/24 LAN.
R14
Loopback0 · 10.10.1.14/32
R86
Loopback0 · 10.10.1.86/32
PC10
10.120.10.0/24
10.80.65.0/29
OSPF 100 · 10.73.56.0/30
10.120.10.0/24 10.80.65.0/29', 'questions/ccna-after-exhibit-707.png', FALSE, NULL),
  (724, 34, 'missing', 'STATIC ROUTES ADVERTISED INTO OSPF', 'R1 receives routes from Routers A–D and connects to Router R2 through the OSPF area 1 cloud.
Router A
10.1.40.0/25
Router B
10.1.40.128/25
Router C
10.1.30.72/29
Router D
10.1.12.0/22
R1
ISP Cloud
OSPF area 1 R2', 'questions/ccna-after-exhibit-724.png', FALSE, NULL),
  (740, 35, 'missing', 'VLAN 10 THREE-PC NETWORK', 'A router connects to VLAN 10 on 192.168.0.0/24; three PCs share the access switch.
Router VLAN 10
PC1
PC2
PC3
192.168.0.0/24', 'questions/ccna-after-exhibit-740.png', FALSE, NULL),
  (769, 36, 'missing', 'OSPF FOUR-ROUTER PRIORITY ELECTION', 'Four routers share the segment; the exhibit lists their router IDs and OSPF priorities.
R1
RID 1.1.1.1 · priority 108
R2
RID 2.2.2.1 · priority 1
OSPF 1
R3
RID 3.3.3.3 · priority 106
R4
RID 4.4.4.4 · priority 204
Gii0/11 Gii0/11
Gii0/0
Gii0/11', 'questions/ccna-after-exhibit-769.png', FALSE, NULL),
  (773, 37, 'missing', 'FOUR-SWITCH RAPID PVST+ TOPOLOGY', 'The switches share VLAN 1; bridge priorities and MAC addresses are shown for root election.
SW1
Priority 8192
MAC 00:24:98:6f:3b:41
SW2
Priority 16384
SW3
Priority 32768
MAC 00:24:98:6f:3b:42
SW4
Priority 8192
MAC 00:24:98:6f:3b:40', 'questions/ccna-after-exhibit-773.png', FALSE, NULL),
  (811, 38, 'missing', 'LACP ETHERCHANNEL BETWEEN TWO SWITCHES', 'Switch A and Switch B are joined by Port Channel 1; host groups connect to both switches.
Switch A Switch B
Hosts Hosts
Group 1 · Gi0/0/0 – Gi0/0/1 (Port Channel 1)', 'questions/ccna-after-exhibit-811.png', FALSE, NULL),
  (870, 39, 'missing', 'ROUTER-ON-A-STICK INTER-VLAN TOPOLOGY', 'R1 provides the gateway for VLAN 10 (10.0.0.0/15) and VLAN 20 (10.0.2.0/15) through SW1.
WWW
R1
SW1
VLAN 10
10.0.0.0/15
VLAN 20
10.0.2.0/15
Gig0/1
Gig0/0
SVI 10 · 10.0.0.1/15 SVI 20 · 10.0.2.1/15', 'questions/ccna-after-exhibit-870.png', FALSE, NULL),
  (1001, 40, 'present', 'OSPF EQUAL-PREFIX ROUTE COSTS', 'Router Y receives the same /27 route from Routers A–D with different OSPF costs.
Router Y
Router A
Router B
Router C
Router D
Cost 20
Cost 40
Cost 50
Cost 30', 'questions/ccna-after-exhibit-1001.png', FALSE, NULL),
  (1081, 41, 'present', 'TWO-SWITCH VLAN 67 TRUNK TOPOLOGY', 'PC A and PC B connect to Switch 1 and Switch 2; VLAN 67 is to be untagged between the switches.
Switch 1 Switch 2
PC A PC B
Gi0/1 · VLAN 67 untagged', 'questions/ccna-after-exhibit-1081.png', FALSE, NULL),
  (1089, 42, 'present', 'PC A TO FILE SERVER TOPOLOGY', 'PC A and the file server are in neighboring /23 networks connected through Switch A and Switch B.
PC A
192.168.0.10/23
Switch A Switch B
File Server
192.168.1.20/23
Gii0/4
Gi0/1 · Gi0/1
Gii0/3', 'questions/ccna-after-exhibit-1089.png', FALSE, NULL),
  (1121, 43, 'present', 'REDUNDANT NETWORK TOPOLOGY', 'Router 1 connects to the ISP and both switches; all six hosts share a VLAN.
ISP
Router 1
192.168.1.1/24 · 192.168.1.2/24
Switch 1 Switch 2
Server
Hosts 1–3 Hosts 4–6', 'questions/ccna-after-exhibit-1121.png', FALSE, NULL),
  (1128, 44, 'present', 'TWO-SITE STATIC-ROUTING TOPOLOGY', 'Router 1 and Router 2 connect the 192.168.200.0/24 and 192.168.202.0/24 LANs.
Router 1 Router 2
LAN 1 LAN 2
Hosts
192.168.200.225
Hosts
192.168.202.129
192.168.201.1 ↔ 192.168.201.2', 'questions/ccna-after-exhibit-1128.png', FALSE, NULL),
  (15, 45, 'present', 'TWO-SWITCH WORKSTATION TOPOLOGY', 'PC1 and PC2 connect to SW1; PC3 and PC4 connect to SW2.
S1 S2
PC1 PC2 PC3 PC4
Gii0/2 Gii0/11
Gii0/0 Gii0/11 Gii0/11 Gii0/0', 'questions/ccna-after-exhibit-15.png', FALSE, NULL),
  (38, 46, 'present', 'ROUTER1–ROUTER2 NTP CONNECTION', 'Router1 (192.168.0.2) peers with Router2 (192.168.0.3); Router2 has Loopback0 172.17.0.1.
Router1
192.168.0.2
Router2
192.168.0.3
Loopback0 · 172.17.0.1
NTP link', 'questions/ccna-after-exhibit-38.png', FALSE, NULL),
  (73, 47, 'missing', 'ISP–WAN–R1 TOPOLOGY', 'The ISP and R1 connect across the WAN using 10.0.0.254/30 and 10.0.0.253/30.
ISP
WAN
R1
Gi0/1 · 10.0.0.254/30
Gi0/0 · 10.0.0.253/30', 'questions/ccna-after-exhibit-73.png', FALSE, NULL),
  (89, 48, 'missing', 'ROUTER AND TWO SWITCHED LANS', 'One router connects two access switches and the two PC networks.
Router
Access switch 1 Access switch 2
PC-A
10.10.10.0/24
PC-B
10.10.10.0/24
e0/11 e0/0
e0/11 e0/11', 'questions/ccna-after-exhibit-89.png', FALSE, NULL),
  (105, 49, 'present', 'THREE-ROUTER IPV6 ROUTING TOPOLOGY', 'R1 connects to R2 and R3; the shared 2001:db8:23::/64 LAN includes three PCs and a host at 2001:db8:23::14/64.
R1
R2 R3
2001:db8:23::/64
PC-1 PC-2 PC-3 PC-4
2001:db8:23::14/64
fd00:12::/64 fd00:13::/64
2001:db8:23::/64 2001:db8:23::/64', 'questions/ccna-after-exhibit-105.png', FALSE, NULL),
  (157, 50, 'present', 'R1–R2 SITE CONNECTIVITY', 'R1 and R2 connect over 209.165.200.0/24 and serve separate workstation LANs.
R1 R2
SW1 SW2
209.165.200.0/24 · .225 ↔ .226
192.168.1.0/24 · Gi0/1 10.1.1.0/24 · Gi0/1', 'questions/ccna-after-exhibit-157.png', FALSE, NULL),
  (172, 51, 'present', 'RTR-1 ACCESS-LIST NETWORK', 'PC-1 and PC-2 share the 10.150.1.0/24 LAN through SW1 and RTR-1 Gi0/0.
RTR-1
Gi0/0 · 10.150.1.254/24
SW1
PC-1
10.150.1.1/24
PC-2
10.150.1.2/24
Gii0/0
RTR-1
hostname RTR-1
!
interface GigabitEthernet0/0
ip address 10.150.1.254 255.255.255.0
duplex auto
speed auto
!
access-list 10 deny host 10.150.1.1
!
line con 0
password 7 083238384A11
login
!
line vty 0 4
access-class 10 in
password 7 083238384A11
login
!
end', 'questions/ccna-after-exhibit-172.png', FALSE, NULL),
  (178, 52, 'present', 'PRIMARY AND BACKUP INTERNET ROUTES', 'R1 uses R3 as the primary Internet path and R2 as the backup path. Interface addresses and network prefixes are
shown.
Switch PC1
192.150.16.1
R1
G0/0 · 192.150.16.2
G0/1 · 10.151.9.226
G0/2 · 172.73.189.4
R2
G0/0 · 10.151.9.230
R3
G0/0 · 172.73.189.5
Internet
192.150.16.0/24
G0/0
Backup · 10.151.9.224/27 Primary · 172.73.189.0/27', 'questions/ccna-after-exhibit-178.png', FALSE, NULL),
  (179, 53, 'present', 'MANAGEMENT AND SERVER NETWORKS', 'R1 and R2 connect the management LAN (10.1.1.0/24) to the server LAN (172.16.2.0/24).
PC1
Management LAN
PC2
Management LAN
Management switch R1 R2 Server switch
New Server
172.16.2.0/24
Gii0/11
192.168.1.0/24
Gii0/0', 'questions/ccna-after-exhibit-179.png', FALSE, NULL),
  (180, 54, 'present', 'MPLS QOS BRANCH TOPOLOGY', 'R1 connects to the MPLS cloud through MLS1, then branches to SW1 and SW2.
R1
MPLS
MLS1
SW1 SW2
Branch host Branch host
MLS11', 'questions/ccna-after-exhibit-180.png', FALSE, NULL),
  (192, 55, 'present', 'SW1 VLAN 2 WORKSTATION TOPOLOGY', 'PC1 and PC2 connect to SW1 Fa0/1 and Fa0/2 in VLAN 2.
PC1
VLAN 2
MAC 0007.ec53.3390
PC2
VLAN 2
MAC 0007.ec89.2748
SW1
Fa0/11 Fa0/2
SW1#show running-config
interface FastEthernet0/1
switchport access vlan 2
switchport mode access
interface FastEthernet0/2
switchport access vlan 2
switchport trunk allowed vlan 3
switchport mode trunk
SW1#show mac-address-table
VLAN MAC Address Type Ports
2 0007.ec53.3390 DYNAMIC Fa0/1', 'questions/ccna-after-exhibit-192.png', FALSE, NULL),
  (193, 56, 'present', 'R1 SECURE REMOTE-ACCESS TOPOLOGY', 'PC1 and PC2 share the 10.0.1.0/24 LAN connected to R1 Gi0/1; R1 Gi0/0 reaches the Internet.
PC1
PC2
R1
Internet
10.0.1.0/24
Gii0/11
Serial0/1', 'questions/ccna-after-exhibit-193.png', FALSE, NULL),
  (212, 57, 'present', 'PCS THROUGH A NAT ROUTER', 'PC1 and PC2 reach the Internet through the NAT router.
PC1
PC2
NAT Router
Internet
172.16.3.1
172.16.3.2', 'questions/ccna-after-exhibit-212.png', FALSE, NULL),
  (224, 58, 'present', 'OSPF BROADCAST SEGMENT', 'R1, R2, and R3 share 192.168.100.0/24 in OSPF area 0.
R1 R2
192.168.100.0/24 · Area 0
R3
Fa0/0 · .1
Fa0/0 · .2
Fa0/0 · .3', 'questions/ccna-after-exhibit-224.png', FALSE, NULL),
  (231, 59, 'present', 'OSPF SITES AND SERVER LAN', 'R1 and R2 connect through the 10.1.1.0/24 transit network; the server is on the R2-side LAN.
PC1
Management LAN
R1 R2 Server
172.16.2.0/24
192.168.1.0/24
10.1.1.0/24 · OSPF LAN
R1#show ip ospf neighbor
Neighbor ID Pri State Dead Time Address Interface
192.168.100.2 1 FULL/DR 00:00:34 192.168.100.2 FastEthernet0/0
192.168.100.3 1 FULL/BDR 00:00:34 192.168.100.3 FastEthernet0/0', 'questions/ccna-after-exhibit-231.png', FALSE, NULL),
  (242, 60, 'present', 'PC1 ACCESS-LINK STATUS', 'PC1 Fa0 connects to SW Fa0/1; the exhibit records speed and duplex on both ends.
PC1
100 Mbps · full duplex
Switch
Fa0/1 · auto speed · auto duplex
Fa0
Fa0/11', 'questions/ccna-after-exhibit-242.png', FALSE, NULL),
  (244, 61, 'present', 'HEAD-OFFICE IPV6 NETWORK', 'R1 connects the server LAN to the ISP cloud and the head-office LAN.
Server
ISP Cloud
R1
fa0/1 · 2001:DB8:44:90::/64
Head Office LAN HO workstation
WAN
fa0/1 · EUI-64', 'questions/ccna-after-exhibit-244.png', FALSE, NULL),
  (245, 62, 'present', 'DHCP CLIENT THROUGH R1 TO SERVER', 'The DHCP client reaches the DHCP server through R1.
DHCP Client R1
Gi0/0 · 10.10.10.1/24
Gi0/1 · 172.16.2.1/24
DHCP Server
172.16.2.2
Gii0/0 Gii0/11', 'questions/ccna-after-exhibit-245.png', FALSE, NULL),
  (246, 63, 'present', NULL, NULL, 'questions/ccna-after-exhibit-246.png', TRUE, 'no text extracted - check PDF'),
  (248, 64, 'present', 'PRIMARY AND BACKUP ISP TOPOLOGY', 'The LAN connects through Router1; Gi1/0 reaches the primary ISP and Gi1/1 reaches the backup ISP.
LAN
Router1
Primary ISP
Backup ISP
Gii0/11
Gii11/0
Gii11/11', 'questions/ccna-after-exhibit-248.png', TRUE, 'possible garbled text'),
  (261, 65, 'present', 'SWITCH 1–SWITCH 2 LACP TOPOLOGY', 'Two Ethernet links between the switches form Port-channel 1; the image''s interface configuration is reproduced
below.
Switch 1 Switch 2
E1/1 · Port-channel 1
E1/2 · Port-channel 1
Switch 1
interface Port-channel1
switchport
switchport mode access
switchport access vlan 2
interface range Ethernet1/1-2
channel-group 1 mode active
switchport mode access
switchport access vlan 2
Switch 2
interface Port-channel1
switchport
switchport mode access
switchport access vlan 2
interface range Ethernet1/1-2
channel-group 1 mode passive
switchport mode access
switchport access vlan 2', 'questions/ccna-after-exhibit-261.png', FALSE, NULL),
  (273, 66, 'present', NULL, NULL, 'questions/ccna-after-exhibit-273.png', TRUE, 'no text extracted - check PDF'),
  (275, 67, 'present', NULL, NULL, 'questions/ccna-after-exhibit-275.png', TRUE, 'no text extracted - check PDF'),
  (284, 68, 'present', 'THREE-LINK LACP ETHERCHANNEL', 'SW1 and SW2 are joined by three parallel LACP member links.
SW1 SW2
Gii11/1 Gii11/1
Gii11/2 Gii11/2
Gii11/3 Gii11/3', 'questions/ccna-after-exhibit-284.png', TRUE, 'possible garbled text'),
  (311, 69, 'present', 'R1–R2–R3 ROUTED NETWORKS', 'R1, R2, and R3 connect through 10.0.4.0/24; their LANs are 10.0.1.0/24, 10.0.2.0/24, and 10.0.3.0/24.
R1
10.0.1.0/24
R2
10.0.2.0/24
R3
10.0.3.0/24
10.0.4.0/24
Gii0/0 Gii0/0
Gii0/11', 'questions/ccna-after-exhibit-311.png', FALSE, NULL),
  (317, 70, 'present', 'REDUNDANT R1–R2 CIRCUITS', 'Primary and secondary circuits connect R1 and R2; Client A and the Image Server sit on their LANs.
R1 R2
Client A
192.168.10.0/24
Image Server
10.10.10.10/25
Primary Circuit
Secondary Circuit
R1#show ip route
Gateway of last resort is 10.10.10.2 to network 0.0.0.0
S* 0.0.0.0/0 [1/0] via 10.10.10.2
R2#show ip route
Gateway of last resort is 10.10.10.1 to network 0.0.0.0
S* 0.0.0.0/0 [1/0] via 10.10.10.1', 'questions/ccna-after-exhibit-317.png', FALSE, NULL),
  (327, 71, 'present', 'VLAN 200 PC-TO-PC TOPOLOGY', 'PC_A and PC_B connect to one switch in VLAN 200.
Switch
PC_A
VLAN 200
PC_B
VLAN 200', 'questions/ccna-after-exhibit-327.png', FALSE, NULL),
  (339, 72, 'present', NULL, NULL, 'questions/ccna-after-exhibit-339.png', TRUE, 'no text extracted - check PDF'),
  (343, 73, 'present', 'TWO-SITE OSPF DR ELECTION', 'R1 and R2 share the 10.0.0.32/27 WAN segment; each router serves a workstation LAN.
R1 R2
SW1 SW2
Workstations
10.0.1.0/24
Workstations
10.0.2.0/24
10.0.0.32/27 · .33 ↔ .34
Router R1 configuration
interface GigabitEthernet0/0
ip ospf priority 99
router ospf 100
network 10.0.0.0 0.0.0.31 area 0
network 10.0.0.0 0.0.0.255 area 0', 'questions/ccna-after-exhibit-343.png', FALSE, NULL),
  (344, 74, 'missing', 'FOUR-ROUTER HOST ROUTING TOPOLOGY', 'R1 connects Host A to the R2/R3/R4 paths leading to Host B.
Host A R1
R2
R3
R4 Host B
10.10.10.0/30
10.10.10.8/30
10.10.10.4/30
10.10.10.12/30', 'questions/ccna-after-exhibit-344.png', FALSE, NULL),
  (356, 75, 'missing', 'R1–R2–R3 SHARED TRANSIT NETWORK', 'R1, R2, and R3 connect to a shared 10.0.0.0/24 segment.
R1 R2
10.0.0.0/24
R3
Fa0/0 Fa0/2
Fa0/11', 'questions/ccna-after-exhibit-356.png', FALSE, NULL),
  (367, 76, 'present', 'R1–R2–R3 NEIGHBOR-DISCOVERY NETWORK', 'R1, R2, and R3 are connected in series; Gi0/1 and Gi0/2 connect to R2.
R1 R2 R3
Gii0/11 Gii0/2', 'questions/ccna-after-exhibit-367.png', FALSE, NULL),
  (371, 77, 'present', 'SERIAL TWO-SITE HOST AND SERVER NETWORK', 'Router1 and Router2 connect through serial WAN links; Router2 serves Switch1 and the server LAN.
Router1 Router2 Switch1 Server
10.10.10.10/24
Serial · 192.168.0.0/30 ++ 192.168.0.2/30 Gi0/0 · 10.10.10.1/24', 'questions/ccna-after-exhibit-371.png', FALSE, NULL),
  (387, 78, 'present', NULL, NULL, 'questions/ccna-after-exhibit-387.png', TRUE, 'no text extracted - check PDF'),
  (396, 79, 'present', 'R1–R2 POINT-TO-POINT LINK', 'GigabitEthernet0/0/0 connects R1 and R2.
R1 R2
GigabitEthernet0/0/0', 'questions/ccna-after-exhibit-396.png', FALSE, NULL),
  (399, 80, 'missing', 'NTP NETWORK TOPOLOGY', 'The five-router network shows Router1 and Router2 with Loopback0 and NTP server configuration.
Internet
Router1 Router2
Router3
Router4
10.0.10.0/30
10.0.20.0/30
10.0.30.0/30
Router1(config)#ntp master 7
Router1(config)#ntp server 209.165.200.226
Router2(config)#ntp server 209.165.200.225
Router2(config)#ntp master 7', 'questions/ccna-after-exhibit-399.png', FALSE, NULL),
  (403, 81, 'present', NULL, NULL, 'questions/ccna-after-exhibit-403.png', TRUE, 'no text extracted - check PDF'),
  (405, 82, 'present', 'ROUTER-1 INTERNET ACCESS TOPOLOGY', 'ROUTER-1 connects the 192.168.1.0/24 user networks to the Internet.
Internet
ROUTER-1
209.165.202.129 · PAT
Switch 1 Switch 2
Subnet
192.168.1.0/24
Subnet
192.168.1.0/24', 'questions/ccna-after-exhibit-405.png', FALSE, NULL),
  (406, 83, 'missing', 'CISCO SWITCH AND NON-CISCO IP PHONE', 'The non-Cisco IP phone connects to SW1 Gi1/0/1; the phone and attached PC use voice and data VLANs.
SW1
VLAN 10 · voice
VLAN 11 · data
Non-Cisco IP Phone
PC
Gi1/0/1
interface GigabitEthernet1/0/1
switchport access vlan 11
switchport mode access
switchport voice vlan 10
cdp run
end', 'questions/ccna-after-exhibit-406.png', FALSE, NULL),
  (436, 84, 'missing', 'THREE-ROUTER HOST-SPECIFIC ROUTE', 'R1 reaches 10.10.2.0/24 through R2; traffic for 10.10.2.1 can instead use R3.
R1
R2
R3
10.10.2.0/24
192.168.1.0/24 · .1 ↔ .2
192.168.2.0/24 · .1 ↔ .3
Gii0/0
Gii0/0', 'questions/ccna-after-exhibit-436.png', FALSE, NULL),
  (442, 85, 'missing', 'PC INTERNET CONNECTIVITY TOPOLOGY', 'PC 10.2.2.2 connects through a switch and Router 10.2.2.1/27 to the Internet.
Internet
Router
10.2.2.1/27
Switch PC
10.2.2.2
Ethernet adapter Ethernet:
IPv4 Address: 10.2.2.2
Subnet Mask: 255.255.255.248
Default Gateway: 10.2.2.1
DNS Servers: 8.8.8.8', 'questions/ccna-after-exhibit-442.png', FALSE, NULL),
  (479, 86, 'missing', 'CPE DUAL-ISP HEADQUARTERS TOPOLOGY', 'CPE connects Headquarters to ISP 1 (198.51.100.1) and ISP 2 (203.0.113.1).
ISP 1
198.51.100.1
ISP 2
203.0.113.1
CPE
Headquarters', 'questions/ccna-after-exhibit-479.png', FALSE, NULL),
  (484, 87, 'missing', 'DUAL-SITE IPV6 SERVER AND WORKSTATION LANS', 'R1 and R2 connect over 2001:DB8:44:90::/64; each router serves a separate switch and endpoint LAN.
R1
2001:DB8:44:90::1/64
R2
2001:DB8:44:90::2/64
SW1 SW2
File + Management Servers
2001:DB8:D8D2:1008::/64
Workstations
2001:DB8:D8D2:1009::/64
GigabitEthernet0/0
2001:DB8:D8D2:1008::/64 2001:DB8:D8D2:1009::/64', 'questions/ccna-after-exhibit-484.png', FALSE, NULL),
  (516, 88, 'missing', 'R14–R86 PC10 STATIC-ROUTE TOPOLOGY', 'R14 and R86 connect over 10.73.65.64/30; PC10 (.10) is on R86 LAN 10.80.65.0/28.
R14
Loopback0 · 10.10.1.14/32
R86
Loopback0 · 10.10.1.86/32
10.80.65.0/28
PC10
10.80.65.10
Fa0/0 · .65 ↔ .66
Fa0/11', 'questions/ccna-after-exhibit-516.png', FALSE, NULL),
  (517, 89, 'missing', 'R14–R86 PC10 STATIC-ROUTE TOPOLOGY', 'R14 and R86 connect over 10.73.65.64/30; PC10 (.10) is on R86 LAN 10.80.65.0/28.
R14
Loopback0 · 10.10.1.14/32
R86
Loopback0 · 10.10.1.86/32
10.80.65.0/28
PC10
10.80.65.10
Fa0/0 · .65 ↔ .66
Fa0/11', 'questions/ccna-after-exhibit-517.png', FALSE, NULL),
  (520, 90, 'missing', 'OSPF TWO-AREA FOUR-ROUTER TOPOLOGY', 'R1, R2, and R3 connect across areas 0 and 1; R3 advertises loopback 1.1.1.3/32.
R1
Loopback · 1.1.1.1/32
R2
1.1.1.2/32
R3
Loopback · 1.1.1.3/32
R4
1.1.1.4/32
OSPF Area 00 OSPF Area 00
OSPF Area 11 OSPF Area 11
R1#show ip route
O 1.1.1.3/32 [110/2] via 14.1.1.2, FastEthernet0/0
O IA 1.1.1.3/32 [110/3] via 14.1.1.4, FastEthernet0/1', 'questions/ccna-after-exhibit-520.png', FALSE, NULL),
  (522, 91, 'missing', 'SITE A–SITE B ROUTING TOPOLOGY', 'Router1 and Router2 connect Site A and Site B over two paths; the exhibit includes Router2''s route table.
Site A
Router1 Router2
Site B
10.10.10.0/30 · 10.10.10.8/30
10.10.10.4/30 · 10.10.10.12/30', 'questions/ccna-after-exhibit-522.png', FALSE, NULL),
  (530, 92, 'missing', 'R1–R2–R3 MULTI-LAN TOPOLOGY', 'R1 and R3 connect to R2 through routed subnets; each site has local workstation or server networks.
PC1
172.16.5.0/24
R1
R2
R3
Access switch
PCs / Server
10.10.10.0/24 10.10.10.4/24
192.168.2.0/24 10.10.10.0/24', 'questions/ccna-after-exhibit-530.png', FALSE, NULL),
  (552, 93, 'missing', 'INTER-COMPANY SWITCH TRUNK', 'SW_1 and SW_12 connect over Ethernet0/0; VLANs 5 and 6 are carried on the inter-switch link.
VLANs 5, 6 · Floor 5
SW_1 SW_12
VLANs 5, 6 · Floor 6
Ethernet0/0 · 802.1Q', 'questions/ccna-after-exhibit-552.png', FALSE, NULL),
  (558, 94, 'missing', 'R1–R2 BRANCH-OFFICE NETWORK', 'R1 connects the 192.168.25.0/24 office LAN to R2 across 192.168.2.0/30; R2 serves 172.25.0.0/24.
Main office
192.168.25.0/24
R1 R2 New office
172.25.0.0/24
192.168.2.0/30 · .1 ↔ .2
Gii0/2', 'questions/ccna-after-exhibit-558.png', FALSE, NULL),
  (566, 95, 'missing', 'DHCP SERVER, VLANS, AND DHCP CLIENT', 'The DHCP server and client reach SW1 on VLAN 10 and VLAN 20; SW1 relays VLAN 10 client requests to the server.
DHCP Server
192.168.202.30
SW1 DHCP Client
VLAN 10
Trunk · VLANs 10, 20 Access · VLAN 10
The DHCP pools serve the VLAN 10 and VLAN 20 subnets. VLAN 10 clients connect to SW1 Fa0/1; relay their DHCP broadcasts to the
server at 192.168.202.30 using the VLAN 10 gateway interface.', 'questions/ccna-after-exhibit-566.png', FALSE, NULL),
  (574, 96, 'missing', 'RIP THREE-ROUTER TRIANGLE', 'R1, R2, and R3 connect over 192.168.12.0/24, 192.168.13.0/24, and 192.168.23.0/24.
R1
R2 R3
192.168.12.0/24 · Gi0/1 192.168.13.0/24 · Gi0/2
192.168.23.0/24', 'questions/ccna-after-exhibit-574.png', FALSE, NULL),
  (594, 97, 'missing', 'OSPF TWO-AREA FOUR-ROUTER TOPOLOGY', 'R1, R2, and R3 connect across areas 0 and 1; R3 advertises loopback 1.1.1.3/32.
R1
Loopback · 1.1.1.1/32
R2
1.1.1.2/32
R3
Loopback · 1.1.1.3/32
R4
1.1.1.4/32
OSPF Area 00 OSPF Area 00
OSPF Area 11 OSPF Area 11', 'questions/ccna-after-exhibit-594.png', FALSE, NULL),
  (646, 98, 'missing', 'FOUR-SWITCH ROOT-ELECTION TOPOLOGY', 'SW1–SW4 form a square with one diagonal link; interface labels are shown on each connection.
SW1 SW2
SW4 SW3
Gi1/0/1 Gi1/0/1
Gi1/0/2
Gi1/0/1
Gi1/0/2 Gi1/0/2
Gi1/0/1
Gi1/0/3 Gi1/0/2
Gi1/0/3', 'questions/ccna-after-exhibit-646.png', FALSE, NULL),
  (647, 99, 'missing', 'PC INTERNET CONNECTIVITY TOPOLOGY', 'PC 10.2.2.2 connects through a switch and Router 10.2.2.1/27 to the Internet.
Internet
Router
10.2.2.1/27
Switch PC
10.2.2.2
Ethernet adapter Ethernet:
IPv4 Address: 10.2.2.2
Subnet Mask: 255.255.255.248
Default Gateway: 10.2.2.1
DNS Servers: 8.8.8.8', 'questions/ccna-after-exhibit-647.png', FALSE, NULL),
  (671, 100, 'missing', 'IPV6 ISP, ATLANTA, AND SAN FRANCISCO', 'Atlanta and San Francisco connect to the ISP over IPv6 and each serves local users or servers.
ISP
Atlanta · R1 San Francisco · R2
Atlanta LAN San Francisco LAN
End users DNS + File Servers
2001:DB8:1555:100::/64 2001:DB8:1555:100::/64
Gii0/0 Gii0/0', 'questions/ccna-after-exhibit-671.png', FALSE, NULL),
  (725, 101, 'missing', 'FOUR-SWITCH ROOT-ELECTION TOPOLOGY', 'SW1–SW4 form a square with one diagonal link; interface labels are shown on each connection.
SW1 SW2
SW4 SW3
Gi1/0/1 Gi1/0/1
Gi1/0/2
Gi1/0/1
Gi1/0/2 Gi1/0/2
Gi1/0/1
Gi1/0/3 Gi1/0/2
Gi1/0/3', 'questions/ccna-after-exhibit-725.png', FALSE, NULL),
  (728, 102, 'missing', 'IPV6 ISP, ATLANTA, AND SAN FRANCISCO', 'Atlanta and San Francisco connect to the ISP over IPv6 and each serves local users or servers.
ISP
Atlanta · R1 San Francisco · R2
Atlanta LAN San Francisco LAN
End users DNS + File Servers
2001:DB8:1555:100::/64 2001:DB8:1555:100::/64
Gii0/0 Gii0/0', 'questions/ccna-after-exhibit-728.png', FALSE, NULL),
  (736, 103, 'missing', 'R1 QOS INGRESS TRAFFIC CLASSIFICATION', 'R1 receives AF31, AF21, and AF11 traffic on Gi0/0 and forwards classified packets from Gi0/1.
AF31
AF21
AF11
R1
AF31
AF21
AF11
Gii0/0
Gii0/11', 'questions/ccna-after-exhibit-736.png', FALSE, NULL),
  (749, 104, 'missing', 'FOUR-ROUTER MULTI-PROTOCOL ROUTING TOPOLOGY', 'Routers A–D connect through EIGRP and OSPF segments; each router serves a subnet.
Router A Router B
Router D Router C
EIGRP · 192.168.1.0/24
OSPF · 10.0.1.0/30
EIGRP · 10.0.0.0/30
192.168.1.0/24', 'questions/ccna-after-exhibit-749.png', FALSE, NULL),
  (751, 105, 'missing', 'IPV6 ISP, ATLANTA, AND SAN FRANCISCO', 'Atlanta and San Francisco connect to the ISP over IPv6 and each serves local users or servers.
ISP
Atlanta · R1 San Francisco · R2
Atlanta LAN San Francisco LAN
End users DNS + File Servers
2001:DB8:1555:100::/64 2001:DB8:1555:100::/64
Gii0/0 Gii0/0', 'questions/ccna-after-exhibit-751.png', FALSE, NULL),
  (799, 106, 'missing', 'IPV6 R1–ISP WAN AND LAN', 'R1 uses a manually assigned IPv6 address on the ISP WAN and a self-provisioned IPv6 LAN.
ISP
R1
LAN Laptop
WAN · 2001:DB8:0F1F:CCBC:ACCE:FCED:ACBD:FA0/127
LAN · 2001:DB8:0000:AFFF::/64', 'questions/ccna-after-exhibit-799.png', TRUE, 'possible garbled text'),
  (808, 107, 'missing', 'R1–R2 EIGRP PRIMARY AND BACKUP LINKS', 'R1 and R2 connect over 10.0.0.0/30 (primary) and 10.0.0.4/30 (backup), with separate LANs.
R1 R2
SW1 SW2
Servers
10.1.0.0/24
Workstations
10.2.0.0/29
Primary · 10.0.0.0/30
Backup · 10.0.0.4/30', 'questions/ccna-after-exhibit-808.png', FALSE, NULL),
  (833, 108, 'missing', 'FOUR-SWITCH SPANNING-TREE ROOT-ELECTION', 'TOPOLOGY
Four switches form a ring; User1.lab and DNS1.lab connect to SW3 and SW4.
SW1 SW2
SW4 SW3
DNS1.lab User1.lab
STP priority
SW1 bridge priority: 32768
SW2 bridge priority: 4096
SW3 bridge priority: 8192
SW4 bridge priority: 12288', 'questions/ccna-after-exhibit-833.png', TRUE, 'possible garbled text'),
  (837, 109, 'missing', 'FOUR-SWITCH SPANNING-TREE ROOT-ELECTION', 'TOPOLOGY
Four switches form a ring; User1.lab and DNS1.lab connect to SW3 and SW4.
SW1 SW2
SW4 SW3
DNS1.lab User1.lab
STP priority
SW1 · priority 32768 · MAC 0C:0A:05:22:05:97
SW2 · priority 8192 · MAC 0C:4A:82:07:57:58
SW3 · priority 32768 · MAC 0C:0A:A8:1A:3C:9D
SW4 · priority 8192 · MAC 0C:0A:18:A1:B3:19', 'questions/ccna-after-exhibit-837.png', FALSE, NULL),
  (851, 110, 'missing', NULL, 'Distinct mapped STP data; no original image is available to verify a topology. The
shared unverified diagram is omitted.
SW1 · priority 8192 · MAC 0C:B4:86:22:42:37
SW2 · priority 8192 · MAC 0C:0B:15:22:05:97
SW3 · priority 4096 · MAC 0C:0B:15:1A:3C:9D
SW4 · priority 4096 · MAC 0C:B0:18:A1:B3:19', 'questions/ccna-after-exhibit-851.png', FALSE, NULL),
  (852, 111, 'missing', NULL, 'Distinct mapped STP data; no original image is available to verify a topology. The
shared unverified diagram is omitted.
SW1 · priority 32768 · MAC 0C:E4:85:71:03:80
SW2 · priority 4096 · MAC 0C:0E:1A:22:05:97
SW3 · priority 8192 · MAC 0C:E0:A1:1A:3C:9D
SW4 · priority 12288 · MAC 0C:00:18:A1:B3:19', 'questions/ccna-after-exhibit-852.png', TRUE, 'possible garbled text'),
  (864, 112, 'missing', 'OSPF REFERENCE-BANDWIDTH PATH TOPOLOGY', 'Router Y connects to the destination network through alternate 10-Gigabit and 100-Gigabit paths.
Router Y
Router 1
Router 2
Router 3
Router 4
Router 5
Router 6
192.168.1.0/24
10 Gig
10 Gig
10 Gig
100 Gig
100 Gig
100 Gig
100 Gig
10 Gig', 'questions/ccna-after-exhibit-864.png', FALSE, NULL),
  (895, 113, 'missing', 'R1-LAB AND R2-LAB IPV6 NETWORK', 'R1-LAB and R2-LAB share an IPv6 WAN and each connects to a local switch and endpoint.
R1-LAB R2-LAB
SW1 SW2
LAN host LAN host
Gi0/0 · 2001:DB8:0000:0FFF:AAAA:0000:0000:0000/64
Gii0/11 Gii0/2', 'questions/ccna-after-exhibit-895.png', TRUE, 'possible garbled text'),
  (909, 114, 'missing', 'ROUTER-ON-A-STICK VLAN 2 AND VLAN 3', 'R1 connects through a trunk to the switch; VLAN 2 and VLAN 3 have separate endpoint networks.
R1 Switch
VLAN 2 PC
10.10.10.12/24
VLAN 3 PC
10.10.20.12/24
802.1Q trunk · Native VLAN 10
VLAN 2
VLAN 3', 'questions/ccna-after-exhibit-909.png', FALSE, NULL),
  (934, 115, 'missing', 'FOUR-ROUTER SUBNET-ALLOCATION CHAIN', 'Existing /28 and /16 subnets lead to a new /27 office LAN sized for 20 hosts.
Router 1
10.0.225.0/28
Router 2
10.0.225.16/28
Router 3
10.0.225.64/28
Router 4
20 hosts', 'questions/ccna-after-exhibit-934.png', FALSE, NULL),
  (996, 116, 'missing', 'OSPF EQUAL-COST PATH CALCULATION', 'R1 connects to R2 over parallel 1-Gbps and 10-Gbps links; R2 reaches R3 over 10 Gbps.
R1
Lo0 · 10.1.1.1
R2
Lo0 · 10.2.2.2
R3
Lo0 · 10.5.3.1
11 Gbps · 10.12.0.0/30
10 Gbps · 10.12.0.4/30
10 Gbps · 10.23.0.0/29', 'questions/ccna-after-exhibit-996.png', FALSE, NULL),
  (1011, 117, 'present', NULL, 'Configuration-only exhibit. Preserves the original commands and values; no topology is added.
CPE DHCP CONFIGURATION
IOS DHCP server and relay settings
IOS CONFIGURATION
ip dhcp excluded-address 192.168.10.1 192.168.10.20
!
ip dhcp pool LAN-POOL
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.1
 dns-server 8.8.8.8
 lease 3
!
interface GigabitEthernet0/1
 ip address 192.168.10.1 255.255.255.0
 ip helper-address 172.20.255.11
 no shutdown', 'questions/ccna-after-exhibit-1011.png', FALSE, NULL),
  (1084, 118, 'present', 'FASTETHERNET LACP ETHERCHANNEL', 'SW1 Fa0/1 and Fa0/2 connect to the corresponding SW2 interfaces as an EtherChannel.
SW1 SW2
Fa0/1 Fa0/1
Fa0/2 Fa0/2
SW1
interface FastEthernet0/1
channel-group 1 mode auto
switchport trunk encapsulation dot1q
switchport mode trunk
interface FastEthernet0/2
channel-group 1 mode auto
switchport trunk encapsulation dot1q
switchport mode trunk', 'questions/ccna-after-exhibit-1084.png', FALSE, NULL),
  (1088, 119, 'present', 'VLAN 200 PC-TO-PC TOPOLOGY', 'PC_A and PC_B connect to one switch in VLAN 200.
Switch
PC_A
VLAN 200
PC_B
VLAN 200', 'questions/ccna-after-exhibit-1088.png', FALSE, NULL),
  (1099, 120, 'present', NULL, 'Preserves all four switches, the four-link ring, and the original bridge priorities and MAC addresses. Native redraw
deferred for website implementation.
SPANNING-TREE FOUR-SWITCH RING
Four perimeter links | bridge priority and MAC per switch
S1 SWITCH
Priority 30000
MAC AA:AA:AA:AA:AA:AA
S2 SWITCH
Priority 4096
MAC BB:BB:BB:BB:BB:BB
S3 SWITCH
Priority 28672
MAC CC:CC:CC:CC:CC:CC
S4 SWITCH
Priority 8192
MAC DD:DD:DD:DD:DD:DD', 'questions/ccna-after-exhibit-1099.png', TRUE, 'possible garbled text'),
  (1119, 121, 'present', 'FOUR-ROUTER SUBNET-ALLOCATION CHAIN', 'Existing /28 and /16 subnets lead to a new /27 office LAN sized for 20 hosts.
Router 1
10.0.225.0/28
Router 2
10.0.225.16/28
Router 3
10.0.225.64/28
Router 4
20 hosts', 'questions/ccna-after-exhibit-1119.png', FALSE, NULL),
  (1125, 122, 'present', 'THREE-ROUTER PC ROUTING PATH', 'R1–R2–R3 connect two user LANs over 10.10.1.0/30 and 10.10.2.0/30.
R1 R2 R3
PC1
192.168.10.0/24
PC2
192.168.20.0/24
10.10.1.0/30 10.10.2.0/30
Gii0/11 Gii0/11', 'questions/ccna-after-exhibit-1125.png', FALSE, NULL),
  (1167, 123, 'present', 'FOUR-ROUTER OSPF BROADCAST NETWORK', 'R1–R4 share an OSPF segment; router IDs and priorities determine the DR and BDR.
R1
RID 1.1.1.1 · Priority 2
R2
RID 2.2.2.2 · Priority 1
R3
RID 3.3.3.3 · Priority 2
R4
RID 4.4.4.4 · Priority 1
OSPF shared segment
192.168.100.0/16', 'questions/ccna-after-exhibit-1167.png', FALSE, NULL),
  (1194, 124, 'present', 'VLAN 10 AND VLAN 20 WEB-SERVER TOPOLOGY', 'Switch A connects VLAN 10 and VLAN 20 hosts to Switch B and the web server on 10.30.0.100/24.
Switch A Switch B
VLAN 20 PC
VLAN 20 PC
VLAN 10 PC
Web Server
10.30.0.100/24
VLANs 10, 20, 30', 'questions/ccna-after-exhibit-1194.png', FALSE, NULL),
  (1199, 125, 'present', NULL, 'Retains the original Gi0/0 and Gi0/1 links, subnet labels, and single R1–R2 S0/0/0 connection.
R1-R2 DATABASE AND CLIENT NETWORK
One serial link; original subnets and interface labels retained
DATABASE SERVER
192.168.141.0/28
Database switch
R1 LAN switch R2 LAN switch
R1 R2
PC
172.19.108.0/24
PC
192.168.205.0/25
Gi0/0 S0/0/0 S0/0/0
Gi0/1', 'questions/ccna-after-exhibit-1199.png', FALSE, NULL),
  (1321, 126, 'present', NULL, 'R1(config)#access-list 1 permit 192.168.10.0 0.0.0.255
R1(config)#ip nat inside source list 1 interface Gi0/1 overload
R1(config)#interface Gi0/0
R1(config-if)#ip nat inside
R1(config)#interface Gi0/1
R1(config-if)#ip nat outside', 'questions/ccna-after-exhibit-1321.png', FALSE, NULL),
  (13, 127, 'present', NULL, 'access-list 101 permit ospf any any
access-list 101 permit tcp any any eq 179
access-list 101 permit tcp any any eq 179 any
access-list 101 permit gre any any
access-list 101 permit esp any any
access-list 101 deny ospf any any
access-list 101 permit tcp 10.1.1.0 0.0.0.255 172.16.1.0 0.0.0.255 eq telnet
access-list 101 permit udp 10.1.1.0 0.0.0.255 172.16.1.0 0.0.0.255 eq 500
access-list 101 permit udp 10.1.1.0 0.0.0.255 172.16.1.0 0.0.0.255 eq 4500
access-list 101 permit ip any any
interface Ethernet0/0
ip address 10.1.1.25 255.255.255.0
ip access-group 101 in', 'questions/ccna-after-exhibit-13.png', FALSE, NULL),
  (34, 128, 'missing', NULL, 'import ncclient
with manager.connect(host=''192.168.1.1'', port=830,
 username=''root'', password=''test123'', allow_agent=False) as m:
 print(m.get_config(''running'').data_xml)', 'questions/ccna-after-exhibit-34.png', FALSE, NULL),
  (39, 129, 'present', NULL, 'Switch A
Vlan 10,11,12,13
interface GigabitEthernet0/1
switchport mode trunk
switchport trunk allowed vlan 10-12 !
interface GigabitEthernet0/4
switchport access vlan 13
switchport mode access
Switch B
Vlan 10,11,12,13
interface GigabitEthernet0/1
switchport mode trunk !
interface GigabitEthernet0/3
switchport access vlan 13
switchport mode access', 'questions/ccna-after-exhibit-39.png', FALSE, NULL),
  (143, 130, 'present', NULL, 'Switch1#show etherchannel summary
Flags: D - down P - bundled in port-channel
 I - stand-alone s - suspended
 H - Hot-standby (LACP only)
 R - Layer3 S - Layer2
 U - in use f - failed to allocate aggregator
 u - unsuitable for bundling
 w - waiting to be aggregated
 d - default port
Number of channel-groups in use: 1
Number of aggregators: 1
Group Port-channel Protocol Ports
1 Po1(SD) LACP Fa0/2(I) Fa0/1(I)
Switch1#show run
Building configuration...
interface Port-channel1 !
interface FastEthernet0/1
channel-group 1 mode passive !
interface FastEthernet0/2
channel-group 1 mode passive
Switch2#show run
Building configuration...
interface Port-channel1 !
interface FastEthernet0/1
channel-group 1 mode passive !
interface FastEthernet0/2
channel-group 1 mode passive', 'questions/ccna-after-exhibit-143.png', FALSE, NULL),
  (174, 131, 'present', NULL, 'Switch#show ip dhcp snooping
Switch DHCP snooping is enabled
Switch DHCP gleaning is disabled
DHCP snooping is configured on following VLANs: 1
DHCP snooping is operational on following VLANs: 1
DHCP snooping is configured on the following L3 Interfaces:
Insertion of option 82 is disabled
circuit-id default format: vlan-mod-port
remote-id: aabb.cc00.6500 (MAC)
Option 82 on untrusted port is not allowed
Verification of hwaddr field is enabled
Verification of giaddr field is enabled
DHCP snooping trust/rate is configured on the following interfaces:
Interface Trusted Allow option Rate limit (pps)
Switch#show ip dhcp snooping statistics detail
Packets Processed by DHCP Snooping = 34
Packets Dropped Because of DHCP = 1
IDB not known = 0
Queue full = 0
Interface is in errdisabled = 0
Rate limit exceeded = 0
Received on untrusted ports = 32
Nonzero giaddr = 0
Source mac not equal to chaddr = 0
No binding entry = 0
Insertion of opt82 fail = 0
Unknown packet = 0
Interface Down = 0
Unknown output interface = 0
Misdirected Packets = 0
Packets with Invalid Size = 0
Packets with Invalid Option = 0', 'questions/ccna-after-exhibit-174.png', TRUE, 'possible garbled text'),
  (185, 132, 'present', NULL, 'MacOS# ifconfig
en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
options=400<CHANNEL_IO>
ether f0:18:34:34:34
inet6 fe80::492:c9f7:57cc:3343%en0 prefixlen 64 secured scopeid 0x6
inet 10.8.138.14 netmask 0xffffff00 broadcast 10.8.159.255
nd6 options=201<PERFORMNUD,DAD>
media: autoselect
status: active', 'questions/ccna-after-exhibit-185.png', FALSE, NULL),
  (188, 133, 'present', NULL, 'R1#show ip route
Codes: C - connected, S - static, R - RIP, M - mobile, B - BGP
 D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
 N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
 E1 - OSPF external type 1, E2 - OSPF external type 2
 i - IS-IS, su - IS-IS summary, L1 - IS-IS level-1, L2 - IS-IS level-2
 ia - IS-IS inter area, * - candidate default, U - per-user static route
 o - ODR, P - periodic downloaded static route
Gateway of last resort is not set
C 192.168.5.3 is directly connected, Loopback0
10.0.0.0/8 is variably subnetted, 4 subnets, 2 masks
O 10.0.1.3/32 [110/100] via 192.168.0.40, 00:33:32, Serial0
C 10.0.1.0/24 is directly connected, Serial0
O 10.0.1.190/32 [110/5] via 192.168.0.35, 00:33:32, Serial0
O 10.0.1.0/24 [110/10] via 192.168.0.4, 00:33:32, GigabitEthernet0/0
D 10.0.1.0/29 [90/10] via 192.168.0.7, 00:33:32, GigabitEthernet0/0', 'questions/ccna-after-exhibit-188.png', FALSE, NULL),
  (203, 134, 'present', NULL, 'R1#show ip route | begin gateway
Gateway of last resort is 209.165.200.254 to network 0.0.0.0
S* 0.0.0.0/0 [1/0] via 209.165.200.254, Serial0/0/1
172.16.0.0/16 is variably subnetted, 3 subnets, 2 masks
C 172.16.1.0/24 is directly connected, FastEthernet0/0
L 172.16.1.1/32 is directly connected, FastEthernet0/0
EX 172.16.2.0/24 [170/2] via 207.165.200.250, 00:00:13, Serial0/0/0
O 192.168.1.0/24 [110/84437] via 207.165.200.254, 00:00:17, Serial0/0/1
D 192.168.2.0/24 [90/184437] via 207.165.200.254, 00:00:15, Serial0/0/1
E1 192.168.3.0/24 [110/1851437] via 207.165.200.254, 00:00:19, Serial0/0/1
207.165.200.0/24 is variably subnetted, 4 subnets, 2 masks
C 207.165.200.248/30 is directly connected, Serial0/0/0
L 207.165.200.249/32 is directly connected, Serial0/0/0
C 207.165.200.252/30 is directly connected, Serial0/0/1
L 207.165.200.253/32 is directly connected, Serial0/0/1', 'questions/ccna-after-exhibit-203.png', FALSE, NULL),
  (204, 135, 'present', 'FASTETHERNET LACP ETHERCHANNEL', 'SW1 Fa0/1 and Fa0/2 connect to the corresponding SW2 interfaces as an EtherChannel.
SW1 SW2
Fa0/1 Fa0/1
Fa0/2 Fa0/2
SW1#show run interface fastEthernet0/1
switchport trunk encapsulation dot1q
switchport mode trunk
switchport trunk allowed vlan 100,200,300
channel-group 1 mode on
SW1#show run interface fastEthernet0/2
switchport trunk encapsulation dot1q
switchport mode trunk
switchport trunk allowed vlan 100,200,300
channel-group 1 mode on
SW2#show run interface fastEthernet0/1
switchport trunk encapsulation dot1q
switchport mode trunk
switchport trunk allowed vlan 100,200,300
channel-group 1 mode on
SW2#show run interface fastEthernet0/2
switchport trunk encapsulation dot1q
switchport mode trunk
switchport trunk allowed vlan 100,200,300
channel-group 1 mode on', 'questions/ccna-after-exhibit-204.png', FALSE, NULL),
  (624, 136, 'missing', NULL, 'SW1#show run interface fastEthernet0/1
switchport trunk encapsulation dot1q
switchport mode trunk
switchport trunk allowed vlan 100,200,300
channel-group 1 mode active
SW1#show run interface fastEthernet0/2
switchport trunk encapsulation dot1q
switchport mode trunk
switchport trunk allowed vlan 100,200
channel-group 1 mode active
SW2#show run interface fastEthernet0/1
switchport trunk encapsulation dot1q
switchport mode trunk
switchport trunk allowed vlan 100,200,300
channel-group 1 mode active
SW2#show run interface fastEthernet0/2
switchport trunk encapsulation dot1q
switchport mode trunk
switchport trunk allowed vlan 100,200,300
channel-group 1 mode active', 'questions/ccna-after-exhibit-624.png', FALSE, NULL),
  (205, 137, 'present', NULL, 'Switch2#show lldp
Global LLDP Information
Status: ACTIVE
LLDP advertisements are sent every 30 seconds
LLDP hold time advertised is 120 seconds
LLDP interface reinitialization delay is 2 seconds', 'questions/ccna-after-exhibit-205.png', FALSE, NULL),
  (228, 138, 'present', NULL, 'ip domain-name CNAC.com !
interface GigabitEthernet0/0/0
ip address 192.168.1.10 255.255.255.0
duplex auto
speed auto !
line vty 0 15
login local !
R1#show crypto key mypubkey rsa
R1#show ssh
%No SSHv2 server connections running.
%No SSHv1 server connections running.', 'questions/ccna-after-exhibit-228.png', FALSE, NULL),
  (236, 139, 'present', NULL, 'TenGigabitEthernet0/0 is up, line protocol is up
Hardware is BUILT-IN-2T+6X1GE, address is 74a0.2f7a.0123 (bia 74a0.2f7a.0123)
Description: Uplink
Internet address is 10.1.1.1/24
MTU 1500 bytes, BW 10000000 Kbit/sec, DLY 10 usec,
reliability 255/255, txload 1/255, rxload 1/255
Encapsulation ARPA, loopback not set
Keepalive not supported
Full Duplex, 10000Mbps, link type is force-up, media type is unknown media type
output flow-control is on, input flow-control is on
ART type: ARPA, ARP Timeout 04:00:00
Last input 00:00:00, output 00:05:40, output hang never
Last clearing of "show interface" counters never
Input queue: 0/375/0/0 (size/max/drops/flushes); Total output drops: 0
Queueing strategy: fifo
Output queue: 0/40 (size/max)
5 minute input rate 616000 bits/sec, 1113 packets/sec
5 minute output rate 11213000 bits/sec, 1553 packets/sec
12662416065 packets input, 12607032232894 bytes, 0 no buffer
Received 14117163 broadcasts (0 IP multicasts)
0 runts, 0 giants, 0 throttles
0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored
0 watchdog, 26271385 multicast, 0 pause input
7907770090 packets output, 507279042092 bytes, 0 underruns
0 output errors, 8662414049 collisions, 1 interface resets
0 unknown protocol drops
0 babbles, 0 late collision, 0 deferred
0 lost carrier, 0 no carrier, 0 pause output
0 output buffer failures, 0 output buffers swapped out
1 carrier transitions', 'questions/ccna-after-exhibit-236.png', TRUE, 'possible garbled text'),
  (251, 140, 'present', NULL, 'Hardware is ISR4331-3x1GE, address is 5486.bc25.1f70 (bia 5486.bc25.1f70)
Description: << WAN Link >>
Internet address is 192.0.2.2/30
MTU 1500 bytes, BW 1000000 Kbit/sec, DLY 10 usec.
reliability 255/255, txload 1/255, rxload 1/255
Encapsulation ARPA, loopback not set
Keepalive not supported
Full Duplex, 1000Mbps, link type is auto, media type is RJ45
output flow control is off, input flow-control is off
ART type: ARPA, ARP Timeout 04:00:00
Last input 00:00:00, output 00:00:11, output hang never
Last clearing of "show interface" counters never
Input queue: 0/375/0/0 (size/max/drops/flushes); Total output drops: 0
Queueing strategy: fifo
Output queue: 0/40 (size/max)
5 minute input rate 7000 bits/sec, 4 packets/sec
5 minute output rate 4000 bits/sec, 4 packets/sec
22579370 packets input, 8825545968 bytes, 0 no buffer
Received 67 broadcasts (0 IP multicasts)
0 runts, 0 giants, 0 throttles
3612699 input errors, 3612699 CRC, 0 frame, 0 overrun, 0 ignored
0 watchdog, 10747057 multicast, 0 pause input
12072167 packets output, 1697953637 bytes, 0 underruns
0 output errors, 0 collisions, 1 interface resets
6 unknown protocol drops
0 babbles, 0 late collision, 0 deferred
5 lost carrier, 0 no carrier, 0 pause output
0 output buffer failures, 0 output buffers swapped out', 'questions/ccna-after-exhibit-251.png', FALSE, NULL),
  (256, 141, 'present', NULL, 'R1# show ip route
Codes:
C - connected, S - static, I - IGRP, R - RIP, M - mobile, B - BGP, D -
EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area, N1 - OSPF NSSA
external type 1, N2 - OSPF NSSA external type 2, E1 - OSPF external type 1,
E2 - OSPF external type 2, E - EGP
i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, * - candidate default,
U - per-user static route, o - ODR
Gateway of last resort is not set
C 10.0.0.0/8 is directly connected, Loopback0
10.0.0.0/8 is variably subnetted, 4 subnets, 2 masks
O 10.0.1.3/32 [110/100] via 10.0.1.100, 00:39:08, Serial0
C 10.0.1.0/24 is directly connected, Serial0
O 10.0.1.5/32 [110/5] via 10.0.1.50, 00:39:08, Serial0
O 10.0.10.0/24 [110/10] via 10.0.1.4, 00:39:08, GigabitEthernet0/0
D 10.0.10.0/24 [90/10] via 10.0.1.5, 00:39:08, GigabitEthernet0/1', 'questions/ccna-after-exhibit-256.png', FALSE, NULL),
  (259, 142, 'present', NULL, 'Router#show run
Building configuration...
Current configuration : 1530 bytes !
Last configuration change at 11:32:53 UTC Thu Feb 10 2020
upgrade fpd auto
version 15.2
service timestamps debug datetime msec
service timestamps log datetime msec
no service password-encryption !
hostname Router !
boot-start-marker
boot-end-marker !!!
no aaa new-model
no ip icmp rate-limit unreachable !!
--More--', 'questions/ccna-after-exhibit-259.png', FALSE, NULL),
  (274, 143, 'present', NULL, 'Cat9300#show cdp
Global CDP information
Sending CDP packets every 60 seconds
Sending CDP advertisements is enabled
Holdtime is 180 seconds
CDP version 2 advertisements are enabled', 'questions/ccna-after-exhibit-274.png', FALSE, NULL),
  (300, 144, 'present', NULL, 'cisco_ospf_vrf {"R1 default":
ensure => ''present'',
auto_cost => ''100'',
}', 'questions/ccna-after-exhibit-300.png', FALSE, NULL),
  (310, 145, 'present', NULL, 'R1# show ip route | begin gateway
Gateway of last resort is not set
172.16.0.0/16 is variably subnetted, 3 subnets, 2 masks
C 172.16.1.0/24 is directly connected, FastEthernet0/0
L 172.16.1.3/32 is directly connected, FastEthernet0/0
EX 172.16.2.0/24 [170/2] via 207.165.200.250, 00:00:25, Serial0/0/0
O 192.168.1.0/24 [110/84437] via 207.165.200.254, 00:00:17, Serial0/0/1
D 192.168.2.0/24 [90/184437] via 207.165.200.254, 00:00:13, Serial0/0/1
E1 192.168.3.0/24 [110/1851437] via 207.165.200.254, 00:00:19, Serial0/0/1
207.165.200.0/24 is variably subnetted, 4 subnets, 2 masks
C 207.165.200.248/30 is directly connected, Serial0/0/0
L 207.165.200.249/32 is directly connected, Serial0/0/0
C 207.165.200.252/30 is directly connected, Serial0/0/1
L 207.165.200.253/32 is directly connected, Serial0/0/1', 'questions/ccna-after-exhibit-310.png', FALSE, NULL),
  (338, 146, 'present', NULL, 'R1#show ip route
Codes: C - connected, S - static, R - RIP, M - mobile, B - BGP
 D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
 N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
 E1 - OSPF external type 1, E2 - OSPF external type 2
 i - IS-IS, su - IS-IS summary, L1 - IS-IS level-1, L2 - IS-IS level-2
 ia - IS-IS inter area, * - candidate default, U - per-user static route
 o - ODR, P - periodic downloaded static route
Gateway of last resort is not set
10.0.0.0/24 is subnetted, 5 subnets
D 10.1.2.0/24 [90/2170112] via 10.145.20.226, 00:01:33, Serial0/0/0
D 10.1.3.0/24 [90/2170112] via 10.145.20.226, 00:01:33, Serial0/0/0
D 10.1.2.0/25 [90/2170112] via 10.145.20.126, 00:01:33, Serial0/0/0
D 10.1.2.0/25 [90/2170112] via 10.145.20.146, 00:01:33, Serial0/0/0
D 10.1.4.0/25 [90/2170112] via 10.145.20.156, 00:01:33, Serial0/0/0
192.168.1.0/24 is variably subnetted, 2 subnets, 2 masks
C 192.168.10.0/24 is directly connected, GigabitEthernet0/0
C 192.168.21.0/24 is directly connected, GigabitEthernet0/1
10.165.20.0/24 is variably subnetted, 2 subnets, 2 masks
C 10.165.20.224/28 is directly connected, Serial0/0/0
S 10.1.2.112/28 [1/0] via 10.165.20.166', 'questions/ccna-after-exhibit-338.png', FALSE, NULL),
  (345, 147, 'present', NULL, 'C:\Users\ccnaadmin>ipconfig/all
Windows IP Configuration
 Host Name . . . . . . . . . . . . : CCNA-LAB
 Primary Dns Suffix . . . . . . . :
 Node Type . . . . . . . . . . . . : Hybrid
 IP Routing Enabled. . . . . . . . : No
 WINS Proxy Enabled. . . . . . . . : No
 DNS Suffix Search List. . . . . . : arcap.se
Ethernet adapter Ethernet:
 Media State . . . . . . . . . . . : Media disconnected
 Connection-specific DNS Suffix . :
 Description . . . . . . . . . . . : Realtek PCIe GBE Family Controller
 Physical Address. . . . . . . . . : [redacted]
 DHCP Enabled. . . . . . . . . . . : Yes
 Autoconfiguration Enabled . . . . . : Yes
Wireless LAN adapter Wi-Fi:
 Connection-specific DNS Suffix . : arcap.se
 Description . . . . . . . . . . . : Intel(R) Dual Band Wireless-AC 7265
 Physical Address. . . . . . . . . : [redacted]
 DHCP Enabled. . . . . . . . . . . : Yes
 Autoconfiguration Enabled . . . . : Yes
 Link-local IPv6 Address . . . . . : fe80::45a1:b3fa:2f37:b37f%2(Preferred)
 IPv4 Address. . . . . . . . . . . : 192.168.1.226(Preferred)
 Subnet Mask . . . . . . . . . . . : 255.255.255.0
 Lease Obtained. . . . . . . . . . : 3 October 2019 12:28:08 PM
 Lease Expires . . . . . . . . . . : 3 October 2019 7:10:38 PM
 Default Gateway . . . . . . . . . : 192.168.1.100
 DHCP Server . . . . . . . . . . . : 192.168.1.254
 DHCPv6 IAID . . . . . . . . . . . : 466701686
 DHCPv6 Client DUID. . . . . . . . : 00-01-00-01-20-FF-05-55-3C-F3-34-29-20-DF
 DNS Servers . . . . . . . . . . . : 192.168.1.253
 192.168.1.254
 NetBIOS over Tcpip. . . . . . . . : Enabled
 Connection-specific DNS Suffix Search List:
 arcap.se', 'questions/ccna-after-exhibit-345.png', FALSE, NULL),
  (369, 148, 'present', NULL, 'Retains the original SW-to-PC Gig0/1 link and the exact configuration; no unsupported interface or speed details are
added.
SWITCH PORT SECURITY
One switch-to-PC access link on Gig0/1
SWITCH ACCESS LINK
SW PC
Gig0/1
IOS CONFIGURATION
SW# conf t
SW(config)#interface gigabitEthernet0/1
SW(config-if)#switchport mode access
SW(config-if)#switchport port-security
SW(config-if)#', 'questions/ccna-after-exhibit-369.png', FALSE, NULL),
  (920, 149, 'missing', NULL, 'SW1#show spanning-tree vlan 30
VLAN0030
Spanning tree enabled protocol rstp
Root ID Priority 32798
 Address 0018.7363.4300
 Cost 2
 Port 13 (FastEthernet2/1)
 Hello Time 2 sec
 Max Age 20 sec
 Forward Delay 20 sec
<output omitted>', 'questions/ccna-after-exhibit-920.png', FALSE, NULL),
  (928, 150, 'missing', NULL, 'R1#show ip route
D 172.16.32.0/27 [90/2938474831] via 20.1.1.1
O 172.16.32.0/19 [110/22847] via 20.1.1.10
R 172.16.32.0/24 [120/2] via 20.1.1.3', 'questions/ccna-after-exhibit-928.png', FALSE, NULL),
  (933, 151, 'missing', NULL, 'R1#show ip route | begin gateway
Gateway of last resort is 209.165.200.246 to network 0.0.0.0
S* 0.0.0.0/0 [1/0] via 209.165.200.246, Serial0/1/0
 is directly connected, Serial0/1/0
 172.16.0.0/16 is variably subnetted, 2 subnets, 2 masks
S 172.16.3.0/24 [1/0] via 207.165.200.250, Serial0/0/0
O 172.16.3.0/28 [110/84437] via 207.165.200.254, 00:00:30, Serial0/0/1
 207.165.200.0/24 is variably subnetted, 6 subnets, 2 masks
C 207.165.200.244/30 is directly connected, Serial0/1/0
L 207.165.200.245/32 is directly connected, Serial0/1/0
C 207.165.200.248/30 is directly connected, Serial0/0/0
L 207.165.200.249/32 is directly connected, Serial0/0/0
C 207.165.200.252/30 is directly connected, Serial0/0/1
L 207.165.200.253/32 is directly connected, Serial0/0/1', 'questions/ccna-after-exhibit-933.png', FALSE, NULL),
  (1014, 152, 'present', NULL, 'R1#show ip route | begin gateway
Gateway of last resort is 209.165.200.246 to network 0.0.0.0
S* 0.0.0.0/0 [1/0] via 209.165.200.246
is directly connected, Serial0/0/1
172.16.0.0/16 is variably subnetted, 2 subnets, 2 masks
O 172.16.0.0/24 [110/2] via 207.165.200.250, Serial0/0/0
O 172.16.0.0/28 [110/84437] via 207.165.200.250, Serial0/0/1
O 172.16.0.0/28 [110/84437] via 207.165.200.252, Serial0/0/1
209.165.200.0/24 is variably subnetted, 6 subnets, 2 masks
C 209.165.200.244/30 is directly connected, Serial0/0/0
L 209.165.200.245/32 is directly connected, Serial0/0/0
C 209.165.200.248/30 is directly connected, Serial0/0/0
L 209.165.200.249/32 is directly connected, Serial0/0/0
C 209.165.200.252/30 is directly connected, Serial0/0/1
L 209.165.200.253/32 is directly connected, Serial0/0/1', 'questions/ccna-after-exhibit-1014.png', FALSE, NULL),
  (1082, 153, 'present', NULL, 'S1#show interface trunk
Port Mode Encapsulation Status Native vlan
Fa0/1 on 802.1q Trunking 1
Port Vlans allowed on trunk
Fa0/1 1,100,5
Port Vlans allowed and active in management domain
Fa0/1 1,2
S2#show interface trunk
Port Mode Encapsulation Status Native vlan
Fa0/1 on 802.1q Trunking 2
Port Vlans allowed on trunk
Fa0/1 1,100,5
Port Vlans allowed and active in management domain
Fa0/1 1,2', 'questions/ccna-after-exhibit-1082.png', FALSE, NULL),
  (1097, 154, 'present', NULL, 'SW1#show spanning-tree vlan 30
VLAN0030
Spanning tree enabled protocol rstp
Root ID Priority 32798
 Address 0018.7363.4300
 Cost 2
 Port 13 (FastEthernet2/1)
 Hello Time 2 sec
 Max Age 20 sec
 Forward Delay 20 sec
<output omitted>', 'questions/ccna-after-exhibit-1097.png', FALSE, NULL),
  (1108, 155, 'present', NULL, 'SW1#show lacp neighbor
Flags: S - Device is sending Slow LACPDUs
 F - Device is sending Fast LACPDUs
 A - Device is in Active mode
 P - Device is in Passive mode
Channel group 31 neighbors
Partner''s information:
 LACP port
Port Flags Priority Dev ID Age Key Key Number State
Et1/1 SP 32768 aabb.cc40.4000 6s 0x0 0x23 0x101 0x3C
Et1/2 SP 32768 aabb.cc40.4000 6s 0x0 0x23 0x102 0x3C', 'questions/ccna-after-exhibit-1108.png', TRUE, 'possible garbled text'),
  (1109, 156, 'present', NULL, 'Switch#show etherchannel summary
<output omitted>
Group Port-channel Protocol Ports
10 Po10(SU) LACP Gi0/0(P) Gi0/1(P)
20 Po20(SU) LACP Gi0/2(P) Gi0/3(P)', 'questions/ccna-after-exhibit-1109.png', FALSE, NULL),
  (1127, 157, 'present', NULL, 'R1#show ip route | begin gateway
Gateway of last resort is 209.165.200.246 to network 0.0.0.0
S* 0.0.0.0/0 [1/0] via 209.165.200.246, Serial0/0/1
 172.16.0.0/16 is variably subnetted, 3 subnets, 3 masks
O 172.16.0.0/24 [110/38443] via 209.165.200.254, 00:00:33, Serial0/0/0
O 172.16.0.128/25 [110/38443] via 209.165.200.254, 00:00:33, Serial0/0/1
O 172.16.0.192/29 [110/38443] via 209.165.200.254, 00:00:33, Serial0/0/1
 209.165.200.0/24 is variably subnetted, 6 subnets, 2 masks
C 209.165.200.244/30 is directly connected, Serial0/0/0
L 209.165.200.245/32 is directly connected, Serial0/0/0
C 209.165.200.248/30 is directly connected, Serial0/0/0
L 209.165.200.249/32 is directly connected, Serial0/0/0
C 209.165.200.252/30 is directly connected, Serial0/0/1
L 209.165.200.253/32 is directly connected, Serial0/0/1', 'questions/ccna-after-exhibit-1127.png', FALSE, NULL),
  (1141, 158, 'present', NULL, 'R1#show ip route
D 172.16.32.0/27 [90/2938474831] via 20.1.1.1
O 172.16.32.0/19 [110/22847] via 20.1.1.10
R 172.16.32.0/24 [120/2] via 20.1.1.3', 'questions/ccna-after-exhibit-1141.png', FALSE, NULL),
  (1146, 159, 'present', NULL, 'R1#show ip route | begin gateway
Gateway of last resort is 209.165.200.246 to network 0.0.0.0
S* 0.0.0.0/0 [1/0] via 209.165.200.246
is directly connected, Serial0/0/1
172.16.0.0/16 is variably subnetted, 2 subnets, 2 masks
O 172.16.3.0/24 [110/2] via 207.165.200.250, Serial0/0/0
O 172.16.3.0/28 [110/84437] via 207.165.200.250, Serial0/0/1
O 172.16.3.0/28 [110/84437] via 207.165.200.252, Serial0/0/1
207.165.200.0/24 is variably subnetted, 6 subnets, 2 masks
C 207.165.200.244/30 is directly connected, Serial0/0/0
L 207.165.200.245/32 is directly connected, Serial0/0/0
C 207.165.200.248/30 is directly connected, Serial0/0/0
L 207.165.200.249/32 is directly connected, Serial0/0/0
C 207.165.200.252/30 is directly connected, Serial0/0/1
L 207.165.200.253/32 is directly connected, Serial0/0/1', 'questions/ccna-after-exhibit-1146.png', FALSE, NULL),
  (1148, 160, 'present', NULL, 'R1(config)#router eigrp 1
R1(config)#network 10.1.1.0 0.0.0.255
R1(config)#network 192.168.0.1 0.0.0.0
R2(config)#interface gi1/1
R2(config-if)#ip address 192.168.0.2 255.255.255.0
R2(config)#router bgp 65001
R2(config-router)#neighbor 192.168.0.1 remote-as 65000
R2(config)#router ospf 1
R2(config-router)#router-id 2.2.2.2
R2(config-router)#network 192.168.1.2 0.0.0.0 area 0
R2(config)#router eigrp 1
R2(config-router)#eigrp router-id 1.1.1.1
R2(config-router)#network 192.168.0.1 0.0.0.0
R2(config)#ip route 10.1.1.0 255.255.255.0 192.168.0.1', 'questions/ccna-after-exhibit-1148.png', FALSE, NULL),
  (1149, 161, 'present', NULL, 'R1#show ip route
Codes: C - connected, S - static, R - RIP, M - mobile, B - BGP
 D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
 N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
 E1 - OSPF external type 1, E2 - OSPF external type 2
 i - IS-IS, su - IS-IS summary, L1 - IS-IS level-1, L2 - IS-IS level-2
 ia - IS-IS inter area, * - candidate default, U - per-user static route
 o - ODR, P - periodic downloaded static route
Gateway of last resort is 209.165.202.131 to network 0.0.0.0
S* 0.0.0.0/0 [1/0] via 209.165.202.131
S 209.165.200.0/27 is subnetted, 1 subnets
209.165.200.224 [254/0] via 209.165.202.129
S 209.165.201.0/27 is subnetted, 1 subnets
209.165.201.0 [1/0] via 209.165.202.130', 'questions/ccna-after-exhibit-1149.png', FALSE, NULL),
  (1157, 162, 'present', NULL, 'R1#show ip interface brief
Interface IP-Address OK? Method Status Protocol
FastEthernet0/0 unassigned YES administratively down down
GigabitEthernet0/1 192.168.0.1 YES NVRAM up up
GigabitEthernet0/2 192.168.0.2 YES NVRAM up up
GigabitEthernet0/3 10.10.10.20 YES NVRAM up up
GigabitEthernet0/4 unassigned YES NVRAM administratively down down
Loopback0 172.16.15.10 YES manual up up', 'questions/ccna-after-exhibit-1157.png', FALSE, NULL),
  (1168, 163, 'present', NULL, 'R1#show ip ospf int gi0/0
Gi0/0 is up, line protocol is up
Internet Address 10.201.24.8/28, Area 1, Attached via Network Statement
Process ID 100, Router ID 192.168.1.1, Network Type BROADCAST, Cost: 1
Topology-MTID Cost Disabled Shutdown Topology
0 1 no no Base
Transmit Delay is 1 sec, State DR, Priority 1
Designated Router (ID) 192.168.1.1, Interface address 10.201.24.8
No backup designated router on this network
Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5
oob-resync timeout 40
Hello due in 00:00:05
R2#show ip ospf int gi0/0
Gi0/0 is up, line protocol is up
Internet Address 10.201.24.1/28, Area 1
Process ID 100, Router ID 172.16.1.1, Network Type BROADCAST, Cost: 1
Transmit Delay is 1 sec, State DR, Priority 1
Designated Router (ID) 172.16.1.1, Interface address 10.201.24.1
No backup designated router on this network
Timer intervals configured, Hello 20, Dead 80, Wait 80, Retransmit 5', 'questions/ccna-after-exhibit-1168.png', FALSE, NULL),
  (1169, 164, 'present', NULL, 'R1#show ip route
Codes: C - connected, S - static, R - RIP, M - mobile, B - BGP
 D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
 N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
 E1 - OSPF external type 1, E2 - OSPF external type 2
 i - IS-IS, su - IS-IS summary, L1 - IS-IS level-1, L2 - IS-IS level-2
 ia - IS-IS inter area, * - candidate default, U - per-user static route
 o - ODR, P - periodic downloaded static route
Gateway of last resort is not set
C 10.0.0.0/8 is directly connected, Loopback0
10.0.0.0/8 is variably subnetted, 4 subnets, 2 masks
O 10.0.1.3/32 [110/100] via 10.0.1.3, 00:40:07, Serial0
C 10.0.1.0/24 is directly connected, Serial0
O 10.0.1.4/32 [110/5] via 10.0.1.50, 00:40:07, Serial0
O 10.0.1.5/32 [110/5] via 10.0.1.50, 00:40:07, Serial0
O 10.0.1.4/32 [110/10] via 10.0.1.4, 00:40:07, Serial0', 'questions/ccna-after-exhibit-1169.png', FALSE, NULL),
  (1174, 165, 'present', NULL, 'C 10.0.0.0/24 is subnetted, 1 subnets
O 10.0.0.0 is directly connected, FastEthernet0/1
D 172.16.0.0/16 is directly connected, FastEthernet0/0
D 192.168.0.0/24 [90/201728] via 172.16.0.2, 00:00:04, FastEthernet0/0', 'questions/ccna-after-exhibit-1174.png', FALSE, NULL),
  (1329, 166, 'present', 'R1–R2 DHCP RELAY TOPOLOGY', 'R1''s DHCP client LAN reaches the DHCP server on R2''s network through a switch.
R1 Access switch R2 DHCP Server
198.51.100.100
Fa0/0 Gii0/0
192.0.2.2
Gii0/11
198.51.100.1', 'questions/ccna-after-exhibit-1329.png', FALSE, NULL)
)
UPDATE "Questions" AS q
SET "afterExhibitComparisonNo" = e.comparison_no,
    "afterExhibitOriginalStatus" = e.original_status,
    "afterExhibitTitle" = e.exhibit_title,
    "afterExhibitText" = e.exhibit_text,
    "afterExhibitImageUrl" = e.image_url,
    "afterExhibitNeedsCheck" = e.needs_check,
    "afterExhibitCheckNote" = e.check_note
FROM after_exhibits AS e
WHERE q.id = e.question_id;
