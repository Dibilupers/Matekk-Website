import subinterfaceR1Sw1Sw2Img from "../../../../../assets/ccna-exam/subinterface-r1-sw1-sw2.webp";
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

const CONNECT_DOTS_LEGACY_QUESTION_INDEX = 654;

// QuestionNumber values from the supplied offline refer-exhibit CSV.
const OFFLINE_REFER_EXHIBIT_QUESTION_IDS = new Set([
  33, 41, 43, 44, 45, 46, 47, 49, 50, 51, 52, 59,
  60, 61, 62, 67, 71, 72, 79, 82, 84, 88, 90, 91,
  92, 93, 96, 97, 99, 100, 101, 103, 104, 106, 109, 110,
  111, 112, 118, 120, 121, 123, 124, 125, 126, 128, 130, 131,
  132, 137, 139, 142, 157, 158, 160, 161, 162, 163, 167, 177,
  181, 189, 192, 193, 201, 203, 215, 264, 266, 278, 282, 290,
  291, 306, 329, 331, 332, 339, 340, 341, 345, 350, 354, 355,
  381, 382, 385, 386, 387, 389, 398, 405, 406, 415, 421, 426,
  436, 452, 453, 460, 474, 476, 478, 486, 489, 491, 494, 495,
  496, 497, 499, 500, 502, 504, 505, 506, 507, 508, 509, 510,
  515, 519, 520, 521, 522, 523, 529, 531, 533, 538, 541, 542,
  545, 548, 551, 554, 558, 559, 560, 562, 563, 564, 566, 568,
  569, 570, 572, 574, 577, 578, 579, 580, 581, 586, 588, 591,
  592, 593, 599, 602, 603, 612, 613, 616, 617, 618, 621, 622,
  624, 627, 628, 629, 635, 641, 645, 646, 651, 655, 656, 657,
  661, 662, 663, 667, 674, 675, 679, 682, 684, 685, 687, 689,
  695, 699, 701, 702, 704, 705, 708, 711, 712, 713, 714, 716,
  717, 719, 720, 721, 723, 724, 729, 730, 732, 736, 738, 747,
  754, 756, 758, 759, 760, 769, 770, 772, 778, 782, 788, 790,
  794, 797, 798, 799, 800, 802, 804, 806, 807, 808, 809, 816,
  817, 824, 829, 830, 834, 835, 836, 837, 838, 839, 840, 844,
  848, 852, 856, 860, 869, 870, 872, 875, 876, 878, 881, 882,
  883, 884, 887, 888, 892, 898, 901, 909, 910, 911, 912, 914,
  920, 929, 932, 934, 935, 940, 949, 962, 963, 964, 968, 982,
  985, 987, 990, 991, 992, 1001, 1007, 1016, 1019, 1023, 1025, 1028,
  1040, 1041, 1044, 1049, 1052, 1056, 1060, 1065, 1067, 1076, 1084, 1085,
  1086, 1087, 1089, 1108, 1110, 1112, 1113, 1114, 1115, 1116, 1123, 1124,
  1126, 1127, 1130, 1138, 1140, 1143, 1145, 1147, 1148, 1149, 1150, 1151,
  1152, 1153, 1154, 1159, 1161, 1167, 1168, 1170, 1180, 1184, 1186, 1187,
  1188, 1190, 1199, 1200, 1206, 1211, 1224, 1225, 1226, 1227, 1228, 1231,
  1232, 1235, 1237, 1238, 1242, 1245, 1258, 1260, 1261, 1262, 1269, 1275,
  1276, 1277, 1278, 1281, 1285, 1288, 1290, 1291, 1292, 1294, 1296, 1300,
  1301, 1303, 1304, 1313, 1319,
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
  [161, 161],
  [192, 192],
  [193, 193],
  [203, 203],
  [345, 345],
  [386, 386],
  [387, 387],
  [405, 405],
  [1001, 1001],
  [1084, 1084],
  [1089, 1089],
  [1108, 1108],
  [1127, 1127],
  [1148, 1148],
  [1149, 1149],
  [1167, 1167],
  [1168, 1168],
  [1199, 1199],
]);

