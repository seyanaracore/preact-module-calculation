import ScreenService from "@/services/screenService";
import { ModuleItem } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  moduleId: string;
  setModuleId: (module: string) => void;
};

const ModuleSelect = ({ moduleId, setModuleId }: Props) => {
  const [modulesList, setModulesList] = useState<
    Pick<ModuleItem, "name" | "id">[]
  >([]);

  const initModulesList = async () => {
    const res = await ScreenService.getModulesList();

    setModulesList(res);
  };

  const onChangeModuleId = (e: ChangeEvent<HTMLSelectElement>) => {
    setModuleId((e.target as HTMLSelectElement).value);
  };

  useEffect(() => {
    initModulesList();
  }, []);

  return (
    <select onChange={onChangeModuleId} value={moduleId}>
      {!modulesList.length ? <option selected>Загрузка</option> : null}

      {modulesList.map(({ name, id }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default ModuleSelect;
