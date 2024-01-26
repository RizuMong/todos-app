import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const signUp = async () => {
    const after = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Create User", after);
  };

  const signIn = async () => {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log("User Login", user);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        textContentType="password"
        onChangeText={(text: string) => setPassword(text)}
        value={password}
      />
      <View style={styles.button}>
        <Button onPress={signUp} title="Sign Up" />
      </View>
      <Button onPress={signIn} title="Sign In" />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 14,
  },

  form: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 4,
    backgroundColor: "white",
  },

  button: {
    marginVertical: 4,
    borderRadius: 5,
  },
});
