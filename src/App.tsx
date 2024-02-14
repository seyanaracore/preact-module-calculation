import ModuleSelect from "@/components/ModuleSelect";
import { useEffect, useState } from "react";
import { ModuleItem } from "@/types";
import ScreenService from "@/services/screenService";

const App = () => {
  const [moduleId, setModuleId] = useState("");
  const [moduleInfo, setModuleInfo] = useState<ModuleItem | null>(null);

  const getModuleInfo = async () => {
    const res = await ScreenService.getModuleInfo(moduleId);

    setModuleInfo(res);
  };

  useEffect(() => {
    getModuleInfo();
  }, [moduleId]);

  return (
    <form>
      <ModuleSelect moduleId={moduleId} setModuleId={setModuleId} />
    </form>
  );
};

export default App;
