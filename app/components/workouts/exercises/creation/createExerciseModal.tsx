import { createExercise, CreateExerciseData } from '@/app/db/model/Exercise';
import ExerciseFormModal from '../shared/ExerciseFormModal';

type Props = {
    modalVisible: boolean;
    setModalVisible: ((arg: boolean) => void);
}

export default function CreateExerciseModal({modalVisible, setModalVisible}: Props) {

  async function onSave(name: string, description: string, cover: string) {

    const createdExercise: CreateExerciseData = {
      name: name,
      description: description,
      cover: cover
    }

    await createExercise(createdExercise);

  }

  return (
    <ExerciseFormModal 
      title={"Create Exercise"}
      onSave={onSave}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  )

}