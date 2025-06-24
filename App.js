import { StatusBar } from "expo-status-bar";
import { Checkbox } from "react-native-paper";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from "react-native";
import icon from './assets/iconn.jpg';
import add_icon from './assets/add_icon.jpg';

import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [task, setTask] = useState([]);
  const [isSelected, setSelection] = useState(false)

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
  const renderTask = ({ item }) => (
  <View style={{ flexDirection: 'row', alignItems: 'Center', padding: 5 }}>
    <Checkbox
      status={item.isCompleted ? 'checked' : 'unchecked'}
      onPress={() => makeTaskComplete(item.id)}
    />
    <Text
      style={{
        textDecorationLine: item.isCompleted ? 'line-through' : 'none',
        marginLeft: 10,
      }}
    >
      {item.name}
    </Text>
  </View>
  );

  const addLine = () => {
    return(
      <View
      style={{
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      marginVertical: 10
      }} />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        console.log(require('./assests/iconn.jpg'))
        <Image 
        source={icon}
        style={{width:40, height:40 }}
        resizeMode="contain" />
        <Text style={styles.headingText}>Todo APP</Text>
      </View>

      <FlatList
        style={styles.list}
        data={task}
        renderItem={renderTask}
      />

      {addLine()}

      <View style={{ flexDirection: "row", gap:5, marginBottom: 20 }}>
        <TextInput
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Enter the Task Here..."
          style={styles.input}
        />

        <Pressable onPress={addTask}>
          <View style={{ flexDirection: "row", alignContent: "center" }}>
            <Image 
            source={add_icon}
            style={{width:30, height:30 }}
            resizeMode="contain" />
          </View>
        </Pressable>
      </View>
      {/* {task && task.map((taskObj) => <Text>{taskObj.name}</Text>)} */}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "left",
    justifyContent: "center",
    paddingTop: 40,

  },

  heading: {
    marginBottom: 30,
    marginTop: 0,
    backgroundColor: 'black',
    width: '100%',
    padding: 10,
    flexDirection: 'row',
  },

  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
    color:'white',
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 30,
    marginLeft: '4%',
    width: '85%'
  },

  list: {
    padding:20,
    flexDirection: 'row',

  }


});