import { Session } from "@/app/db/model/Session";
import { IconButton } from "react-native-paper";
import EditSessionModal from "./editSessionModal";

type Props = {
    session: Session;
}

export default function EditSessionButton({session}: Props) {
    return (
        <>
            <EditSessionModal/>
            <IconButton onPress={() => {}} size={20} icon='pencil-outline'/>
        </>
    )
}