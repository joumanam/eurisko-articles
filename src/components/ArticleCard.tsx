import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors } from '../config/Colors';

export interface props {
  title?: string;
  description?: string;
  author?: string;
}

export default function ArticleCard({ title, description, author }: props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.author} numberOfLines={1}>{author}</Text>
      <View style={styles.descriptionContainer}>
        <Text lineBreakMode='tail' numberOfLines={3}>{description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 5,
    borderColor: Colors.blue,
    borderWidth: 2,
    marginVertical: 10,
    backgroundColor: Colors.whiteBlue,
    padding: 10,
    alignSelf: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    color: Colors.blue,
  },
  author: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.grey
  },
  descriptionContainer: {
    marginTop: 10
  },
  image: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginRight: 10
  }
})