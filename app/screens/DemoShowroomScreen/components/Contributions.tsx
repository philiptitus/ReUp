import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';

const { width } = Dimensions.get('window');

const contributions = [
  {
    title: 'TAKATAKA SOLUTION',
    description: 'Takataka Solutions is an integrated waste management company that provides comprehensive services including waste collection, recycling, and composting, managing 95% of recyclable materials. Partnering with this organization can greatly enhance the recycling efforts in the Kilimani area by efficiently managing and processing the waste materials collected there.',
    images: [
      { src: 'https://i.postimg.cc/Q9ytMZbv/Picture1.png', caption: 'Fig1.0. Takataka waste collection' },
      { src: 'https://i.postimg.cc/BZM8JfKD/Picture2.jpg', caption: 'Fig1.2. Takataka waste recycling' }
    ]
  },
  {
    title: 'Gjenge makers',
    description: 'A company that turns plastics to bricks used in construction, lightweight and its cheaper than cement. The Gjenge makers produces 1500 bricks from household and industrial plastics per day and recycles 50 tons of plastics but aims to double the figure.',
    images: [
      { src: 'https://i.postimg.cc/wMf32DpF/Picture3.jpg', caption: 'Fig.1.3. Recycling of plastics to bricks' },
      { src: 'https://i.postimg.cc/zBNLGJ7w/Picture4.png', caption: 'Fig.1.3. Recycling of plastics to bricks' },
      { src: 'https://i.postimg.cc/TPgLxyVY/Picture5.jpg', caption: 'Fig.1.3. Recycling of plastics to bricks' }
    ]
  },
  {
    title: 'THE WEEE CENTER',
    description: 'The WEEE (Waste Electrical and Electronic Equipment) Center typically focuses on the collection, recycling, and responsible disposal of electronic waste. It collaborates with Kilicycle reducing the environmental impact of e-waste by promoting recycling and proper waste management practices.',
    images: [
      { src: 'https://i.postimg.cc/76N5CptF/Picture6.jpg', caption: 'Fig1.4. Collection waste in Kilimani' }
    ]
  },
  {
    title: 'THE GO DOWN ARTS CENTER',
    description: 'This project aims to provide affordable creation, performance, and exhibition spaces for individual artists, artist collectives, cultural organizations, and creative businesses. In collaboration with the Transformation Project, we will enhance the use of recyclable materials, such as plastics, to create art and foster an aesthetically pleasing environment for artists. This initiative not only supports artistic expression but also promotes sustainability and environmental awareness within the creative community.',
    images: [
      { src: 'https://i.postimg.cc/0j2b7cLb/Picture7.jpg', caption: 'Fig.1.5. An art made of metal' }
    ]
  },
  {
    title: 'ALL JUNK GETS DUMPED IN AFRICA: MAKING ART FROM SCRAP',
    description: "All this junk gets dumped in Africa': Making Art from Scrap is an initiative that highlights the creative potential of discarded materials. By transforming waste into art, we aim to challenge perceptions of waste while promoting environmental sustainability. This project showcases the talents of local artists and emphasizes the importance of recycling and reusing materials, turning what is often seen as junk into valuable artistic expressions.",
    images: [
      { src: 'https://i.postimg.cc/rwdRhZz4/Picture8.jpg', caption: 'Fig.1.6. Wildlife inspiration' }
    ]
  }
];

const Contributions = () => {
  return (
    <ScrollView style={styles.container}>
      {contributions.map((contribution, index) => (
        <Card key={index} containerStyle={styles.card}>
          <Text style={styles.title}>{contribution.title}</Text>
          <Text style={styles.description}>{contribution.description}</Text>
          {contribution.images.map((image, imgIndex) => (
            <View key={imgIndex} style={styles.imageContainer}>
              <Image source={{ uri: image.src }} style={styles.image} />
              <Text style={styles.caption}>{image.caption}</Text>
            </View>
          ))}
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderColor: '#444',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  title: {
    color: '#00E676',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    color: '#EEEEEE',
    fontSize: 18,
    marginBottom: 15,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#00E676',
    borderWidth: 1,
  },
  image: {
    width: width - 60,
    height: 200,
  },
  caption: {
    color: '#BBBBBB',
    fontSize: 15,
    padding: 5,
    backgroundColor: '#1e1e1e',
    textAlign: 'center',
  },
});

export default Contributions;
