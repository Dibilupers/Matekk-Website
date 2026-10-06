import { Link } from "react-router-dom";
import { TutorialDiagramFrame } from "./ccnaTutorialDiagramFrame";
import VlanWithoutSegmentationImage from "../../../../../assets/ccna-vlan/vlan-without-segmentation.svg";
import VlanDepartmentBenefitsImage from "../../../../../assets/ccna-vlan/vlan-department-benefits.svg";
import VlanTrunkIdImage from "../../../../../assets/ccna-vlan/vlan-trunk-id.svg";
import VlanFrameTaggingImage from "../../../../../assets/ccna-vlan/vlan-frame-tagging.svg";
import VlanTrunkToRouterImage from "../../../../../assets/ccna-vlan/vlan-trunk-to-router.svg";
import VlanNativeTrafficImage from "../../../../../assets/ccna-vlan/vlan-native-traffic.svg";
import InterVlanSeparationImage from "../../../../../assets/ccna-vlan/intervlan-separation.svg";
import RouterOnAStickImage from "../../../../../assets/ccna-vlan/router-on-a-stick.svg";
import InterVlanLayer3SwitchImage from "../../../../../assets/ccna-vlan/intervlan-layer3-switch.svg";
import StpLoopPreventionImage from "../../../../../assets/ccna-stp/stp-loop-prevention.svg";
import StpRolesImage from "../../../../../assets/ccna-stp/stp-port-roles.svg";
import StpRootCostExampleImage from "../../../../../assets/ccna-stp/root-port-cost-example.svg";
import StpSenderBridgeTieImage from "../../../../../assets/ccna-stp/root-port-sender-bridge-tie.svg";
import StpSenderPortTieImage from "../../../../../assets/ccna-stp/root-port-sender-port-tie.svg";
import RstpPortRolesImage from "../../../../../assets/ccna-stp/rstp-port-roles.svg";
import RstpSharedSegmentImage from "../../../../../assets/ccna-stp/rstp-shared-segment.svg";
import VtpDomainModesImage from "../../../../../assets/ccna-vtp/vtp-domain-modes.svg";
import VtpPruningImage from "../../../../../assets/ccna-vtp/vtp-pruning.svg";
import EtherChannelBundlingImage from "../../../../../assets/ccna-etherchannel/etherchannel-bundling.svg";
import EtherChannelLoadBalanceImage from "../../../../../assets/ccna-etherchannel/etherchannel-load-balance.svg";

function VlanDiagram({ image, title, description }) {
	return (
		<figure className="my-7 overflow-hidden rounded-2xl border border-[#dbe5f5] bg-white">
			<img src={image} alt={title} className="mx-auto h-auto max-h-[420px] w-full object-contain" loading="lazy" />
			<figcaption className="border-t border-[#e5ebf4] bg-[#f8faff] px-4 py-3 text-center text-sm text-[#71819b]">
				{description}
			</figcaption>
		</figure>
	);
}

function StpDiagram({ image, title, description }) {
	return (
		<figure className="my-7 overflow-hidden rounded-2xl border border-[#dbe5f5] bg-white">
			<img src={image} alt={title} className="mx-auto h-auto max-h-[420px] w-full object-contain" loading="lazy" />
			<figcaption className="border-t border-[#e5ebf4] bg-[#f8faff] px-4 py-3 text-center text-sm text-[#71819b]">
				{description}
			</figcaption>
		</figure>
	);
}

function VlanLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">VLAN introduction</h2>
				<p className="mt-3">
					A virtual LAN (VLAN) is a logical group of switch ports and connected devices that share a Layer 2 broadcast domain. Unlike a group defined only by a switch or a room, a VLAN can include devices attached to different switches and located in different parts of a building, as long as the switching network carries that VLAN between them.
				</p>
				<p className="mt-3">
					This logical grouping lets a network follow a user’s role or department instead of their physical location. A Sales employee can move to another floor and still connect to the Sales network when the new switch port is configured for the Sales VLAN.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Why segment a network with VLANs?</h2>
				<p className="mt-3">
					Imagine a company with Sales and Technical departments on separate floors. Without VLANs, an administrator might place each department on a different IP network and connect each group to its own physical switch area. That can work initially, but it ties network membership to location.
				</p>
				<VlanDiagram
					image={VlanWithoutSegmentationImage}
					title="Departments connected without VLANs"
					description="Separate department networks are tied to their physical floor and switch locations."
				/>
				<p className="mt-3">
					This arrangement becomes harder to manage when the Sales area is full and new employees must sit near Technical staff. A port in the Technical area would normally place a new employee on the Technical network. Leaders who need separate permissions can also be difficult to group when their offices are spread across several floors.
				</p>
				<p className="mt-3">
					VLANs address this by letting administrators assign switch ports to logical groups. Sales users can be assigned to the Sales VLAN wherever they sit; Technical users can remain in the Technical VLAN; and leaders can be placed in a separate VLAN with policies appropriate to their role. The VLAN configuration and network policies still need to be applied correctly on the switches and routing devices.
				</p>
				<VlanDiagram
					image={VlanDepartmentBenefitsImage}
					title="Department networks grouped with VLANs"
					description="Sales, Technical, and Leader devices remain logically grouped across different floors."
				/>
				<ul className="mt-3 list-disc space-y-2 pl-6">
					<li>Group users by department or function instead of desk location.</li>
					<li>Keep Layer 2 broadcasts within the VLAN rather than flooding every department.</li>
					<li>Extend a department network when users move or a team grows.</li>
					<li>Apply separate IP addressing and access policies to different groups.</li>
				</ul>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Broadcast domains and inter-VLAN routing</h2>
				<p className="mt-3">
					A Layer 2 switch forwards broadcast frames within their VLAN. If two computers belong to the same VLAN and that VLAN is carried across the switches between them, they can communicate at Layer 2 even when connected to different switches. A broadcast from one VLAN is not normally forwarded into another VLAN.
				</p>
				<p className="mt-3">
					Separate VLANs are separate Layer 2 networks, so communication between them requires a Layer 3 device, such as a router or multilayer switch, plus suitable routing and security policies. Routing between VLANs is called inter-VLAN routing.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">VLAN trunks and VLAN IDs</h2>
				<p className="mt-3">
					When multiple VLANs need to cross a link between switches, configure that link as a trunk. A trunk can carry traffic for multiple VLANs over one physical connection. The VLAN ID identifies which VLAN each frame belongs to so the receiving switch can forward it to the correct ports.
				</p>
				<VlanDiagram
					image={VlanTrunkIdImage}
					title="VLAN IDs carried between switches"
					description="A VLAN ID lets the receiving switch identify the VLAN carried over a trunk."
				/>
				<p className="mt-3">
					An access port is normally assigned to one VLAN for an end device. The switch associates frames received on that port with the configured VLAN. When forwarding a frame over an 802.1Q trunk, the switch adds a VLAN tag; the next switch reads the tag to preserve the frame’s VLAN membership. Before sending the frame to a typical endpoint through an access port, the switch removes the trunk tag.
				</p>
				<VlanDiagram
					image={VlanFrameTaggingImage}
					title="Frame tag added and removed along a trunk path"
					description="Switches carry VLAN tags across trunks and remove them before delivery to access devices."
				/>
				<p className="mt-3">
					A trunk is not itself a user VLAN. It transports traffic for the VLANs configured and allowed across it. Links between switches commonly use trunks; a router-to-switch link used for router-on-a-stick inter-VLAN routing also needs to carry the relevant VLANs.
				</p>
				<VlanDiagram
					image={VlanTrunkToRouterImage}
					title="Trunk links between switches and router"
					description="Trunk links carry multiple VLANs between switches and a router for inter-VLAN routing."
				/>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">802.1Q and the native VLAN</h2>
				<p className="mt-3">
					IEEE 802.1Q is the standard tagging method commonly used to carry multiple VLANs across Ethernet trunks. Older Cisco equipment also supported Cisco-proprietary Inter-Switch Link (ISL), but 802.1Q is the standard choice on modern networks and equipment.
				</p>
				<p className="mt-3">
					802.1Q trunks have a native VLAN for untagged traffic. Frames belonging to the configured native VLAN are sent without an 802.1Q tag on that trunk. An untagged frame received on a trunk is associated with the receiving port’s configured native VLAN.
				</p>
				<VlanDiagram
					image={VlanNativeTrafficImage}
					title="Tagged and untagged native VLAN traffic"
					description="Native VLAN frames cross the trunk untagged while other VLAN frames carry tags."
				/>
				<p className="mt-3">
					The native VLAN setting tells the switch how to handle those untagged frames; it does not mean that an old non-VLAN switch can safely participate in a modern trunk. Match the native VLAN on both ends of a trunk and use a deliberate configuration rather than relying on defaults. On many Cisco switches, VLAN 1 is the default VLAN and default native VLAN, but the native VLAN can be changed per trunk.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">VLAN configuration example</h2>
				<p className="mt-3">
					Use a simple building topology with one main switch and access switches on the first and third floors. Create the same VLANs on each switch, assign end-device ports as access ports, and configure the links between switches as trunks. Replace the example interface IDs with the actual ports in your topology.
				</p>

				<h3 className="mt-6 text-lg font-bold text-[#17356d]">1. Create the VLANs</h3>
				<p className="mt-2">
					On each switch, create VLAN 2 for Sales, VLAN 3 for Technical, and VLAN 10 for Leaders. IOS lets you enter another <code className="rounded bg-[#f1f5fb] px-1.5 py-0.5 text-sm">vlan</code> command directly from VLAN configuration mode.
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch# configure terminal
Switch(config)# vlan 2
Switch(config-vlan)# name SALES
Switch(config-vlan)# vlan 3
Switch(config-vlan)# name TECH
Switch(config-vlan)# vlan 10
Switch(config-vlan)# name LEADER
Switch(config-vlan)# end`}</code></pre>

				<h3 className="mt-6 text-lg font-bold text-[#17356d]">2. Assign access ports</h3>
				<p className="mt-2">
					Configure host-facing ports as access ports and assign each to its intended VLAN. Here, FastEthernet0/1 is a Sales workstation port and FastEthernet0/2 is a Technical workstation port.
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# interface FastEthernet0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 2
Switch(config-if)# interface FastEthernet0/2
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 3`}</code></pre>
				<p className="mt-3">
					Repeat the appropriate access-port assignment on the floor switches for the connected users. Access-port VLAN membership alone does not provide communication between different VLANs; that requires Layer 3 routing.
				</p>

				<h3 className="mt-6 text-lg font-bold text-[#17356d]">3. Configure the switch uplinks as trunks</h3>
				<p className="mt-2">
					On the main switch, configure the ports connected to the floor switches as trunks. Make the matching configuration on the other end of each link. The optional allowed-VLAN command limits the trunk to the VLANs used in this example.
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Main_Switch(config)# interface FastEthernet0/1
Main_Switch(config-if)# switchport mode trunk
Main_Switch(config-if)# switchport trunk allowed vlan 2,3,10
Main_Switch(config-if)# interface FastEthernet0/2
Main_Switch(config-if)# switchport mode trunk
Main_Switch(config-if)# switchport trunk allowed vlan 2,3,10`}</code></pre>
				<p className="mt-3">
					Many Catalyst 2950 and 2960 models use 802.1Q trunks and do not offer a command to select a different encapsulation, so setting trunk mode is sufficient. On some Catalyst 3550 and 3560 models that support selectable trunk encapsulation, choose 802.1Q before setting trunk mode:
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config-if)# switchport trunk encapsulation dot1q
Switch(config-if)# switchport mode trunk`}</code></pre>
				<p className="mt-3">
					The encapsulation command is not available on every switch or software version. Use it only when the device supports encapsulation selection; check the switch model and IOS if the command is rejected. Ensure both ends agree on trunk settings, allowed VLANs, and native VLAN.
				</p>

				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Optional: distribute VLANs with VTP</h3>
				<p className="mt-2">
					VLAN Trunking Protocol (VTP) can distribute VLAN database changes among compatible Cisco switches in the same VTP domain over working trunk links. It requires deliberate configuration of the domain, version, and switch roles; client switches cannot create or modify VLANs locally. For a small lab, creating VLANs manually on each switch is a straightforward alternative.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">VLAN benefits and recap</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6">
					<li>VLANs divide a switched Layer 2 network into separate broadcast domains; they do not perform Layer 3 routing by themselves.</li>
					<li>Users can be grouped by role or department rather than by physical location, when the VLAN is carried across the required trunks.</li>
					<li>Administrators can move a user to another VLAN by changing the switch-port configuration instead of moving network cabling.</li>
					<li>Each VLAN is commonly paired with its own IP subnet, and communication between those subnets requires inter-VLAN routing.</li>
					<li>Trunks carry multiple VLANs between switches using 802.1Q tags; native-VLAN traffic is sent untagged on that trunk.</li>
				</ul>
				<div className="mt-5 flex flex-wrap gap-4 text-base font-semibold">
					<Link to="/modules/programs/ccna/knowledge-hub/vlan-trunking-protocol-vtp" className="text-[#2259dc] hover:underline">Continue to the VTP lesson</Link>
					<Link to="/modules/programs/ccna/knowledge-hub/intervlan-routing-tutorial" className="text-[#2259dc] hover:underline">Continue to the inter-VLAN routing lesson</Link>
				</div>
			</section>

			<aside className="rounded-2xl border border-[#dbe5f5] bg-[#f4f7fd] p-5 sm:p-6">
				<h2 className="text-lg font-bold text-[#17356d]">Key points</h2>
				<ul className="mt-3 list-disc space-y-2 pl-5">
					<li>VLANs logically group switch ports into separate Layer 2 broadcast domains.</li>
					<li>Devices in the same VLAN can communicate across switches when the VLAN is carried between them.</li>
					<li>Trunks carry multiple VLANs; 802.1Q tags identify VLAN membership.</li>
					<li>Inter-VLAN communication requires Layer 3 routing.</li>
					<li>Untagged trunk traffic belongs to the configured native VLAN.</li>
				</ul>
			</aside>
		</div>
	);
}

function InterVlanLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What is inter-VLAN routing?</h2>
				<p className="mt-3">
					Hosts in the same VLAN and IP subnet can communicate through Layer 2 switching. A host in one VLAN cannot send frames directly into another VLAN, however. To communicate across VLANs, it sends the IP packet to its default gateway, and a Layer 3 device routes it to the destination network.
				</p>
				<p className="mt-3">
					For example, Sales hosts in VLAN 10 can communicate with other hosts in VLAN 10. A Technical host in VLAN 20 is on a separate Layer 2 broadcast domain and typically a separate IP subnet, so traffic between Sales and Technical must be routed. The router or multilayer switch makes that routing decision; VLAN tagging itself does not route packets.
				</p>
				<VlanDiagram
					image={InterVlanSeparationImage}
					title="Hosts in separate VLANs need a Layer 3 gateway to communicate"
					description="Same-VLAN hosts use Layer 2 switching; traffic between VLAN 10 and VLAN 20 requires Layer 3 routing."
				/>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Router-on-a-stick</h2>
				<p className="mt-3">
					Router-on-a-stick uses one physical router interface connected to a switch trunk. The router has a logical subinterface for each VLAN. Each subinterface is configured with 802.1Q encapsulation and an IP address that serves as the default gateway for that VLAN.
				</p>
				<VlanDiagram
					image={RouterOnAStickImage}
					title="Router-on-a-stick inter-VLAN routing topology"
					description="A trunk carries VLAN 10 and VLAN 20 between the switch and separate router subinterfaces."
				/>
				<p className="mt-3">
					When a Sales host sends traffic to a different subnet, it forwards the Ethernet frame to its default gateway. The switch carries that frame over the trunk tagged for VLAN 10. The router receives it on the VLAN 10 subinterface, routes the IP packet, then sends a new Ethernet frame back through the trunk tagged for VLAN 20. The switch forwards it to the destination host’s access port. End hosts use their IP addresses and gateways; they do not need to interpret the trunk tags.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Configure router-on-a-stick</h2>
				<p className="mt-3">
					This example uses VLAN 10 with subnet 192.168.10.0/24 and VLAN 20 with subnet 192.168.20.0/24. Replace interface names and port numbers to match the actual devices. Create both VLANs on the switch and make sure they are allowed on the trunk.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Configure the switch port connected to the router</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# interface GigabitEthernet0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20`}</code></pre>
				<p className="mt-3">
					Configure the matching trunk settings at the switch port connected to the router. Some switch models need an encapsulation selection command before trunk mode; many newer models support 802.1Q only and do not have that command.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Configure the router physical interface and subinterfaces</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# interface GigabitEthernet0/0
