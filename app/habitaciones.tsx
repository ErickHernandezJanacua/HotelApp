import React, { useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HabitacionesScreen() {
  const router = useRouter();
  const [habitaciones, setHabitaciones] = useState([
    { numero: 101, ocupada: false },
    { numero: 102, ocupada: true },
    { numero: 103, ocupada: false },
  ]);

  const toggleOcupacion = (index: number) => {
    const nuevas = [...habitaciones];
    nuevas[index].ocupada = !nuevas[index].ocupada;
    setHabitaciones(nuevas);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Control de Habitaciones</Text>

      <FlatList
        data={habitaciones}
        keyExtractor={(item) => item.numero.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>Habitación {item.numero} - {item.ocupada ? "Ocupada" : "Disponible"}</Text>
            <TouchableOpacity onPress={() => toggleOcupacion(index)}>
              <Text style={styles.boton}>{item.ocupada ? "Liberar" : "Ocupar"}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Botón para volver a Huéspedes */}
      <Button title="Volver a Huéspedes" onPress={() => router.push("/")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  boton: { color: "blue" },
});
