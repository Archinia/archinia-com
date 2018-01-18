/*
	Relativity by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

var settings = {

	carousel: {

		// Transition speed (in ms)
		// For timing purposes only. It *must* match the transition speed of ".carousel > article".
			speed: 350

	}

};

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});

	/**
	 * Custom carousel for Altitude.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._carousel = function(options) {

		var	$window = $(window),
			$this = $(this);

		// Handle no/multiple elements.
			if (this.length == 0)
				return $this;

			if (this.length > 1) {

				for (var i=0; i < this.length; i++)
					$(this[i])._slider(options);

				return $this;

			}

		// Vars.
			var	current = 0, pos = 0, lastPos = 0,
				slides = [],
				$slides = $this.children('article'),
				intervalId,
				isLocked = false,
				i = 0;

		// Functions.
			$this._switchTo = function(x, stop) {

				// Handle lock.
					if (isLocked || pos == x)
						return;

					isLocked = true;

				// Stop?
					if (stop)
						window.clearInterval(intervalId);

				// Update positions.
					lastPos = pos;
					pos = x;

				// Hide last slide.
					slides[lastPos].removeClass('visible');

				// Finish hiding last slide after a short delay.
					window.setTimeout(function() {

						// Hide last slide (display).
							slides[lastPos].hide();

						// Show new slide (display).
							slides[pos].show();

						// Show new new slide.
							window.setTimeout(function() {
								slides[pos].addClass('visible');
							}, 25);

						// Unlock after sort delay.
							window.setTimeout(function() {
								isLocked = false;
							}, options.speed);

					}, options.speed);

			};

		// Slides.
			$slides
				.each(function() {

					var $slide = $(this);

					// Add to slides.
						slides.push($slide);

					// Hide.
						$slide.hide();

					i++;

				});

		// Nav.
			$this
				.on('click', '.next', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Increment.
						current++;

						if (current >= slides.length)
							current = 0;

					// Switch.
						$this._switchTo(current);

				})
				.on('click', '.previous', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Decrement.
						current--;

						if (current < 0)
							current = slides.length - 1;

					// Switch.
						$this._switchTo(current);

				});

		// Initial slide.
			slides[pos]
				.show()
				.addClass('visible');

		// Bail if we only have a single slide.
			if (slides.length == 1)
				return;

	};

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Tweaks/fixes.

			// Polyfill: Object fit.
				if (!skel.canUse('object-fit')) {

					$('.image[data-position]').each(function() {

						var $this = $(this),
							$img = $this.children('img');

						// Apply img as background.
							$this
								.css('background-image', 'url("' + $img.attr('src') + '")')
								.css('background-position', $this.data('position'))
								.css('background-size', 'cover')
								.css('background-repeat', 'no-repeat');

						// Hide img.
							$img
								.css('opacity', '0');

					});

				}

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly').scrolly({
				offset: function() { return $header.height() - 5; }
			});

		// Header.
			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight(),
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); $header.addClass('reveal'); }
				});

			}

		// Banner.

			// Hack: Fix flex min-height on IE.
				if (skel.vars.browser == 'ie') {
					$window.on('resize.ie-banner-fix', function() {

						var h = $banner.height();

						if (h > $window.height())
							$banner.css('height', 'auto');
						else
							$banner.css('height', h);

					}).trigger('resize.ie-banner-fix');
				}

		// Dropdowns.
			$('#nav > ul').dropotron({
				alignment: 'right',
				hideDelay: 350,
				baseZIndex: 100000
			});

		// Menu.
			$('<a href="#navPanel" class="navPanelToggle">Menu</a>')
				.appendTo($header);

			$(	'<div id="navPanel">' +
					'<nav>' +
						$('#nav') .navList() +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
					'</div>')
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						target: $body,
						visibleClass: 'is-navPanel-visible',
						side: 'right'
					});

			if (skel.vars.os == 'wp'
			&&	skel.vars.osVersion < 10)
				$('#navPanel')
					.css('transition', 'none');

			// Spotlights.
				$('.spotlight').scrollex({
					top:		'30vh',
					bottom:		'30vh',
					delay:		25,
					initialize:	function() {
						$(this).addClass('is-inactive');
					},
					terminate:	function() {
						$(this).removeClass('is-inactive');
					},
					enter:		function() {
						$(this).removeClass('is-inactive');
					}
				});

			// Tabs.
				$('.tabs').selectorr({
					titleSelector: 'h4',
					delay: 250
				});

			// Quotes.
				$('.quotes > article')
					.each(function() {

						var	$this = $(this),
							$image = $this.find('.image'),
							$img = $image.find('img'),
							x;

						// Assign image.
							$this.css('background-image', 'url(' + $img.attr('src') + ')');

						// Set background position.
							if (x = $img.data('position'))
								$this.css('background-position', x);

						// Hide image.
							$image.hide();

					});
			// Kudos
			$('.kudos').slick({
		    dots: true,
		    infinite: true,
		    autoplay: true,
		    autoplaySpeed: 6000,
		    speed: 800,
		    slidesToShow: 1,
		    adaptiveHeight: true
		  });
		  $( document ).ready(function() {
		    $('.no-fouc').removeClass('no-fouc');
		  });
	});

})(jQuery);
