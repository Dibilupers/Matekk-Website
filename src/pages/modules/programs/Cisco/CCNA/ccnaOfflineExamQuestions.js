import aclQuestion77ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-77-acl-exhibit.jpg";
import jsonObject769ExhibitImg from "../../../../../assets/ccna-exam/ccna-json-object-exhibit-769.svg";
import ipAddressAssignmentExhibitImg from "../../../../../assets/ccna-exam/ccna-question-875-ip-address-exhibit.jpg";
import stpRootBridge962ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-962-stp-root-bridge-exhibit.jpg";
import pcIpConfig963ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-963-ipconfig-exhibit.png";
import wlanAdvanced1028ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-1028-wlan-advanced-exhibit.png";
import hostA1114ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-1114-host-a-exhibit.png";
import vlanSwitchTopology1130ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-1130-switch-vlan-topology.jpg";
import hostC1152ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-1152-host-c-network-config.jpg";
import wlcWpa2Psk1154ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-1154-wlc-wpa2.jpg";
import stpTopology1167ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-1167-stp-topology.jpg";
import wlcWpa2Aes1170ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-1170-wlc-wpa2-aes.jpg";
import sw11Vlan340ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-340-sw11-vlan.jpg";
import wlcMacFiltering872ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-872-wlc-mac-filtering.jpg";
import wlcSae890ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-890-wlc-sae.jpg";
import wlc63CharPsk911ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-911-wlc-63-char-psk.jpg";
import workstationServerFqdn924ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-924-workstation-server-fqdn.jpg";
import wlcP2pBlocking992ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-992-wlc-p2p-blocking.webp";
import patVlan341ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-341-pat-vlan.webp";
import voiceDataVlan382ExhibitImg from "../../../../../assets/ccna-exam/ccna-question-382-voice-data-vlan.webp";
import { CCNA_LEGACY_QUESTIONS } from "./ccnaLegacyQuestions";
import { applyNativeExhibit, CCNA_RECREATED_TEXT_EXHIBITS } from "./ccnaCompositeSetQuestions";
import { findCcnaQuestionExplanation } from "../../../../../utils/ccnaQuestionExplanations";
import { isValidQuestion } from "../../../../../utils/ccnaExamGrading";
import { splitPromptExhibit } from "../../../../../utils/splitPromptExhibit";
import { parseFormattedOptions } from "./ccnaExamQuestionFormatting";
import {
  CCNA_AFTER_EXHIBITS,
  getBundledCcnaAfterExhibitImage,
} from "../../../../../utils/ccnaAfterExhibits";
import { getCcnaExhibitImageByLegacyIndex } from "../../../../../utils/ccnaExhibitImages";
import { shuffleMatchingChoices } from "./ccnaMatchingChoices";
import routerLans405SourceExhibit from "../../../../../assets/ccna-offline-exams-images/ccna-question-405.png";

