/**
 * Created by marczak on 2017-03-26.
 */

export default function getToday() {
    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = currentDate.getMonth() + 1
    const year = currentDate.getFullYear();
    return year + '-' + month + '-' + day;
}