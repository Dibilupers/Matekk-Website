ALTER TABLE "Questions"
ADD COLUMN "question_type" TEXT NOT NULL DEFAULT 'single',
ADD COLUMN "match_items" JSONB;

INSERT INTO "Questions" (
    "module",
    "topic",
    "difficulty",
    "question_text",
    "choices",
    "correct_answer",
    "explanation",
    "question_type",
    "match_items"
) VALUES
(
    'CCNA', 'IPv6 Addressing', 'Medium',
    'Match each IPv6 prefix with its address type.',
    '["Multicast","Unique local","Global unicast","Link-local unicast"]',
    '[2,3,0,1]',
    '2000::/3 is global unicast, FE80::/10 is link-local, FF00::/8 is multicast, and FC00::/7 is unique local.',
    'match',
    '["2000::/3","FE80::/10","FF00::/8","FC00::/7"]'::jsonb
),
(
    'CCNA', 'Network Access', 'Easy',
    'Match each AAA function with what it does.',
    '["Authentication","Authorization","Accounting"]',
    '[0,1,2]',
    'Authentication verifies identity, authorization determines permitted actions, and accounting records activity.',
    'match',
    '["Verifies the identity of a user","Determines what an authenticated user may access","Records user activity and resource use"]'::jsonb
),
(
    'CCNA', 'Network Services', 'Easy',
    'Match each DHCP message with its place in the DORA process.',
    '["DHCPREQUEST","DHCPOFFER","DHCPDISCOVER","DHCPACK"]',
    '[2,1,0,3]',
    'The client discovers servers, receives an offer, requests an address, and receives an acknowledgment.',
    'match',
    '["First client broadcast seeking a DHCP server","Server proposes an address lease","Client requests the offered address","Server confirms the lease"]'::jsonb
),
(
    'CCNA', 'IP Routing', 'Medium',
    'Match each route description with its route code in the IPv4 routing table.',
    '["O","C","L","S"]',
    '[1,2,3,0]',
    'Cisco route codes are C for connected, L for local, S for static, and O for OSPF.',
    'match',
    '["Directly connected network route","Local interface address route","Manually configured route","Route learned through OSPF"]'::jsonb
),
(
    'CCNA', 'EtherChannel', 'Medium',
    'Match each EtherChannel mode with the protocol behavior.',
    '["passive","desirable","auto","active"]',
    '[3,0,1,2]',
    'LACP uses active/passive; PAgP uses desirable/auto. Active and desirable initiate negotiation.',
    'match',
    '["LACP initiates negotiation","LACP responds but does not initiate","PAgP initiates negotiation","PAgP responds but does not initiate"]'::jsonb
),
(
    'CCNA', 'Network Address Translation', 'Medium',
    'Match each NAT type with its description.',
    '["PAT","Static NAT","Dynamic NAT"]',
    '[1,2,0]',
    'Static NAT maps addresses one-to-one, dynamic NAT uses a pool, and PAT multiplexes sessions using port numbers.',
    'match',
    '["Permanent one-to-one mapping between inside and outside addresses","Maps inside addresses from a pool of outside addresses","Lets many inside hosts share an outside address using port numbers"]'::jsonb
),
(
    'CCNA', 'Network Access', 'Medium',
    'Match each port-security violation mode with its behavior.',
    '["protect","shutdown","restrict"]',
    '[0,2,1]',
    'Protect silently drops violating frames, restrict also records and reports violations, and shutdown disables the port.',
    'match',
    '["Drops unauthorized traffic without recording a violation","Drops unauthorized traffic and increments the violation counter","Places the port into an error-disabled state"]'::jsonb
),
(
    'CCNA', 'Spanning Tree Protocol', 'Medium',
    'Match each spanning-tree port role with its function.',
    '["Alternate","Root","Designated"]',
    '[1,2,0]',
    'The root port is the best path toward the root bridge; designated ports forward for a segment; alternate ports provide a backup path.',
    'match',
    '["Provides the best path toward the root bridge","Forwards traffic for its network segment toward the root","Provides a backup path toward the root bridge"]'::jsonb
),
(
    'CCNA', 'OSPF', 'Medium',
    'Match each OSPF router role on a broadcast network with its function.',
    '["DROther","BDR","DR"]',
    '[2,1,0]',
    'The DR forms adjacencies with other routers, the BDR is its backup, and DROther routers form full adjacency with the DR and BDR.',
    'match',
    '["Elected router that reduces adjacency count on the segment","Standby router that takes over if the DR fails","Non-elected router on the multiaccess segment"]'::jsonb
),
(
    'CCNA', 'IPv4 Addressing', 'Easy',
    'Match each IPv4 address range with its common use.',
    '["127.0.0.0/8","169.254.0.0/16","10.0.0.0/8","224.0.0.0/4"]',
    '[2,0,1,3]',
    '127.0.0.0/8 is loopback, 169.254.0.0/16 is link-local, 10.0.0.0/8 is private, and 224.0.0.0/4 is multicast.',
    'match',
    '["Private address space","IPv4 multicast address space","Loopback address space","Link-local automatic addressing space"]'::jsonb
),
(
    'CCNA', 'Access Control Lists', 'Medium',
    'Match each ACL type with the information it can filter.',
    '["Standard ACL","Extended ACL"]',
    '[0,1]',
    'Standard ACLs filter by source IPv4 address; extended ACLs can also filter by protocol, source, destination, and ports.',
    'match',
    '["Filters traffic using only the source IPv4 address","Can filter by protocol, source and destination addresses, and ports"]'::jsonb
),
(
    'CCNA', 'VLANs and Trunking', 'Easy',
    'Match each switchport mode with its normal operation.',
    '["access","trunk","dynamic desirable","dynamic auto"]',
    '[0,1,2,3]',
    'Access carries one data VLAN, trunk carries multiple VLANs, and desirable initiates DTP negotiation while auto responds.',
    'match',
    '["Carries traffic for a single VLAN","Carries traffic for multiple VLANs using tags","Actively attempts to form a trunk using DTP","Passively waits for a DTP trunk negotiation"]'::jsonb
),
(
    'CCNA', 'Network Services', 'Medium',
    'Match each NTP stratum with its reference source.',
    '["Stratum 2","Stratum 0","Stratum 1"]',
    '[1,2,0]',
    'Stratum 0 devices are reference clocks; directly connected NTP servers are stratum 1, and a server synchronized to stratum 1 is stratum 2.',
    'match',
    '["Reference clock such as an atomic clock or GPS source","NTP server synchronized directly to a stratum 0 source","NTP server synchronized to a stratum 1 server"]'::jsonb
),
(
    'CCNA', 'Network Management', 'Medium',
    'Match each SNMP version with its security capability.',
    '["SNMPv3","SNMPv1","SNMPv2c"]',
    '[2,0,1]',
    'SNMPv1 and SNMPv2c use community strings without encryption; SNMPv3 adds authentication and privacy options.',
    'match',
    '["Uses community strings and has no message authentication or encryption","Adds protocol improvements but still relies on community strings","Supports user-based authentication and message privacy"]'::jsonb
),
(
    'CCNA', 'Wireless Security', 'Medium',
    'Match each wireless security method with its authentication approach.',
    '["WPA2-Personal","WPA2-Enterprise","Open authentication"]',
    '[0,1,2]',
    'WPA2-Personal uses a shared passphrase, WPA2-Enterprise uses 802.1X with an authentication server, and open authentication has no credential-based access control.',
    'match',
    '["Uses a pre-shared key configured for the WLAN","Uses 802.1X and typically a RADIUS server","Associates without a wireless password"]'::jsonb
);
