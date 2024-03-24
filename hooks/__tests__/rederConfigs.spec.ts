import { renderHook, act } from "@testing-library/react-hooks";
import { useRenderConfigs } from "../useRenderConfigs"; // Substitua 'NomeDoArquivo' pelo nome do arquivo onde o hook está definido
import * as firebaseConfig from "@/firebaseConfig";

jest.mock("@/firebaseConfig", () => ({
  getRenderConfigs: jest.fn(),
  setRenderConfigs: jest.fn(),
}));

describe("useRenderConfigs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve carregar configurações padrão corretamente", async () => {
    (firebaseConfig.getRenderConfigs as any).mockResolvedValueOnce({
      data: {
        box: {
          enabled: true,
          color: "blue",
          hasVerticalRotation: false,
          hasHorizontalRotation: true,
        },
      },
      hasChild: jest.fn(),
    });

    const { result, waitForNextUpdate } = renderHook(() => useRenderConfigs());

    expect(firebaseConfig.getRenderConfigs).toHaveBeenCalled();

    expect(result.current.configs.box.enabled).toBe(true);
    expect(result.current.configs.box.color).toBe("red");
    expect(result.current.configs.box.hasVerticalRotation).toBe(true);
    expect(result.current.configs.box.hasHorizontalRotation).toBe(true);
  });

  test("deve atualizar configurações corretamente", () => {
    const { result } = renderHook(() => useRenderConfigs());

    act(() => {
      result.current.updateConfigs("box", { color: "blue" });
    });

    expect(result.current.configs.box.color).toBe("blue");
    expect(firebaseConfig.setRenderConfigs).toHaveBeenCalledWith(
      result.current.configs
    );
  });
});