const CONNECT_DOTS_LEGACY_QUESTION_INDEX = 654;
const OFFLINE_REFER_EXHIBIT_QUESTION_IDS = new Set(
  CCNA_LEGACY_QUESTIONS
    .filter((question) => /\bexhibit\b/i.test(question.prompt))
    .map((question) => question.legacyIndex),
);
const OFFLINE_REFER_EXHIBIT_IMAGE_OVERRIDES = new Map([
  [405, { offlineSourceExhibitImages: [routerLans405SourceExhibit] }],
  [345, { exhibitImage: aclQuestion77ExhibitImg }],
  [341, { exhibitImage: patVlan341ExhibitImg }],
  [382, { exhibitImage: voiceDataVlan382ExhibitImg }],
  [340, { exhibitImage: sw11Vlan340ExhibitImg }],
  [1188, { exhibitImage: wlcMacFiltering872ExhibitImg }],
  [1206, { exhibitImage: wlcSae890ExhibitImg }],
  [1227, { exhibitImage: wlc63CharPsk911ExhibitImg }],
  [1232, { exhibitImage: workstationServerFqdn924ExhibitImg }],
  [1281, { exhibitImage: wlcP2pBlocking992ExhibitImg }],
  [1112, {
    prompt: "VoIP is being implemented in the network using VLAN ID 73 and named “VoIP”. Each user needs a Cisco IP phone at their desk. Switchport e0/0 has been configured as an access port in the data VLAN. Cisco Discovery Protocol is enabled globally. Which command sequence completed the configuration?",
    exhibit: `SW_1#show vlan

VLAN  Name                 Status    Ports
----  -------------------  --------  ---------------------------
1     default              active    Et0/2, Et1/0, Et1/0, Et1/3
5     MGMT Vlan            active    Et1/1
6     Server Vlan          active
72    Data Vlan            active    Et0/0
1002  fddi-default         act/unsup
1003  token-ring-default   act/unsup
1004  fddinet-default     act/unsup
1005  trnet-default       act/unsup`,
    exhibitImage: undefined,
    offlineSourceExhibitImages: [],
  }],
  [44, { offlineSourceExhibitImages: [] }],
  [51, { offlineSourceExhibitImages: [] }],
  [62, { offlineSourceExhibitImages: [] }],
  [494, { afterExhibit: undefined, exhibitQuality: "illustrative" }],
  [496, { afterExhibit: undefined }],
  [542, { offlineSourceExhibitImages: [] }],
  [570, { offlineSourceExhibitImages: [] }],
  [645, { offlineSourceExhibitImages: ["/src/assets/ccna-offline-exams-images/ccna-question-327.png"] }],
  [655, { exhibitImage: undefined, hideExhibitImage: true }],
  [687, { offlineSourceExhibitImages: [] }],
  [1300, { offlineSourceExhibitImages: [] }],
  [1301, { offlineSourceExhibitImages: [] }],
  [769, {
    offlineSourceExhibitImages: [],
    afterExhibit: undefined,
    exhibitDiagram: undefined,
    exhibit: undefined,
    exhibitImage: jsonObject769ExhibitImg,
    hideExhibitImage: false,
    exhibitQuality: "illustrative",
  }],
  [663, {
    exhibitQuality: "source-backed",
    offlineSourceExhibitImages: [],
  }],
  [674, { exhibitQuality: "illustrative" }],
  [689, { exhibitQuality: "source-backed" }],
  [701, {
    prompt: "After configuring a new static route on the CPE, the engineer entered the following commands to verify the configuration. When is the static default route installed into the routing table?",
    exhibit: `[Static-route configuration output is missing from the available source.]
CPE# ping 203.0.113.1

Type escape sequence to abort.

Sending 5, 100-byte ICMP Echos to 203.0.113.1, timeout is 2 seconds:

!!!!!

Success rate is 100 percent (5/5), round-trip min/avg/max = 1/1/1 ms

CPE# show ip route

Gateway of last resort is 198.51.100.1 to network 0.0.0.0

B* 0.0.0.0/0 [20/0] via 198.51.100.1, 00:02:07

198.51.100.0/24 is variably subnetted, 2 subnets, 2 masks
C 198.51.100.0/30 is directly connected, Ethernet0/0
L 198.51.100.2/32 is directly connected, Ethernet0/0

203.0.113.0/24 is variably subnetted, 2 subnets, 2 masks
C 203.0.113.0/30 is directly connected, Ethernet0/1
L 203.0.113.2/32 is directly connected, Ethernet0/1`,
    explanation: "The active eBGP default route has administrative distance 20. A floating static default route configured with a higher administrative distance is installed after the eBGP default route is withdrawn or becomes invalid. The available exhibit omits the static-route configuration, so its exact administrative distance cannot be verified.",
    exhibitImage: undefined,
    hideExhibitImage: true,
    exhibitQuality: "illustrative",
  }],
  [704, {
    exhibitDiagram: "two-router-port-security-704",
    exhibit: `Workstation  MAC address
PC1          00:50:79:66:68:62
PC2          28:39:26:34:52:37
PC3          00:50:79:66:68:37
PC4          00:50:79:66:68:59`,
    exhibitImage: undefined,
    hideExhibitImage: true,
    afterExhibit: undefined,
    exhibitQuality: "source-backed",
  }],
  [705, {
    afterExhibit: {
      title: "R2 WAN connection to the ISP",
      text: "R1 connects to R2 on GigabitEthernet0/0. R2 connects to the ISP on GigabitEthernet0/1. R1 connects through SW1 to a file server and a network management server on 2001:DB8:D8D2:1008::/64. R2 connects through SW2 to IP phones and workstations on 2001:DB8:D8D2:1009::/64.",
      imageUrl: getBundledCcnaAfterExhibitImage(387),
      questionId: 387,
    },
    exhibitQuality: "source-backed",
  }],
  [708, { exhibitQuality: "source-backed" }],
  [711, {
    prompt: "The SW1 and SW2 Gi0/0 ports are preconfigured. The requirements are: allow all PCs to communicate at Layer 3, use VLAN 5 for untagged traffic, and disable VLAN 1. Which configuration set meets these requirements?",
    exhibit: `Option A
SW1
interface Gi0/1
 switchport mode trunk
 switchport trunk allowed vlan 5,7,9,108
interface Gi0/2
 switchport mode trunk
 switchport trunk allowed vlan 7,9,108

SW2
interface Gi0/1
 switchport mode trunk
 switchport trunk allowed vlan 7
interface Gi0/7
 switchport mode trunk
 switchport trunk allowed vlan 5,7,9,108

Option B
SW1
interface Gi0/1
 switchport mode trunk
 switchport trunk allowed vlan 5,7,9,108
 switchport trunk native vlan 5
interface Gi0/2
 switchport mode access
 switchport trunk allowed vlan 7,9,108

SW2
interface Gi0/1
 switchport mode access
 no switchport access vlan 1
 switchport access vlan 7
interface Gi0/7
 switchport mode trunk
 switchport trunk allowed vlan 7,9,108
 switchport trunk native vlan 5

Option C
SW1
interface Gi0/1
 switchport mode trunk
 switchport trunk allowed vlan 5,7,9,108
 switchport trunk native vlan 5
interface Gi0/2
 switchport mode trunk
 switchport trunk allowed vlan 5,7,9,108

SW2
interface Gi0/1
 switchport mode access
 switchport access vlan 7
interface Gi0/7
 switchport mode trunk
 switchport trunk allowed vlan 7,9,108

Option D
SW1
interface Gi0/1
 switchport mode trunk
 switchport trunk allowed vlan 5,7,9,108
 switchport trunk native vlan 5
interface Gi0/2
 switchport mode trunk
 switchport trunk allowed vlan 5,7,9,108

SW2
interface Gi0/1
 switchport mode access
 switchport access vlan 7
interface Gi0/7
 switchport mode trunk
 switchport trunk allowed vlan 5,7,9,108
 switchport trunk native vlan 5`,
    exhibitImage: undefined,
    hideExhibitImage: true,
    offlineSourceExhibitImages: [],
    exhibitQuality: "source-backed",
  }],
  [714, {
    exhibitDiagram: "r1-r2-point-to-point-714",
    exhibitImage: undefined,
    hideExhibitImage: true,
    afterExhibit: undefined,
    exhibitQuality: "source-backed",
  }],
  [716, {
    exhibitDiagram: "ipv6-block-r1-r2-716",
    exhibitImage: undefined,
    hideExhibitImage: true,
    afterExhibit: undefined,
    offlineSourceExhibitImages: [],
    exhibitQuality: "partial",
  }],
  [717, {
    prompt: "Which router or router group is configured as an NTP client?",
    options: [
      "R1 and R2",
      "R1",
      "R2 and R3",
      "R1, R3, and R4",
    ],
    exhibit: `Router1(config)#ntp master 7
Router1(config)#ntp server 209.165.200.226
Router2(config)#ntp server 209.165.200.225
Router2(config)#ntp master 7`,
    exhibitDiagram: undefined,
    exhibitImage: undefined,
    hideExhibitImage: true,
    afterExhibit: undefined,
    offlineSourceExhibitImages: [],
    exhibitQuality: "partial",
  }],
  [719, { exhibitQuality: "source-backed" }],
  [720, {
    prompt: "In which structure does the word “warning” directly reside?",
    exhibit: `{
  "myCar": {
    "name": "thunder",
    "wheels": ["good", "good", "pressureLow", "warning"],
    "gasLight": false
  },
  "oldCar": {
    "name": "sleepy",
    "wheels": ["pressureLow", "pressureLow", "pressureLow", "pressureLow"],
    "color": "rust"
    "gasLight": true
  },
  "newCar": {
    "name": "lightning",
    "wheels": ["pressureLow", "good", "pressureLow", "good"],
    "color": "blue"
    "gasLight": true
  }
}`,
    exhibitImage: undefined,
    hideExhibitImage: true,
    exhibitQuality: "source-backed",
  }],
  [702, {
    prompt: "Wireless LAN access must be set up to force all clients from the NA WLAN to authenticate against the local database. The WLAN is configured for local EAP authentication. The time that users access the network must not be limited. Which action completes this configuration?",
    exhibitImage: undefined,
    hideExhibitImage: true,
  }],
  [875, {
    offlineSourceExhibitImages: [],
    afterExhibit: undefined,
    exhibitDiagram: undefined,
    exhibit: undefined,
    exhibitImage: ipAddressAssignmentExhibitImg,
    hideExhibitImage: false,
  }],
  [962, {
    offlineSourceExhibitImages: [],
    afterExhibit: undefined,
    exhibitDiagram: undefined,
    exhibit: undefined,
    exhibitImage: stpRootBridge962ExhibitImg,
    hideExhibitImage: false,
  }],
  [963, {
    offlineSourceExhibitImages: [],
    afterExhibit: undefined,
    exhibitDiagram: undefined,
    exhibit: undefined,
    exhibitImage: pcIpConfig963ExhibitImg,
    hideExhibitImage: false,
  }],
  [1028, {
    offlineSourceExhibitImages: [],
    afterExhibit: undefined,
    exhibitDiagram: undefined,
    exhibit: undefined,
    exhibitImage: wlanAdvanced1028ExhibitImg,
    hideExhibitImage: false,
  }],
  [1114, {
    offlineSourceExhibitImages: [],
    afterExhibit: undefined,
    exhibitDiagram: undefined,
    exhibit: undefined,
    exhibitImage: hostA1114ExhibitImg,
    hideExhibitImage: false,
  }],
  [1130, {
    offlineSourceExhibitImages: [],
    afterExhibit: undefined,
    exhibitDiagram: undefined,
    exhibit: undefined,
    exhibitImage: vlanSwitchTopology1130ExhibitImg,
    hideExhibitImage: false,
  }],
  [1143, {
    offlineSourceExhibitImages: [],
    afterExhibit: undefined,
    exhibitDiagram: undefined,
    exhibit: undefined,
    exhibitImage: vlanSwitchTopology1130ExhibitImg,
    hideExhibitImage: false,
  }],
  [1152, {
    offlineSourceExhibitImages: [],
    afterExhibit: undefined,
    exhibitDiagram: undefined,
    exhibit: undefined,
    exhibitImage: hostC1152ExhibitImg,
    hideExhibitImage: false,
  }],
  [1154, {
    offlineSourceExhibitImages: [],
    afterExhibit: undefined,
    exhibitDiagram: undefined,
    exhibit: undefined,
    exhibitImage: wlcWpa2Psk1154ExhibitImg,
    hideExhibitImage: false,
  }],
  [1167, {
    offlineSourceExhibitImages: [],
    afterExhibit: undefined,
    exhibitDiagram: undefined,
    exhibit: undefined,
    exhibitImage: stpTopology1167ExhibitImg,
    hideExhibitImage: false,
  }],
  [1170, {
    offlineSourceExhibitImages: [],
    afterExhibit: undefined,
    exhibitDiagram: undefined,
    exhibit: undefined,
    exhibitImage: wlcWpa2Aes1170ExhibitImg,
    hideExhibitImage: false,
  }],
]);

