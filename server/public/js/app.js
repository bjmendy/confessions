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

$('#closeModal').on('click', function() {
  $(this).parent().parent().addClass('hideModal');
  $('#modal-overlay').addClass('hideModal');
})
