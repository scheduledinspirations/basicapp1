import { Image, Text, View, AsyncStorage, Dimensions, Platform } from "react-native";
import axios from "axios";
//export const URL = 'https://www..com/';
export const URL = 'http://192.168.0.2/blog/public/';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const profileHeaderData = (profile) => {
    //profile.age = calculateAge(profile);
    //profile.sex = sexString[profile.i_am_a];
    profile.profileImage = profileImage(profile.image);
    // profile.sex = sexString[profile.i_am_a];
    // profile.looking_for_str = sexString[profile.looking_for];
    // profile.zodiac_sign_str = zodacString[profile.zodiac_sign].name;
    // profile.marital_status_str = maritalString[profile.marital_status];
    // profile.so_str = sexualOrientaionString[profile.sexual_orientation];
    // profile.sb_str = spiritualBeliefsString[profile.spiritual_beliefs];
    // profile.eb_str = ethnicBackgroundString[profile.ethnic_backgrounds];
    // profile.ls_str = livingSituationString[profile.living_situation];
    // profile.wtr_str = relocateString[profile.willing_to_relocate];
    // profile.da_str = alchoholString[profile.drink_alchohol];
    // profile.sa_str = smokingString[profile.smoking_ans];
    // profile.hc_str = hairColorString[profile.hair_color];
    // profile.tall_str = tallString[profile.how_tall];
    // profile.body_str = bodyTypeString[profile.body_type];
    // profile.location_str = countryString[profile.country];
    return profile;

}
export const haveChildrenStr = {
    53: 'I have no children',
    78: 'I have one child',
    79: 'I have two children',
    80: 'I have more than two children',
    81: 'I’m a foster parent',
    82: 'My kids are grown'

};
export const daysStr = {
    '01': '1', '02': '2', '03': '3', '04': '4', '05': '5', '06': '6', '07': '7', '08': '8', '09': '9', 10: '10', 11: '11', 12: '12', 13: '13', 14: '14', 15: '15', 16: '16', 17: '17', 18: '18',
    19: '19', '20': '20', 21: '21', 22: '22', 23: 23, 24: '24', 25: '25', 26: '26', 27: '27', 28: '28', 29: '29', 30: '30', 31: '31'
};