const OFFLINE_REFER_EXHIBIT_QUESTION_OVERRIDES = new Map([
  [875, {
    optionIndex: 1,
    option: `R7#
interface FastEthernet1/0
ip address 10.88.31.126 255.255.255.192
R8#
interface FastEthernet0/0
ip address 10.19.63.94 255.255.255.240
R9#
interface FastEthernet1/1
ip address 10.23.98.158 255.255.255.224`,
    explanation: `Option B configures each router with the last usable address and the subnet mask shown in the exhibit.

R7: 10.88.31.64/26 has broadcast address 10.88.31.127, so the last usable address is 10.88.31.126.
R8: 10.19.63.80/28 has broadcast address 10.19.63.95, so the last usable address is 10.19.63.94.
R9: 10.23.98.128/27 has broadcast address 10.23.98.159, so the last usable address is 10.23.98.158.`,
  }],
  [963, {
explanation: `The PC address 192.168.10.25 with subnet mask 255.255.255.0 is in 192.168.10.0/24. The configured default gateway 192.168.1.1 is outside that subnet, so the PC cannot reach its router. Set the default gateway to the router's address in 192.168.10.0/24. The DNS server is not the subnet mismatch.`,
  }],
  [1114, {
answer: 1,
explanation: "Host A is configured with 192.168.1.255/24, which is the broadcast address of the 192.168.1.0/24 LAN, not a valid host address. The default gateway 192.168.1.1 matches the router's LAN interface, and the exhibit provides a DNS server. Correct the host IP address.",
  }],
  [1152, {
answer: 1,
explanation: "Host C is configured with IP address 192.168.1.12 and subnet mask 255.255.255.0, so it is on the 192.168.1.0/24 subnet. The router's LAN address is 192.168.1.1, but Host C's default gateway is set to 192.168.2.1, which is outside its subnet. The default gateway is preventing Host C from reaching the internet.",
  }],
  [687, {
    explanation: "The port-security maximum must allow the two intended MAC addresses, and `violation restrict` logs violations without shutting down the interface. Do not configure a static MAC address. Sticky learning is also dynamic, but it additionally writes learned addresses to the running configuration; persistence was not required here, so sticky learning is not one of the two necessary settings.",
  }],
  [704, {
    optionIndex: 1,
    option: `SW1(config-if)#switchport mode access
SW1(config-if)#switchport port-security
SW1(config-if)#switchport port-security mac-address 0050.7966.6862`,
    explanation: "Use access mode because the port must not carry tagged VLANs, then enable port security and statically allow PC1's MAC address, 0050.7966.6862. This allows PC1 and rejects other source MAC addresses on the port.",
  }],
  [705, {
    explanation: "Option D is the only standard unicast global-scope address among the choices; the link-local address is not Internet-routable, the second option is malformed, and the anycast option is not a unicast interface address. The 2001:db8::/32 prefix is reserved for documentation, however, so the literal address shown is an example rather than a real public Internet address.",
  }],
  [708, {
    explanation: "Configure `ip ospf network point-to-point` on GigabitEthernet0/0. A point-to-point OSPF network does not elect a DR or BDR, so the neighbor state appears as FULL/- rather than FULL/DR.",
  }],
  [711, {
    explanation: "Option D sets VLAN 5 as the native VLAN on SW1 Gi0/1 and SW2 Gi0/7, excludes VLAN 1 from the trunks, keeps SW1 Gi0/2 in trunk mode so it can carry the required VLANs, and places SW2 Gi0/1 in access VLAN 7. Option B puts SW1 Gi0/2 in access mode, so it cannot carry the required VLANs.",
  }],
  [714, {
    explanation: "A /29 (255.255.255.248) subnet has six usable host addresses. Assigning 10.10.10.1 and 10.10.10.4 leaves four usable addresses for growth, meeting the requirement while using fewer addresses than a /28 or /24. A /30 has only two usable addresses and no spare host addresses.",
  }],
  [717, {
    explanation: "The `ntp server` command configures a router to synchronize as an NTP client. The available configuration shows that command on both R1 and R2, so the supported answer is R1 and R2. No NTP-client configuration for R3 is present in the available source.",
  }],
  [719, {
    explanation: "The destination 192.168.2.2 matches both 192.168.2.0/28 and 192.168.2.0/29. The /29 route is more specific, so longest-prefix match selects option D.",
  }],
  [720, {
    explanation: "The word `warning` is a string element inside the `wheels` array of `myCar`, so its direct structure is an array. The source exhibit omits commas after the `color` values for `oldCar` and `newCar`; those are preserved as shown.",
  }],
]);

const AFTER_EXHIBITS_BY_LEGACY_INDEX = new Map();
for (const exhibit of CCNA_AFTER_EXHIBITS) {
  if (!exhibit.after_exhibit_text?.trim() && !exhibit.after_exhibit_image_url) continue;
  if (!Number.isSafeInteger(exhibit.offlineLegacyIndex)) continue;
  const current = AFTER_EXHIBITS_BY_LEGACY_INDEX.get(exhibit.offlineLegacyIndex);
  if (!current || exhibit.preferredOfflineMatch) {
    AFTER_EXHIBITS_BY_LEGACY_INDEX.set(exhibit.offlineLegacyIndex, exhibit);
  }
}

const NUMBERED_QUESTION_EXHIBIT_IMAGES = import.meta.glob(
  "../../../../../assets/ccna-offline-exams-images/ccna-question-*.png",
  { eager: true, import: "default", query: "?url" },
);

const NUMBERED_QUESTION_EXHIBIT_VARIANTS = Object.entries(NUMBERED_QUESTION_EXHIBIT_IMAGES)
  .reduce((exhibits, [path, image]) => {
    const match = path.match(/ccna-question-(\d+)(-corrected)?\.png$/);
    if (!match) return exhibits;

    const questionNumber = Number(match[1]);
    const variants = exhibits.get(questionNumber) ?? [];
    variants.push({ image, corrected: Boolean(match[2]) });
    exhibits.set(questionNumber, variants);
    return exhibits;
  }, new Map());

// Screenshot filenames use question-bank IDs, so map them to legacy indexes by prompt.
const OFFLINE_LEGACY_QUESTION_IMAGE_IDS = new Map([
  [62, 1099],
  [329, 13],
  [331, 15],
  [339, 23],
  [354, 38],
  [355, 39],
  [421, 105],
  [460, 143],
  [474, 157],
  [478, 161],
  [489, 172],
  [491, 174],
  [494, 177],
  [495, 178],
  [496, 179],
  [497, 180],
  [502, 185],
  [504, 187],
  [505, 188],
  [507, 190],
  [508, 191],
  [509, 192],
  [510, 193],
  [520, 203],
  [521, 204],
  [522, 205],
  [529, 212],
  [531, 214],
  [541, 224],
  [542, 225],
  [545, 228],
  [548, 231],
  [551, 234],
  [554, 236],
  [560, 242],
  [562, 244],
  [563, 245],
  [564, 246],
  [566, 248],
  [568, 250],
  [569, 251],
  [570, 252],
  [574, 256],
  [577, 259],
  [578, 260],
  [579, 261],
  [586, 268],
  [588, 270],
  [591, 273],
  [592, 274],
  [593, 275],
  [599, 281],
  [602, 284],
  [603, 285],
  [612, 294],
  [616, 298],
  [617, 299],
  [618, 300],
  [621, 303],
  [628, 310],
  [629, 311],
  [635, 317],
  [645, 327],
  [646, 328],
  [651, 333],
  [656, 338],
  [657, 339],
  [661, 343],
  [663, 345],
  [679, 361],
  [682, 364],
  [685, 367],
  [687, 369],
  [689, 371],
  [695, 377],
  [704, 386],
  [705, 387],
  [714, 396],
  [721, 403],
  [723, 405],
  [1290, 1001],
  [1300, 1011],
  [1301, 1012],
  [1303, 1014],
  [1304, 1015],
  [44, 1081],
  [45, 1082],
  [47, 1084],
  [51, 1088],
  [52, 1089],
  [59, 1096],
  [60, 1097],
  [71, 1108],
  [72, 1109],
  [82, 1119],
  [84, 1121],
  [88, 1125],
  [90, 1127],
  [91, 1128],
  [104, 1141],
  [109, 1146],
  [111, 1148],
  [112, 1149],
  [120, 1157],
  [130, 1167],
  [131, 1168],
  [132, 1169],
  [137, 1174],
  [157, 1194],
  [160, 1197],
  [162, 1199],
  [177, 1214],
  [215, 1254],
  [266, 1305],
  [268, 1307],
  [278, 1317],
  [282, 1321],
  [290, 1329],
  [291, 1330],
]);

