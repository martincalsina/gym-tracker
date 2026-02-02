import { Session } from "@/app/db/model/Session";
import { useState } from "react";
import { IconButton } from "react-native-paper";
import DeleteSessionModal from "./deleteSessionModal";

type Props = {
    session: Session;
}

export default function DeleteSessionButton({session}: Props) {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    


    return (
        <>  
            <DeleteSessionModal session={session} 
            modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <IconButton onPress={() => {setModalVisible(true)}} size={20} icon='trash-can-outline'/>    
        </>
    )

}