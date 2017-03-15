//this makes it so the input text areas highlight so you can visually see where you are on the page
$('.form').find('input, textarea').on('keyup blur focus', function (e) {  
  var $this = $(this),
      label = $this.prev('label');
	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});
//this flips between the log in and registration tabs on the home page
$('.tab a').on('click', function (e) { 
  e.preventDefault(); 
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active'); 
  target = $(this).attr('href');
  $('.tab-content > div').not(target).hide(); 
  $(target).fadeIn(600);  
});


//timer functions
window.setTimeout("Tick()", 1000);

function Tick() {
window.setTimeout("Tick()", 1000);
}

var Timer;
var TotalSeconds;


function CreateTimer(TimerID, Time) {
Timer = document.getElementById(TimerID);
TotalSeconds = Time;

UpdateTimer()
window.setTimeout("Tick()", 1000);
}

function Tick() {
TotalSeconds -= 1;
UpdateTimer()
window.setTimeout("Tick()", 1000);
}

function UpdateTimer() {
Timer.innerHTML = TotalSeconds;
}
 

function Tick() {
if (TotalSeconds <= 0) {
return;
}

TotalSeconds -= 1;
UpdateTimer()
window.setTimeout("Tick()", 1000);
}

function UpdateTimer() {
var Seconds = TotalSeconds;

var Days = Math.floor(Seconds / 86400);
Seconds -= Days * 86400;

var Hours = Math.floor(Seconds / 3600);
Seconds -= Hours * (3600);

var Minutes = Math.floor(Seconds / 60);
Seconds -= Minutes * (60);


var TimeStr = ((Days > 0) ? Days + " days " : "") + LeadingZero(Hours) + ":" + LeadingZero(Minutes) + ":" + LeadingZero(Seconds)


Timer.innerHTML = TimeStr;
}


function LeadingZero(Time) {

return (Time < 10) ? "0" + Time : + Time;

}


Timer.innerHTML = TimeStr;
