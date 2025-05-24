import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { OnepetsPost } from "@/api/pets";
import { useRouter } from "expo-router";

const AddPet = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const router = useRouter();

  const handleAddPet = async () => {
    const newPet = {
      name,
      image,
      type,
      adopted: 0,
    };
    await OnepetsPost(newPet);
    router.replace("/"); // back to homepage
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Pet! </Text>
      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="Description" style={styles.input} />
      <TextInput placeholder="Type" style={styles.input} />
      <TextInput placeholder="Image" style={styles.input} />
      <TextInput placeholder="Adopted" style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Pet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
