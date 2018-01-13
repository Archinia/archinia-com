window.onload = function() {

document.getElementById('nav').innerHTML =
  '<ul>\n' +
    '<li class="opener" style="user-select: none; cursor: pointer; white-space: nowrap; opacity: 1;"><a href="services.html" class="icon fa-angle-down">Services</a>\n'+
      '<ul class="" style="user-select: none; display: none; position: absolute;">\n'+
        '<li style="white-space: nowrap;"><a href="our-work/community-engagement-content-creation.html" style="display: block;">Community Engagement + Content Creation</a></li>\n'+
        '<li style="white-space: nowrap;"><a href="our-work/design-research-development.html" style="display: block;">Design Research + Development</a></li>\n'+
        '<li style="white-space: nowrap;"><a href="our-work/historic-preservation.html" style="display: block;">Historic Preservation</a></li>\n'+
      '</ul>\n'+
    '</li>\n'+
    '<li style="white-space: nowrap;"><a href="https://medium.com/archinia">Blog</a></li>\n'+
    '<li class="opener" style="user-select: none; cursor: pointer; white-space: nowrap; opacity: 1;">\n'+
      '<a href="about.html" class="icon fa-angle-down">About</a>\n'+
      '<ul class="" style="user-select: none; display: none; position: absolute;">\n'+
        '<li style="white-space: nowrap;"><a href="about/our-work.html">Archinia</a></li>\n'+
        '<li style="white-space: nowrap;"><a href="about/a4e.html">Architecture for EveryBody</a></li>\n'+
        '<li style="white-space: nowrap;"><a href="about/rachel-preston-prinz.html">Our Founder Rachel Prinz</a></li>\n'+
      '</ul>\n'+
    '</li>\n'+
    '<li style="white-space: nowrap;"><a href="mailto:intentiondesign@gmail.com" rel="nofollow">Contact</a></li>\n'+
  '</ul>\n';
}
