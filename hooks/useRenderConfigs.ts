import { getRenderConfigs, setRenderConfigs } from "@/firebaseConfig";
import { useLayoutEffect, useState } from "react";

export interface DefaultConfigs {
  enabled: boolean;
  color: string;
  hasVerticalRotation: boolean;
  hasHorizontalRotation: boolean;
}

type ConfigTypes = {
  box: DefaultConfigs;
  cone: DefaultConfigs;
  dodecahedron: DefaultConfigs;
};

export const useRenderConfigs = () => {
  const [configs, setConfigs] = useState<ConfigTypes>({
    box: {
      enabled: true,
      color: "red",
      hasVerticalRotation: true,
      hasHorizontalRotation: true,
    },
    cone: {
      enabled: true,
      color: "yellow",
      hasVerticalRotation: true,
      hasHorizontalRotation: true,
    },
    dodecahedron: {
      enabled: true,
      color: "lightGreen",
      hasVerticalRotation: true,
      hasHorizontalRotation: true,
    },
  });

  useLayoutEffect(() => {
    const loadData = async () => {
      const firebaseConfigs = await getRenderConfigs();
      if (firebaseConfigs?.hasChild("data")) {
        setConfigs(firebaseConfigs.val().data);
      }
    };
    loadData();
  }, []);

  const updateConfigs = (
    type: keyof typeof configs,
    newConfigs: Partial<DefaultConfigs>
  ) => {
    setConfigs((current) => {
      const remapedConfigs = {
        ...current,
        [type]: { ...current[type], ...newConfigs },
      };
      setRenderConfigs(remapedConfigs);
      return remapedConfigs;
    });
  };

  return {
    configs,
    updateConfigs,
  };
};
