import { createRoutine, CreateRoutineData } from "@/app/db/model/Routine";
import RoutineFormModal from "../shared/routineFormModal";

type Props = {
  modalVisible: boolean;
  setModalVisible: (arg: boolean) => void;
}

export default function CreateRoutineModal({modalVisible, setModalVisible}: Props) {

    async function onSave(name: string, description: string, cover: string) {
 
      let editedRoutine: CreateRoutineData = {
          name: name,
          description: description,
          cover: cover,
        };
        await createRoutine(editedRoutine);
 
    }

    return (
        <RoutineFormModal 
          title={"Create Routine"}
          onSave={onSave}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />        
    )

}