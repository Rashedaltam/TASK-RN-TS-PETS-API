import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import PetItem from "./PetItem";
import { Allpets } from "../api/pets";

interface Pet {
  id: number;
  name: string;
  description: string;
  type: string;
  image: string;
  image2: string;
}

const PetList = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [displayPets, setDisplayPets] = useState<Pet[]>([]);
  // Salman Notes
  // create a function to call getAllPets
  // hold the data
  // data -> serDisplayPers(data)

  const handleGetPets = async () => {
    const data = await Allpets();
    setDisplayPets(data);
  };

  useEffect(() => {
    const getAllPets = async () => {
      const data = await Allpets();
      setDisplayPets(data);
    };
    getAllPets();
  }, []);

  const petList = displayPets.filter((pet) => pet.name.toLowerCase().includes(search.toLowerCase()))
    .filter((pet) => pet.type.toLowerCase().includes(type.toLowerCase()))
    .map((p) => (
      <PetItem
        key={p.id}
        pet={p}
        setDisplayPets={setDisplayPets}
        displayPets={displayPets}
      />
    ));
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerStyle}
    >
      {/* Search Input */}
      <TextInput
        placeholder="Search for a pet"
        style={styles.searchInput}
        onChangeText={(value) => setSearch(value)}
      />

      {/* Filter by type */}
      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("")}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Cat")}
        >
          <Text>Cat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Dog")}
        >
          <Text>Dog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Rabbit")}
        >
          <Text>Rabbit</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity onPress={() => handleGetPets()}>
        <Text>Get All Pets</Text>
      </TouchableOpacity>

      {/* Pet List somthing is wrong here, either the API is not working while im doing the task which happened before or my code is wrong*/}

      {petList}
    </ScrollView>
  );
};

export default PetList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "#f9e3be",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
