import { Session } from "@/app/db/model/Session";
import { useState } from "react";
import { IconButton } from "react-native-paper";
import EditSessionModal from "./editSessionModal";

type Props = {
    session: Session;
}

export default function EditSessionButton({session}: Props) {
    
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    
    return (
        <>
            <EditSessionModal session={session} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <IconButton onPress={() => {setModalVisible(true)}} size={20} icon='pencil-outline'/>
        </>
    )
}