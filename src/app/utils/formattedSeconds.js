/**
 * Created by marczak on 2017-04-05.
 */

export const  formattedSeconds = (secs) => {
    if (secs != 0) {
        var sec_num = parseInt(secs, 10);
        var hours = Math.floor(sec_num / 3600) % 24;
        var minutes = Math.floor(sec_num / 60) % 60;
        var seconds = sec_num % 60;
        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    } else {
        return '00:00';

    }
};