import { useAuth } from "../../../../../context/auth-context";
import NetworkPlusOfflineExam from "./offline/networkPlusOfflineExam";

export default function NetworkPlusExamRoute({ onlineExam }) {
	const { isOnline } = useAuth();
	return isOnline ? onlineExam : <NetworkPlusOfflineExam />;
}
