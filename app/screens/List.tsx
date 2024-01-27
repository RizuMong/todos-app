import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo, Feather } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        console.log("UPDATE");

        const todos: Todo[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo);
        });

        setTodos(todos);
      },
    });

    return () => subscriber();
  }, []);

  const addTodo = async () => {
    const doc = await addDoc(collection(FIRESTORE_DB, "todos"), {
      title: todo,
      done: false,
    });

    setTodo("");
  };

  const renderTodo = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `todos/${item.id}`);

    const toggleDone = async () => {
      updateDoc(ref, { done: !item.done });
    };

    const deleteItem = async () => {
      deleteDoc(ref);
    };

    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {item.done && <Ionicons name="checkbox" size={24} color="green" />}
          {!item.done && <Entypo name="circle" size={24} color="gray" />}
          <Text style={styles.todoText}>{item.title}</Text>
        </TouchableOpacity>
        <Feather name="trash-2" size={24} color="red" onPress={deleteItem} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Add New Todo"
          onChangeText={(text: string) => setTodo(text)}
          value={todo}
        />
        {/* <Button onPress={addTodo} title="Add Todo" disabled={todo === ""} /> */}
        <Pressable
          style={styles.button}
          onPress={addTodo}
          disabled={todo === ""}
        >
          <Text style={styles.textLogin}>Tambah</Text>
        </Pressable>
      </View>

      {todos.length > 0 && (
        <View>
          <FlatList
            data={todos}
            renderItem={(item) => renderTodo(item)}
            keyExtractor={(todo: Todo) => todo.id}
          />
        </View>
      )}

      <Pressable onPress={() => FIREBASE_AUTH.signOut()}>
        <Text style={styles.textRegister}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },

  form: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "white",
  },

  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
  },

  todoText: {
    flex: 1,
    paddingHorizontal: 4,
  },

  todo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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

  textRegister: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
    letterSpacing: 0.25,
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Montserrat",
  },

  textLogin: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.25,
    color: "white",
    fontFamily: "Montserrat",
  },
});
