import { StyleSheet, StatusBar, Platform } from "react-native";

export default StyleSheet.create({
    container:{
        flexDirection: 'column',
        backgroundColor: 'ghostwhite',
        alignItems: 'center',
        ...Platform.select({
            ios: { paddingTop: 20 },
            android: { paddingTop: StatusBar.currentHeight },
          }),
    },
    map:{
        height: '95%',
        width: '95%',
    },
    text:{
        fontSize: 16,
        fontWeight: 'bold',
    }
})

