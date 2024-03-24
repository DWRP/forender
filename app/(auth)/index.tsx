import { Title } from "@/components/StyledText";
import { Text, TextInput, View } from "@/components/Themed";
import { auth } from "@/firebaseConfig";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Este não é um email válido!"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});

type AuthForm = z.infer<typeof schema>;

export default function AuthPage() {
  const { handleSubmit, control } = useForm<AuthForm>({
    resolver: zodResolver(schema),
  });

  const login = (data: { email: string; password: string }) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        router.navigate("(tabs)");
      })
      .catch(() => {
        Alert.alert("Error", `Erro ao fazer login!`);
      });
  };

  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      router.navigate("(tabs)");
    }
  });

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Login</Title>

      <Controller
        control={control}
        name="email"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              onChangeText={(text) => onChange(text)}
              onBlur={onBlur}
              value={value}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
            />
            <Text style={styles.error}>{error?.message}</Text>
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              onChangeText={(text) => onChange(text)}
              onBlur={onBlur}
              value={value}
              placeholder="Digite sua senha"
              secureTextEntry
            />
            <Text style={styles.error}>{error?.message}</Text>
          </>
        )}
      />

      <TouchableOpacity onPress={handleSubmit(login)}>
        <Text style={styles.button}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#784bdd",
    color: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
    marginVertical: 16,
  },
  title: {
    marginBottom: 32,
  },
  error: {
    color: "red",
  },
});