const OFFLINE_LEGACY_QUESTION_OVERRIDES = new Map([
  [655, {
    prompt: "Refer to the exhibit.\n\nAn engineer is configuring a Layer 3 port channel with LACP. The first device is configured with LACP active mode, and both member interfaces can see the neighbor in the CDP table. Which configuration on the neighbor allows the port channel to form?",
    exhibit: `interface g2/0/0
channel-group 1 mode active

interface g4/0/0
channel-group 1 mode active

interface Port-channel1
ip address 203.0.113.65 255.255.255.252

%LINEPROTO-5-UPDOWN: Line protocol on Interface Port-channel1, changed state to down`,
    options: [
      "Bring up the neighboring interfaces using the no shutdown command.",
      "Change the EtherChannel mode on the neighboring interfaces to auto.",
      "Configure the neighboring member interfaces for LACP passive mode.",
      "Configure the IP address of the neighboring device.",
    ],
    explanation: "The first device uses LACP active mode. Configure the neighboring member interfaces with `channel-group 1 mode passive`. The active side initiates LACP and the passive side responds, allowing the channel to form. CDP already confirms that the physical interfaces can see the neighbor; PAgP auto is incompatible with LACP, and an IP address does not resolve a Layer 2 EtherChannel negotiation mismatch.",
    offlineSourceExhibitImages: ["/src/assets/ccna-offline-exams-images/ccna-exhibit-655.png"],
    hideExhibitImage: true,
    exhibitQuality: "source-backed",
  }],
  [662, {
    options: [
      "0.0.0.0/0[1/0] via 10.10.10.2",
      "10.10.13.0/25[110/2] via 10.10.10.6",
      "10.10.13.0/25[110/2] via 10.10.10.2",
      "10.10.13.0/25[108/0] via 10.10.10.10",
    ],
    explanation: "The default route `0.0.0.0/0` via `10.10.10.2` is less specific than routes to Host B's `10.10.13.0/25` network. For that same `/25`, the static route via `10.10.10.10` has administrative distance 108, lower than OSPF's 110, so R1 selects option D.",
    exhibitQuality: "illustrative",
  }],
  [266, {
    matchStyle: "assign",
    choices: [
      "route source",
      "administrative distance",
      "metric",
      "timestamp",
      "outbound interface",
      "next-hop interface",
      "subnet mask",
    ],
  }],
  [382, {
    prompt: "An engineer must configure GigabitEthernet1/1 to accommodate voice and data traffic. Which configuration accomplishes this task?",
    options: [
      "interface GigabitEthernet1/1\n switchport mode access\n switchport access vlan 300\n switchport voice vlan 400",
      "interface GigabitEthernet1/1\n switchport mode access\n switchport access vlan 400\n switchport voice vlan 300",
      "interface GigabitEthernet1/1\n switchport mode trunk\n switchport access vlan 300\n switchport voice vlan 400",
      "interface GigabitEthernet1/1\n switchport mode trunk\n switchport trunk vlan 300\n switchport trunk vlan 400",
    ],
  }],
  [476, {
    prompt: "Which IPv6 configuration is required for R17 to successfully ping the WAN interface on R18?",
    options: [
      "R17#\n!\nno ip domain lookup\nip cef\nipv6 unicast-routing\n!\ninterface FastEthernet0/0\n no ip address\n duplex auto\n speed auto\n ipv6 address 2001:DB8:2::201/64\n!\ninterface FastEthernet1/0\n no ip address\n duplex auto\n speed auto\n ipv6 address 2001:DB8:3::201/64\n!\nno cdp log mismatch duplex\nipv6 route 2001:DB8:4::/64 2001:DB8:3::301",
      "R17#\n!\nno ip domain lookup\nip cef\nipv6 unicast-routing\n!\ninterface FastEthernet0/0\n no ip address\n duplex auto\n speed auto\n ipv6 address 2001:DB8:2::201/64\n!\ninterface FastEthernet1/0\n no ip address\n duplex auto\n speed auto\n ipv6 address 2001:DB8:3::201/64\n!\nno cdp log mismatch duplex\nipv6 route 2001:DB8:4::/64 2001:DB8:2::201",
      "R17#\n!\nno ip domain lookup\nip cef\n!\ninterface FastEthernet0/0\n no ip address\n duplex auto\n speed auto\n ipv6 address 2001:DB8:3::201/64\n!\ninterface FastEthernet1/0\n no ip address\n duplex auto\n speed auto\n ipv6 address 2001:DB8:2::201/64\n!\nno cdp log mismatch duplex\nipv6 route 2001:DB8:4::/64 2001:DB8:5::101",
      "R17#\n!\nno ip domain lookup\nip cef\nipv6 cef\n!\ninterface FastEthernet0/0\n no ip address\n duplex auto\n speed auto\n ipv6 address 2001:DB8:2::201/64\n!\ninterface FastEthernet1/0\n no ip address\n duplex auto\n speed auto\n ipv6 address 2001:DB8:3::201/64\n!\nno cdp log mismatch duplex\nipv6 route 2001:DB8:4::/64 2001:DB8:4::302",
    ],
  }],
  [532, {
    prompt: "A Cisco engineer is configuring a factory-default router with these passwords:\n- Console user EXEC: p4ssw0rd1\n- Telnet user EXEC: s3cr3t2\n- Privileged EXEC: priv4t3p4ss\n\nWhich command sequence must the engineer configure?",
    options: [
      "enable secret priv4t3p4ss\n!\nline console 0\n password p4ssw0rd1\n login\n!\nline vty 0 15\n password s3cr3t2\n login",
      "enable secret privilege 15 priv4t3p4ss\n!\nline console 0\n password p4ssw0rdi\n login\n!\nline vty 0 15\n password s3cr3t2\n login",
      "enable secret priv413p4ss\n!\nline console 0\n password login p4ssw0rd1\n!\nline vty 0 15\n password login s3cr3t2\n login",
      "enable secret priv4t3p4ss\n!\nline console 0\n password p4ssw0rd1\n!\nline vty 0 15\n password s3cr3t2",
    ],
  }],
  [622, {
    prompt: [
      "Consider the following:",
      "- SW1 is fully configured for all traffic.",
      "- The SW4 and SW9 links to SW1 are configured.",
      "- SW4 interface Gi0/1 and SW9 interface Gi0/0 are configured.",
      "- All VLANs have been added to the remaining switches.",
      "",
      "Which configuration enables PC2 to ping PC7 without interrupting traffic between other PCs?",
    ].join("\n"),
    options: [
      "SW4#\ninterface Gi0/2\n switchport mode trunk\n switchport trunk allowed vlan 14,108\n\nSW11#\ninterface Gi0/2\n switchport mode trunk\n switchport trunk allowed vlan 14,108\n!\ninterface Gi0/1\n switchport mode trunk\n switchport trunk allowed vlan 14,108\n\nSW9#\ninterface Gi0/2\n switchport mode trunk\n switchport trunk allowed vlan 14",
      "SW4\ninterface Gi0/7\n switchport mode trunk\n switchport trunk allowed vlan 108\n!\ninterface Gi0/2\n switchport mode access\n switchport access vlan 14\n\nSW11#\ninterface Gi0/2\n switchport mode trunk\n switchport trunk allowed vlan 14,108\n!\ninterface Gi0/1\n switchport mode trunk\n switchport trunk allowed vlan 14,108\n\nSW9#\ninterface Gi0/2\n switchport mode access\n switchport access vlan 14",
      "SW4\ninterface Gi0/2\n switchport mode trunk\n switchport trunk allowed vlan 14\n\nSW11#\ninterface Gi0/1\n switchport mode trunk\n switchport trunk allowed vlan 14\n\nSW9#\ninterface Gi0/2\n switchport mode trunk\n switchport trunk allowed vlan 108",
      "SW4\ninterface Gi0/2\n switchport mode access\n switchport access vlan 14\n\nSW11#\ninterface Gi0/2\n switchport mode access\n switchport access vlan 14\n!\ninterface Gi0/0\n switchport mode access\n switchport access vlan 14\n!\ninterface Gi0/1\n switchport mode trunk\n\nSW9#\ninterface Gi0/2\n switchport mode access\n switchport access vlan 14",
    ],
  }],
  [1131, {
    prompt: "After an attempted ARP spoofing attack, an administrator must protect the access-layer switch. Port-channel1 is the uplink to the distribution-layer switch. Which two configurations should be applied? (Choose two)",
    options: [
      "ip dhcp snooping\n!\ninterface Port-channel1\n switchport port-security maximum 1\n switchport port-security",
      "ip dhcp snooping vlan 1-4094\nip dhcp snooping\n!\ninterface Port-channel1\n ip dhcp snooping trust",
      "ip dhcp snooping vlan 1-4094\n!\ninterface Port-channel1\n switchport protected\n switchport port-security maximum 1",
      "ip arp inspection trust\n!\ninterface Port-channel1\n switchport port-security maximum 4094\n switchport port-security\n ip verify source mac-check",
      "ip arp inspection vlan 1-4094\n!\ninterface Port-channel1\n ip arp inspection trust",
    ],
  }],
  [1187, {
    prompt: "An administrator must add TCP DNS access to the Services ACL while retaining its existing services. Which configuration updates the ACL efficiently?",
    exhibit: "CPE# show ip access-list Services\nExtended IP access list Services\n\n10 permit tcp 10.0.0.0 0.255.255.255 any eq www\n20 permit tcp 10.0.0.0 0.255.255.255 any eq 443\n30 permit udp 10.0.0.0 0.255.255.255 host 198.51.100.11 eq domain\n40 deny ip any any log",
    options: [
      "ip access-list extended Services\n permit tcp 10.0.0.0 0.255.255.255 host 198.51.100.11 eq domain",
      "no ip access-list extended Services\nip access-list extended Services\n 30 permit tcp 10.0.0.0 0.255.255.255 host 198.51.100.11 eq domain",
      "no ip access-list extended Services\nip access-list extended Services\n permit udp 10.0.0.0 0.255.255.255 any eq 53\n permit tcp 10.0.0.0 0.255.255.255 host 198.51.100.11 eq domain\n deny ip any any log",
      "ip access-list extended Services\n 35 permit tcp 10.0.0.0 0.255.255.255 host 198.51.100.11 eq domain",
    ],
  }],
  [500, {
    prompt: "Which configuration allows routers R14 and R86 to form an OSPFv2 adjacency and elect a central point for exchanging OSPF information?",
    options: [
      "R14#\ninterface FastEthernet0/0\n ip address 10.73.65.65 255.255.255.252\n ip ospf network broadcast\n ip ospf priority 0\n ip mtu 1400\nrouter ospf 10\n router-id 10.10.1.14\n network 10.10.1.14 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0\n\nR86#\ninterface Loopback0\n ip address 10.10.1.86 255.255.255.255\ninterface FastEthernet0/0\n ip address 10.73.65.66 255.255.255.252\n ip ospf network broadcast\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.86\n network 10.10.1.86 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0",
      "R14#\ninterface FastEthernet0/0\n ip address 10.73.65.65 255.255.255.252\n ip ospf network broadcast\n ip ospf priority 255\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.14\n network 10.10.1.14 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0\n\nR86#\ninterface Loopback0\n ip address 10.10.1.86 255.255.255.255\ninterface FastEthernet0/0\n ip address 10.73.65.66 255.255.255.252\n ip ospf network broadcast\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.86\n network 10.10.1.86 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0",
      "R14#\ninterface Loopback0\n ip ospf 10 area 0\ninterface FastEthernet0/0\n ip address 10.73.65.65 255.255.255.252\n ip ospf network broadcast\n ip ospf 10 area 0\n ip mtu 1500\nrouter ospf 10\n ip ospf priority 255\n router-id 10.10.1.14\n\nR86#\ninterface Loopback0\n ip ospf 10 area 0\ninterface FastEthernet0/0\n ip address 10.73.65.66 255.255.255.252\n ip ospf network broadcast\n ip ospf 10 area 0\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.86",
      "R14#\ninterface FastEthernet0/0\n ip address 10.73.65.65 255.255.255.252\n ip ospf network broadcast\n ip ospf priority 255\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.14\n network 10.10.1.14 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0\n\nR86#\ninterface FastEthernet0/0\n ip address 10.73.65.66 255.255.255.252\n ip ospf network broadcast\n ip mtu 1400\nrouter ospf 10\n router-id 10.10.1.86\n network 10.10.1.86 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0",
    ],
  }],
  [964, {
    prompt: "All interfaces use duplex auto and the OSPF broadcast network type. Which configuration allows routers R14 and R86 to form an OSPFv2 adjacency and elect a central point for exchanging OSPF information?",
    options: [
      "R14#\ninterface FastEthernet0/0\n ip address 10.73.65.65 255.255.255.252\n ip ospf priority 0\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.14\n network 10.10.1.14 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0\n\nR86#\ninterface FastEthernet0/0\n ip address 10.73.65.66 255.255.255.252\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.86\n network 10.10.1.86 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0",
      "R14#\ninterface Loopback0\n ip ospf 10 area 0\ninterface FastEthernet0/0\n ip address 10.73.65.65 255.255.255.252\n ip ospf priority 255\n ip ospf 10 area 0\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.14\n\nR86#\ninterface Loopback0\n ip ospf 10 area 0\ninterface FastEthernet0/0\n ip address 10.73.65.66 255.255.255.252\n ip ospf 10 area 0\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.86",
      "R14#\ninterface FastEthernet0/0\n ip address 10.73.65.65 255.255.255.252\n ip ospf priority 255\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.14\n network 10.10.1.14 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0\n\nR86#\ninterface FastEthernet0/0\n ip address 10.73.65.66 255.255.255.252\n ip mtu 1400\nrouter ospf 10\n router-id 10.10.1.86\n network 10.10.1.86 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0",
      "R14#\ninterface Loopback0\n ip ospf 10 area 0\ninterface FastEthernet0/0\n ip address 10.73.65.65 255.255.255.252\n ip ospf 10 area 0\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.14\n network 10.10.1.14 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0\n\nR86#\ninterface FastEthernet0/0\n ip address 10.73.65.66 255.255.255.252\n ip mtu 1400\nrouter ospf 10\n router-id 10.10.1.86\n network 10.10.1.86 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0",
    ],
  }],
  [486, {
    prompt: [
      "For security reasons, disable neighbor discovery on R5 interface Gi0/1 while permitting it on Gi0/2.",
      "",
      "The configuration must also verify that Gi0/1 has no dynamically learned neighbors and display the IP address of R6 interface Gi0/2.",
      "",
      "Which configuration meets these requirements?",
    ].join("\n"),
    options: [
      "R5(config)#interface Gi0/1\nR5(config-if)#no cdp enable\nR5(config-if)#exit\nR5(config)#lldp run\nR5(config)#no cdp run\nR5#show cdp neighbor detail\nR5#show lldp neighbor",
      "R5(config)#interface Gi0/1\nR5(config-if)#no cdp run\nR5(config-if)#exit\nR5(config)#lldp run\nR5(config)#cdp enable\nR5#show cdp neighbor\nR5#show lldp neighbor",
      "R5(config)#interface Gi0/1\nR5(config-if)#no cdp enable\nR5(config-if)#exit\nR5(config)#no lldp run\nR5(config)#cdp run\nR5#show cdp neighbor detail\nR5#show lldp neighbor",
      "R5(config)#interface Gi0/1\nR5(config-if)#no cdp enable\nR5(config-if)#exit\nR5(config)#no lldp run\nR5(config)#cdp run\nR5#show cdp neighbor\nR5#show lldp neighbor",
    ],
  }],
  [489, {
    prompt: "Refer to the exhibit.\n\nThe access list denies Telnet access from PC-1 to RTR-1 and should allow it from other hosts. PC-2 gets \"% Connection refused by remote host\" when trying to Telnet. Without permitting Telnet from PC-1, what must be done to allow the traffic?",
  }],
  [724, {
    prompt: "A multivendor network is being configured for VoIP. Which configuration enables neighbor discovery on interface GigabitEthernet1/0/1 while keeping it disabled on the other interfaces?",
    explanation: "Option D is the intended choice, but it is incomplete on its own: LLDP must first be enabled globally with “lldp run”. To keep LLDP disabled on the other interfaces, disable LLDP transmit and receive on those interfaces.",
  }],
]);