export const monthStr = { '01': '1', '02': '2', '03': '3', '04': '4', '05': '5', '06': '6', '07': '7', '08': '8', '09': '9', 10: '10', 11: '11', 12: '12' };
export const yearStr = {
    1960: '1960', 1961: '1961', 1962: '1962', 1963: '1963', 1964: '1964', 1965: '1965', 1966: '1966', 1967: '1967', 1968: '1968', 1969: '1969',
    1970: '1970', 1971: '1971', 1972: '1972', 1973: '1973', 1974: '1974', 1975: '1975', 1976: '1976', 1977: '1977', 1978: '1978', 1979: '1979', 1980: '1980', 1981: '1981',
    1982: '1982', 1983: '1983', 1984: '1984', 1985: '1985', 1986: '1986', 1987: '1987', 1988: '1988', 1989: '1989', 1990: '1990', 1991: '1991', 1992: '1992', 1993: '1993',
    1994: '1994', 995: '1995', 1996: '1996', 1997: '1997', 1998: '1998', 1999: '1999', 2000: '2000', 2001: '2001', 2002: '2002', 2003: '2003', 2004: '2004', 2005: '2005', 2006: '2006',
    2007: '2007', 2008: '2008', 2009: '2009', 2010: '2010', 2011: '2011', 2012: '2012', 2013: '2013', 2014: '2014', 2015: '2015', 2016: '2016'
};
export const countryString = {
    24: 'India ',
    25: 'Sweden ',
    26: 'Pakistan ',
    129: 'Afghanistan ',
    130: 'Albania ',
    131: 'Algeria ',
    132: 'Andorra ',
    133: 'Angola ',
    134: 'Antigua and Barbuda ',
    135: 'Argentina ',
    136: 'Armenia ',
    137: 'Australia ',
    138: 'Austria ',
    139: 'Azerbaijan ',
    140: 'Bahamas ',
    141: 'Bahrain ',
    142: 'Bangladesh ',
    143: 'Barbados ',
    144: 'Belarus ',
    145: 'Belgium ',
    146: 'Belize ',
    147: 'Benin ',
    148: 'Bhutan ',
    149: 'Bolivia ',
    150: 'Bosnia and Herzegovina ',
    151: 'Botswana ',
    152: 'Brazil ',
    153: 'Brunei ',
    154: 'Bulgaria ',
    155: 'Burkina Faso ',
    156: 'Burundi ',
    157: 'Cambodia ',
    158: 'Cameroon ',
    159: 'Canada ',
    160: 'Cape Verde ',
    161: 'Central African Republic ',
    162: 'Chad ',
    163: 'Chile ',
    164: 'China ',
    165: 'Colombia ',
    166: 'Comoros ',
    167: 'Costa Rica ',
    168: 'Côte d’Ivoire ',
    169: 'Croatia ',
    170: 'Cuba ',
    171: 'Cyprus ',
    172: 'Czech Republic ',
    173: 'Democratic Republic of the Congo ',
    174: 'Denmark ',
    175: 'Djibouti ',
    176: 'Dominica ',
    177: 'Dominican Republic ',
    178: 'East Timor ',
    179: 'Ecuador ',
    180: 'Egypt ',
    181: 'El Salvador ',
    182: 'Equatorial Guinea ',
    183: 'Eritrea ',
    184: 'Estonia ',
    185: 'Ethiopia ',
    186: 'Fiji ',
    187: 'Finland ',
    188: 'France ',
    189: 'Gabon ',
    190: 'Gambia ',
    191: 'Georgia ',
    192: 'Germany ',
    193: 'Ghana ',
    194: 'Greece ',
    195: 'Grenada ',
    196: 'Guatemala ',
    197: 'Guinea ',
    198: 'Guinea-Bissau ',
    199: 'Guyana ',
    200: 'Haiti ',
    201: 'Honduras ',
    202: 'Hungary ',
    203: 'Iceland ',
    204: 'Indonesia ',
    205: 'Iran ',
    206: 'Iraq ',
    207: 'Ireland ',
    208: 'Israel ',
    209: 'Italy ',
    210: 'Jamaica ',
    211: 'Japan ',
    212: 'Jordan ',
    213: 'Kazakhstan ',
    214: 'Kenya ',
    215: 'Kiribati ',
    216: 'Kuwait ',
    217: 'Kyrgyzstan ',
    218: 'Laos ',
    219: 'Latvia ',
    220: 'Lebanon ',
    221: 'Lesotho ',
    222: 'Liberia ',
    223: 'Libya ',
    224: 'Liechtenstein ',
    225: 'Lithuania ',
    226: 'Luxembourg ',
    227: 'Madagascar ',
    228: 'Malawi ',
    229: 'Malaysia ',
    230: 'Maldives ',
    231: 'Mali ',
    232: 'Malta ',
    233: 'Marshall Islands ',
    234: 'Mauritania ',
    235: 'Mauritius ',
    236: 'Mexico ',
    237: 'Micronesia ',
    238: 'Moldova ',
    239: 'Monaco ',
    240: 'Mongolia ',
    241: 'Montenegro ',
    242: 'Morocco ',
    243: 'Mozambique ',
    244: 'Myanmar ',
    245: 'Namibia ',
    246: 'Nauru ',
    247: 'Nepal ',
    248: 'Netherlands ',
    249: 'New Zealand ',
    250: 'Nicaragua ',
    251: 'Niger ',
    252: 'Nigeria ',
    253: 'North Korea ',
    254: 'Norway ',
    255: 'Oman ',
    256: 'Pakistan ',
    257: 'Palau ',
    258: 'Panama ',
    259: 'Papua New Guinea ',
    260: 'Paraguay ',
    261: 'Peru ',
    262: 'Philippines ',
    263: 'Poland ',
    264: 'Portugal ',
    265: 'Qatar ',
    266: 'Republic of the Congo ',
    267: 'Republic of Macedonia ',
    268: 'Romania ',
    269: 'Russia ',
    270: 'Rwanda ',
    271: 'Saint Kitts and Nevis ',
    272: 'Saint Lucia ',
    273: 'Saint Vincent and the Grenadines ',
    274: 'Samoa ',
    275: 'San Marino ',
    276: 'Sao Tome and Principe ',
    277: 'Saudi Arabia ',
    278: 'Senegal ',
    279: 'Serbia ',
    280: 'Seychelles',
    281: 'Sierra Leone',
    282: 'Singapore',
    283: 'Slovakia',
    284: 'Slovenia',
    285: 'Solomon Islands',
    286: 'Somalia',
    287: 'South Africa',
    288: 'South Korea',
    289: 'South Sudan',
    290: 'Spain',
    291: 'Sri Lanka',
    292: 'Sudan',
    293: 'Suriname',
    294: 'Swaziland',
    295: 'Switzerland',
    296: 'Syria',
    297: 'Tajikistan',
    298: 'Tanzania',
    299: 'Thailand',
    300: 'Togo',
    301: 'Tonga',
    302: 'Trinidad and Tobago',
    303: 'Tunisia',
    304: 'Turkey',
    305: 'Turkmenistan',
    306: 'Tuvalu',
    307: 'Uganda',
    308: 'Ukraine',
    309: 'United Arab Emirates',
    310: 'United Kingdom',
    311: 'United States of America',
    312: 'Uruguay',
    313: 'Uzbekistan',
    314: 'Vanuatu',
    315: 'Venezuela',
    316: 'Vietnam',
    317: 'Yemen',
    318: 'Zambia',
    319: 'Zimbabwe',

};
export const fromAgeString = {
    18: '18', 19: '19', 20: '20', 21: '21', 22: '22', 23: '23', 24: '24', 25: '25', 26: '26', 27: '27', 28: '28', 29: '29', 30: '30', 31: '31', 32: '32',
    33: '33', 34: '34', 35: '35', 36: '36', 37: '37', 38: '38', 39: '39', 40: '40', 41: '41', 42: '42', 43: '43', 44: '44', 45: '45', 46: '46', 47: '47',
    48: '48', 49: '49', 50: '50', 51: '51', 52: '52', 53: '53', 54: '54', 55: '55', 56: '56', 57: '57', 58: '58', 59: '59', 60: '60', 61: '61', 62: '62',
    63: '63', 64: '64', 65: '65', 66: '66', 67: '67', 68: '68', 69: '69', 70: '70', 71: '71', 72: '72', 73: '73', 74: '74', 75: '75'
};
export const memLocation = {

    62: 'In the same country',
    320: 'In the same town',
    321: 'Anywhere. Love is love!',

};

