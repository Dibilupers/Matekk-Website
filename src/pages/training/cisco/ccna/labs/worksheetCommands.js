import { execute } from "./labEngine";

export function applyWorksheetCommands(lab, groups, answers, startingState) {
	let state = startingState;
	const failedSlots = [];
	let slotNumber = 0;

	for (const group of groups) {
		for (const slot of group.slots) {
			slotNumber += 1;
			const command = answers[slotNumber - 1]?.trim() ?? "";
			if (!command) {
				failedSlots.push(slotNumber);
				continue;
			}

			for (const device of slot.devices) {
				const preparedState = structuredClone(state);
				preparedState.consoles[device].mode = slot.context;
				preparedState.consoles[device].iface = slot.iface ?? null;
				preparedState.consoles[device].vlan = slot.vlan ?? null;
				const result = execute(lab, preparedState, device, command);
				state = result.state;
				if (result.out.some((line) => /% Invalid input|% Incomplete command/.test(line))) {
					failedSlots.push(slotNumber);
				}
			}
		}
	}

	return { state, failedSlots: [...new Set(failedSlots)] };
}
