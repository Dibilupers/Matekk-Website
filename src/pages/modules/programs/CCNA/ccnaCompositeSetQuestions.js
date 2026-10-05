// CCNA composite question set (85 questions) used in the Medium Exam.
// Exhibits are shown as a picture (pic) where we have one, otherwise written out as text.
// Answer keys were worked out from the question content (not supplied in the source).

import ipv6BlockImg from "../../../../assets/ccna-exam/ipv6-block-r1-r2.webp";
import salesVlan10Img from "../../../../assets/ccna-exam/sales-vlan10-mac-table.webp";
import etherchannelImg from "../../../../assets/ccna-exam/etherchannel-group1.webp";
import r4SupernetImg from "../../../../assets/ccna-exam/r4-supernet.webp";
import lobbyPortSecurityImg from "../../../../assets/ccna-exam/lobby-port-security.webp";
import routersAbcOspfImg from "../../../../assets/ccna-exam/routers-abc-ospf-dr.webp";
import router1HostAImg from "../../../../assets/ccna-exam/router1-host-a.webp";
import wlcMyWlanImg from "../../../../assets/ccna-exam/wlc-my-wlan-layer2.webp";
import wlcPskImg from "../../../../assets/ccna-exam/wlc-psk-layer2.webp";
import ospfPriorityImg from "../../../../assets/ccna-exam/ospf-r1-r2-r3-priority.webp";
import ospfDrotherImg from "../../../../assets/ccna-exam/ospf-drother-r1.webp";
import wlcAdvancedImg from "../../../../assets/ccna-exam/wlc-advanced-tab.webp";
import oldNewSwitchImg from "../../../../assets/ccna-exam/oldswitch-newswitch-trunk.webp";
import routersAbcFloatingImg from "../../../../assets/ccna-exam/routers-abc-floating-route.webp";
import subinterfaceImg from "../../../../assets/ccna-exam/subinterface-r1-sw1-sw2.webp";

// pic(image, text?) = picture exhibit, optionally with device output shown below it
const pic = (image, text) => ({ image, text });
const ex = (exhibit) => (exhibit && typeof exhibit === "object" ? { exhibitImage: exhibit.image, exhibit: exhibit.text } : { exhibit });
const one = (prompt, options, answer, explanation, exhibit) => ({ prompt, ...ex(exhibit), options, answer, explanation });
const two = (prompt, options, answer, explanation, exhibit) => ({ type: "multi", prompt, ...ex(exhibit), options, answer, explanation });
const match = (prompt, items, choices, answer, explanation, exhibit) => ({ type: "match", prompt, ...ex(exhibit), items, choices, answer, explanation });

const AAA = ["Accounting", "Authentication", "Authorization"];

