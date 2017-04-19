import config  from '!json!../www/config.json';

export const HOST_SERVER = config.api.HOST_SERVER;
export const API_PATH = config.api.API_PATH;

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
export const REFRESH_SET_DATA = config.time_variable.REFRESH_SET_DATA;
export const REFRESH_VIEW_DATA = config.time_variable.REFRESH_VIEW_DATA;
export const MAX_WORK_TIME = config.time_variable.MAX_WORK_TIME;
export const EXTRA_WORK_TIME = config.time_variable.EXTRA_WORK_TIME;

export const ERROR_NO_TIME_TO_WORK = config.errors.ERROR_NO_TIME_TO_WORK;
export const ERROR_TASK_IN_PROGRESS = config.errors.ERROR_TASK_IN_PROGRESS;
export const ERROR_LEVEL = config.errors.ERROR_LEVEL;