jQuery(function(){

  var tabTitles = jQuery('.tab-titles a');
  var tabSections = jQuery('.tab-sections form');

  var activeClassName = "active";

  tabTitles.click(function(e){
    if (!jQuery(e.target).hasClass(activeClassName)) {
      jQuery(e.target).parent().siblings().children('a').removeClass(activeClassName);
      jQuery(e.target).addClass(activeClassName);
      var index = tabTitles.index(e.target);
      jQuery(tabSections[1 - index]).removeClass(activeClassName);
      jQuery(tabSections[index]).addClass(activeClassName);
    }
  });


  var closeForm = jQuery('.close-form-trigger');

  closeForm.click(function(){
    jQuery('.bc-auth-form').removeClass('open');

    tabTitles.removeClass('active');
    tabSections.removeClass('active');
  });

  var authFormTriggers = jQuery('.trigger-auth-form');

  authFormTriggers.click(function(e){
    e.preventDefault();

    var index = jQuery(e.target).data('form-index');

    jQuery(tabTitles[index]).addClass('active');
    jQuery(tabSections[index]).addClass('active');

    jQuery('.bc-auth-form').addClass('open');
  });

});



/*******
User.html
********/

var $ = jQuery;

var body = $("body"),
    campaignOverlay = $("#campaign-modal .overlay"),
    campaignTrigger = $("#campaign-open");

campaignOverlay.click(function(e){
  e.preventDefault();
  body.removeClass('open-campaign');
});

campaignTrigger.click(function(e){
  e.preventDefault();
  body.addClass('open-campaign');
});

function hasClass(className, element){
  var classList = element.className.split(' '),
      index = classList.indexOf(className);

  return index !== -1 ? true : false;
}

function removeClass(className, element){
  var classList = element.className.split(' '),
      index = classList.indexOf(className);
  classList.splice(index, 1);
  element.className = classList.join(' ');
}


function addClass(className, element){
  var classList = element.className.split(' ');
  classList.push(className);
  element.className = classList.join(' ');
}

(function(){


  var input = document.querySelectorAll('.text-input-group input');

  var inputClassName = 'inputFocused',
      inputHasValue = 'inputHasValue';

  window.onload = function(e){
    [].slice.call(input).forEach(function(element){
      if (element.value.length > 0) {
        addClass(inputHasValue, element.parentNode);
      }
     });
  };

  [].slice.call(input).forEach(function(element){

    element.addEventListener('focus', function(e){
      addClass(inputClassName, element.parentNode);
    });

    element.addEventListener('blur', function(e){
      if (hasClass(inputClassName, element.parentNode)) {
        removeClass(inputClassName, element.parentNode);
      }
      if (e.target.value.length > 0) {
        addClass(inputHasValue, element.parentNode);
      }else{
        if (hasClass(inputHasValue, element.parentNode)) {
          removeClass(inputHasValue, element.parentNode);
        }
      }

    });

  });

})();



(function(){


  var loginForm = document.querySelector('#loginForm');
  var registerForm = document.querySelector('#registerForm');

  var formSections = registerForm.querySelectorAll('section');

  [].slice.call(formSections).forEach(function(section){
    console.log(section);
    var nextAction = section.querySelector('.next-action');

    nextAction.addEventListener('click', function(){
      var nextSection = document.querySelector('#' + nextAction.getAttribute('data-next-section'));
      removeClass('active', section);
      addClass('active', nextSection);
    });

  });

})();
