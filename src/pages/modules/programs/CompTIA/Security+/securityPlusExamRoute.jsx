import { useAuth } from "../../../../../context/auth-context";
import SecurityPlusOfflineExam from "./offline/securityPlusOfflineExam";

export default function SecurityPlusExamRoute({ onlineExam }) {
	const { isOnline } = useAuth();
	return isOnline ? onlineExam : <SecurityPlusOfflineExam />;
}
