import { editExercise, EditExerciseData, Exercise } from "@/app/db/model/Exercise";
import ExerciseFormModal from "../shared/ExerciseFormModal";


type Props = {
    exercise: Exercise;
    modalVisible: boolean;
    setModalVisible: ((arg: boolean) => void);
}

const DEFAULT_COVER: string = "https://picsum.photos/700";

export default function EditExerciseModal({exercise, modalVisible, setModalVisible}: Props) {

  async function onSave(name: string, description: string, cover: string) {

    const editedExercise: EditExerciseData = {
      id: exercise.id,
      name: name,
      description: description,
      cover: cover
    }

    await editExercise(editedExercise);

  }
  
  return (
    <ExerciseFormModal 
      title={"Edit Exercise"}
      defaultName={exercise.name}
      defaultDescription={exercise.description}
      defaultCover={exercise.cover}
      onSave={onSave}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  )

}