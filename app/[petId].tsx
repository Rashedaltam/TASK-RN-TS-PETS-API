import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Onepets, OnepetsDelete } from "@/api/pets";

const PetDetails = () => {
  const { petId } = useLocalSearchParams();
  const router = useRouter();
  const [pet, setPet] = useState<any>(null);

  const getOnePet = async (id: number) => {
    const data = await Onepets(id);
    setPet(data);
  };

  const deleteOnePet = async (id: number) => {
    await OnepetsDelete(id);
    router.replace("/");
  };

  useEffect(() => {
    getOnePet(Number(petId));
  }, []);

  if (!pet) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{pet.name}</Text>
      <Image source={{ uri: pet.image }} style={styles.image} />
      <Text style={styles.description}> {pet.description}</Text>
      <Text style={styles.type}>Type: {pet.type}</Text>

      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => getOnePet(Number(petId))}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Import Api Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteOnePet(Number(petId))}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Delete a PET</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  type: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
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
