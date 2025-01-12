import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';

const YourRoomDesigns = () => {
  const [designText, setDesignText] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (text) => {
    setDesignText(text);
  };

  const handleSubmit = async () => {
    try {
      const apiKey = 'cohere_4_example';
      const res = await axios.post(
        'https://api.cohere.ai/v1/generate', 
        {
          prompt: designText,
          model: 'xlarge',
          max_tokens: 100,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setResponse(res.data.text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Section for Your Room Designs */}
      <Text style={styles.heading}>Your Room Designs</Text>
      <View style={styles.roomDesignsContainer}>
        <View style={styles.roomWidget}>
          <Image source={{ uri: 'https://example.com/room1.jpg' }} style={styles.roomImage} />
          <Text style={styles.roomText}>Design 1</Text>
        </View>
        <View style={styles.roomWidget}>
          <Image source={{ uri: 'https://example.com/room2.jpg' }} style={styles.roomImage} />
          <Text style={styles.roomText}>Design 2</Text>
        </View>
      </View>

      {/* Stage Section */}
      <Text style={styles.heading}>Stage</Text>
      <iframe id="your-iframe-id" src="https://pixlr.com/image-generator/"></iframe>
      <input type="file" id="your-file-input-id" />

      {response && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>{response}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  roomDesignsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  roomWidget: {
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
  },
  roomImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  roomText: {
    textAlign: 'center',
    fontSize: 16,
  },
  inputField: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  responseContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
});

export default YourRoomDesigns;
