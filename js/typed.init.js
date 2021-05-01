// Typed Text
	$(".element").each(function(){
	    var $this = $(this);
	    $this.typed({
	    strings: $this.attr('data-elements').split(','),
	    typeSpeed: 200, // typing speed
	    backDelay: 2000 // pause before backspacing
	    });
	});