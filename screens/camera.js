import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'; 

class Camera extends Component {
  constructor(props) {
    super(props);
      this.state = {
          image: null
    };
  }
  
    pickImage = async () => {
        try {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
            if (!result.cancelled) {
                this.setState({
                    image: result.data
                })
                console.log(result.uri);
                this.uploadImage(result.uri);

            }
        }
        
        catch (error) {
            console.log(error);
        }
    }

    uploadImage = async(uri) => {
        const data = new FormData()
        var filename = uri.split('/')[uri.split('/').length - 1];
        var type = `image/${uri.split('.')[uri.split('.').length - 1]}`
        const filetouplaod = { uri: uri, name: filename, type: type }
        data.append('digit', filetouplaod);
        fetch('', {
            method: 'POST',
            body: data,
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then((response) => {
            response.json()
        }).then((result) => {
            {console.log(result)}
        }).catch((error) => {
            console.log(error);
        })
    }

    getPermissions = async() => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
    }

    componentDidMount() {
        this.getPermissions();
    }
        render() {
    return (
       <View>
            <Button title="Take a photo" onPress={this.pickImage()}/>
       </View>
    );
  }
}

export default Camera;
