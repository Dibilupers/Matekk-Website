const textExhibit = (exhibit, exhibitQuality = "source-backed") => ({
  exhibit,
  exhibitQuality,
  hideExhibitImage: true,
});

const diagramExhibit = (diagram, exhibitQuality = "illustrative") => ({
  diagram,
  exhibitQuality,
  hideExhibitImage: true,
});

export const CCNA_RECREATED_CANDIDATE_EXHIBITS = new Map([
  [24, diagramExhibit("candidate-vlan-roles-24", "partial")],
  [29, diagramExhibit("candidate-acl-sources-29", "partial")],
  [66, diagramExhibit("candidate-voice-data-66", "partial")],
  [82, diagramExhibit("candidate-cdp-target-82", "partial")],
  [159, diagramExhibit("candidate-ipv6-wan-159", "partial")],
  [169, textExhibit(`Neighbor discovery task context
R5 Gi0/1: disable neighbor discovery
R5 Gi0/2: permit neighbor discovery
R6 Gi0/2: IP address not present in the live question record`, "partial")],
  [198, diagramExhibit("candidate-etherchannel-198", "partial")],
  [161, diagramExhibit("candidate-wifi-zones", "partial")],
  [260, diagramExhibit("candidate-wlc-260", "partial")],
  [281, diagramExhibit("candidate-wlc-281", "source-backed")],
  [285, diagramExhibit("candidate-wlc-285", "source-backed")],
  [294, diagramExhibit("candidate-wlc-294", "source-backed")],
  [303, textExhibit(`{
  "Routers": ["R1", "R2", "R3"],
  "Switches": ["SW1", "SW2", "SW3"]
}`)],
  [361, diagramExhibit("candidate-wlc-361", "source-backed")],
  [364, textExhibit(`! Illustrative JSON reconstruction; the original payload is unavailable.
{
  "aaaUser": {
    "attributes": { "name": "user1" },
    "children": [
      {
        "aaaUserRole": {
          "attributes": { "name": "operator" },
          "children": [
            {
              "aaaUserRole": {
                "attributes": { "name": "read-only" }
              }
            }
          ]
        }
      }
    ]
  }
}`, "illustrative")],
  [377, diagramExhibit("candidate-wlc-377", "source-backed")],
  [384, diagramExhibit("candidate-wlc-384", "source-backed")],
  [402, textExhibit(`{
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
}`)],
  [414, diagramExhibit("candidate-wlc-414", "source-backed")],
  [451, textExhibit(`! Illustrative one-object JSON; original content is unavailable.
{ "example": "one JSON object" }`, "illustrative")],
  [481, diagramExhibit("candidate-static-route", "illustrative")],
  [518, diagramExhibit("candidate-wlc-518", "source-backed")],
  [570, diagramExhibit("candidate-ospf-destinations", "illustrative")],
  [593, diagramExhibit("candidate-wlc-593", "source-backed")],
  [557, textExhibit(`Router subnet addressing
Router/interface | Connected subnet | Last usable address
Not supplied     | Not supplied     | Not recoverable

The source row states the addressing requirement but omits the subnet values.`, "partial")],
  [633, textExhibit(`R1#show interfaces GigabitEthernet1
GigabitEthernet1 is up, line protocol is up
  Hardware is CSR vNIC, address is 5000.0004.0000 (bia 5000.0004.0000)
  Internet address is 192.168.1.1/24
  MTU 1500 bytes, BW 1000000 Kbit/sec, DLY 10 usec,
  reliability 255/255, txload 1/255, rxload 1/255
  Encapsulation ARPA, loopback not set
  Keepalive set (10 sec)
  Full Duplex, 1000Mbps, link type is auto, media type is RJ45`)],
  [666, diagramExhibit("candidate-wlc-666", "source-backed")],
  [703, diagramExhibit("candidate-pc2-file-server-policy-703", "illustrative")],
  [712, diagramExhibit("candidate-wlc-712", "source-backed")],
  [760, diagramExhibit("candidate-wlc-760", "source-backed")],
  [794, diagramExhibit("candidate-wlc-794", "source-backed")],
  [798, textExhibit(`! Partial reconstruction; host IP and gateway values were not recoverable.
Windows host A network settings
IPv4 address:             not recoverable
Default gateway:          configured correctly
Preferred DNS server:     192.168.1.254
Alternate DNS server:     196.1.38.254
Expected DNS server:      196.1.38.132`, "partial")],
  [810, textExhibit(`{
  "Cisco Devices": [
    {
      "name": "ASA - Security Device",
      "name": "Cisco 1100 ASR Router",
      "name": "Cisco 6800 Switch"
    }
  ]
! The closing brace for the outer object is missing.`, "source-backed")],
  [827, diagramExhibit("candidate-wlc-827", "source-backed")],
  [832, diagramExhibit("candidate-router2-route-sources-832", "illustrative")],
  [836, diagramExhibit("candidate-host-c-gateway", "source-backed")],
  [838, diagramExhibit("candidate-wlc-838", "source-backed")],
  [854, diagramExhibit("candidate-wlc-854", "source-backed")],
  [872, diagramExhibit("candidate-wlc-872", "source-backed")],
  [883, diagramExhibit("candidate-wlc-883", "source-backed")],
  [890, diagramExhibit("candidate-wlc-890", "source-backed")],
  [911, diagramExhibit("candidate-wlc-911", "source-backed")],
  [924, diagramExhibit("candidate-workstation-fqdn-924", "partial")],
  [955, diagramExhibit("candidate-wlc-955", "partial")],
  [992, diagramExhibit("candidate-wlc-992", "source-backed")],
  [1015, diagramExhibit("candidate-wlc-1015", "source-backed")],
  [1096, textExhibit(`SW2#show running-config
vtp domain cisco
vtp mode transparent
vtp password test
interface FastEthernet0/1
 description connection to SW1
 switchport mode trunk
 switchport trunk encapsulation dot1q`)],
  [1197, textExhibit(`R1(config)#access-list 100 deny tcp host 172.16.1.33 any eq 22
R1(config)#access-list 100 permit ip any any
R1(config)#interface GigabitEthernet0/0
R1(config-if)#ip access-group 100 in`)],
  [1254, textExhibit(`%PM-4-ERR_DISABLE: psecure-violation error detected on Fa0/1, putting Fa0/1 in err-disable state
%PORT_SECURITY-2-PSECURE_VIOLATION: Security violation occurred, caused by MAC address 00AA.1AB9.D22F on port FastEthernet0/1
%LINKPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/1, changed state to down
%LINK-3-UPDOWN: Interface FastEthernet0/1, changed state to down`)],
  [1330, textExhibit(`SW1#show running-config
ip arp inspection vlan 2-10
interface FastEthernet0/1
 ip arp inspection trust`, "partial")],
]);
