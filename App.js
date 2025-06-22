import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [task, setTask] = useState([]);

  const addTask = () => {
    ///[x,y,z] -> x , y , z + userInput => [x,y,z,userInput]

    // task -> [x,y,z]
    // ...task -> x,y,z
    // [...task,userInput] => [x,y,z,userInput]

    // task -> [{} , {} , {} , {newObject}]

    const newTask = {
      id: Date.now().toString(),
      name: userInput.trim(),
      isCompleted: false,
    };

    setTask((someTask) => [...someTask, newTask]);
    console.log(task);
    setUserInput("");
  };

  const makeTaskComplete = (id) => {
    setTask((taskItem) =>
      task.map((taskItem) =>
        taskItem.id === id
          ? { ...taskItem, isCompleted: !taskItem.isCompleted }
          : taskItem
      )
    );
    console.log(task.filter((task) => task.id === id));
  };

  // Flat List will give you input you don't need to additionally anything !
  const renderTask = ({ item }) => {
    return (
      <View 
      key={item.id}>
        <Pressable 
        onPress={() => makeTaskComplete(item.id)}
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexShrink: 1, flexGrow: 1, marginRight: 30 }}>
            <Text>{item.name}</Text>
          </View>
          <View style={{ flexShrink: 1, flexGrow: 1 }}>
            <Text>Task Complete: {item.isCompleted.toString()}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo APP</Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <TextInput
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Enter the Task Here..."
          style={styles.input}
        />

        <Pressable onPress={addTask}>
          <View style={{ flexDirection: "row", alignContent: "center" }}>
            <Ionicons name="add"></Ionicons>
          </View>
        </Pressable>
      </View>
      {/* {task && task.map((taskObj) => <Text>{taskObj.name}</Text>)} */}
      <FlatList
        style={styles.list}
        data={task}
        renderItem={renderTask}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
    backgroundColor: 'lightblue',
    width: '100%',
    padding: 10
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray'
  },

  list: {
    padding:30,
    flexDirection: 'row',

  },

  listText : {
    fontSize: 16,
  },

  listItems: {
    display: 'flex', 
    width: '100%',
    height: 'auto',
    flexDirection: 'row', 
    borderWidth: 1,
    justifyContent: 'center'
  }

});