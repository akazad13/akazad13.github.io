(function ($) {
	"use strict";
    $(document).ready(function(){

		$('[data-toggle="tooltip"]').tooltip();

		$('#date-now').html((new Date).getFullYear().toString());
		
		//  Onepage Nav
		if ($.fn.onePageNav) {
			$('.mainmenu .nav').onePageNav({
				currentClass: 'active',
				scrollSpeed: 1000,
				easing: 'easeInOutQuart'
			});
		}
		
		jQuery(window).on('scroll', function() {
			if ($(this).scrollTop() > 1) {
				$('#header').addClass("sticky");
			} else {
				$('#header').removeClass("sticky");
			}
		});
			

		// 	Mobile Menu	
		$('.menu').slicknav({
			prependTo:".mobile-nav",
			closeOnClick:true,
		});
			
		var window_width = $(window).width();   
			if(window_width > 767){
            new WOW().init();
		}
		
		$('.arrow a').on('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top - 20 
			}, 1000, 'easeInOutQuart');
			event.preventDefault();
		});

		$("#contactForm").submit(function (event) {
			// cancels the form submission
			event.preventDefault();
			submitForm();
		});
		
		
		function submitForm() {
			// Initiate Variables With Form Content
			var name = $("#name").val();
			var email = $("#email").val();
			var message = $("#message").val();
			var subject = "From My Portfolio";
		  
			$.ajax({
			  type: "POST",
			  url: "php/form-process.php",
			  data: "name=" + name + "&email=" + email + "&message=" + message + "&subject=" + subject,
			  success: function (text) {
				if (text == "success") {
				  formSuccess();
				} else {
				  formError();
				}
			  }
			});
		  }
		  function formSuccess() {
			bootoast.toast({
				message: 'Message Submitted!',
				 type: 'success'
			});
		  }
		  function formError() {
			bootoast.toast({
				message: 'Message failed!',
				 type: 'warning'
			});
		}
		
    });
	
	// Preloader	
	$(window).load(function(){
			$('.loader').fadeOut('slow', function(){
			$(this).remove();
		});
	});
})(jQuery);
