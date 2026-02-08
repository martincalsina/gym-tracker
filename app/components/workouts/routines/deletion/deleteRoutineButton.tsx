import { Routine } from "@/app/db/model/Routine";
import { useState } from "react";
import { IconButton } from "react-native-paper";
import DeleteRoutineModal from "./deleteRoutineModal";

type Props = {
    routine: Routine;
}
export default function DeleteRoutineButton({routine}: Props) {

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <>
            <DeleteRoutineModal routine={routine} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <IconButton icon="trash-can-outline" onPress={() => setModalVisible(true)}/>
        </>
    )

}