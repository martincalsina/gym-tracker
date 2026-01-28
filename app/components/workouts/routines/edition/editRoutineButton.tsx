import { Routine } from "@/app/db/model/Routine";
import { useState } from "react";
import { IconButton } from "react-native-paper";
import EditRoutineModal from "./editRoutineModal";

type Props = {
    routine: Routine;
}

export default function EditRoutineButton({routine}: Props) {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    

    return (

        <>
            <EditRoutineModal routine={routine} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <IconButton onPress={() => {setModalVisible(true)}} size={20} icon='pencil-outline'/>
        </>

    )

}