const LEGACY_QUESTION_NATIVE_EXHIBITS = new Map([
  [452, {
    exhibit: `R3#show ip ospf neighbor
Neighbor ID  Pri  State        Dead Time  Address      Interface
1.1.1.1       1   2WAY/DROTHER 00:00:35   172.16.10.1  GigabitEthernet0/0
2.2.2.2       1   2WAY/DROTHER 00:00:35   172.16.10.2  GigabitEthernet0/0
4.4.4.4       1   FULL/BDR     00:00:35   172.16.10.4  GigabitEthernet0/0
5.5.5.5       1   FULL/DR      00:00:35   172.16.10.5  GigabitEthernet0/0`,
    hideExhibitImage: true,
    hideAfterExhibit: true,
    removeExhibitLeadIn: true,
    exhibitQuality: "source-backed",
  }],
  [624, {
    exhibit: `R1 OSPF neighbor requirements
Permit only R2 as a neighbor.
Set R1 OSPF priority to 0 so R1 cannot participate in DR/BDR election.
Set R1 router-id to 10.1.1.1.
Permit OSPF (protocol 89) from 10.100.1.2 and block other neighbors.`,
    hideExhibitImage: true,
    hideAfterExhibit: true,
    removeExhibitLeadIn: true,
    exhibitQuality: "partial",
  }],
  [840, {
    exhibit: `Site B routing-table evidence
Destination 192.168.0.10 is in 192.168.0.0/24.
The route table does not contain 192.168.0.0/24 or a usable default route.
Traffic from Site B therefore cannot be delivered to Site A.`,
    hideExhibitImage: true,
    hideAfterExhibit: true,
    removeExhibitLeadIn: true,
    exhibitQuality: "source-backed",
  }],
  [870, {
    exhibit: `SW_1 and SW_12 trunk migration
The two companies use separate network vendors and currently use different trunk encapsulations.
Configure both switch sides for 802.1Q trunking and retain all VLANs across the merged link.
SWx(config-if)# switchport mode trunk
SWx(config-if)# switchport trunk encapsulation dot1q`,
    hideExhibitImage: true,
    hideAfterExhibit: true,
    removeExhibitLeadIn: true,
    exhibitQuality: "source-backed",
  }],
  [848, {
    exhibit: `[PARTIAL — original source exhibit unavailable.]
PC1 LAN: 172.16.5.0/24
R1-to-R2 transit: 192.168.2.0/24
Destination LAN: 10.10.10.0/24
Available corrected routes in the choices:
10.10.10.0/24 via 192.168.2.3
10.10.10.0/29 via 192.168.2.2
The original link layout and exact split cannot be verified.`,
    hideExhibitImage: true,
    hideAfterExhibit: true,
    removeExhibitLeadIn: true,
    exhibitQuality: "partial",
  }],
  [856, {
    exhibit: `[PARTIAL — original source exhibit unavailable.]
All four MDF-DC switches share the same VLAN and default STP priority.
The lowest MAC address determines the root among equal-priority switches.
Keyed switch: MDF-DC-3
MAC from the choices: 08:0E:18:1A:3C:9D`,
    hideExhibitImage: true,
    hideAfterExhibit: true,
    removeExhibitLeadIn: true,
    exhibitQuality: "partial",
  }],
  [876, {
    exhibit: `[PARTIAL — source and answer labels differ.]
Available after-exhibit LAN: 172.25.0.0/24
Keyed route: 172.25.25.0/24 via 192.168.2.2
The original branch-office network and link address cannot be reconciled, so no additional topology is inferred.`,
    hideExhibitImage: true,
    hideAfterExhibit: true,
    removeExhibitLeadIn: true,
    exhibitQuality: "partial",
  }],
  [884, {
    exhibit: `[PARTIAL — source and answer labels differ.]
Available after-exhibit DHCP server: 192.168.202.30
Keyed helper address: 192.168.20.2
The server address and keyed choice cannot be reconciled, so no address is guessed.`,
    hideExhibitImage: true,
    hideAfterExhibit: true,
    removeExhibitLeadIn: true,
    exhibitQuality: "partial",
  }],
  [747, {
    exhibit: `R1#show ip ospf interface g0/0/0
GigabitEthernet0/0/0 is up, line protocol is up
Internet address is 192.168.1.2/24, Area 0
Process ID 1, Router ID 192.168.1.2, Network Type POINT-TO-POINT, Cost: 1
Hello 15, Dead 20, Retransmit 5

R2#show ip ospf interface g0/0/0
GigabitEthernet0/0/0 is up, line protocol is up
Internet address is 192.168.1.1/24, Area 0
Process ID 1, Router ID 10.1.1.1, Network Type POINT-TO-POINT, Cost: 1
Hello 10, Dead 40, Retransmit 5`,
    hideExhibitImage: true,
    hideAfterExhibit: true,
    removeExhibitLeadIn: true,
    exhibitQuality: "source-backed",
  }],
  [809, {
    hideExhibitImage: true,
    hideAfterExhibit: true,
    removeExhibitLeadIn: true,
    exhibitQuality: "partial",
  }],
  [1148, {
    hideExhibitImage: true,
    hideAfterExhibit: true,
    removeExhibitLeadIn: true,
    exhibitQuality: "partial",
  }],
  [1226, {
    exhibit: `Wireless LAN adapter Wi-Fi:

Connection-specific DNS Suffix        . :

Description . . . . . . . . . . . : Intel(R) Wi-Fi 6 AX201 160MHz

Physical Address. . . . . . . . . : AC-63-DA-AC-B4-AD

DHCP Enabled. . . . . . . . . . . : No
Autoconfiguration Enabled . . . . : Yes

IPv6 Address. . . . . . . . . . . : ::70D6:5432:6D8A:90B2(Preferred)
Temporary IPv6 Address. . . . . . : ::dc3f:a66c:f996:bdb9(Preferred)
Link-local IPv6 Address . . . . . : fe80::7096:5693:6d8a:90ba%8(Preferred)

IPv4 Address. . . . . . . . . . . : 172.16.1.8(Preferred)
Subnet Mask. . . . . . . . . . . . : 255.255.255.240
Default Gateway . . . . . . . . . : 172.16.1.1

DHCPv6 IAID. . . . . . . . . . . . : 116155351
DHCPv6 Client DUID. . . . . . . . : 00-01-00-01-2B-BE-0A-47-3C-15-AB-80-12-F6

DNS Servers . . . . . . . . . . . : 172.16.1.3
                                      172.16.1.4
NetBIOS over Tcpip. . . . . : Enabled`,
    hideExhibitImage: true,
    hideAfterExhibit: true,
    removeExhibitLeadIn: true,
    exhibitQuality: "source-backed",
  }],
  [340, { diagram: "candidate-vlan-roles-24", hideExhibitImage: true }],
  [355, { diagram: "switch-config-two-column-39", hideExhibitImage: true }],
  [663, { hideExhibitImage: true }],
  [662, {
    diagram: "four-router-host-route",
    exhibit: `R1#show ip route
Gateway of last resort is 10.10.10.2 to network 0.0.0.0

S* 0.0.0.0/0 [1/0] via 10.10.10.2
O 10.10.13.0/25 [110/2] via 10.10.10.2
S 10.10.13.0/25 [108/0] via 10.10.10.10`,
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "illustrative",
  }],
  [674, {
    diagram: "r1-r2-r3-static-route",
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "illustrative",
  }],
  [689, {
    diagram: "two-site-serial-file-server",
    hideExhibitImage: true,
    hideAfterExhibit: true,
  }],
  [721, {
    diagram: "r1-floating-default-routes-legacy-721",
    exhibit: `R1(config)#ip route 0.0.0.0 0.0.0.0 172.16.20.2
R1(config)#ip route 0.0.0.0 0.0.0.0 10.0.0.2 20`,
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "source-backed",
  }],
  [723, {
    diagram: "nat-router-lans-internet-legacy-723",
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "source-backed",
  }],
  [724, {
    diagram: "switch-voice-vlan-phone-review-724",
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "illustrative",
  }],
  [732, {
    diagram: "candidate-wlc-414",
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "source-backed",
  }],
  [736, {
    hideAfterExhibit: true,
    exhibitQuality: "source-backed",
  }],
  [754, {
    diagram: "three-router-specific-host-route-review-754",
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "partial",
  }],
  [760, {
    diagram: "internet-router-pc-ipconfig-review-760",
    exhibit: `Ethernet adapter Ethernet:
IPv4 Address: 10.2.2.2
Subnet Mask: 255.255.255.192
Default Gateway: 10.2.2.1
DNS Servers: 8.8.8.8`,
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "partial",
  }],
  [770, {
    diagram: "etherchannel-min-links-review-770",
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "partial",
  }],
  [778, {
    exhibit: `NewSW(config)#interface f0/0
NewSW(config-if)#switchport mode trunk
NewSW(config-if)#switchport trunk allowed vlan 2,10
NewSW(config-if)#switchport trunk native vlan 2`,
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "partial",
  }],
  [794, {
    diagram: "candidate-wlc-794-max-clients-review",
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "partial",
  }],
  [797, {
    diagram: "cpe-dual-isp-review-797",
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "partial",
  }],
  [802, {
    diagram: "r2-eui64-review-802",
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "partial",
  }],
  [804, {
    diagram: "lacp-passive-channel-review-804",
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "partial",
  }],
  [824, {
    diagram: "r14-r86-eigrp-floating-route-review-824",
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "partial",
  }],
  [829, {
    diagram: "ipv6-dhcpv6-lan",
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "source-backed",
  }],
  [830, {
    hideExhibitImage: true,
    hideAfterExhibit: true,
    removeExhibitLeadIn: true,
    exhibitQuality: "source-backed",
  }],
  [835, {
    diagram: "r86-static-route-to-r14-17216-34",
    hideExhibitImage: true,
    hideAfterExhibit: true,
    exhibitQuality: "source-backed",
  }],
  [382, { diagram: "voice-data-vlan300-400", hideExhibitImage: true }],
  [84, { diagram: "redundant-switch-network", hideExhibitImage: true }],
  [130, { diagram: "ospf-four-router-broadcast", hideExhibitImage: true }],
  [157, { diagram: "vlan-switch-web-server", hideExhibitImage: true }],
  [160, { diagram: "r1-ssh-acl-pc1", hideExhibitImage: true }],
  [162, { diagram: "r1-r2-database-security", hideExhibitImage: true }],
  [174, { diagram: "site-to-site-vpn-main-remote-campuses", hideExhibitImage: true }],
  [215, { hideExhibitImage: true }],
  [341, { diagram: "pat-vlan-subnetting-100-200", hideExhibitImage: true }],
  [345, { diagram: "standard-acl-subnet-a-b-gi02", hideExhibitImage: true }],
  [354, { diagram: "r1-r2-ntp-link", hideExhibitImage: true }],
  [120, { exhibit: CCNA_RECREATED_TEXT_EXHIBITS.routerInterfaceBrief, hideExhibitImage: true }],
  [45, {
    hideExhibitImage: true,
    displayAlongsideAfterExhibit: true,
    exhibit: `S1#show interface trunk
Port          Mode  Encapsulation  Status    Native vlan
Fa0/1         on    802.1q         trunking  1

Port          Vlans allowed on trunk
Fa0/1         1-1005

Port          Vlans allowed and active in management domain
Fa0/1         1,2

-------------------------------------------------------------------------------
S2#show interface trunk
Port          Mode  Encapsulation  Status    Native vlan
Fa0/1         on    802.1q         trunking  2

Port          Vlans allowed on trunk
Fa0/1         1-4094

Port          Vlans allowed and active in management domain
Fa0/1         1,12`,
  }],
  [217, "wlc-my-wlan-layer2"],
  [227, "wlc-psk-layer2"],
  [1301, "wlc-security-tab-legacy"],
  [759, { diagram: "routing-protocols-prefix", hideExhibitImage: true }],
  [266, {
    hideExhibitImage: true,
    exhibit: CCNA_RECREATED_TEXT_EXHIBITS.routingTableComponents,
  }],
  [278, { hideExhibitImage: true, exhibit: CCNA_RECREATED_TEXT_EXHIBITS.wirelessIpConfig }],
  [267, { hideExhibitImage: true }],
  [498, { hideExhibitImage: true }],
  [617, { hideExhibitImage: true, removeExhibitLeadIn: true }],
  [282, {
    hideExhibitImage: true,
    exhibit: CCNA_RECREATED_TEXT_EXHIBITS.patOverload,
  }],
  [700, { hideExhibitImage: true }],
  [926, { hideExhibitImage: true }],
]);

