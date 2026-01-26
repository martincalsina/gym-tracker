import { Session } from "@/app/db/model/Session";
import { useState } from "react";
import { IconButton } from "react-native-paper";
import DeleteSessionModal from "./deleteSessionModal";

type Props = {
    session: Session;
    loadSessions: () => void;
}

export default function deleteSessionSection({session, loadSessions}: Props) {

    const [deleteSessionModalVisible, setDeleteSessionModalVisible] = useState<boolean>(false);
    


    return (
        <>  
            <DeleteSessionModal session={session} 
            loadSessions={loadSessions}
            deleteSessionModalVisible={deleteSessionModalVisible} setDeleteSessionModalVisible={setDeleteSessionModalVisible}/>
            <IconButton onPress={() => {setDeleteSessionModalVisible(true)}} size={20} icon='trash-can-outline'/>    
        </>
    )

}