/**
 * Created by Adir on 08/12/2014.
 */
'use strict';

(function() {
    var Roles = [
        'ראש הממשלה',
        'שר האוצר',
        'שר הביטחון',
        'שר החינוך',
        'שר המשפטים',
        'שר הכלכלה',
        'שר התחבורה',
        'שר החוץ',
        'שר הפנים',
        'שר המדע',
        'שר החקלאות',
        'שר התרבות והספורט',
        'שר הבריאות',
        'שר לביטחון פנים',
        'שר התקשורת',
        'שר הבינוי והשיכון',
        'שר הגנת הסביבה',
        'שר התיירות',
        'מבקר המדינה'
    ];

    angular.module('Gov').value('Roles', Roles);
})();