function parseOfflineAnswerTable(question) {
  if (!Array.isArray(question.options) || question.options.length < 2) return null;
  const hasPlaceholderOptions = question.options.every((option, index) =>
    option === `Option ${String.fromCharCode(65 + index)}`,
  );
  if (!hasPlaceholderOptions) return null;

  const parsed = parseFormattedOptions(question.prompt, { offline: true });
  if (!parsed) return null;

  const options = question.options.map((_, index) => parsed.options[String.fromCharCode(65 + index)]);
  if (options.some((option) => typeof option !== "string" || !option.trim())) return null;
  return { prompt: parsed.prompt, options };
}

const OFFLINE_LEGACY_QUESTION_CANDIDATES = CCNA_LEGACY_QUESTIONS
  .map((question) => {
    const isConnectDotsQuestion = question.legacyIndex === CONNECT_DOTS_LEGACY_QUESTION_INDEX;
    const offlineOverride = OFFLINE_LEGACY_QUESTION_OVERRIDES.get(question.legacyIndex);
    const parsedAnswerTable = offlineOverride ? null : parseOfflineAnswerTable(question);
    const numberedExhibitVariants =
      NUMBERED_QUESTION_EXHIBIT_VARIANTS.get(OFFLINE_LEGACY_QUESTION_IMAGE_IDS.get(question.legacyIndex)) ?? [];
    const numberedExhibit = /\bexhibit\b/i.test(question.prompt)
      ? numberedExhibitVariants.find(({ corrected }) => corrected)?.image ?? numberedExhibitVariants[0]?.image
      : undefined;
    const legacyIndexedExhibit = /\bexhibit\b/i.test(question.prompt)
      ? getCcnaExhibitImageByLegacyIndex(question.legacyIndex)
      : undefined;
    const offlineSourceExhibitImages = numberedExhibitVariants.map(({ image }) => image);
    const nativeExhibit = LEGACY_QUESTION_NATIVE_EXHIBITS.get(question.legacyIndex);
    const promptNativeExhibit = applyNativeExhibit(question);
    const afterExhibit = (nativeExhibit?.hideAfterExhibit || promptNativeExhibit.hideAfterExhibit)
      ? undefined
      : AFTER_EXHIBITS_BY_LEGACY_INDEX.get(question.legacyIndex);
    const exhibitDiagram = (typeof nativeExhibit === "string" ? nativeExhibit : nativeExhibit?.diagram) ??
      promptNativeExhibit.exhibitDiagram;
    const hideExhibitImage = nativeExhibit?.hideExhibitImage || promptNativeExhibit.hideExhibitImage;
    const exhibitImage = hideExhibitImage || exhibitDiagram
      ? undefined
      : numberedExhibit ||
        promptNativeExhibit.exhibitImage ||
        legacyIndexedExhibit;
    const exhibit = nativeExhibit?.exhibit || (promptNativeExhibit.nativeExhibitText ? promptNativeExhibit.exhibit : undefined);
    const nativePrompt = promptNativeExhibit.prompt;
    const nativeSourceExhibitImages = Array.isArray(promptNativeExhibit.offlineSourceExhibitImages)
      ? promptNativeExhibit.offlineSourceExhibitImages
      : [];
    const allOfflineSourceExhibitImages = [...new Set([...offlineSourceExhibitImages, ...nativeSourceExhibitImages])];
    const removeExhibitLeadIn = nativeExhibit?.removeExhibitLeadIn ||
      (typeof nativePrompt === "string" && nativePrompt !== question.prompt);
    const promptWithoutExhibitLeadIn = typeof offlineOverride?.prompt === "string"
      ? offlineOverride.prompt.replace(/^\s*Refer to (?:the )?exhibit\.?\s*/i, "")
      : typeof nativePrompt === "string" && nativePrompt !== question.prompt
        ? nativePrompt
        : question.prompt.replace(/^\s*Refer to (?:the )?exhibit\.?\s*/i, "");

    return {
      ...question,
      ...(!question.exhibit && !offlineOverride && !parsedAnswerTable ? splitPromptExhibit(question.prompt) : {}),
      ...parsedAnswerTable,
      ...offlineOverride,
      ...(removeExhibitLeadIn
        ? { prompt: promptWithoutExhibitLeadIn }
        : {}),
      ...(allOfflineSourceExhibitImages.length
        ? { offlineSourceExhibitImages: allOfflineSourceExhibitImages }
        : {}),
      ...(isConnectDotsQuestion
        ? { prompt: "Connect each Wi-Fi term on the left to its matching description on the right." }
        : {}),
      ...(exhibitImage ? { exhibitImage } : {}),
      ...(hideExhibitImage ? { hideExhibitImage: true } : {}),
      ...(exhibitDiagram ? { exhibitDiagram } : {}),
      ...(nativeExhibit?.exhibitQuality || promptNativeExhibit.exhibitQuality
        ? { exhibitQuality: nativeExhibit?.exhibitQuality ?? promptNativeExhibit.exhibitQuality }
        : {}),
      ...(exhibit ? { exhibit } : {}),
      ...(afterExhibit
        ? {
            afterExhibit: {
              title: afterExhibit.after_exhibit_title,
              text: afterExhibit.after_exhibit_text,
              comparisonNo: afterExhibit.comparison_no,
              imageUrl: afterExhibit.hide_after_exhibit_image
                ? null
                : getBundledCcnaAfterExhibitImage(afterExhibit.question_id),
              questionId: afterExhibit.question_id,
            },
            exhibit: nativeExhibit?.displayAlongsideAfterExhibit ? exhibit : undefined,
            exhibitImage: undefined,
            hideExhibitImage: true,
          }
        : {}),
      ...(question.type === "match" &&
      question.items?.length === question.choices?.length &&
      question.answer?.length === question.items.length &&
      new Set(question.answer).size === question.answer.length
        ? {
            type: isConnectDotsQuestion
              ? "match"
              : /\bdrag\b/i.test(question.prompt)
                ? "drag_drop"
                : "click_boxes",
          }
        : {}),
      ...(promptNativeExhibit.type === "drag_drop" ? { type: "drag_drop" } : {}),
      ...(promptNativeExhibit.dragDropMode ? { dragDropMode: promptNativeExhibit.dragDropMode } : {}),
      ...(promptNativeExhibit.type === "drag_drop" ? { type: "drag_drop" } : {}),
      id: question.legacyIndex,
      bankId: question.legacyIndex,
      offlineLegacy: true,
      source: "legacy-ccna-200-301",
      moduleNumber: null,
      moduleTitle: "Legacy CCNA 200-301",
      explanation: offlineOverride?.explanation || question.explanation?.trim() || findCcnaQuestionExplanation(question.prompt),
    };
  });

