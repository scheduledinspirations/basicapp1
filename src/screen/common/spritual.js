import { Image, Text, View, AsyncStorage, Dimensions, Platform } from "react-native";
import axios from "axios";
export const URL = 'http://shriyait.com/demo/public/';
//export const URL = 'http://192.168.0.2/react/native/message/server/public/';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const profileImage = (img) => {
    const i = img || 'profile-default.jpg';
    return `${URL}uploads/${i}`;
};
export const galleryImage = (img) => {
    const i = img || 'profile-default.jpg';
    return `${URL}${i}`;
};
export const postJson = (x) => {
    return {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(x),
    };
};

export const postData = (params) => {
    const formData = new FormData();

    for (const k in params) {
        formData.append(k, params[k]);
    }
    return formData;
}
export const postDataFetch = (params) => {


    const request = {

        credentials: 'include',
        method: 'POST',
        body: postData(params)
    };
    return request;
};
export const profileData = (profile) => {
    profile.age = calculateAge(profile);
    profile.name = profile.name || '';
    profile.sex = sexString[profile.i_am_a];
    profile.profileImage = profileImage(profile.image);
    profile.sex = sexString[profile.i_am_a];
    profile.looking_for_str = sexString[profile.looking_for];

    profile.zodiac_sign_str = profile.zodiac_sign ? zodacString[profile.zodiac_sign].name : '';
    profile.marital_status_str = maritalString[profile.marital_status];
    profile.so_str = sexualOrientaionString[profile.sexual_orientation];
    profile.sb_str = spiritualBeliefsString[profile.spiritual_beliefs];
    profile.eb_str = ethnicBackgroundString[profile.ethnic_backgrounds];
    profile.ls_str = livingSituationString[profile.living_situation];
    profile.wtr_str = relocateString[profile.willing_to_relocate];
    profile.da_str = alchoholString[profile.drink_alchohol];
    profile.sa_str = smokingString[profile.smoking_ans];
    profile.hc_str = hairColorString[profile.hair_color];
    profile.tall_str = tallString[profile.how_tall];
    profile.body_str = bodyTypeString[profile.body_type];
    profile.location_str = countryString[profile.country];

    return profile;
};

export const dateDropDown = () => {

};
export const makeDropDown = () => {

};
export const CONF = {
    primary: '#FD7742'
};

export const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
};
export const validatePassword = (email) => {

    if (email.length < 6) {
        return false;
    }
    return true;

};
export const requiredData = (x) => {
    if (x) {
        return false;
    }
    return true;
}
export const axiosCall = async () => {
    token = await AsyncStorage.getItem('userToken');
    return axios.create({
        baseURL: URL,
        timeout: 1000,
        headers: { 'Authorization': 'Bearer ' + token }
    });
}
export const styles = {
    right: { flexDirection: 'column', alignItems: 'flex-end' },
    center: { flexDirection: 'column', alignItems: 'center' },
    container: { flex: 1, flexDirection: 'column', justifyContent: 'space-between' },
    containerStyle: {
        backgroundColor: '',
        flex: 1,
        //width: SCREEN_WIDTH - 30,
        paddingTop: 10,
        paddingBottom: 32,
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 16
    },
    image: {

        width: '100%', height: 50

    },
    text: {

    }
};