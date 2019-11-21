//this loads google fonts
//honestly dont even know how it works i got it from 
//https://phasergames.com/using-google-fonts-phaser/

WebFontConfig = {
google: { families: ['PT Serif', 'Overlock'] }
};
(function() {
var wf = document.createElement('script');
wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
wf.type = 'text/javascript';
wf.async = 'true';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(wf, s);
})();