export const HOST_SERVER = 'http://api.loc/';
export const API_PATH = HOST_SERVER + 'api/';


export const groupValue = [
    {
        id: 1,
        name: 'Admin'
    },
    {
        id: 4,
        name: 'Kierownik Grafiki'
    },

    {
        id: 5,
        name: 'Kierownik Grawernii'
    },

    {
        id: 2,
        name: 'Grafik'
    },
    {
        id: 3,
        name: 'Grawer'
    }
];

export const avatarValue = [
    {id: 1, name: 'Mężczyzna 1', img: 'm1.png'},
    {id: 2, name: 'Mężczyzna 2', img: 'm2.png'},
    {id: 3, name: 'Mężczyzna 3', img: 'm3.png'},
    {id: 4, name: 'Mężczyzna 4', img: 'm4.png'},
    {id: 5, name: 'Kobieta 1', img: 'f1.png'},
    {id: 6, name: 'Kobieta 2', img: 'f2.png'},
    {id: 7, name: 'Kobieta 3', img: 'f3.png'},
    {id: 8, name: 'Kobieta 4', img: 'f4.png'},
];
export const REFRESH_SET_DATA = 100000;
export const REFRESH_VIEW_DATA = 5000;
export const MAX_WORK_TIME = 20700;

export const ERROR_NO_TIME_TO_WORK = 'Ten pracownik nie ma wystarczająco czasu w tym dniu na to zadanie';
export const ERROR_TASK_IN_PROGRESS = 'To zadanie trwa. Musi zostać zakończone';
export const ERROR_LEVEL = 'Wybrany pracownik ma zbyt niskie kompetencje';


