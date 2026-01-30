import { Exercise } from "@/app/db/model/Exercise";
import { useState } from "react";
import { IconButton } from "react-native-paper";
import DeleteExerciseModal from "./deleteExerciseModal";


type Props = {
    exercise: Exercise;
}

export default function DeleteExerciseButton({exercise}: Props) {

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <>  
            <DeleteExerciseModal exercise={exercise} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <IconButton icon="trash-can-outline" onPress={() => setModalVisible(true)}/>
        </>
    )

}