export const CCNA_COMPOSITE_SET_QUESTIONS = [
	// ---------------- Set A ----------------
	one("Which statement about the Cisco ACI fabric is most accurate?", [
		"The spine switch rewrites the EPG from ingress to egress when it performs the forwarding proxy function",
		"The fabric header carries the EPG from the egress to the ingress leaf switch.",
		"An APIC is a cluster of at least three APIC controllers, providing a single point of management without a single point of failure.",
		"The APIC is able to enforce security by inserting itself into the data path.",
	], 2, "The APIC is deployed as a cluster of at least three controllers: one point of management with no single point of failure. The APIC is not in the data path, and the EPG travels from the ingress leaf to the egress leaf."),

	match("Match each IPv6 address with its address type.", [
		"2000:93f3:caf1:ec6e:d653:68b7:0fd1:1",
		"fe80:8ce3:4cd2:27ff:5cdb:77f8:72fb:7",
		"ff00:04cd:fa3e:a298:a1a3:0047:aad2:12",
		"fc00:c7cb:1f00:1c32:39bf:a19b:48cc:3",
	], ["Global unicast", "Unique Local", "Link-Local unicast", "Multicast"], [0, 2, 3, 1],
	"2000::/3 is global unicast, FE80::/10 is link-local, FF00::/8 is multicast, and FC00::/7 is unique local."),

	one("IPv6 is being implemented within the enterprise. The command ipv6 unicast-routing is configured. Interface Gig0/0 on R1 must be configured to provide a dynamic assignment using the assigned IPv6 block. Which command accomplishes this task?", [
		"ipv6 address 2001:DB8:FFFF:FCF3::/64 eui-64",
		"ipv6 address 2001:DB8:FFFF:FCF3::/64 link-local",
		"ipv6 address 2001:0B8:FFFF:FCF3::1/64",
		"ipv6 address autoconfig 2001:DB8:FFFF:FCF2::/64",
	], 0, "EUI-64 builds the interface ID automatically from the MAC address within the assigned 2001:db8:ffff:fcf3::/64 block. Option C has a typo in the prefix (0B8) and D uses the wrong block.",
	pic(ipv6BlockImg)),

	one("The entire contents of the MAC address table are shown. Sales-4 sends a data frame to Sales-1. What does the switch do as it receives the frame from Sales-4?", [
		"Map the Layer 2 MAC address to the Layer 3 IP address and forward the frame",
		"Insert the source MAC address and port into the forwarding table and forward the frame to Sales-1",
		"Perform a lookup in the MAC address table and discard the frame due to a missing entry",
		"Flood the frame out of all ports except on the port where Sales-1 is connected",
	], 1, "Sales-4's MAC is not in the table, so the switch learns it (source MAC + port Gi1/0/4). Sales-1's MAC is already known on Gi1/0/1, so the frame is forwarded only there.",
	pic(salesVlan10Img)),

	one("A network engineer started to configure two directly-connected routers as shown. Which command sequence must the engineer configure on R2 so that the two routers become OSPF neighbors?", [
		"interface GigabitEthernet0/1\n ip ospf 1 area 1",
		"router ospf 1\n network 192.168.12.0 0.0.0.127 area 0",
		"router ospf 1\n network 192.168.12.1 0.0.0.0 area 1",
		"interface GigabitEthernet0/1\n ip ospf 1 area 0",
	], 0, "R1 runs OSPF on this link in area 1, so R2's interface must also be in area 1. Option C would match R1's address (.1), not R2's (.2).",
	`R1
interface GigabitEthernet0/1
 ip address 192.168.12.1 255.255.255.128
 no shutdown
router ospf 1
 network 192.168.12.1 0.0.0.0 area 1

R2
interface GigabitEthernet0/1
 ip address 192.168.12.2 255.255.255.128
 no shutdown`),

	two("Which two protocols are used by an administrator for authentication and configuration on access points? (Choose two)", ["RADIUS", "802.1Q", "TACACS+", "802.1x", "Kerberos"], [0, 2],
		"RADIUS and TACACS+ are the AAA protocols used to authenticate administrators managing network devices such as access points."),

	one("Which port-security violation mode drops traffic from unknown MAC addresses and forwards an SNMP trap?", ["shutdown", "restrict", "shutdown VLAN", "protect"], 1,
		"Restrict drops traffic from unknown MACs, increments the violation counter, and sends SNMP traps/syslog. Protect drops silently; shutdown err-disables the port."),

	one("What facilitates a Telnet connection between devices by entering the device name?", ["syslog", "DNS lookup", "NTP", "SNMP"], 1,
		"DNS lookup resolves the device name to an IP address so the Telnet session can connect by name."),

	one("Which function generally performed by a traditional network device is replaced by a software-defined controller?", [
		"encapsulation and decapsulation of packets in a data-link frame",
		"building route tables and updating the forwarding table",
		"changing the source or destination address during NAT operations",
		"encryption and decryption for VPN link processing",
	], 1, "In SDN the control plane (building route tables and programming forwarding tables) moves to the controller; packet handling stays on the devices."),

	one("What is the collapsed layer in collapsed core architectures?", ["distribution and access", "core and distribution", "access and WAN", "core and WAN"], 1,
		"A collapsed core (two-tier) design merges the core and distribution layers into one."),

	one("The EtherChannel is configured with a speed of 1000 and duplex as full on both ends of channel group 1. What is the next step to configure the channel on switch A to respond to but not initiate LACP communication?", [
		"interface range gigabitethernet0/0/0 -15\n channel-group 1 mode desirable",
		"interface range gigabitethernet0/0/0 -15\n channel-group 1 mode on",
		"interface port-channel 1\n channel-group 1 mode passive",
		"interface port-channel 1\n channel-group 1 mode auto",
	], 2, "LACP passive mode responds to LACP packets but never starts negotiation. Desirable and auto are PAgP modes; on uses no protocol.",
	pic(etherchannelImg)),

	one("What is the purpose of the show ip ospf interface command?", [
		"displaying OSPF neighbor information on a per-interface-type basis",
		"displaying OSPF-related interface information",
		"displaying OSPF neighbor information on a per-interface basis",
		"displaying general information about OSPF routing processes",
	], 1, "show ip ospf interface displays OSPF-related information for each interface (area, cost, timers, network type, DR/BDR)."),

	one("The router has been configured with a supernet to accommodate the requirement for 380 users on a subnet. The requirement already considers 30% future growth. Which configuration verifies the IP subnet on router R4?", [
		"Subnet: 10.7.54.0\nSubnet mask: 255.255.128.0\nBroadcast address: 10.7.55.255\nUsable IP address range: 10.7.54.1 – 10.7.55.254",
		"Subnet: 10.7.54.0\nSubnet mask: 255.255.255.0\nBroadcast address: 10.7.54.255\nUsable IP address range: 10.7.54.1 – 10.7.55.254",
		"Subnet: 10.7.54.0\nSubnet mask: 255.255.254.0\nBroadcast address: 10.7.54.255\nUsable IP address range: 10.7.54.1 – 10.7.55.254",
		"Subnet: 10.7.54.0\nSubnet mask: 255.255.254.0\nBroadcast address: 10.7.55.255\nUsable IP address range: 10.7.54.1 – 10.7.55.254",
	], 3, "380 hosts need 9 host bits (510 usable), so /23 = 255.255.254.0. 10.7.54.0/23 runs to 10.7.55.255 (broadcast).",
	pic(r4SupernetImg)),

	one("What is a function of an endpoint on a network?", [
		"provides wireless services to users in a building",
		"allows users to record data and transmit to a file server",
		"forwards traffic between VLANs on a network",
		"connects server and client devices to a network",
	], 1, "Endpoints are user devices (PCs, phones, sensors) that create and send data. Wireless service, inter-VLAN forwarding, and connecting devices are network-device roles."),

	one("A router received three destination prefixes: 10.0.0.0/8, 10.0.0.0/16, and 10.0.0.0/24. When the show ip route command is executed, which output does it return?", [
		"Gateway of last resort is 172.16.1.1 to network 0.0.0.0\nO E2 10.0.0.0/24 [110/5] via 192.168.3.1, 0:01:00, Ethernet2",
		"Gateway of last resort is 172.16.1.1 to network 0.0.0.0\nO E2 10.0.0.0/8 [110/5] via 192.168.1.1, 0:01:00, Ethernet0",
		"Gateway of last resort is 172.16.1.1 to network 0.0.0.0\nO E2 10.0.0.0/16 [110/5] via 192.168.2.1, 0:01:00, Ethernet1\nO E2 10.0.0.0/24 [110/5] via 192.168.3.1, 0:01:00, Ethernet2",
		"Gateway of last resort is 172.16.1.1 to network 0.0.0.0\nO E2 10.0.0.0/8 [110/5] via 192.168.1.1, 0:01:00, Ethernet0\nO E2 10.0.0.0/16 [110/5] via 192.168.2.1, 0:01:00, Ethernet1\nO E2 10.0.0.0/24 [110/5] via 192.168.3.1, 0:01:00, Ethernet2",
	], 3, "Prefixes with different lengths are different routes, so all three are installed in the routing table."),

	one("The network engineer is configuring router R2 as a replacement router on the network. After the initial configuration is applied it is determined that R2 failed to show R1 as a neighbor. Which configuration must be applied to R2 to complete the OSPF configuration and enable it to establish the neighbor relationship with R1?", [
		"R2(config)#interface g0/0/0\nR2(config-if)#ip ospf hello-interval 15\nR2(config-if)#ip ospf dead-interval 20",
		"R2(config)#router ospf 1\nR2(config-router)#router-id 192.168.1.2",
		"R2(config)#router ospf 1\nR2(config-router)#network 192.168.1.0 255.255.255.0 area 2\nR2(config-router)#network 10.1.1.0 255.255.255.255 area 2",
		"R2(config)#interface g0/0/0\nR2(config-if)#ip ospf dead-interval 20",
	], 0, "Hello and dead timers must match. R1 uses Hello 15/Dead 20 and R2 uses 10/40, so R2 needs both timers changed.",
	`R1#show ip ospf interface g0/0/0
GigabitEthernet0/0/0 is up, line protocol is up
  Internet address is 192.168.1.2/24, Area 0
  Process ID 1, Router ID 192.168.1.2, Network Type POINT-TO-POINT, Cost: 1
  Transmit Delay is 1 sec, State POINT-TO-POINT,
  Timer intervals configured, Hello 15, Dead 20, Wait 20, Retransmit 5

R2#show ip ospf interface g0/0/0
GigabitEthernet0/0/0 is up, line protocol is up
  Internet address is 192.168.1.1/24, Area 0
  Process ID 1, Router ID 10.1.1.1, Network Type POINT-TO-POINT, Cost: 1
  Transmit Delay is 1 sec, State POINT-TO-POINT,
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5`),

	match("Match each description with the AAA service it belongs to.", [
		"records user commands", "secures access to routers", "limits the user's access permissions",
		"validates user credentials", "logs session statistics", "allows the user to change to enable mode",
	], AAA, [0, 1, 2, 1, 0, 2],
	"Accounting records commands and session statistics. Authentication secures access and validates credentials. Authorization limits permissions and controls privilege levels such as enable mode."),

	one("How does HSRP provide first hop redundancy?", [
		"It load-balances traffic by assigning the same metric value to more than one route to the same destination in the IP routing table",
		"It forwards multiple packets to the same destination over different routed links and data path",
		"It uses a shared virtual MAC and a virtual IP address to a group of routers that serve as the default gateway for hosts on a LAN",
		"It load-balances Layer 2 traffic along the path by flooding traffic out all interfaces configured with the same VLAN",
	], 2, "HSRP routers share a virtual IP and virtual MAC that hosts use as their default gateway; the standby router takes over if the active one fails."),

	one("A manager asks a network engineer to advise which cloud service models are used so employees do not have to waste their time installing, managing, and updating software which is only used occasionally. Which cloud service model does the engineer recommend?", [
		"infrastructure-as-a-service", "platform-as-a-service", "business process as service to support different types of service", "software-as-a-service",
	], 3, "With SaaS the provider installs, manages, and updates the application; users just use it."),

	two("Which two command sequences must you configure on a switch to establish a Layer 3 EtherChannel with an open-standard protocol? (Choose two)", [
		"interface GigabitEthernet0/0/1\n channel-group 10 mode active",
		"interface port-channel 10\n switchport\n switchport mode trunk",
		"interface GigabitEthernet0/0/1\n channel-group 10 mode on",
		"interface port-channel 10\n no switchport\n ip address 172.16.0.1 255.255.255.0",
		"interface GigabitEthernet0/0/1\n channel-group 10 mode auto",
	], [0, 3], "LACP (open standard) uses mode active/passive, and a Layer 3 port-channel needs 'no switchport' plus an IP address. 'auto' is PAgP (Cisco) and 'on' uses no protocol."),

	one("Which role does AI play in monitoring network data now?", [
		"It enhances data packet delivery speeds.", "It exclusively predicts device malfunctions.", "It simplifies traffic route mapping.", "It analyzes patterns anomaly detection.",
	], 3, "AI-driven monitoring analyzes traffic patterns to detect anomalies that may indicate problems or attacks."),

	one("Which password must an engineer use to enter the enable mode?", ["testing1234", "adminadmin123", "cisco123", "default"], 0,
		"When both 'enable password' and 'enable secret' are set, the enable secret (testing1234) takes precedence.",
	`Atlanta#config t
Atlanta(config)#aaa new-model
Atlanta(config)#aaa authentication login default local
Atlanta(config)#line vty 0 4
Atlanta(config-line)#login authentication default
Atlanta(config-line)#exit
Atlanta(config)#username ciscoadmin password adminadmin123
Atlanta(config)#username ciscoadmin privilege 15
Atlanta(config)#enable password cisco123
Atlanta(config)#enable secret testing1234
Atlanta(config)#end`),

	one("What is a function of MAC address learning?", [
		"It increases security on the management VLAN", "It is enabled by default on all VLANs and interfaces",
		"It increases the potential for MAC address flooding", "It is disabled by default on all interfaces connected to trunks",
	], 1, "Switches learn source MAC addresses automatically; learning is enabled by default on all VLANs and interfaces."),

	one("A WLC sends alarms about a rogue AP, and the network administrator verifies that the alarms are caused by a legitimate autonomous AP. How must the alarms be stopped for the MAC address of the AP?", [
		"Set the AP Class Type to Friendly.", "Remove the AP from WLC management.", "Place the AP into manual containment.", "Manually remove the AP from Pending state.",
	], 0, "Classifying the AP as Friendly tells the WLC it is legitimate, which stops the rogue alarms."),

	one("What does the host do when using the IPv4 Preferred function?", [
		"It forces the DNS server to provide the same IPv4 address at each renewal",
		"It continues to use a statically assigned IPv4 address",
		"It requests the same IPv4 address when it renews its lease with the DHCP server",
		"It prefers a pool of addresses when renewing the IPv4 host IP address",
	], 2, "'Preferred' means the host will ask the DHCP server for the same address when it renews its lease.",
	`Connection-specific DNS Suffix . :
  Description .................: Intel(R) Ethernet Connection (2) I218-V
  Physical Address.............: D0-50-99-47-A9-7F
  DHCP Enabled.................: Yes
  Autoconfiguration Enabled....: Yes
  Link-local IPv6 Address .....: fe80::8809:9772:c583:6bl8%15(Preferred)
  IPv4 Address.................: 192.168.69.132(Preferred)
  Subnet Mask .................: 255.255.255.0
  Lease Obtained...............: Thursday, January 21, 2021 11:10:46 PM
  Lease Expires ...............: Wednesday, February 3, 2021 11:27:29 AM
  Default Gateway..............: 192.168.69.1
  DHCP Server .................: 192.168.69.1
  DNS Servers .................: 192.168.69.1`),

	two("What are two characteristics of a public cloud implementation? (Choose two)", [
		"It is a data center on the public Internet that maintains cloud services for only one company",
		"It provides services that are accessed over the Internet",
		"It supports network resources from a centralized third-party provider and privately-owned virtual resources",
		"It enables an organization to fully customize how it deploys network resources",
		"It is owned and maintained by one party, but it is shared among multiple organizations",
	], [1, 4], "A public cloud is accessed over the Internet and is owned by one provider but shared by many organizations. Option C describes a hybrid cloud."),

	one("SW1 supports connectivity for a lobby conference room and must be secured. The engineer must limit the connectivity from PC1 to the SW1 and SW2 network. The MAC addresses allowed must be limited to two. Which configuration secures the conference room connectivity?", [
		"interface gi1/0/15\n switchport port-security mac-address 0000.abcd.0004 vlan 100\n interface switchport secure-mac limit 2",
		"interface gi1/0/15\n switchport port-security\n switchport port-security maximum 2",
		"interface gi1/0/15\n switchport port-security\n switchport port-security mac-address 0000.abcd.0004 vlan 100",
		"interface gi1/0/15\n switchport port-security mac-address 0000.abcd.0004 vlan 100",
	], 1, "Port security must be enabled ('switchport port-security') and 'maximum 2' limits the port to two MAC addresses.",
	pic(lobbyPortSecurityImg)),

	one("What is the function of a hub-and-spoke WAN topology?", [
		"supports application optimization", "allows access restrictions to be implemented between subscriber sites",
		"provides direct connections between subscribers", "supports Layer 2 VPNs",
	], 1, "All spoke traffic passes through the hub, so the hub can enforce access restrictions between sites."),

	one("Which action must be taken to ensure that router A is elected as the DR for OSPF area 0?", [
		"Configure the OSPF priority on router A with the lowest value between the three routers",
		"Configure the router A interfaces with the highest OSPF priority value within the area.",
		"Configure router B and router C as OSPF neighbors of router A.",
		"Configure router A with a fixed OSPF router ID.",
	], 1, "The router with the highest OSPF interface priority becomes the DR.",
	pic(routersAbcOspfImg)),

	one("How many objects are present in the given JSON-encoded data?", ["nine", "one", "four", "seven"], 0,
		"Count every { } pair: the outer object, aaaUser, its attributes, the children list item, aaaUserRole, its attributes, the nested list item, the nested aaaUserRole and its attributes = 9.",
	`{
  "aaaUser": {
    "attributes": {
      "pwd": "password1",
      "firstName": "Abraham",
      "lastName": "Lincoln",
      "phone": "5555551212",
      "email": "test@cisco.com"
    },
    "children": [{
      "aaaUserRole": {
        "attributes": {
          "name": "ExampleCisco"
        },
        "children": [{
          "aaaUserRole": {
            "attributes": {
              "name": "admin"
            }
          }
        }]
      }
    }]
  }
}`),

	one("In which way does generative AI aid network simulations?", [
		"It creates synthetic network configurations.", "It computes optimal data storage solutions.", "It deploys network firmware updates.", "It produce a greenfield network design.",
	], 0, "Generative AI can create synthetic configurations and data for testing network scenarios in simulations."),

	one("Which interface does a packet take to reach the destination address of 10.10.10.14?", ["Serial 0/0", "FastEthernet 0/0", "FastEthernet 0/1", "FastEthernet 0/2"], 2,
		"10.10.10.8/29 covers 10.10.10.8 to 10.10.10.15, so 10.10.10.14 is reached through FastEthernet 0/1.",
	`R3#show ip route
Gateway of last resort is not set

     10.0.0.0/8 is variably subnetted, 8 subnets, 4 masks
C    10.10.10.16/28 is directly connected, FastEthernet 0/0
L    10.10.10.17/32 is directly connected, FastEthernet 0/0
C    10.10.10.8/29 is directly connected, FastEthernet 0/1
L    10.10.10.9/32 is directly connected, FastEthernet 0/1
C    10.10.10.4/30 is directly connected, FastEthernet 0/2
L    10.10.10.5/32 is directly connected, FastEthernet 0/2
C    10.10.10.0/30 is directly connected, Serial 0/0
L    10.10.10.1/32 is directly connected, Serial 0/0`),

	one("In which circumstance would a network architect decide to implement a global unicast subnet instead of a unique local unicast subnet?", [
		"when the subnet must be routable over the internet", "when the subnet does not need to be routable",
		"when the addresses on the subnet must be equivalent to private IPv4 addresses", "when the subnet must be available only within an organization",
	], 0, "Global unicast addresses are routable on the Internet; unique local addresses are for use inside an organization (like private IPv4)."),

	match("Match each statement with the AAA service it belongs to. Not all statements are used.", [
		"It grants access to network assets, such as FTP servers.", "It limits the services available to a user.", "It performs user validation via TACACS+.",
		"It records the duration of each connection.", "It supports User Access Reporting.", "It verifies \"who you are\".",
	], ["Accounting", "Authentication", "Not used (Authorization)"], [2, 2, 1, 0, 0, 1],
	"Accounting records connection duration and supports user access reporting. Authentication validates users (via TACACS+) and verifies who you are. Granting access and limiting services are authorization, which isn't one of the targets here."),

	one("Which prefix does Router 1 use for traffic to Host A?", ["10.10.13.144/28", "10.10.10.0/28", "10.10.13.0/25", "10.10.13.208/29"], 3,
		"Host A is 10.10.13.214, which falls in 10.10.13.208/29 (10.10.13.208 to 10.10.13.215), the longest matching prefix.",
	pic(router1HostAImg, `Router1#show ip route
Gateway of last resort is 10.10.11.2 to network 0.0.0.0
B    209.165.200.224 [20/0] via 10.10.12.2, 03:03:03
B    209.165.201.0 [20/0] via 10.10.12.2, 03:03:03
B    209.165.202.128 [20/0] via 10.10.12.2, 03:03:03
     10.0.0.0/8 is variably subnetted, 8 subnets, 4 masks
C    10.10.10.0/28 is directly connected, GigabitEthernet0/0
C    10.10.11.0/30 is directly connected, FastEthernet2/0
C    10.10.12.0/30 is directly connected, GigabitEthernet0/1
O    10.10.13.0/25 [110/2] via 10.10.10.1, 00:00:03, GigabitEthernet0/0
O    10.10.13.128/28 [110/2] via 10.10.10.1, 00:00:03, GigabitEthernet0/0
O    10.10.13.144/28 [110/2] via 10.10.10.1, 00:00:03, GigabitEthernet0/0
O    10.10.13.160/29 [110/2] via 10.10.10.1, 00:00:03, GigabitEthernet0/0
O    10.10.13.208/29 [110/2] via 10.10.10.1, 00:00:03, GigabitEthernet0/0
S*   0.0.0.0/0 [1/0] via 10.10.11.2`)),

	one("Which command creates a static NAT binding for a PC address of 10.1.1.1 to the public routable address 209.165.200.225 assigned to the PC?", [
		"R1(config)#ip nat outside source static 10.1.1.1 209.165.200.225",
		"R1(config)#ip nat inside source static 209.165.200.225 10.1.1.1",
		"R1(config)#ip nat inside source static 10.1.1.1 209.165.200.225",
		"R1(config)#ip nat outside source static 209.165.200.225 10.1.1.1",
	], 2, "Static inside NAT is 'ip nat inside source static <inside local> <inside global>'."),

	// ---------------- Set B ----------------
	one("Which encryption mode is used when a packet is sent from a site-to-site VPN connection where the source and destination IP address portion of a packet is unencrypted?", ["Secure Shell", "PPTP", "Transport", "PPPoE"], 2,
		"IPsec transport mode encrypts only the payload; the original IP header (source and destination) stays unencrypted."),

	one("What is the metric of the route to the 192.168.10.33/28 subnet?", ["110", "128", "193", "192", "84"], 2,
		"192.168.10.33 falls in 192.168.10.32/28, whose entry is [110/193]: 110 is the administrative distance and 193 is the metric.",
	`R1#show ip route
Gateway of last resort is 192.168.30.10 to network 0.0.0.0

     192.168.30.0/29 is subnetted, 2 subnets
C       192.168.30.0 is directly connected, FastEthernet0/0
C       192.168.30.8 is directly connected, Serial0/0.1
     192.168.10.0/24 is variably subnetted, 2 subnets, 2 masks
O IA    192.168.10.32/28 [110/193] via 192.168.30.10, 00:11:34, Serial0/0.1
O IA    192.168.10.0/27 [110/192] via 192.168.30.10, 00:11:34, Serial0/0.1
     192.168.20.0/30 is subnetted, 1 subnets
O IA    192.168.20.0 [110/128] via 192.168.30.10, 00:11:34, Serial0/0.1
     192.168.50.0/32 is subnetted, 1 subnets
C       192.168.50.1 is directly connected, Loopback0
O*IA 0.0.0.0/0 [110/84] via 192.168.30.10, 00:11:21, Serial0/0.1`),

	one("Where are the real-time control functions processed in a split MAC architecture?", ["client device", "individual AP", "central WLC", "centralized cloud management platform"], 1,
		"In split MAC, time-sensitive functions (beacons, probe responses, acknowledgements) run on the AP; management functions run on the WLC."),

	one("What is the advantage of separating the control plane from the data plane within an SDN network?", [
		"limits data queries to the control plane", "reduces cost", "decreases overall network complexity", "offloads the creation of virtual machines to the data plane",
	], 2, "Centralizing the control plane in a controller simplifies management and decreases overall network complexity."),

	match("An engineer is verifying network configuration parameters on a client workstation. Match each node identifier with its network parameter.", [
		"192.168.1.255", "192.168.1.1", "192.168.1.20", "B8-76-3F-7C-57-DF", "192.168.1.254",
	], ["default gateway", "host IP address", "MAC address", "last assignable IP address in the subnet", "broadcast address"], [4, 0, 1, 2, 3],
	"From ipconfig: host 192.168.1.20 /24, gateway 192.168.1.1, physical address B8-76-3F-7C-57-DF. In 192.168.1.0/24 the broadcast is .255 and the last usable address is .254.",
	`C:\\>ipconfig/all
Wireless LAN adapter Wi-Fi:
   Description . . . . . . . . . . . : Intel(R) Dual Band Wireless-AC 8260
   Physical Address. . . . . . . . . : B8-76-3F-7C-57-DF
   DHCP Enabled. . . . . . . . . . . : No
   Link-local IPv6 Address . . . . . : fe80::3dd8:5c53:ff04:4731%8(Preferred)
   IPv4 Address. . . . . . . . . . . : 192.168.1.20(Preferred)
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1
   DNS Servers . . . . . . . . . . . : 192.168.1.15
                                       192.168.1.16`),

	match("Match each AAA feature with the AAA security service it belongs to. Not all options are used.", [
		"It leverages a RADIUS server to grant user access to a reverse Telnet session",
		"It enables the device to allow user- or group-based access",
		"It restricts the CLI commands that a user is able to perform",
		"It records the amount of time for which a user accesses the network on a remote server",
		"It uses TACACS+ to log the configuration commands entered by a network administrator",
		"It verifies the user before granting access to the device",
	], ["Authentication", "Authorization", "Not used (Accounting)"], [0, 1, 1, 2, 2, 0],
	"Authentication verifies users (including RADIUS login for reverse Telnet). Authorization controls user/group access and which CLI commands are allowed. Recording time and logging commands are accounting, which isn't a target here."),

	one("An LACP EtherChannel between two directly connected switches is in the configuration process. Which command must be configured on switch SW2's Gi0/1-2 interfaces to establish the channel to SW1?", [
		"channel-group 1 mode auto", "channel-group 1 mode on", "channel-group 1 mode desirable", "channel-group 1 mode active",
	], 3, "SW1 uses LACP active. SW2 must also run LACP (active or passive); 'auto' and 'desirable' are PAgP and 'on' uses no protocol.",
	`SW1
configure terminal
interface range GigabitEthernet 0/1-2
 switchport mode trunk
 channel-group 1 mode active

SW2
configure terminal
interface range GigabitEthernet 0/1-2
 switchport mode trunk
interface Port-channel1
 switchport mode trunk`),

	one("Where is the interface between the control plane and data plane within the software-defined architecture?", [
		"control layer and the application layer", "application layer and the infrastructure layer",
		"application layer and the management layer", "control layer and the infrastructure layer",
	], 3, "The southbound interface connects the control layer (controller) to the infrastructure layer (devices that forward data)."),

	one("What is the difference between AAA authentication and authorization?", [
		"Authentication verifies a username and password, and authorization handles the communication between the authentication agent and the user database",
		"Authentication identifies and verifies a user who is attempting to access a system, and authorization controls the tasks the user performs",
		"Authentication identifies a user who is attempting to access a system, and authorization validates the user's password",
		"Authentication controls the system processes a user accesses, and authorization logs the activities the user initiates.",
	], 1, "Authentication proves who the user is; authorization decides what that user is allowed to do."),

	one("Which port security violation mode is configured on interface Fa0/1?", ["restrict", "shutdown VLAN", "protect", "shutdown"], 3,
		"The port was put into err-disable state and went down, which is the shutdown violation mode.",
	`%PM-4-ERR_DISABLE: psecure-violation error detected on Fa0/1, putting Fa0/1 in err-disable state
%PORT_SECURITY-2-PSECURE_VIOLATION: Security violation occurred, caused by MAC address 00AA.1AB9.D22F on port FastEthernet0/1
%LINKPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/1, changed state to down
%LINK-3-UPDOWN: Interface FastEthernet0/1, changed state to down`),

	one("Which field within the access-request packet is encrypted by RADIUS?", ["authenticator", "authorized services", "username", "password"], 3,
		"RADIUS encrypts only the password in the access-request packet; TACACS+ encrypts the entire payload."),

	one("What is an enhancement implemented in WPA3?", [
		"defends against deauthentication and disassociation attacks", "uses TKIP and per-packet keying",
		"employs PKI and RADIUS to identify access points", "applies 802.1x authentication and AES-128 encryption",
	], 0, "WPA3 requires Protected Management Frames, which defend against deauthentication and disassociation attacks."),

	match("Match each characteristic with its fiber cable type.", [
		"uses multiple wavelengths of light", "has a core diameter of 9 microns", "has increased attenuation over long distances", "uses a single wavelength of light",
	], ["multimode fiber", "single-mode fiber"], [0, 1, 0, 1],
	"Multimode fiber carries multiple light modes and loses more signal over distance. Single-mode fiber has a ~9 micron core and carries a single mode of light."),

	one("Which is a fact related to FTP?", [
		"It uses block numbers to identify and mitigate data-transfer errors", "It uses two separate connections for control and data traffic",
		"It always operates without user authentication", "It relies on the well-known UDP port 69.",
	], 1, "FTP uses a control connection (TCP 21) and a separate data connection (TCP 20 or a negotiated port). Block numbers and UDP 69 belong to TFTP."),

	one("R1 has learned route 10.10.10.0/24 via numerous routing protocols. Which route is installed?", [
		"route with the lowest administrative distance", "route with the next hop that has the highest IP",
		"route with the shortest prefix length", "route with the lowest cost",
	], 0, "For the same prefix learned from different protocols, the route with the lowest administrative distance is installed."),

	one("Which protocol does Ansible use to push modules to nodes in a network?", ["Telnet", "SNMP", "SSH", "Kerberos"], 2,
		"Ansible is agentless and connects to managed nodes over SSH."),

	one("What does a switch use to build its MAC address table?", ["DTP", "ingress traffic", "VTP", "egress traffic"], 1,
		"The switch learns the source MAC address of frames arriving (ingress) on each port."),

	one("What does a router do when configured with the default DNS lookup settings, and a URL is entered on the CLI?", [
		"initiates a ping request to the URL", "sends a broadcast message in an attempt to resolve the URL",
		"continuously attempts to resolve the URL until the command is cancelled", "prompts the user to specify the desired IP address",
	], 1, "With default settings (ip domain-lookup, no name server), the router broadcasts a DNS query (to 255.255.255.255) to resolve the name."),

	one("What is the function of a controller in controller-based networking?", [
		"It serves as the centralized management point of an SDN architecture", "It centralizes the data plane for the network",
		"It is a pair of core routers that maintain all routing decisions for a campus", "It is the card on a core router that maintains all routing decisions for a campus",
	], 0, "The controller is the centralized control and management point of an SDN; the data plane stays distributed on the devices."),

	match("Match each Ansible description with its term.", [
		"collection of actions to perform on target devices, expressed in YAML format",
		"device with Ansible installed that manages target devices",
		"network device, without Ansible installed, upon which commands can be executed",
		"specific action to be performed on one or more target devices",
		"unit of Python code to be executed",
		"Ansible file that defines the target devices upon which commands and tasks can be executed",
	], ["inventory", "control node", "task", "playbook", "module", "managed node"], [3, 1, 5, 2, 4, 0],
	"Playbook = YAML list of plays/tasks; control node runs Ansible; managed node is the target; task = one action; module = Python code a task runs; inventory = list of target devices."),

	one("What is the effect of this configuration?", [
		"The switch discards all ingress ARP traffic with invalid MAC-to-IP address bindings.",
		"All ingress and egress traffic is dropped because the interface is untrusted.",
		"All ARP packets are dropped by the switch.",
		"Egress traffic is passed only if the destination is a DHCP server.",
	], 0, "Dynamic ARP Inspection checks ARP packets on untrusted ports against the DHCP snooping bindings and drops those with invalid MAC-to-IP bindings.",
	`ip arp inspection vlan 5-10
interface fastethernet0/1
 switchport mode access
 switchport access vlan 5`),

	match("Match each DNS record description with its record type.", [
		"correlates a domain with its authoritative name servers",
		"associates the domain serial number with its owner",
		"aliases one name to another",
		"supports reverse name lookups",
		"correlates a host name with an IP address",
	], ["AAAA", "SOA", "PTR", "CNAME", "NS"], [4, 1, 3, 2, 0],
	"NS lists authoritative name servers, SOA holds the zone's serial number and owner, CNAME is an alias, PTR supports reverse lookups, and AAAA maps a host name to an IPv6 address."),

	one("How does a switch process a frame received on Fa0/1 with the destination MAC address of 0e38.7363.657b when the table is missing the address?", [
		"It floods the frame to all interfaces except Fa0/1.", "It drops the frame immediately.",
		"It holds the frame until the MAC address timer expires and then drops the frame.", "It forwards the frame back out of interface Fa0/1.",
	], 0, "Unknown unicast frames are flooded out all ports in the VLAN except the one they arrived on."),

	one("Which fact must the engineer consider when implementing syslog on a new network?", [
		"The logging level defines the severity of a particular message", "Syslog defines the software or hardware component that triggered the message",
		"There are 16 different logging levels (0-15)", "By default, all message levels are sent to the syslog server",
	], 0, "Syslog levels 0 (emergencies) to 7 (debugging) define message severity. There are 8 levels, and by default only levels 0–6 go to a syslog server."),

	one("A user configured OSPF in a single area between two routers. A serial interface connecting R1 and R2 is running encapsulation PPP. By default which OSPF network type is seen on this interface when the user types show ip ospf interface on R1 or R2?", [
		"broadcast", "point-to-multipoint", "non-broadcast", "point-to-point",
	], 3, "Serial interfaces using PPP or HDLC default to the OSPF point-to-point network type."),

	one("A network engineer is configuring a wireless LAN with Web Passthrough Layer 3 Web Policy. Which action must the engineer take to complete the configuration?", [
		"Set the Layer 2 Security to None.", "Enable the WPA Policy.", "Enable TKIP and CCMP256 WPA2 Encryption.", "Set the Layer 2 Security to 802.1X.",
	], 0, "Web Passthrough is a Layer 3 web policy for open guest access, so Layer 2 Security must be set to None.",
	pic(wlcMyWlanImg)),

	two("Which two HTTP methods are suitable for actions performed by REST-based APIs? (Choose two)", ["GET", "REMOVE", "REDIRECT", "POST", "POP"], [0, 3],
		"REST APIs use HTTP methods such as GET, POST, PUT, PATCH, and DELETE. REMOVE, REDIRECT, and POP are not HTTP methods."),

	one("R1 as an NTP server must have:\n• NTP authentication enabled\n• NTP packets sourced from Interface loopback 0\n• NTP stratum 2\n• NTP packets only permitted to client IP 209.165.200.225\n\nHow should R1 be configured?", [
		"ntp authenticate\nntp authentication-key 2 sha1 CISCO123\nntp source Loopback0\nntp access-group server-only 10\nntp master 2\n!\naccess-list 10 permit udp host 209.165.200.225 any eq 123",
		"ntp authenticate\nntp authentication-key 2 md5 CISCO123\nntp source Loopback0\nntp access-group server-only 10\nntp stratum 2\n!\naccess-list 10 permit udp host 209.165.200.225 any eq 123",
		"ntp authenticate\nntp authentication-key 2 md5 CISCO123\nntp interface Loopback0\nntp access-group server-only 10\nntp stratum 2\n!\naccess-list 10 permit 209.165.200.225",
		"ntp authenticate\nntp authentication-key 2 md5 CISCO123\nntp source Loopback0\nntp access-group server-only 10\nntp master 2\n!\naccess-list 10 permit 209.165.200.225",
	], 3, "'ntp master 2' sets stratum 2 and 'ntp source Loopback0' sources the packets. ACL 10 is a standard ACL, so it can only match a source address, not UDP ports."),

	two("Which two actions are performed by the Weighted Random Early Detection mechanism? (Choose two)", [
		"It can identify different flows with a high level of granularity", "It can mitigate congestion by preventing the queue from filling up",
		"It drops lower-priority packets before it drops higher-priority packets", "It supports protocol discovery", "It guarantees the delivery of high-priority packets",
	], [1, 2], "WRED randomly drops packets before the queue fills (congestion avoidance) and drops lower-priority packets first."),

	one("When a WLAN with WPA2 PSK is configured in the Wireless LAN Controller GUI which format is supported?", ["base64", "Unicode", "ASCII", "decimal"], 2,
		"The WLC accepts the pre-shared key in ASCII or hexadecimal format."),

	one("Which feature is mandatory when configuring a new SSID for a wireless network running WPA3-Personal mode?", [
		"Opportunistic Wireless Encryption", "Enhanced Open", "Fast Transition", "Protected Management Frame",
	], 3, "WPA3 requires Protected Management Frames (PMF)."),

	two("Company A wants to use a RADIUS server to service all user and device authentication attempts with a more secure and granular authentication approach. Not all client devices support dot1x authentication. Which two configuration changes must be made to accomplish the task? (Choose two)", [
		"Select Authentication server under the AAA servers tab.", "Set Authentication under the Layer 3 tab.",
		"Enable WPA2 Policy under the Layer 2 tab.", "Enable AutoConfig iPSK under the Layer 2 tab.", "Configure Enterprise Security type under the Layer 2 tab.",
	], [0, 3], "Identity PSK lets devices without 802.1X get per-device keys from the RADIUS server: enable AutoConfig iPSK and select the RADIUS authentication server under AAA Servers.",
	pic(wlcPskImg)),

	one("Which security method is used to prevent man-in-the-middle attack?", ["anti-replay", "authorization", "accounting", "authentication"], 3,
		"Mutual authentication of both endpoints prevents an attacker from impersonating either side in a man-in-the-middle attack."),

	one("Routers R1 and R3 have the default configuration. The router R2 priority is set to 99. Which commands on R3 configure it as the DR in the 10.0.4.0/24 network?", [
		"R3(config)#interface Gig0/0\nR3(config-if)#ip ospf priority 1",
		"R3(config)#interface Gig0/1\nR3(config-if)#ip ospf priority 0",
		"R3(config)#interface Gig0/1\nR3(config-if)#ip ospf priority 100",
		"R3(config)#interface Gig0/0\nR3(config-if)#ip ospf priority 100",
	], 2, "R3 connects to 10.0.4.0/24 on Gig0/1. A priority of 100 (higher than R2's 99) makes R3 the DR.",
	pic(ospfPriorityImg)),

	one("A packet is being sent across router R1 to host 172.16.3.14. To which destination does the router send the packet?", [
		"207.165.200.254 via Serial0/0/0", "207.165.200.246 via Serial0/1/0", "207.165.200.254 via Serial0/0/1", "207.165.200.250 via Serial0/0/0",
	], 2, "172.16.3.14 matches both 172.16.3.0/24 and 172.16.3.0/28. The longest match (/28) wins: via 207.165.200.254 out Serial0/0/1.",
	`R1# show ip route | begin gateway
Gateway of last resort is 209.165.200.246 to network 0.0.0.0
S*   0.0.0.0/0 [1/0] via 209.165.200.246, Serial0/1/0
          is directly connected, Serial0/1/0
     172.16.0.0/16 is variably subnetted, 2 subnets, 2 masks
S    172.16.3.0/24 [1/0] via 207.165.200.250, Serial0/0/0
O    172.16.3.0/28 [110/84437] via 207.165.200.254, 00:00:30, Serial0/0/1
     207.165.200.0/24 is variably subnetted, 6 subnets, 2 masks
C    207.165.200.244/30 is directly connected, Serial0/1/0
L    207.165.200.245/32 is directly connected, Serial0/1/0
C    207.165.200.248/30 is directly connected, Serial0/0/0
L    207.165.200.249/32 is directly connected, Serial0/0/0
C    207.165.200.252/30 is directly connected, Serial0/0/1
L    207.165.200.253/32 is directly connected, Serial0/0/1`),

	one("What is the purpose of an ESSID?", [
		"It serves as the wireless MAC address of the access point.", "It supports fast roaming features such as 802.11 r, 802.11k, and 802.11v.",
		"It provides greater security than a standard SSID.", "It allows multiple access points to provide a common network for client connections.",
	], 3, "An ESSID (Extended SSID) is the same SSID advertised by multiple APs so clients see one network across the coverage area."),

	one("What is a functionality of HSRP?", [
		"It enlists gratuitous ARP to update a client's ARP cache when the active router switches over.",
		"It uses virtual MAC addressing to provide gateway redundancy on a LAN.",
		"It provides router redundancy and route reconvergence when a router fails.",
		"It requires active and standby routes to provide failover in the case of a router failure.",
	], 1, "HSRP gives hosts a virtual IP and virtual MAC as their gateway, providing first-hop redundancy on the LAN."),

	one("Which interface is used to send traffic to the destination network?", ["G0/3", "G0/6", "G0/16", "G0/23"], 1,
		"OSPF (AD 110) beats RIP (AD 120). Between the two OSPF routes, the lower metric (6906) via G0/6 wins.",
	`O 10.18.75.113/27 [110/6906] via G0/6
O 10.18.75.113/27 [110/23018] via G0/3
R 10.18.75.113/27 [120/16] via G0/16
R 10.18.75.113/27 [120/14] via G0/23`),

	one("How does TFTP operate in a network?", [
		"relies on the well-known TCP port 20 to transmit data", "provides secure data transfer",
		"uses block numbers to identify and mitigate data-transfer errors", "requires two separate connections for control and data traffic",
	], 2, "TFTP runs over UDP 69 and numbers each data block so lost blocks can be detected and resent. It has no security and uses a single connection."),

	one("What must a network administrator consider when deciding whether to configure a new wireless network with APs in autonomous mode or APs running in cloud-based mode?", [
		"Cloud-based mode APs rely on underlays and are more complex to maintain than APs in autonomous mode",
		"Autonomous mode APs are easy to deploy and automate than APs in cloud-based mode",
		"Cloud-based mode APs are easy to deploy but harder to automate than APs in autonomous mode",
		"Autonomous mode APs are less dependent on an underlay but more complex to maintain than APs in cloud-based mode",
	], 3, "Autonomous APs work on their own (no controller/underlay) but each must be managed individually, so they are harder to maintain at scale."),

	one("Which configuration management mechanism uses TCP port 22 by default when communicating with managed nodes?", ["Puppet", "Python", "Ansible", "Chef"], 2,
		"Ansible connects to managed nodes over SSH (TCP 22). Puppet and Chef use agents on other ports."),

	one("R1 has taken the DROTHER role in the OSPF DR/BDR election process. Which configuration must an engineer implement so that R1 is elected as the DR?", [
		"R3(config)#interface FastEthernet0/1\nR3(config-if)#ip ospf priority 200\nR3#clear ip ospf process",
		"R1(config)#interface FastEthernet0/0\nR1(config-if)#ip ospf priority 1\nR1#clear ip ospf process",
		"R1(config)#interface FastEthernet0/0\nR1(config-if)#ip ospf priority 200\nR1#clear ip ospf process",
		"R2(config)#interface FastEthernet0/2\nR2(config-if)#ip ospf priority 1\nR2#clear ip ospf process",
	], 2, "All routers have the default priority 1. Raising R1's priority to 200 and resetting OSPF makes R1 win the DR election.",
	pic(ospfDrotherImg)),

	two("A network engineer configures the CCNA WLAN so that clients must reauthenticate hourly and to limit the number of simultaneous connections to the WLAN to 10. Which two actions complete this configuration? (Choose two)", [
		"Enable the Client Exclusion option and set the value to 3600.", "Enable the Wi-Fi Direct Clients Policy option.",
		"Set the Maximum Allowed Clients value to 10.", "Enable the Enable Session Timeout option and set the value to 3600.",
		"Set the Maximum Allowed Clients Per AP Radio value to 10.",
	], [2, 3], "Session Timeout of 3600 seconds forces hourly reauthentication, and Maximum Allowed Clients limits connections to the whole WLAN.",
	pic(wlcAdvancedImg)),

	one("Which goal is achieved by the implementation of private IPv4 addressing on a network?", [
		"provides an added level of protection against Internet exposure", "allows communication across the Internet to other private networks",
		"allows servers and workstations to communicate across public network boundaries", "provides a reduction in size of the forwarding table on network routers",
	], 0, "Private addresses are not routable on the Internet, so hosts using them are not directly reachable from outside."),

	one("When a client and server are not on the same physical network, which device is used to forward requests and replies between client and server for DHCP?", [
		"DHCP relay agent", "DHCPOFFER", "DHCPDISCOVER", "DHCP server",
	], 0, "A DHCP relay agent (ip helper-address) forwards the client's broadcast DHCP messages to a server on another network."),

	one("Why was the RFC 1918 address space defined?", [
		"conserve public IPv4 addressing", "reduce instances of overlapping IP addresses", "support the NAT protocol", "preserve public IPv6 address space",
	], 0, "RFC 1918 private ranges let organizations reuse addresses internally, conserving public IPv4 addresses."),

	one("What is the difference between 1000BASE-LX/LH and 1000BASE-ZX interfaces?", [
		"1000BASE-LX/LH interoperates with multimode and single-mode fiber, and 1000BASE-ZX needs a conditioning patch cable with a multimode.",
		"1000BASE-LX/LH is supported on links up to 10km, and 1000BASE-ZX operates over links up to 70 km.",
		"1000BASE-ZX interoperates with dual-rate 100M/1G 10Km SFP over multimode fiber, and 1000BASE-LX/LH supports only single-rate.",
		"1000BASE-ZX is supported on links up to 1000km, and 1000BASE-LX/LH operates over links up to 70 km.",
	], 1, "1000BASE-LX/LH reaches about 10 km on single-mode fiber; 1000BASE-ZX reaches about 70 km."),

	one("A new VLAN and switch are added to the network. A remote engineer configures OldSwitch and must ensure that the configuration meets these requirements:\n• accommodates current configured VLANs\n• expands the range to include VLAN 20\n• allows for IEEE standard support for virtual LANs\n\nWhich configuration on the NewSwitch side of the link meets these requirements?", [
		"no switchport mode trunk\nswitchport trunk encapsulation isl\nswitchport mode access vlan 20",
		"switchport mode dynamic\nchannel-group 1 mode active\nswitchport trunk allowed vlan 5,10,15,20",
		"switchport nonnegotiate\nno switchport trunk allowed vlan 5,10\nswitchport trunk allowed vlan 5,10,15,20",
		"no switchport trunk encapsulation isl\nswitchport trunk encapsulation dot1q\nswitchport trunk allowed vlan add 20",
	], 3, "Switch from ISL to IEEE 802.1Q (dot1q) and use 'allowed vlan add 20' to keep VLANs 5 and 10 while adding VLAN 20.",
	pic(oldNewSwitchImg)),

	one("What is the effect when loopback interfaces and the configured router ID are absent during the OSPF Process configuration?", [
		"The lowest IP address is incremented by 1 and selected as the router ID.", "No router ID is set, and the OSPF protocol does not run.",
		"The router ID 0.0.0.0 is selected and placed in the OSPF process.", "The highest up/up physical interface IP address is selected as the router ID.",
	], 3, "Without a configured router ID or loopbacks, OSPF uses the highest IP address of an up/up physical interface."),
];

