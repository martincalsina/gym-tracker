import { Exercise } from "@/app/db/model/Exercise";
import { useState } from "react";
import { IconButton } from "react-native-paper";
import EditExerciseModal from "./editExerciseModal";

type Props = {
    exercise: Exercise;
}

export default function EditExerciseButton({exercise}: Props) {

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <>
            <EditExerciseModal exercise={exercise} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <IconButton onPress={() => {setModalVisible(true)}} size={20} icon='pencil-outline'/>
        </>
    )

}