export const bodyTypeString = {
    61: 'Slim / Slender',
    121: 'Average / Medium',
    122: 'A few extra pounds',
    123: 'Muscular / Athletic',
};

export const tallString = {
    60: ' Less than 5’ (1.52 m)',
    115: '5’0-5’3 (1.52 m - 1.62 m)',
    116: '5’4-5’6 (1.63 m - 1.69 m)',
    117: '5’7-5’9 (1.70 m - 1.77 m)',
    118: '5’10-6’0 (1.78 m - 1.84 m)',
    119: '6’1-6’4 (1.85 m - 1.93 m)',
    120: 'Over 6’4 (1.93 m)',
};

export const hairColorString = {
    59: 'Blonde',
    112: 'Strawberry_Blonde',
    113: 'Brown',
    114: 'Light_Brown',
    322: 'Black',
    323: 'Grey',
    324: 'Multicolored',
    325: 'Reddish',
    326: 'Shaved',
    327: 'White'
};
export const smokingString = {
    14: 'dont_smoke',
    15: 'smoke_social',
    16: 'daily_smoke',

};
export const alchoholString = {
    57: 'dont_drink',
    105: 'rarely_drink',
    106: 'drink_socially',
    107: 'drink_daily'
};
export const relocateString = {
    55: 'yes love',
    92: 'no',
    93: 'consider it'
};
export const livingSituationString = {
    56: 'live alone',
    94: 'roomates',
    95: 'My kids full time',
    96: 'My kids part time',
    97: 'i live with my_parents',
    98: 'my parents live with me',
    99: 'Intentional Community',
    100: 'Community Living',
    101: 'I travel most time',
    102: 'Living with my spouse',
    103: 'Living with my partner',
    104: 'Prefer not to say'
};
export const ethnicBackgroundString = {
    52: 'North American',
    67: 'African',
    68: 'African American',
    69: 'Asian',
    71: 'East Indian',
    72: 'Hispanic Latino',
    73: 'Middle Eastern',
    74: 'Native American',
    75: 'Pacitic Islander',
    76: 'Multi Ethnic',
    77: 'Other'
};
export const calculateAge = (dtls) => {
    //console.log('Details are ==>',dtls);
    if (!dtls.birthdaydate) {
        return '-';
    }
    if (dtls.birthdaydate) {
        dtls.birthdaydate = `0${dtls.birthdaydate}`;
    }
    if (dtls.birthdaymonth) {
        dtls.birthdaymonth = `0${dtls.birthdaymonth}`;
    }
    const birthday = `${dtls.birthdaymonth}/${dtls.birthdaydate}/${dtls.birthdayyear}`;
    const bDay = new Date(birthday);
    const ageDifMs = Date.now() - bDay.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch

    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
};

export const sexString = {
    27: 'Man',
    28: 'Kivinna',
    29: 'Trans (M till K)',
    30: 'Trans (K till M)',
    31: 'Intersexuell'
};
export const maritalString = {
    32: 'Single',
    33: 'Divorced',
    34: 'Separated',
    35: 'Widowed',
    36: 'In_a_relationship',
    37: 'Married'
};
export const sexualOrientaionString = {
    51: 'Straight',
    124: 'Gay',
    125: 'Lesbian',
    126: 'Bisexual',
    127: 'Transgender',
    128: 'Pan_Sexual'
};
export const spiritualBeliefsString = {
    50: 'Conscious',
    63: 'Personal_Spiritual',
    64: 'New_thought',
};

export const zodacString = {
    1: { name: 'Aquarius' },
    2: { name: 'Pisces' },
    3: { name: 'Aries' },
    4: { name: 'Taurus' },
    5: { name: 'Gemini' },
    6: { name: 'Cancer' },
    7: { name: 'Leo' },
    8: { name: 'Virgo' },
    9: { name: 'Libra' },
    10: { name: 'Scorpio' },
    11: { name: 'Sagittarius' },
    12: { name: 'Capricorn' },

};
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
        flexDirection: 'column'
    },
    image: {

        width: '100%', height: 50

    },
    text: {

    }
};