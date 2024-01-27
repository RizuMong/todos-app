import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error: any) {
      alert("Gagal Login " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTodo}>Login & Register Todo</Text>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <TextInput
          value={password}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        ></TextInput>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Pressable style={styles.button} onPress={signIn}>
              <Text style={styles.textLogin}>Login</Text>
            </Pressable>
            <Pressable onPress={signUp}>
              <Text style={styles.textRegister}>Create New Account</Text>
            </Pressable>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },

  input: {
    height: 48,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
  },

  headerTodo: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 24,
    fontFamily: 'Montserrat-Bold',
    // fontWeight: "bold",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "black",
    marginVertical: 4,
  },

  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    fontFamily: 'Montserrat'
  },

  textRegister: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700",
    letterSpacing: 0.25,
    color: "gray",
    textAlign: "center",
    marginTop: 8,
    fontFamily: 'Montserrat'
  },

  textLogin: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
    letterSpacing: 0.25,
    color: "white",
    fontFamily: 'Montserrat'
  },
}); 
