import React, { useState, useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

//Components
const ItemList = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={{ margin: 10, padding: 8, borderBottomColor: 'black', borderBottomWidth: 0.5 }}>
      <Text style={styles.text}>{props.item}</Text>
    </TouchableOpacity>
  )
}

// Return App
export default function App() {


  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [searchedItems, setSearchedItems] = useState([]);
  const [searchingActive, setSearchingActive] = useState(false);

  //Scroll
  const scrollRef = useRef();

  //Random keywords
  const keyWords = [
    { "food": "Mango" },
    { "food": "Apple" },
    { "food": "Milk" },
    { "food": "Bread" },
    { "food": "Grapes" },
    { "food": "Coffee" },
    { "food": "Icecream" },
    { "food": "Tea" },
    { "food": "Carrot" },
    { "food": "Tomato" },
    { "food": "Sugar" },
    { "food": "Pineapple" },
    { "food": "Sweets" },
    { "food": "Candy" },
    { "food": "Cake" },
    { "food": "Cupcake" },
    { "food": "Salt" },
    { "food": "Pizza" },
  ];

  //search input text
  const handleTextChange = (txt) => {
    setSearchingActive(true);
    setQuery(txt);

    //filtering items
    setSearchedItems(items.filter(e => (
      e.food.toLowerCase().includes(txt.toLowerCase())
    )
    ))
    if (txt.trim().length == 0) {
      setSearchingActive(false);
    }
    
  }

  const handleAdd = () => {

    // If below then scrollback to top, then add item.
    scrollRef.current?.scrollTo({
      y: 0,
      x: 0,
      animated: true,
    });

    // 200ms delay for adding items
    setTimeout(() => {
      const word = keyWords[Math.floor(Math.random() * (keyWords.length))];
      setItems([...items, word]);
      let itemsCopy = [...items];
      itemsCopy.unshift(word);
      setItems(itemsCopy);
      // console.log(items);
    }, 200);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 25, flexDirection: 'row' }}>
        {/* Search Box for text input query */}
        <TextInput
          style={styles.input}
          onChangeText={(txt) => handleTextChange(txt)}
          value={query}
          placeholder="Search"
        />
        <TouchableOpacity disabled={searchingActive} onPress={handleAdd} style={styles.addBtn}>
          <Text style={{ fontSize: 30 }}>+</Text>
        </TouchableOpacity>
      </View>
      {/* Bottom Divider */}
      <View style={{ height: 2, backgroundColor: '#000', marginHorizontal: 25 }} />

      {/* Items Lists */}
      <ScrollView ref={scrollRef}>
        {searchingActive ? (searchedItems.map((val, id) => { 
          return (
            <ItemList key={id} item={val.food} />
          )
        })) : (items.map((val, id) => {     
          return (
            <ItemList key={id} item={val.food} />
          )
        }))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f99',
  },
  input: {
    height: 50,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 16,
    width: '75%',
    borderRadius: 5
  },
  addBtn: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    borderColor: '#ff6868',
    borderWidth: 3,
    borderRadius: 5,
    backgroundColor: '#ff5757',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'sans-serif',
  }
});