const OFFLINE_LEGACY_QUESTION_OVERRIDES = new Map([
  [266, {
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
  [617, {
    type: "match",
    items: ["DC-1 Gi1/0", "DC-1 Gi1/1", "DC-1 Gi1/2", "HQ-1 Gi1/3"],
    choices: [
      "ip address 192.168.4.13 255.255.255.240",
      "ip address 209.165.202.129 255.255.255.252",
      "ip address 209.165.202.130 255.255.255.252",
      "ip address 209.165.202.131 255.255.255.252",
      "ip address 192.168.3.14 255.255.255.240",
      "ip address 192.168.4.9 255.255.255.248",
      "ip address 192.168.3.14 255.255.255.248",
    ],
    answer: [2, 5, 4, 6],
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
  [724, {
    prompt: "A multivendor network is being configured for VoIP. Which configuration enables neighbor discovery on interface GigabitEthernet1/0/1 while keeping it disabled on the other interfaces?",
    explanation: "Option D is the intended choice, but it is incomplete on its own: LLDP must first be enabled globally with “lldp run”. To keep LLDP disabled on the other interfaces, disable LLDP transmit and receive on those interfaces.",
  }],
]);

const LEGACY_QUESTION_EXHIBITS = new Map([
  [50, subinterfaceR1Sw1Sw2Img],
]);

const LEGACY_QUESTION_NATIVE_EXHIBITS = new Map([
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
    const offlineSourceExhibitImages = numberedExhibitVariants.map(({ image }) => image);
    const nativeExhibit = LEGACY_QUESTION_NATIVE_EXHIBITS.get(question.legacyIndex);
    const afterExhibit = AFTER_EXHIBITS_BY_LEGACY_INDEX.get(question.legacyIndex);
    const promptNativeExhibit = applyNativeExhibit(question);
    const exhibitDiagram = (typeof nativeExhibit === "string" ? nativeExhibit : nativeExhibit?.diagram) ??
      promptNativeExhibit.exhibitDiagram;
    const hideExhibitImage = nativeExhibit?.hideExhibitImage || promptNativeExhibit.hideExhibitImage;
    const exhibitImage = hideExhibitImage || exhibitDiagram
      ? undefined
      : numberedExhibit || promptNativeExhibit.exhibitImage || LEGACY_QUESTION_EXHIBITS.get(question.legacyIndex);
    const exhibit = nativeExhibit?.exhibit || (promptNativeExhibit.nativeExhibitText ? promptNativeExhibit.exhibit : undefined);

    return {
      ...question,
      ...(nativeExhibit?.removeExhibitLeadIn || promptNativeExhibit.removeExhibitLeadIn
        ? { prompt: question.prompt.replace(/^\s*Refer to (?:the )?exhibit\.?\s*/i, "") }
        : {}),
      ...(!question.exhibit && !offlineOverride && !parsedAnswerTable ? splitPromptExhibit(question.prompt) : {}),
      ...parsedAnswerTable,
      ...offlineOverride,
      ...(isConnectDotsQuestion
        ? { prompt: "Connect each Wi-Fi term on the left to its matching description on the right." }
        : {}),
      ...(exhibitImage ? { exhibitImage } : {}),
      ...(offlineSourceExhibitImages.length ? { offlineSourceExhibitImages } : {}),
      ...(hideExhibitImage ? { hideExhibitImage: true } : {}),
      ...(exhibitDiagram ? { exhibitDiagram } : {}),
      ...(exhibit ? { exhibit } : {}),
      ...(afterExhibit
        ? {
            afterExhibit: {
              title: afterExhibit.after_exhibit_title,
              text: afterExhibit.after_exhibit_text,
              comparisonNo: afterExhibit.comparison_no,
              imageUrl: getBundledCcnaAfterExhibitImage(afterExhibit.question_id),
              questionId: afterExhibit.question_id,
            },
            exhibit: undefined,
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
      isValidQuestion(question),
    )
    .map((question) => ({ ...question }));
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

  return shuffle([...dragDropQuestions, ...clickBoxesQuestions, ...connectDotsQuestions, ...imageExhibitQuestions, ...remainingQuestions]);
}
