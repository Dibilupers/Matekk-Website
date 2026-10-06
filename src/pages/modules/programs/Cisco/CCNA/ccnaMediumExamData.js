// Questions for the CCNA Medium Exam.
// Question formats are described in src/utils/ccnaExamGrading.js (pick one, choose two, matching).
// `exhibit` is optional device output shown in a code box above the choices.

import { CCNA_COMPOSITE_SET_QUESTIONS, CCNA_COMPOSITE_SET2_QUESTIONS } from "./ccnaCompositeSetQuestions";

export const CCNA_MEDIUM_EXAM_QUESTIONS = [
	{
		prompt:
			"Router-WAN1 has a new connection via Gi0/0 to the ISP. Users running the web applications indicate that connectivity is unstable to the internet. What is causing the interface issue?",
		exhibit: `Router-WAN1#show interface g0/0
GigabitEthernet0/0 is up, line protocol is up
  Hardware is CSR NIC, address is 5000.0001.0000 (bia 5000.0001.0000)
  Internet address is 192.168.0.0/31
  MTU 1500 bytes, BW 1000000 Kbit/sec, DLY 10 usec,
    reliability 255/255, txload 1/255, rxload 1/255
  Encapsulation ARPA, loopback not set
  Keepalive set (10 sec)
  Full Duplex, 1000Mbps, link type is auto, media type is NIC
  output flow-control is unsupported, input flow-control is unsupported
  ARP type: ARPA, ARP Timeout 04:00:00
  Last input never, output 00:00:03, output hang never
  Last clearing of 'show interface' counters never
  Input queue: 0/375/0/0 (size/max/drops/flushes); Total output drops: 0
  Queueing strategy: fifo
  Output queue: 0/40 (size /max)
  5 minute input rate 1000 bits/sec, 0 packets/sec
  5 minute output rate 2000 bits/sec, 1 packets/sec
    0 packets input, 0 bytes, 0 no buffer
    Received 110 broadcasts (0 IP multicasts)
    0 runts, 0 giants, 0 throttles
    100 input errors, 100 CRC, 100 frame, 0 overrun, 0 ignored
    0 watchdog, 0 multicast, 0 pause input
    260 packets output, 89070 bytes, 0 underruns
    Output 0 broadcasts (0 IP multicasts)
    0 output errors, 100 collisions, 0 interface resets
    0 unknown protocol drops
    0 babbles, 0 late collision, 0 deferred
    1 lost carrier, 0 no carrier, 0 pause output`,
		options: [
			"The receive buffer is full due to a broadcast storm",
			"Frames are discarded due to a half-duplex negotiation",
			"Small frames less than 64 bytes are rejected due to size",
			"Broadcast packets are rejected because ARP timeout is enabled",
		],
		answer: 1,
		explanation:
			"The router side shows Full Duplex, yet the counters show collisions along with CRC and frame errors. Collisions should never happen on a full-duplex link, so the ISP side has most likely negotiated half duplex. This duplex mismatch corrupts and discards frames, which causes the unstable connection. The other choices do not fit: there are 0 overruns and 0 no-buffer drops (no full buffer), 0 runts (no undersized frames), and the ARP timeout has nothing to do with dropping broadcasts.",
	},
	// 85 questions from the CCNA composite question set
	...CCNA_COMPOSITE_SET_QUESTIONS,
	...CCNA_COMPOSITE_SET2_QUESTIONS,
];