const OFFLINE_LEGACY_QUESTIONS = OFFLINE_LEGACY_QUESTION_CANDIDATES
  .filter((question) =>
    isValidQuestion(question) &&
    (!/\bexhibit\b/i.test(question.prompt) ||
      question.exhibit ||
      question.exhibitImage ||
      question.exhibitDiagram ||
      question.afterExhibit ||
      question.hideExhibitImage),
  );

export function getOfflineLegacyQuestionBank() {
  return OFFLINE_LEGACY_QUESTIONS.map((question) => ({ ...question }));
}

export function getOfflineReferExhibitQuestionBank() {
  return OFFLINE_LEGACY_QUESTION_CANDIDATES
    .filter((question) =>
      OFFLINE_REFER_EXHIBIT_QUESTION_IDS.has(question.legacyIndex) &&
      question.type !== "drag_drop" &&
      question.type !== "match" &&
      isValidQuestion(question),
    )
    .map((question) => {
      const withImageOverrides = {
        ...question,
        ...OFFLINE_REFER_EXHIBIT_IMAGE_OVERRIDES.get(question.legacyIndex),
      };
      const questionOverride = OFFLINE_REFER_EXHIBIT_QUESTION_OVERRIDES.get(question.legacyIndex);
      if (!questionOverride) return withImageOverrides;

      return {
        ...withImageOverrides,
        ...(Number.isInteger(questionOverride.optionIndex) ? {
          options: withImageOverrides.options.map((option, index) =>
            index === questionOverride.optionIndex ? questionOverride.option : option,
          ),
        } : {}),
        ...(Number.isInteger(questionOverride.answer) ? { answer: questionOverride.answer } : {}),
        ...(questionOverride.explanation ? { explanation: questionOverride.explanation } : {}),
      };
    });
}

