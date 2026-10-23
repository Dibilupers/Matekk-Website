import { useAuth } from "../../../../../context/auth-context";
import FortiOSOfflineExam from "./offline/FortiOSOfflineExam";

export default function FortiOSExamRoute({ onlineExam }) {
	const { isOnline } = useAuth();
	return isOnline ? onlineExam : <FortiOSOfflineExam />;
}
