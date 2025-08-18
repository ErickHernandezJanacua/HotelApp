import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

export default function IndexScreen() {
  const router = useRouter();
  const [huespedes, setHuespedes] = useState<{ _id: string; nombre: string }[]>([]);
  const [nombre, setNombre] = useState("");
  const [editId, setEditId] = useState<string | null>(null);


  const API_URL = "http://192.168.100.8:3000/huespedes";

  useEffect(() => {
    axios.get(API_URL).then((res) => setHuespedes(res.data));
  }, []);

  const agregarHuesped = () => {
    if (!nombre.trim()) return;

    if (editId) {
      axios.put(`${API_URL}/${editId}`, { nombre }).then((res) => {
        setHuespedes(huespedes.map(h => h._id === editId ? res.data : h));
        setEditId(null);
        setNombre("");
      });
    } else {
      axios.post(API_URL, { nombre }).then((res) => {
        setHuespedes([...huespedes, res.data]);
        setNombre("");
      });
    }
  };

  const editarHuesped = (id: string, nombreActual: string) => {
    setNombre(nombreActual);
    setEditId(id);
  };

  const borrarHuesped = (id: string) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setHuespedes(huespedes.filter(h => h._id !== id));
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Huéspedes</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del huésped"
        value={nombre}
        onChangeText={setNombre}
      />

      <Button title={editId ? "Actualizar" : "Agregar"} onPress={agregarHuesped} />

      <FlatList
        data={huespedes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nombre}</Text>
            <View style={styles.botones}>
              <TouchableOpacity onPress={() => editarHuesped(item._id, item.nombre)}>
                <Text style={styles.editar}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => borrarHuesped(item._id)}>
                <Text style={styles.borrar}>Borrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Button title="Ir a Habitaciones" onPress={() => router.push("/habitaciones")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  botones: { flexDirection: "row" },
  editar: { color: "blue", marginRight: 15 },
  borrar: { color: "red" },
});