export function createOfflineLegacyExamQuestions(count) {
  if (!Number.isInteger(count) || count < 1 || count > OFFLINE_LEGACY_QUESTIONS.length) {
    throw new RangeError(`The offline legacy question bank cannot provide ${count} questions.`);
  }

  const questions = getOfflineLegacyQuestionBank();
  const blockCount = Math.ceil(count / 50);
  const dragDropCount = Math.min(blockCount * 3, count - 1, questions.filter((question) => question.type === "drag_drop").length);
  const clickBoxesCount = Math.min(blockCount, count - dragDropCount, questions.filter((question) => question.type === "click_boxes").length);
  const connectDotsCount = Math.min(
    blockCount,
    count - dragDropCount - clickBoxesCount,
    questions.filter((question) => question.type === "match").length,
  );
  const imageExhibitCount = Math.min(
    blockCount,
    count - dragDropCount - clickBoxesCount - connectDotsCount,
    questions.filter((question) => question.exhibitImage).length,
  );
  const shuffle = (items) => {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }
    return shuffled;
  };
  const dragDropQuestions = shuffle(questions.filter((question) => question.type === "drag_drop"))
    .slice(0, dragDropCount);
  const clickBoxesQuestions = shuffle(questions.filter((question) => question.type === "click_boxes"))
    .slice(0, clickBoxesCount);
  const connectDotsQuestions = shuffle(questions.filter((question) => question.type === "match"))
    .slice(0, connectDotsCount);
  const imageExhibitQuestions = shuffle(questions.filter((question) => question.exhibitImage))
    .slice(0, imageExhibitCount);
  const selectedIds = new Set([...dragDropQuestions, ...clickBoxesQuestions, ...connectDotsQuestions, ...imageExhibitQuestions].map((question) => question.id));
  const remainingQuestions = shuffle(questions.filter((question) => !selectedIds.has(question.id)))
    .slice(0, count - selectedIds.size);

  return shuffle([...dragDropQuestions, ...clickBoxesQuestions, ...connectDotsQuestions, ...imageExhibitQuestions, ...remainingQuestions])
    .map((question) => shuffleMatchingChoices(question, shuffle));
}