Router(config-if)# no shutdown
				Router(config-if)# exit
				Router(config)# interface GigabitEthernet0/0.10
				Router(config-subif)# encapsulation dot1Q 10
				Router(config-subif)# ip address 192.168.10.1 255.255.255.0
				Router(config-subif)# exit
				Router(config)# interface GigabitEthernet0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0`}</code></pre>
				<p className="mt-3">
					The physical router interface must be enabled, but it normally has no IP address in this design; the subinterfaces hold the gateway addresses. The number after <code className="rounded bg-[#f1f5fb] px-1.5 py-0.5 text-sm">dot1Q</code> is the VLAN ID, and the subinterface number is a locally chosen label. Assign hosts addresses in their VLAN’s subnet and set their default gateway to 192.168.10.1 or 192.168.20.1 as appropriate.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Inter-VLAN routing on a multilayer switch</h2>
				<p className="mt-3">
					A multilayer switch can route between VLANs using switched virtual interfaces (SVIs). Each SVI is a Layer 3 interface for one VLAN and is typically configured as the default gateway for hosts in that VLAN. Unlike router-on-a-stick, routing occurs on the switch, so a separate router trunk is not needed for these local VLANs.
				</p>
				<VlanDiagram
					image={InterVlanLayer3SwitchImage}
					title="A multilayer switch routes between VLAN interfaces"
					description="SVI gateway interfaces provide Layer 3 routing between VLAN 10 and VLAN 20."
				/>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# vlan 10
Switch(config-vlan)# name SALES
Switch(config-vlan)# vlan 20
Switch(config-vlan)# name TECH
				Switch(config-vlan)# exit
				Switch(config)# interface range FastEthernet0/1-2
				Switch(config-if-range)# switchport mode access
				Switch(config-if-range)# switchport access vlan 10
				Switch(config-if-range)# exit
				Switch(config)# interface range FastEthernet0/3-4
				Switch(config-if-range)# switchport mode access
				Switch(config-if-range)# switchport access vlan 20
				Switch(config-if-range)# exit
				Switch(config)# interface Vlan10
				Switch(config-if)# ip address 192.168.10.1 255.255.255.0
				Switch(config-if)# no shutdown
				Switch(config-if)# exit
				Switch(config)# interface Vlan20
Switch(config-if)# ip address 192.168.20.1 255.255.255.0
Switch(config-if)# no shutdown
Switch(config-if)# end
Switch# configure terminal
Switch(config)# ip routing`}</code></pre>
				<p className="mt-3">
					Assign host-facing ports to the appropriate access VLAN as described in the <Link to="/modules/programs/ccna/knowledge-hub/virtual-local-area-network-vlan-tutorial" className="font-semibold text-[#2259dc] hover:underline">VLAN 2.1 lesson</Link>. The VLAN must exist, and the SVI generally becomes operational only when the VLAN is active and has an active Layer 2 port. Set each host’s default gateway to the SVI address for its VLAN.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Verify and troubleshoot</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6">
					<li>Check that the VLAN exists and host-facing switch ports are assigned to the expected access VLAN.</li>
					<li>For router-on-a-stick, verify that the switch link is trunking, both VLANs are allowed, and the router interface is up.</li>
					<li>Confirm that each router subinterface uses the correct 802.1Q VLAN ID and IP subnet.</li>
					<li>For a multilayer switch, verify that SVIs have the intended addresses, are operational, and Layer 3 routing is enabled.</li>
					<li>Check each host’s IP address, subnet mask, and default gateway; gateway addresses must be in the host’s own subnet.</li>
				</ul>
				<p className="mt-4">
					Router-on-a-stick is useful when a router and switch share a trunk, but all inter-VLAN traffic crosses that one physical link. A multilayer switch can route locally at the switch and is often used where higher LAN routing capacity is required. In both designs, apply suitable access-control policies if some VLANs should not reach others.
				</p>
			</section>
		</div>
	);
}

function StpLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Why spanning tree is needed</h2>
				<p className="mt-3">
					Redundant links between switches improve availability, but an Ethernet frame has no Layer 2 hop limit. If switches forward broadcasts around a physical loop, copies can circulate repeatedly. This can create a broadcast storm, cause switches to learn the same source MAC address on different ports (MAC-table instability), and deliver duplicate frames.
				</p>
				<p className="mt-3">
					STP allows redundant physical links but prevents loops in the active Layer 2 topology by placing selected ports in a non-forwarding state. If an active path fails, STP can recalculate and allow a backup path to forward. Switches exchange Bridge Protocol Data Units (BPDUs) to share spanning-tree information.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">How a redundant loop can grow into a storm</h3>
				<p className="mt-2">
					Imagine Switch A and Switch B joined by two active links, with a host attached to each switch. When the first host sends an ARP request, it is a broadcast frame. Switch A floods a copy out both inter-switch ports because it does not send a received broadcast back through its incoming port. Switch B can therefore receive two copies of that same broadcast, one on each link.
				</p>
				<p className="mt-3">
					Switch B floods each copy out its other ports, including the links back toward Switch A. Switch A receives those copies and floods them again. Since Ethernet frames do not have a Layer 2 TTL that causes a switch to discard a frame after a fixed number of hops, the copies can keep circulating. Each round adds more traffic, consumes link capacity, and may overwhelm switches and hosts: this is a broadcast storm.
				</p>
				<p className="mt-3">
					The problem is not limited to broadcasts. If a switch has not learned the destination MAC address for an unknown unicast, it floods that frame as well. A loop can deliver multiple copies to the destination. Meanwhile, repeated frames carrying the same source MAC address may arrive on different switch ports, causing the MAC forwarding table to repeatedly change its port association. This instability can make ordinary forwarding unreliable.
				</p>
				<p className="mt-3">
					STP prevents this by choosing a loop-free forwarding topology. A redundant physical link can remain connected but one of its ports is put into a non-forwarding state for user traffic. The switch still listens for BPDUs on that path, so it can detect a change and recalculate if the active route fails.
				</p>
				<StpDiagram
					image={StpLoopPreventionImage}
					title="Spanning Tree blocks a redundant switch link to prevent a loop"
					description="A redundant physical connection remains available, but STP blocks one port so there is only one active Layer 2 path."
				/>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">How STP elects the root bridge</h2>
				<p className="mt-3">
					When switches start, they send BPDUs that include the claimed root bridge ID, the sender’s bridge ID, and the sender’s path cost to that root. Switches initially advertise themselves as root; after comparing received information, they agree on the switch with the lowest Bridge ID as the root bridge.
				</p>
				<p className="mt-3">
					A BPDU is a Layer 2 control message used by spanning tree, not a user-data frame. In the initial election, a switch’s root ID and sender ID match because it is claiming to be its own root and is advertising its own information. When it receives a better BPDU, it updates the root information it advertises to its neighbors. This exchange lets switches across the same Layer 2 topology converge on one root.
				</p>
				<ul className="mt-3 list-disc space-y-2 pl-6">
					<li><strong>Root Bridge ID:</strong> identifies the switch currently advertised as root.</li>
					<li><strong>Sender Bridge ID:</strong> identifies the switch transmitting this BPDU.</li>
					<li><strong>Root Path Cost:</strong> reports the sender’s accumulated cost to reach the advertised root; the root’s own cost is zero.</li>
					<li><strong>Port ID:</strong> identifies the transmitting port and can help break ties between otherwise equal paths.</li>
				</ul>
				<p className="mt-3">
					A Bridge ID contains a bridge priority and a MAC address (with the extended system ID used in common VLAN-aware implementations). The lower priority wins; if priorities tie, the lower MAC address wins. On classic 802.1D, the default priority is 32768. Configured priority values use increments of 4096 because bits are reserved for the system ID.
				</p>
				<p className="mt-3">
					For example, if two switches both use the default priority, the one with the numerically lower MAC address has the lower Bridge ID and becomes root. If the desired root is not being elected, inspect the operational root and bridge priorities rather than assuming that the switch with the lowest hostname or highest link speed will win. Priority is evaluated before MAC address.
				</p>
				<p className="mt-3">
					To make a chosen switch the root, an administrator can lower its spanning-tree priority for the relevant spanning-tree instance. Do this deliberately: the root’s placement affects the paths used throughout the Layer 2 domain.
				</p>
				<p className="mt-3">
					After election, the root bridge has no root port because it is the destination of all root paths. Its active ports are designated for their respective segments and forward traffic. Every other switch uses the root’s Bridge ID as the common reference when choosing its path.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">STP port roles and path selection</h2>
				<p className="mt-3">
					After the root bridge is elected, STP selects a root port on every non-root switch: the port with the best path toward the root. It also selects one designated port for each network segment, which provides that segment’s best path to the root. Root-bridge ports are designated ports. A redundant port that is neither a root nor designated port is non-designated and does not forward user traffic in classic STP.
				</p>
				<p className="mt-3">
					STP compares path information using the lowest total root path cost. If path costs tie, additional BPDU fields break the tie, including the upstream bridge ID and port IDs. Port cost is influenced by link speed; commonly cited revised IEEE short path costs include 10 Gb/s = 2, 1 Gb/s = 4, 100 Mb/s = 19, and 10 Mb/s = 100. Device platform and configured cost method can affect displayed values.
				</p>
				<p className="mt-3">
					The root path cost is the accumulated cost from a switch toward the root. The root advertises a cost of zero for its own path; a downstream switch adds the cost of its receiving link when it considers a BPDU. The receiving port with the best (lowest-cost) resulting path becomes the root port. For example, if one candidate path uses a 10 Mb/s link and another uses a 100 Mb/s link, the faster link normally has the lower cost and is preferred, assuming there is no other cost or tie-breaker difference.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[520px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">Link speed</th><th className="px-4 py-3 font-bold">Revised IEEE short cost</th><th className="px-4 py-3 font-bold">Older short cost</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3">10 Gb/s</td><td className="px-4 py-3">2</td><td className="px-4 py-3">1</td></tr>
							<tr><td className="px-4 py-3">1 Gb/s</td><td className="px-4 py-3">4</td><td className="px-4 py-3">4</td></tr>
							<tr><td className="px-4 py-3">100 Mb/s</td><td className="px-4 py-3">19</td><td className="px-4 py-3">10</td></tr>
							<tr><td className="px-4 py-3">10 Mb/s</td><td className="px-4 py-3">100</td><td className="px-4 py-3">100</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-3">
					These are reference short-cost values; switches can use a different cost method or a manually configured port cost. The actual cost shown by a device is authoritative for troubleshooting. If two candidate root paths have equal total cost, STP compares additional information in order, such as the sender’s Bridge ID and sender port ID; the receiving port ID is used as a later tie-breaker when needed. The detailed tie-break sequence is covered in the next module.
				</p>
				<StpDiagram
					image={StpRolesImage}
					title="Example spanning-tree root, root-port, designated-port, and blocked-port roles"
					description="The root bridge forwards on its designated ports. The non-root switch uses its best path as root port and blocks the redundant path."
				/>
				<p className="mt-3">
					The <Link to="/modules/programs/ccna/knowledge-hub/stp-root-port-election-tutorial" className="font-semibold text-[#2259dc] hover:underline">2.4 STP Root Port Election lesson</Link> goes further into root-port tie-breaks and the BPDU fields used when paths have equal cost.
				</p>
				<p className="mt-3">
					After each non-root switch has selected its root port, STP selects one designated port for each network segment. The designated port is the port advertising the best path from that segment to the root. On a point-to-point link, one side is designated and the other side may be a root port or a non-designated port. When neither side needs to forward on a redundant segment, the non-designated side remains non-forwarding. In classic STP, a blocked port can still receive BPDUs even though it does not forward user frames.
				</p>
				<p className="mt-3">
					The resulting roles create a tree: there is one root bridge, one root port on each non-root bridge, and a designated forwarding port on each segment. Redundant connections that would create an additional loop are prevented from forwarding until a topology change makes them useful.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Classic 802.1D port states</h2>
				<p className="mt-3">
					In classic 802.1D STP, a port that is moving toward forwarding passes through listening and learning. These transitions give switches time to process BPDUs and build their MAC address tables before user traffic is forwarded.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[620px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">State</th><th className="px-4 py-3 font-bold">Forward user data?</th><th className="px-4 py-3 font-bold">Learn MAC addresses?</th><th className="px-4 py-3 font-bold">Role in classic STP</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3 font-semibold">Blocking</td><td className="px-4 py-3">No</td><td className="px-4 py-3">No</td><td className="px-4 py-3">Stable non-forwarding state; processes incoming BPDUs and can be selected after a topology change</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Listening</td><td className="px-4 py-3">No</td><td className="px-4 py-3">No</td><td className="px-4 py-3">Transitional state; sends and processes BPDUs while checking for a loop</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Learning</td><td className="px-4 py-3">No</td><td className="px-4 py-3">Yes</td><td className="px-4 py-3">Transitional state; builds the MAC table without forwarding user frames</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Forwarding</td><td className="px-4 py-3">Yes</td><td className="px-4 py-3">Yes</td><td className="px-4 py-3">Stable state; forwards user traffic and processes BPDUs</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Disabled</td><td className="px-4 py-3">No</td><td className="px-4 py-3">No</td><td className="px-4 py-3">Port is administratively down or otherwise not participating</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-4">
					Blocking ports do not forward user data or learn source MAC addresses, but they continue to receive BPDUs. Listening ports process spanning-tree information but neither forward user data nor learn MAC addresses. Learning ports still do not forward user data, but they begin to build the forwarding table. Only a forwarding port handles ordinary user frames in both directions.
				</p>
				<p className="mt-3">
					Classic 802.1D uses three main timers. Hello time controls how often the root sends configuration BPDUs (2 seconds by default). Max age is how long a switch retains spanning-tree information without receiving an update (20 seconds by default). Forward delay is the time spent in each of the listening and learning transitions (15 seconds each by default). These timers coordinate topology changes; they are not simply per-state timers for every possible failure.
				</p>
				<p className="mt-3">
					Convergence is the point at which switches have agreed on the active spanning-tree topology and the relevant ports have settled into forwarding or non-forwarding states. While a topology is being recalculated, some traffic can be interrupted. A classic 802.1D transition from blocking through listening and learning can take up to two forward-delay intervals after the port is allowed to transition. If a switch must first age out stale information, max age can add delay. The exact outage depends on the topology and how the failure is detected; timer values should not be summed as one fixed duration in every case.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Topology changes and link failure</h2>
				<p className="mt-3">
					Consider three switches where Switch A is root, Switch B reaches A over its selected root port, and a second link from B to Switch C is currently non-forwarding to prevent a loop. If B’s active link to A fails, B detects that the interface or neighbor path is unavailable. STP recalculates the topology and can promote the redundant connection to a usable root path if it is the best remaining path.
				</p>
				<p className="mt-3">
					In classic STP, a newly selected path may pass through listening and learning before it forwards user data. If the failure was not detected immediately and the switch must wait for old information to expire, recovery can take longer. This is why users can notice downtime during classic STP convergence. RSTP improves recovery by using a different port-role and synchronization process; see <Link to="/modules/programs/ccna/knowledge-hub/rapid-spanning-tree-protocol-rstp-tutorial" className="font-semibold text-[#2259dc] hover:underline">2.5 Rapid Spanning Tree Protocol</Link>.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">What spanning tree provides</h3>
				<ul className="mt-2 list-disc space-y-2 pl-6">
					<li>Prevents bridging loops in a switched Layer 2 topology.</li>
					<li>Allows physical redundancy while selecting a loop-free set of forwarding paths.</li>
					<li>Assigns port roles dynamically from the topology and received BPDU information.</li>
					<li>Recalculates the active topology after a switch, port, or link failure.</li>
					<li>Chooses a best available path toward the root based on spanning-tree path costs and tie-break rules.</li>
				</ul>
				<p className="mt-3">
					STP is a loop-avoidance mechanism, not a substitute for a resilient design or monitoring. A blocked redundant path helps only if the devices and link remain healthy and STP can reconverge. For predictable forwarding, choose the intended root bridge, verify root and port roles after changes, and use an appropriate STP version for the network.
				</p>
			</section>

			<aside className="rounded-2xl border border-[#dbe5f5] bg-[#f4f7fd] p-5 sm:p-6">
				<h2 className="text-lg font-bold text-[#17356d]">Key points</h2>
				<ul className="mt-3 list-disc space-y-2 pl-5">
					<li>STP prevents Layer 2 loops while retaining redundant physical links.</li>
					<li>BPDUs carry spanning-tree information used to elect a root bridge and select port roles.</li>
					<li>The lowest Bridge ID wins; priority is compared before MAC address.</li>
					<li>Every non-root switch selects a root port, and every segment selects a designated port.</li>
					<li>Classic 802.1D transitions through listening and learning before forwarding; RSTP converges differently.</li>
				</ul>
			</aside>
		</div>
	);
}

function StpRootPortElectionContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What is a root port?</h2>
				<p className="mt-3">
					Root port election happens <strong>after</strong> the root bridge has already been chosen. Every non-root switch selects exactly one root port: the port that provides its best path toward the root bridge. The root bridge itself has no root port. A selected root port is in a forwarding role in the converged spanning-tree topology.
				</p>
				<p className="mt-3">
					A switch compares the spanning-tree information received on its candidate ports. The winning path is chosen by this ordered comparison:
				</p>
				<ol className="mt-3 list-decimal space-y-2 pl-6">
					<li><strong>Lowest total root path cost</strong> advertised through the candidate port.</li>
					<li><strong>Lowest sender Bridge ID</strong> if the total costs tie.</li>
					<li><strong>Lowest sender Port ID</strong> if cost and sender Bridge ID both tie. The Port ID compares port priority first, then port number.</li>
				</ol>
				<p className="mt-3">
					Each next rule is used only when the previous rule cannot distinguish between the candidates. Do not confuse this process with root bridge election: root bridge election compares Bridge IDs to choose the root switch, while root port election is performed independently by each non-root switch to choose its own best incoming path.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">How to calculate the candidate path cost</h2>
				<p className="mt-3">
					The root bridge originates BPDUs with a root path cost of zero. When a neighboring switch receives one, it adds the cost of the port on which the BPDU arrived and advertises the resulting accumulated cost onward. Each subsequent switch adds its own receiving-port cost. When comparing candidate root ports, use the cost carried in the BPDU received on each candidate port; the root bridge itself contributes zero.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[480px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">Link speed</th><th className="px-4 py-3 font-bold">Example short path cost</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3">10 Mb/s</td><td className="px-4 py-3">100</td></tr>
							<tr><td className="px-4 py-3">100 Mb/s</td><td className="px-4 py-3">19</td></tr>
							<tr><td className="px-4 py-3">1 Gb/s</td><td className="px-4 py-3">4</td></tr>
							<tr><td className="px-4 py-3">10 Gb/s</td><td className="px-4 py-3">2</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-3">
					These are commonly taught revised IEEE short-cost values for this example. The configured cost method or a manually configured port cost can change the numbers, so use the actual cost reported by the switch when troubleshooting.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Example 1: the lowest-cost path wins</h2>
				<p className="mt-3">
					Assume SW1 is already the root bridge. In this first topology, SW2 has a direct 1 Gb/s connection to SW1, and another route through SW4 and SW3. That longer route uses two 1 Gb/s links and one 100 Mb/s link.
				</p>
				<StpDiagram
					image={StpRootCostExampleImage}
					title="STP root port path-cost example"
					description="SW2 compares a direct 1 Gb/s path to SW1 with a longer path through SW4 and SW3."
				/>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[540px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">SW2 candidate route</th><th className="px-4 py-3 font-bold">Calculation</th><th className="px-4 py-3 font-bold">Total</th><th className="px-4 py-3 font-bold">Result</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3">SW2 → SW1</td><td className="px-4 py-3">0 + 4</td><td className="px-4 py-3">4</td><td className="px-4 py-3">Selected</td></tr>
							<tr><td className="px-4 py-3">SW2 → SW4 → SW3 → SW1</td><td className="px-4 py-3">0 + 4 + 4 + 19</td><td className="px-4 py-3">27</td><td className="px-4 py-3">Not selected</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-3">
					The direct path has the lower accumulated cost, so SW2 selects its port connected to SW1 as its root port. No Bridge ID or Port ID comparison is needed because step 1 already produced a winner.
				</p>
				<p className="mt-3">
					SW3 also selects its directly connected port to SW1 when that is its lowest-cost route. For SW4, suppose the link from SW4 to SW2 is 1 Gb/s, the link from SW2 to SW1 is 100 Mb/s, and both SW4-to-SW3 and SW3-to-SW1 links are 1 Gb/s:
				</p>
				<ul className="mt-3 list-disc space-y-2 pl-6">
					<li>Via SW2: <code className="rounded bg-[#f1f5fb] px-1.5 py-0.5 text-sm">0 + 4 + 19 = 23</code>.</li>
					<li>Via SW3: <code className="rounded bg-[#f1f5fb] px-1.5 py-0.5 text-sm">0 + 4 + 4 = 8</code>.</li>
				</ul>
				<p className="mt-3">
					SW4 therefore selects its port toward SW3. As with SW2, this is decided by the lowest accumulated cost alone.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Example 2: equal costs use the sender Bridge ID</h2>
				<p className="mt-3">
					Now change the topology so all relevant links are 1 Gb/s. SW4 can reach root SW1 through either SW2 or SW3. Each two-link route has the same total root path cost: 4 + 4 = 8. Because step 1 is tied, SW4 compares the Bridge IDs of the switches sending the candidate BPDUs.
				</p>
				<StpDiagram
					image={StpSenderBridgeTieImage}
					title="Equal root path costs resolved by sender Bridge ID"
					description="SW2 and SW3 advertise equal costs to SW4; the lower sender Bridge ID from SW2 wins."
				/>
				<p className="mt-3">
					Assume all bridge priorities are equal at 32768. The MAC address therefore determines which sender has the lower Bridge ID. If SW2 has MAC suffix 02 and SW3 has MAC suffix 03, SW2 has the lower Bridge ID. SW4 chooses the port receiving the BPDU from SW2 as its root port.
				</p>
				<p className="mt-3">
					In real configurations, compare the complete Bridge IDs, not just the shortened MAC examples. Priority is compared first; only when priorities tie does the MAC address decide.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Example 3: equal sender Bridge IDs use sender Port ID</h2>
				<p className="mt-3">
					SW5 has two candidate links, both connected to SW4. The two BPDUs advertise the same root path cost, and the sender Bridge ID is also identical because both BPDUs came from SW4. STP moves to step 3 and compares the sender Port IDs reported in those BPDUs.
				</p>
				<StpDiagram
					image={StpSenderPortTieImage}
					title="Equal path and sender Bridge IDs resolved by sender Port ID"
					description="SW4 advertises on Fa0/1 and Fa0/2; its lower sender Port ID on Fa0/1 wins for SW5."
				/>
				<p className="mt-3">
					A Port ID consists of a port priority and a port number. The lower port priority is compared first; if those are equal, the lower port number wins. If SW4 sends the otherwise identical candidate BPDUs from Fa0/1 and Fa0/2 with equal port priorities, Fa0/1 has the lower Port ID. SW5 selects the port connected to SW4 Fa0/1 as its root port.
				</p>
				<p className="mt-3">
					The sender Port ID is the port identifier carried by the switch advertising the BPDU. Do not confuse it with SW5’s own local receiving-port number. On some platforms the local receiving port ID can be used in a later tie-break when the received spanning-tree information is otherwise identical; this example is decided by SW4’s sender Port ID.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Root port election checklist</h2>
				<ol className="mt-3 list-decimal space-y-2 pl-6">
					<li>Confirm which switch is the root bridge before evaluating root ports.</li>
					<li>On each non-root switch, list the candidate ports receiving BPDUs toward the root.</li>
					<li>Compare the advertised total root path costs; the lowest cost wins.</li>
					<li>If costs tie, compare the sender Bridge IDs; the lower Bridge ID wins.</li>
					<li>If sender Bridge IDs also tie, compare sender Port IDs; lower port priority and then lower port number wins.</li>
					<li>Verify the selected role and root path cost on the switch after convergence.</li>
				</ol>
				<p className="mt-4">
					This tutorial focuses on the root port chosen by each non-root switch. To review how the root bridge is elected and how root, designated, and non-designated roles combine into a loop-free topology, return to the <Link to="/modules/programs/ccna/knowledge-hub/spanning-tree-protocol-stp-tutorial" className="font-semibold text-[#2259dc] hover:underline">2.3 Spanning Tree Protocol lesson</Link>.
				</p>
			</section>
		</div>
	);
}

function RstpLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Why use Rapid Spanning Tree?</h2>
				<p className="mt-3">
					Classic 802.1D STP protects a switched network from Layer 2 loops, but recovery can be slow when a forwarding path fails. Depending on the topology and failure detection, a port may have to wait through classic listening and learning transitions before it can forward. That interruption can affect applications even though a redundant physical link is present.
				</p>
				<p className="mt-3">
					IEEE 802.1w introduced Rapid Spanning Tree Protocol (RSTP), which was later incorporated into the 802.1D standard. RSTP keeps the same basic objective—build a loop-free Layer 2 topology—but improves convergence by defining additional port roles and using rapid proposal/agreement and synchronization behavior on suitable links. It does not rely only on waiting for the classic forward-delay timers to expire.
				</p>
				<p className="mt-3">
					RSTP can often restore forwarding quickly after a directly detected physical link failure, sometimes in less than a second in a well-designed point-to-point topology. This is not a universal guarantee: recovery depends on topology, link type, configuration, interoperability, and how the failure is detected.
				</p>
				<p className="mt-3">
					Before studying RSTP roles, review <Link to="/modules/programs/ccna/knowledge-hub/spanning-tree-protocol-stp-tutorial" className="font-semibold text-[#2259dc] hover:underline">2.3 Spanning Tree Protocol</Link> and <Link to="/modules/programs/ccna/knowledge-hub/stp-root-port-election-tutorial" className="font-semibold text-[#2259dc] hover:underline">2.4 Root Port Election</Link>. RSTP still elects a root bridge and uses path costs when choosing its paths.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">RSTP port roles</h2>
				<p className="mt-3">
					RSTP describes what each port contributes to the loop-free topology. Root, designated, and alternate roles are used on ordinary point-to-point switch links. A backup role applies to a special shared-media situation where one switch has more than one port connected to the same LAN segment, such as through a hub.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[680px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">Port role</th><th className="px-4 py-3 font-bold">Meaning</th><th className="px-4 py-3 font-bold">Typical state</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3 font-semibold">Root</td><td className="px-4 py-3">Best path from a non-root bridge toward the root bridge.</td><td className="px-4 py-3">Forwarding</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Designated</td><td className="px-4 py-3">Best forwarding path advertised onto a LAN segment; each segment has one designated port.</td><td className="px-4 py-3">Forwarding</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Alternate</td><td className="px-4 py-3">A different, standby path toward the root, learned from another bridge.</td><td className="px-4 py-3">Discarding; can take over if the active root path fails</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Backup</td><td className="px-4 py-3">A redundant port on the same bridge to a shared segment for which that bridge already has a designated port.</td><td className="px-4 py-3">Discarding</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-4">
					An alternate port is not simply any unused cable: it receives a superior BPDU from another bridge and provides another route toward the root. When the current root port fails, an eligible alternate can become the new root port and move toward forwarding without waiting for the full classic STP process.
				</p>
				<p className="mt-3">
					A backup port is different. It is another port on the same switch connected to the same shared segment as that switch’s designated port. A hub can create this shared segment because it repeats signals among its ports. Two ordinary switch-to-switch links are separate point-to-point segments, so their standby role is normally alternate, not backup.
				</p>
				<p className="mt-3">
					A port that an administrator shuts down is operationally disabled, but disabled is not one of the active RSTP port roles in the same sense as root, designated, alternate, and backup.
				</p>
				<StpDiagram
					image={RstpPortRolesImage}
					title="RSTP roles on three interconnected switches"
					description="SW1 is root; SW2 and SW3 use root ports toward it. On their shared link, one side is designated and the other is alternate."
				/>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Example: selecting RSTP roles</h2>
				<p className="mt-3">
					Suppose SW1, SW2, and SW3 have the same bridge priority, and SW1 has the lowest MAC address. SW1 therefore has the lowest Bridge ID and is elected root. Its active ports are designated ports for their segments. SW2 and SW3 each choose their port toward SW1 as a root port because those are their best paths to the root.
				</p>
				<p className="mt-3">
					There is also a direct link between SW2 and SW3. If SW2 advertises the better BPDU on that segment—for example, because its Bridge ID is lower when earlier path information ties—SW2’s port is designated and SW3’s port becomes alternate. That alternate port remains in discarding state, ready to provide another path if SW3 loses its current root port.
				</p>
				<StpDiagram
					image={RstpSharedSegmentImage}
					title="RSTP backup port on a shared hub segment"
					description="Two ports on SW2 reach the same shared LAN through a hub: one is designated and the other is backup."
				/>
				<p className="mt-3">
					In the hub example, SW2 Fa0/2 and Fa0/3 both connect to the same shared LAN segment. SW2 selects one as designated and the other as backup. If their path cost and sender Bridge ID are identical, the lower sender Port ID wins; port priority is compared before port number. For equal priorities, Fa0/2 has a lower Port ID than Fa0/3, so Fa0/2 becomes designated and Fa0/3 becomes backup.
				</p>
				<p className="mt-3">
					The backup role is specific to redundant connections to the same shared segment. It should not be confused with the alternate role used for an alternate path learned from another bridge.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">RSTP port states</h2>
				<p className="mt-3">
					RSTP has three port states. The classic 802.1D disabled, blocking, and listening states all correspond to RSTP’s discarding state. Learning and forwarding keep their names and basic data-plane meanings.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[620px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">802.1D STP state</th><th className="px-4 py-3 font-bold">802.1w RSTP state</th><th className="px-4 py-3 font-bold">Forward user frames?</th><th className="px-4 py-3 font-bold">Learn MAC addresses?</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3">Disabled</td><td className="px-4 py-3 font-semibold">Discarding</td><td className="px-4 py-3">No</td><td className="px-4 py-3">No</td></tr>
							<tr><td className="px-4 py-3">Blocking</td><td className="px-4 py-3 font-semibold">Discarding</td><td className="px-4 py-3">No</td><td className="px-4 py-3">No</td></tr>
							<tr><td className="px-4 py-3">Listening</td><td className="px-4 py-3 font-semibold">Discarding</td><td className="px-4 py-3">No</td><td className="px-4 py-3">No</td></tr>
							<tr><td className="px-4 py-3">Learning</td><td className="px-4 py-3 font-semibold">Learning</td><td className="px-4 py-3">No</td><td className="px-4 py-3">Yes</td></tr>
							<tr><td className="px-4 py-3">Forwarding</td><td className="px-4 py-3 font-semibold">Forwarding</td><td className="px-4 py-3">Yes</td><td className="px-4 py-3">Yes</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-4">
					Discarding ports do not forward user traffic or learn source MAC addresses, but they do process RSTP BPDUs. Learning ports learn MAC addresses but do not yet forward user frames. Forwarding ports perform normal data forwarding and continue to participate in spanning-tree BPDU exchange. RSTP can still use the learning state, but its rapid transitions avoid the long classic listening/learning timer sequence on eligible links.
				</p>
				<p className="mt-3">
					In a stable topology, ports settle into forwarding or discarding states. A port can briefly pass through learning when it is preparing to forward; that does not mean the state was removed from RSTP.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">How RSTP recovers and interoperates</h2>
				<p className="mt-3">
					If a switch loses its forwarding root port, it can promote a suitable alternate port. On point-to-point links, RSTP uses proposal and agreement messages and port synchronization to establish a loop-free forwarding change quickly. Because the switch has already learned a viable alternate path, it need not wait for the same sequence of classic STP timer expirations in many common failure cases.
				</p>
				<p className="mt-3">
					RSTP is designed to interoperate with legacy 802.1D STP. When an RSTP port receives legacy STP BPDUs, it can operate on that link using legacy-compatible behavior and BPDU handling. This interoperability can make that portion of the topology converge more slowly than a network running RSTP end to end, so check the protocol mode and neighbor capabilities when investigating unexpected delays.
				</p>
				<aside className="mt-6 rounded-2xl border border-[#dbe5f5] bg-[#f4f7fd] p-5 sm:p-6">
					<h3 className="text-lg font-bold text-[#17356d]">RSTP quick recap</h3>
					<ul className="mt-3 list-disc space-y-2 pl-5">
						<li>RSTP improves convergence after topology changes compared with classic 802.1D STP.</li>
						<li>Its roles are root, designated, alternate, and backup; administratively disabled ports are not an active forwarding role.</li>
						<li>Alternate and backup ports remain discarding until they are needed.</li>
						<li>Its states are discarding, learning, and forwarding.</li>
						<li>RSTP can interoperate with legacy STP, but legacy links may use slower behavior.</li>
					</ul>
				</aside>
			</section>
		</div>
	);
}

function VtpLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What VTP does and why it is used</h2>
				<p className="mt-3">
					VLAN Trunking Protocol (VTP) is a Cisco-proprietary Layer 2 control protocol that can distribute VLAN database changes between compatible Cisco switches. Switches in the same VTP domain can share VLAN information over operational trunk links. VTP can reduce repetitive configuration work and help keep the VLAN database consistent across a group of switches.
				</p>
				<p className="mt-3">
					For example, in a multi-floor office, users may connect to access switches on different floors while remaining in the same department VLAN. Without centralized VLAN distribution, an administrator who adds a new Support VLAN must create it separately on every switch that needs it. In a larger network, that increases the chance of missed switches or inconsistent VLAN IDs and names. With a correctly configured VTP domain, an authorized server can advertise the VLAN database change to participating switches.
				</p>
				<p className="mt-3">
					VTP distributes VLAN database information; it does not assign user ports to VLANs, carry end-user traffic by itself, or replace trunk configuration. Access-port membership, trunk allowed lists, native VLAN settings, and Layer 3 routing still need to be planned and configured as appropriate.
				</p>
				<VlanDiagram
					image={VtpDomainModesImage}
					title="VTP domain with server, client, and transparent switches"
					description="Compatible switches in one VTP domain exchange advertisements over trunks; transparent switches keep local VLAN changes and forward received advertisements."
				/>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">VTP modes</h2>
				<p className="mt-3">
					Classic VTP uses server, client, and transparent modes. A switch must have compatible VTP settings and be connected through a working trunk to participate in domain advertisements. Exact capabilities also depend on the VTP version, platform, and VLAN range.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[700px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">Mode</th><th className="px-4 py-3 font-bold">Create or change VLAN database?</th><th className="px-4 py-3 font-bold">VTP behavior</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3 font-semibold">Server</td><td className="px-4 py-3">Yes, within platform and version limits.</td><td className="px-4 py-3">Originates advertisements when the VLAN database changes; receives and forwards VTP information.</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Client</td><td className="px-4 py-3">No, in classic VTP operation.</td><td className="px-4 py-3">Learns the VTP VLAN database and forwards advertisements through trunk connections; does not originate database changes.</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Transparent</td><td className="px-4 py-3">Yes, locally.</td><td className="px-4 py-3">Maintains its own VLAN configuration rather than synchronizing it with the domain; forwards received advertisements when supported by the configured version.</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-4">
					Server is the default mode on many classic Cisco switch configurations, but do not rely on defaults in a production network. Client switches cannot make ordinary local VLAN database changes in classic VTP. Transparent mode lets a switch keep locally managed VLANs independent from the domain database while relaying advertisements; exact forwarding behavior depends on VTP version.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">VTP domain and advertisements</h2>
				<p className="mt-3">
					Switches share VTP information only when their VTP domain settings match and the links carrying the advertisements are operating as trunks. A domain name is an administrative identifier, not a routing domain or IP subnet. Configure the intended domain, version, and any authentication consistently on participating switches.
				</p>
				<p className="mt-3">
					When a VLAN database change is made on a VTP server, the server increments its configuration revision number and advertises the updated database. Switches use the revision number to decide whether an advertisement represents a newer database than the one they currently hold. A higher revision is not a comparison of individual VLANs or a merge operation; a switch may replace its database with the received VTP database.
				</p>
				<p className="mt-3">
					This behavior makes an unknown switch with a stale-but-higher revision number especially risky to connect to a live domain: it can advertise its database as newer and cause participating switches to adopt it. Before connecting a switch, inspect and deliberately prepare its VTP mode, domain, version, password, and revision state. Do not treat a large revision number as proof that a configuration is correct.
				</p>
				<p className="mt-3">
					VTP advertisements are sent as Layer 2 multicast control frames to participating neighbors. A switch that receives a new advertisement checks the domain and other relevant parameters before processing it. VTP authentication, when configured, helps reject advertisements that do not have the expected shared password, but it is not a substitute for careful change control.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Important fields in show vtp status</h2>
				<p className="mt-3">
					Use <code className="rounded bg-[#f1f5fb] px-1.5 py-0.5 text-sm">show vtp status</code> to review the switch’s VTP state. The exact output varies by platform and VTP version, but commonly includes:
				</p>
				<ul className="mt-3 list-disc space-y-2 pl-6">
					<li><strong>VTP version:</strong> the version currently operating. Set a compatible version across the domain; version behavior and interoperability depend on platform and release.</li>
					<li><strong>Configuration revision:</strong> this switch’s current VTP database revision, used to compare advertisements within the domain.</li>
					<li><strong>Maximum VLANs supported locally:</strong> the VLAN capacity reported by the switch platform and software.</li>
					<li><strong>Number of existing VLANs:</strong> how many VLANs the switch currently has in its database.</li>
					<li><strong>VTP operating mode:</strong> server, client, or transparent in classic VTP.</li>
					<li><strong>VTP domain name:</strong> the domain identifier used when determining which advertisements belong to the same domain.</li>
					<li><strong>VTP pruning mode:</strong> whether pruning is enabled for the domain.</li>
					<li><strong>VTP V2 mode:</strong> whether VTP version 2 is enabled, if shown by that platform.</li>
					<li><strong>VTP traps generation:</strong> whether the switch generates VTP notifications for a configured management system.</li>
					<li><strong>MD5 digest:</strong> a digest used by VTP to help verify advertisement consistency/authentication; it is not a readable password.</li>
					<li><strong>Configuration last modified:</strong> when the local VTP database was last changed and, on some platforms, the address of the switch that initiated the change.</li>
				</ul>
				<p className="mt-3">
					Some switches start with a blank domain name and no VTP password, while many classic switches default to server mode. Always verify actual status rather than assuming that defaults match your design. Also check the VLAN database itself and trunk status; a VTP status display alone does not prove that the expected user VLANs are active on every required link.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Configure a VTP server and clients</h2>
				<p className="mt-3">
					This example uses the placeholder domain CAMPUS. Apply the same VTP version, domain name, and password on participating switches. Set the main switch to server and the access switches to client. Replace the example interface with the actual uplink ports in your topology.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Main switch (server)</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Main_Switch(config)# vtp version 2
Main_Switch(config)# vtp domain CAMPUS
Main_Switch(config)# vtp mode server
Main_Switch(config)# vtp password <SET_A_PRIVATE_PASSWORD>`}</code></pre>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Access switch (client)</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Access_Switch(config)# vtp version 2
Access_Switch(config)# vtp domain CAMPUS
Access_Switch(config)# vtp password <SET_THE_SAME_PRIVATE_PASSWORD>
Access_Switch(config)# vtp mode client`}</code></pre>
				<p className="mt-3">
					Use a private password chosen for your network instead of copying a tutorial value. Check which VTP versions your switch models and software support and configure a compatible version throughout the domain. Different VTP versions may not exchange information as expected, so verify the operating status on every switch.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Make sure the inter-switch links are trunks</h3>
				<p className="mt-2">
					VTP advertisements travel over trunk links, so first verify that the uplink is actually trunking. Dynamic Trunking Protocol behavior and defaults vary by model and configuration; two ports both set to dynamic auto will not negotiate a trunk. Explicitly configure the link as a trunk on both ends when appropriate and supported:
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# interface FastEthernet0/1
Switch(config-if)# switchport mode trunk`}</code></pre>
				<p className="mt-3">
					Configure the peer interface consistently, including allowed VLANs and native VLAN settings. Do not assume that one side’s configuration always makes the other side a trunk; confirm with the platform’s operational trunk display, such as <code className="rounded bg-[#f1f5fb] px-1.5 py-0.5 text-sm">show interfaces trunk</code>. Once the server and clients have matching domain settings and working trunks, create or modify VLANs on the server as allowed by the version and platform.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">VTP pruning</h2>
				<p className="mt-3">
					Without pruning, broadcast and unknown-unicast traffic for a VLAN can be carried over a trunk even when the receiving switch has no active ports in that VLAN. This uses trunk bandwidth and switch processing unnecessarily. VTP pruning reduces that unnecessary flooding by limiting eligible VLAN traffic on a trunk when the downstream switch reports that it does not need that VLAN.
				</p>
				<p className="mt-3">
					For example, suppose PC A sends a VLAN 10 broadcast. Switches in the VTP domain receive the broadcast along eligible trunks, but only Switch 3 has an active VLAN 10 port. If Switch 2 has no active VLAN 10 ports, the trunk from the server switch toward Switch 2 does not need to carry VLAN 10 broadcast or unknown-unicast traffic. Switch 3 advertises its VLAN need; Switch 2 does not, so VLAN 10 can be pruned on the unneeded branch.
				</p>
				<VlanDiagram
					image={VtpPruningImage}
					title="VTP pruning suppresses unneeded VLAN 10 flooding on one trunk"
					description="VLAN 10 traffic is forwarded toward Switch 3, which has an active VLAN 10 port, and pruned toward Switch 2, which does not."
				/>
				<p className="mt-3">
					Pruning is per VLAN and per trunk; it does not remove the VLAN from the VTP database or stop all traffic on that trunk. It suppresses eligible flooded traffic for a VLAN on links where that VLAN is not needed. It does not block known unicast traffic that must reach a destination, and VLANs such as VLAN 1 and reserved VLANs may not be eligible for pruning depending on platform and version.
				</p>
				<p className="mt-3">
					In classic VTP, enable pruning on a VTP server for the domain:
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Server(config)# vtp pruning`}</code></pre>
				<p className="mt-3">
					Verify pruning status and confirm which VLANs are eligible on each trunk. Ensure the required VLAN is allowed and present on every link that needs to carry its traffic.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">VTP deployment checklist</h2>
				<ol className="mt-3 list-decimal space-y-2 pl-6">
					<li>Confirm device support, VTP version, and the VLAN range required by the network.</li>
					<li>Set the intended VTP domain, mode, and matching authentication on participating switches.</li>
					<li>Inspect the revision and existing VLAN database before connecting a switch to a live domain.</li>
					<li>Configure and verify operational trunks between the switches.</li>
					<li>Create and verify VLANs on the intended server; check that clients receive the expected database.</li>
					<li>Enable pruning only when appropriate, then verify which VLAN traffic is pruned on each trunk.</li>
					<li>Keep configuration backups and document changes, because a higher revision can replace a switch’s VLAN database rather than merge individual entries.</li>
				</ol>
			</section>
		</div>
	);
}

function EtherChannelLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What is EtherChannel?</h2>
				<p className="mt-3">
					EtherChannel bundles multiple physical Ethernet interfaces between switches or routers into one logical interface, commonly called a Port-Channel. The member links operate together as one connection from the perspective of many Layer 2 and Layer 3 features, while the actual frames still travel over one selected physical member at a time.
				</p>
				<p className="mt-3">
					Consider two switches connected by one Fast Ethernet link. Its line rate is 100 Mb/s. Connecting a second independent link does not necessarily double usable capacity: a Layer 2 loop could result, so Spanning Tree Protocol may block one of the links. EtherChannel solves this by bundling compatible links into one logical channel. STP sees the Port-Channel as a single logical link and can keep the member links active as part of that channel instead of treating each as a separate redundant path.
				</p>
				<VlanDiagram
					image={EtherChannelBundlingImage}
					title="EtherChannel bundles two physical switch links into one logical Port-Channel"
					description="Two 100 Mb/s member links form one logical channel with up to 200 Mb/s aggregate capacity in this example; STP sees one Port-Channel."
				/>
				<p className="mt-3">
					The combined capacity is aggregate capacity, not necessarily the speed of one individual conversation. EtherChannel distributes traffic using a hashing algorithm (for example, source/destination MAC or IP fields); a given flow normally stays on one member to avoid reordering. Actual load sharing depends on platform and hash policy.
				</p>
				<p className="mt-3">
					If a member link fails but at least one compatible member remains operational, the Port-Channel can stay up and traffic can be redistributed across the surviving links. The total available aggregate capacity is reduced, but the logical connection may continue without STP reconverging around the failed individual member. If all members fail, the Port-Channel goes down.
				</p>
				<p className="mt-3">
					EtherChannel can also be used on supported router or Layer 3 interfaces. The logical Port-Channel is configured with the relevant Layer 2 or Layer 3 settings; configure member interfaces consistently and use the logical interface for settings intended to apply to the bundle.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">EtherChannel negotiation methods</h2>
				<p className="mt-3">
					There are three common ways to form a channel: Cisco PAgP, IEEE LACP, or static mode. The two ends must use compatible settings. PAgP and LACP are different protocols and cannot negotiate a channel with each other. Static mode sends neither protocol’s negotiation packets.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[720px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">Method</th><th className="px-4 py-3 font-bold">Standard / behavior</th><th className="px-4 py-3 font-bold">Negotiation modes</th><th className="px-4 py-3 font-bold">Forms a channel when</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3 font-semibold">PAgP</td><td className="px-4 py-3">Cisco-proprietary negotiation on supported platforms.</td><td className="px-4 py-3">Auto, Desirable</td><td className="px-4 py-3">At least one end is Desirable and the other is Auto or Desirable.</td></tr>
							<tr><td className="px-4 py-3 font-semibold">LACP</td><td className="px-4 py-3">IEEE link aggregation protocol, originally 802.3ad and now specified by 802.1AX.</td><td className="px-4 py-3">Passive, Active</td><td className="px-4 py-3">At least one end is Active and the other is Active or Passive.</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Static (on)</td><td className="px-4 py-3">Bundles without PAgP or LACP negotiation.</td><td className="px-4 py-3">On</td><td className="px-4 py-3">Both ends are deliberately configured as on and member settings match.</td></tr>
						</tbody>
					</table>
				</div>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">PAgP mode combinations</h3>
				<p className="mt-2">
					<strong>Desirable</strong> actively sends PAgP negotiation requests. <strong>Auto</strong> waits and responds but does not initiate. Auto–Auto will not form a channel; Desirable–Auto and Desirable–Desirable can form one. Auto is not a universal default—check the device configuration.
				</p>
				<div className="mt-4 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[500px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]"><tr><th className="px-4 py-3 font-bold">PAgP side A</th><th className="px-4 py-3 font-bold">Desirable</th><th className="px-4 py-3 font-bold">Auto</th></tr></thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3 font-semibold">Desirable</td><td className="px-4 py-3">Forms</td><td className="px-4 py-3">Forms</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Auto</td><td className="px-4 py-3">Forms</td><td className="px-4 py-3">Does not form</td></tr>
						</tbody>
					</table>
				</div>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">LACP mode combinations</h3>
				<p className="mt-2">
					<strong>Active</strong> initiates LACP negotiation; <strong>Passive</strong> responds but does not initiate. Passive–Passive will not form a channel. Active–Passive and Active–Active can form one.
				</p>
				<div className="mt-4 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[500px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]"><tr><th className="px-4 py-3 font-bold">LACP side A</th><th className="px-4 py-3 font-bold">Active</th><th className="px-4 py-3 font-bold">Passive</th></tr></thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3 font-semibold">Active</td><td className="px-4 py-3">Forms</td><td className="px-4 py-3">Forms</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Passive</td><td className="px-4 py-3">Forms</td><td className="px-4 py-3">Does not form</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-4">
					PAgP Auto is similar to LACP Passive because both wait for negotiation; PAgP Desirable is similar to LACP Active because both initiate. They are only analogous behaviors, not interoperable modes.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Static “on” mode</h2>
				<p className="mt-3">
					In on mode, the interfaces are placed into a channel without negotiation. No PAgP or LACP packets verify that the peer has matching configuration. Configure on at both ends and validate the physical cabling and all member settings carefully. A mismatch can cause a channel not to operate correctly and may create a loop or traffic loss; use a negotiation protocol when it is supported and appropriate.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Member-link consistency and configuration</h2>
				<p className="mt-3">
					Every candidate member must be compatible with the other members and peer configuration. Common requirements include matching speed and duplex, compatible Layer 2 or Layer 3 mode, and consistent STP-related and VLAN/trunk settings. For Layer 2 channels, verify access VLAN or trunk mode, native VLAN, allowed VLAN list, and supported trunk encapsulation. The exact checks and limits vary by switch model and software.
				</p>
				<p className="mt-3">
					Some platforms or configurations do not support features such as dynamic VLAN membership or port security on EtherChannel member interfaces, or impose specific restrictions. Do not assume every switch treats these features identically: consult the device’s platform documentation and inspect channel consistency before applying them.
				</p>
				<VlanDiagram
					image={EtherChannelLoadBalanceImage}
					title="EtherChannel load distribution and member link failover"
					description="Different flows are hashed across active members. If one member fails, flows can be redistributed over the remaining active link and the Port-Channel may remain up."
				/>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Example: configure a Layer 2 LACP trunk</h3>
				<p className="mt-2">
					This illustrative Cisco IOS-style example places two physical interfaces in LACP channel group 1, then configures VLAN trunking on the logical Port-Channel. Repeat compatible configuration on the peer and confirm the actual interface names and feature support for the switch model.
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# interface range GigabitEthernet0/1-2
Switch(config-if-range)# switchport mode trunk
Switch(config-if-range)# channel-group 1 mode active
Switch(config-if-range)# exit
Switch(config)# interface Port-channel1
Switch(config-if)# switchport mode trunk`}</code></pre>
				<p className="mt-3">
					Check the channel summary and member consistency using platform-appropriate commands such as <code className="rounded bg-[#f1f5fb] px-1.5 py-0.5 text-sm">show etherchannel summary</code> and <code className="rounded bg-[#f1f5fb] px-1.5 py-0.5 text-sm">show interfaces port-channel 1</code>. Confirm both physical members are bundled and the logical interface is up.
				</p>
			</section>

			<aside className="rounded-2xl border border-[#dbe5f5] bg-[#f4f7fd] p-5 sm:p-6">
				<h2 className="text-lg font-bold text-[#17356d]">EtherChannel recap</h2>
				<ul className="mt-3 list-disc space-y-2 pl-5">
					<li>Multiple physical Ethernet links operate as one logical Port-Channel.</li>
					<li>STP treats the bundle as one logical link; a member failure need not take down the bundle if members remain.</li>
					<li>Traffic is load-shared by a platform-specific hash; one flow does not necessarily use all member bandwidth.</li>
					<li>PAgP is Cisco-proprietary; LACP is the IEEE standard; static on mode negotiates with neither.</li>
					<li>All channel members and both ends must have compatible settings.</li>
				</ul>
			</aside>
		</div>
	);
}

const moduleTwoLessonByType = {
	vlan: VlanLessonContent,
	intervlan: InterVlanLessonContent,
	stp: StpLessonContent,
	"stp-root-port": StpRootPortElectionContent,
	rstp: RstpLessonContent,
	vtp: VtpLessonContent,
	etherchannel: EtherChannelLessonContent,
};

export default function CcnaKnowledgeModuleTwo({ contentType }) {
	const Lesson = moduleTwoLessonByType[contentType];
	return Lesson ? <Lesson /> : null;
}