// 14 more questions from the second question set (brings the Medium Exam to 100).
export const CCNA_COMPOSITE_SET2_QUESTIONS = [
	one("Which switch technology establishes a network connection immediately when it is plugged in?", ["BPDU guard", "PortFast", "UplinkFast", "BackboneFast"], 1,
		"PortFast moves an access port straight to the forwarding state, skipping the spanning-tree listening and learning stages."),

	one("What is the maximum length of characters used in an SSID?", ["32", "48", "64", "16"], 0,
		"An SSID can be up to 32 characters (32 bytes) long."),

	one("Which command must be issued to enable a floating static default route on router A?", [
		"ip route 0.0.0.0 0.0.0.0 192.168.2.1 10", "ip route 0.0.0.0 0.0.0.0 192.168.1.2",
		"ip default-gateway 192.168.2.1", "ip route 0.0.0.0 0.0.0.0 192.168.1.2 10",
	], 3, "The primary default route goes to Router B (192.168.2.2). The backup must point to the other neighbor, Router C (192.168.1.2), with a higher administrative distance (10) so it is only used if the primary fails.",
	pic(routersAbcFloatingImg)),

	one("The administrator must configure a floating static default route that points to 2001:db8:1234:2::1 and replaces the current default route only if it fails. Which command must the engineer configure on the CPE?", [
		"ipv6 route ::/0 2001:db8:1234:2::1 1", "ipv6 route ::/128 2001:db8:1234:2::1 3",
		"ipv6 route ::/0 2001:db8:1234:2::1 3", "ipv6 route ::/0 2001:db8:1234:2::1 2",
	], 2, "The current default route (ND ::/0) has an administrative distance of 2. A floating route needs a higher AD, such as 3, and the default prefix is ::/0 (not ::/128).",
	`CPE# show ipv6 route
IPv6 Routing Table - default - 6 entries
Codes: C - Connected, L - Local, S - Static, ND - ND Default, NDp - ND Prefix
ND  ::/0 [2/0]
     via FE80::A8BB:CCFF:FE00:200, Ethernet0/0
NDp 2001:DB8:1234:1::/64 [2/0]
     via Ethernet0/0, directly connected
L   2001:DB8:1234:1:A8BB:CCFF:FE00:100/128 [0/0]
     via Ethernet0/0, receive
C   2001:DB8:1234:2::/64 [0/0]
     via Ethernet0/1, directly connected
L   2001:DB8:1234:2:A8BB:CCFF:FE00:110/128 [0/0]
     via Ethernet0/1, receive
L   FF00::/8 [0/0]
     via Null0, receive`),

	one("What is a characteristic of frame switching?", [
		"stores and forwards frames in a buffer and uses error checking", "populates the ARP table with the egress port",
		"drops received MAC addresses not listed in the address table", "rewrites the source and destination MAC address",
	], 0, "Store-and-forward switching buffers the whole frame and checks it for errors (FCS) before forwarding it."),

	match("Match each characteristic with its cable type.", [
		"supplies conduit for PoE implementations", "used for DWDM optical systems spanning long distances",
		"easy to tap into and obtain secure information", "has a core diameter of 9 microns",
	], ["copper", "single-mode fiber"], [0, 1, 0, 1],
	"Copper carries Power over Ethernet and is easier to tap. Single-mode fiber has a ~9 micron core and is used for long-distance DWDM systems."),

	one("With REST API, which standard HTTP header tells a server which media type is expected by the client?", [
		"Accept-Patch: text/example; charset=utf-8", "Accept: application/json",
		"Content-Type: application/json; charset=utf-8", "Accept-Encoding: gzip, deflate",
	], 1, "The Accept header tells the server which media type the client expects back. Content-Type describes the body being sent."),

	one("Which set of 2.4 GHz nonoverlapping wireless channels is standard in the United States?", [
		"channels 2, 7, 9, and 11", "channels 2, 7, and 11", "channels 1, 6, 11, and 14", "channels 1, 6, and 11",
	], 3, "In the US, the 2.4 GHz non-overlapping channels are 1, 6, and 11 (channel 14 is not used there)."),

	one("What is the role of disaggregation in controller-based networking?", [
		"It divides the control-plane and data-plane functions.",
		"It streamlines traffic handling by assigning individual devices to perform either Layer 2 or Layer 3 functions.",
		"It summarizes the routes between the core and distribution layers of the network topology.",
		"It enables a network topology to quickly adjust from a ring network to a star network",
	], 0, "Disaggregation separates the control plane (moved to the controller) from the data plane (left on the devices)."),

	one("What does traffic shaping do?", [
		"It modifies the QoS attributes of a packet", "It sets QoS attributes within a packet", "It queues excess traffic", "It organizes traffic into classes",
	], 2, "Shaping buffers (queues) traffic that exceeds the configured rate and sends it later; policing drops or re-marks it instead."),

	one("What commands are needed to add a subinterface to Ethernet0/0 on R1 to allow for VLAN 20, with IP address 10.20.20.1/24?", [
		"R1(config)#interface ethernet0/0\nR1(config)#encapsulation dot1q 20\nR1(config)#ip address 10.20.20.1 255.255.255.0",
		"R1(config)#interface ethernet0/0.20\nR1(config)#encapsulation dot1q 20\nR1(config)#ip address 10.20.20.1 255.255.255.0",
		"R1(config)#interface ethernet0/0.20\nR1(config)#ip address 10.20.20.1 255.255.255.0",
		"R1(config)#interface ethernet0/0\nR1(config)#ip address 10.20.20.1 255.255.255.0",
	], 1, "Router-on-a-stick needs a subinterface (e0/0.20) tagged with \"encapsulation dot1q 20\" before the IP address is assigned.",
	pic(subinterfaceImg, `R1
interface Ethernet0/0
 no ip address

SW1:
interface Ethernet0/0
 switchport trunk encapsulation dot1q
 switchport mode trunk
!
interface Ethernet0/1
 switchport trunk allowed vlan 10
 switchport trunk encapsulation dot1q
 switchport mode trunk

SW2:
interface Ethernet0/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
!
interface Ethernet0/2
 switchport access vlan 20
 switchport mode access`)),

	one("Which command entered on a switch configured with Rapid-PVST+ listens and learns for a specific time period?", [
		"switch(config)#spanning-tree vlan 1 priority 4096", "switch(config)#spanning-tree vlan 1 hello-time 10",
		"switch(config)#spanning-tree vlan 1 forward-time 20", "switch(config)#spanning-tree vlan 1 max-age 6",
	], 2, "The forward delay timer controls how long a port spends in the listening and learning states."),

	one("How do TCP and UDP fit into a query-response model?", [
		"TCP avoids using sequencing, and UDP avoids using acknowledgments.", "TCP establishes a connection prior to sending data, and UDP sends immediately.",
		"TCP uses error detection for packets, and UDP uses error recovery.", "TCP encourages out-of-order packet delivery, and UDP prevents re-ordering.",
	], 1, "TCP sets up a connection (three-way handshake) before sending data; UDP is connectionless and sends right away."),

	one("An engineer observes high usage on the 2.4GHz channels and lower usage on the 5GHz channels. What must be configured to allow clients to preferentially use 5GHz access points?", [
		"Client Band Select", "Re-Anchor Roamed Clients", "OEAP Split Tunnel", "11ac MU-MIMO",
	], 0, "Band Select delays 2.4 GHz probe responses so dual-band clients are steered to the less congested 5 GHz band."),
];
