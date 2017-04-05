/**
 * Created by marczak on 2017-04-05.
 */

    //task status 1 - new
    //task status 2 - in progress - graphic
    //task status 3 - done - graphic
    //task status 4 - accepted - graphic
    //task status 5 - in progress - graver
    //task status 6 - done - graver
    //task status 7 - accepted - graver
    //task status 10 - reclamation
const status_tab = [];
status_tab[1] = 'Przydzielono';
status_tab[2] = 'W trakcie [Grafika]';
status_tab[3] = 'Zakończono [Grafika]';
status_tab[4] = 'Akceptacja [Grafika]';
status_tab[5] = 'W trakcie [Grawernia]';
status_tab[6] = 'Zakończono [Grawernia]';
status_tab[7] = 'Akceptacja [Grawernia]';
status_tab[10] = 'Reklamacja';


export default function statusGet(number)
{
    return status_tab[number];
}