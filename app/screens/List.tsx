import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const List = ({ navigation }: any) => {
  const [todos, setTodos] = useState<any[]>([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
          const todos: any[] = [];
          snapshot.docs.forEach(doc => {
            todos.push({
              id: doc.id,
              ...doc.data()
            })
          })
      },
    })
  }, []);

  const addTodo = async () => {
    const doc = await addDoc(collection(FIRESTORE_DB, "todos"), {
      title: todo,
      done: false,
    });
    
    setTodo('');
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
        <Button onPress={addTodo} title="Add Todo" disabled={todo === ""} />
      </View>
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
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white'
  },
});
