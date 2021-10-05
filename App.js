import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";

import axios from "axios";
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      const list = response.data.map((i) => {
        const o = Object.assign({}, i);
        o.isSelected = false;
        return o;
      });
      // console.log("Resposta", list);
      setPosts(list);
      setIsLoading(false);
    })();
  }, []);

  function handleSelected(item, index) {
    const i = posts.findIndex((x) => x.id === item.id);
    let g = posts[i];
    g.isSelected = !item.isSelected;
    // const selected = posts[index]
    // selected.isSelected = !item.isSelected
    // selected[index]
    console.log("selected", g);
    setPosts([...posts.slice(0, i), g, ...posts.slice(index + 1)]);
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", marginTop: 20 }}>
      <StatusBar style="auto" />
      {isLoading ? (
        <View style={styles.container}>
          <Text>Loading....</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Text>Posts</Text>
          <FlatList
          style={{flex: 1}}
            data={posts}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => handleSelected(item, index)}
                key={item.id}
                style={{
                  backgroundColor: "#DDD",
                  flex: 1,
                  padding: 20,
                  marginVertical: 10,
                  marginHorizontal: 20,
                  justifyContent: "center",
                  alignItems: "",
                }}
              >
                <Text style={{ color: "#000" }}>
                  {item.name} - {item.isSelected ? " ************" : ""}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
          {/* {posts.map((item, index) => (
           
          ))} */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
