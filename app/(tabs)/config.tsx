import { ScrollView, StyleSheet, Modal, TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";
import { Switch } from "react-native-paper";
import ColorPicker, {
  HueSlider,
  Panel1,
  Preview,
  Swatches,
} from "reanimated-color-picker";
import { useState } from "react";
import { DefaultConfigs, useRenderConfigs } from "@/hooks/useRenderConfigs";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { router } from "expo-router";

export const SettingsComponent = ({
  title,
  updateConfigs,
  ...configs
}: {
  title: string;
  updateConfigs: (configInputs: Partial<DefaultConfigs>) => void;
} & DefaultConfigs) => {
  const [showModal, setShowModal] = useState(false);
  const [newColor, setNewColor] = useState<string>();

  return (
    <View style={styles.optionContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.opcoes}>
        <Text>Habilitado</Text>
        <Switch
          value={configs.enabled}
          onChange={(event) =>
            updateConfigs({
              enabled: event.nativeEvent.value,
            })
          }
        />
      </View>
      <View style={styles.opcoes}>
        <Text>Rotacão Horizontal</Text>
        <Switch
          value={configs.hasHorizontalRotation}
          onChange={(event) =>
            updateConfigs({
              hasHorizontalRotation: event.nativeEvent.value,
            })
          }
        />
      </View>
      <View style={styles.opcoes}>
        <Text>Rotacão Vertical</Text>
        <Switch
          value={configs.hasVerticalRotation}
          onChange={(event) =>
            updateConfigs({
              hasVerticalRotation: event.nativeEvent.value,
            })
          }
        />
      </View>
      <View style={styles.opcoes}>
        <Text>Cor</Text>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text>Selecionar</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} animationType="slide" transparent>
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,.8)",
          }}
        >
          <ColorPicker
            style={{ width: "70%", backgroundColor: "white" }}
            value={configs.color}
            onComplete={(colors) => {
              setNewColor(colors.rgb);
            }}
          >
            <Preview />
            <Panel1 />
            <HueSlider />
            <Swatches />
          </ColorPicker>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              backgroundColor: "white",
              width: "70%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}
              style={{
                backgroundColor: "white",
                padding: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "black", textTransform: "uppercase" }}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                updateConfigs({
                  color: newColor,
                });
                setShowModal(false);
              }}
              style={{
                backgroundColor: "white",
                padding: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "black", textTransform: "uppercase" }}>
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function Settings() {
  const { configs, updateConfigs } = useRenderConfigs();
  const items = [
    {
      title: "Cubo",
      ...configs.box,
      updateConfigs: (inputValues: Partial<DefaultConfigs>) =>
        updateConfigs("box", inputValues),
    },
    {
      title: "Cone",
      ...configs.cone,
      updateConfigs: (inputValues: Partial<DefaultConfigs>) =>
        updateConfigs("cone", inputValues),
    },
    {
      title: "Dodecaedro",
      ...configs.dodecahedron,
      updateConfigs: (inputValues: Partial<DefaultConfigs>) =>
        updateConfigs("dodecahedron", inputValues),
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView>
        {items.map(({ title, ...rest }, index) => (
          <SettingsComponent title={title} key={index} {...rest} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          padding: 12,
          alignItems: "center",
          borderRadius: 16
        }}
        onPress={async () => {
          await signOut(auth);
          router.navigate("(auth)");
        }}
      >
        <Text style={{ color: "white", textTransform: "uppercase", fontWeight: "bold", fontSize: 16 }}>
          Sair do APP
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 72,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  optionContainer: {
    marginVertical: 18,
  },
  opcoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
