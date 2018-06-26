/*
  MIT License
	Copyright (c) 2018 Ezra Rieben
  https://github.com/ezrarieben/

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
;
(function($) {
  $.fn.extend({
    cookiez: function(options) {
      this.defaultOptions = {
        autoLang: true,
        defaultLang: 'en',
        animation: 'slide',
        fadeTime: 350,
        cookieConfName: 'cookie-warning-confirmed',
        i18n: {
          en: {
            cookieWarning: "In oder to give you the best possible experience, this website uses cookies. By closing this message, you consent to cookies being saved on your device (unless you have them disabled) in accordance with the cookie policy.",
            btnClose: "OK",
          },
          de: {
            cookieWarning: "Um unsere Webseite für Sie optimal gestalten zu können, verwenden wir Cookies. Durch die weitere Nutzung der Webseite stimmen Sie der Verwendung von Cookies zu. Weitere Informationen zu Cookies erhalten Sie in unserer Datenschutzerklärung.",
            btnClose: "OK",
          }
        },
        elements: {
          selectors: {
            wrapper: '.cookie-warning',
            text: '.cookie-warning-text',
            btnClose: '.cookie-warning-close'
          }
        },
        customLanguages: {}
      };


      var settings = $.extend({}, this.defaultOptions, options);
      var functions = {
        getCookie: function(cookieName){
          var name = cookieName + "=";
          var decodedCookie = decodeURIComponent(document.cookie);
          var cookieArray = decodedCookie.split(';');
          for (var i = 0; i < cookieArray.length; i++) {
            var c = cookieArray[i];
            while (c.charAt(0) == ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
            }
          }
          return "";
        },
        getLang: function(){
          var userLocale = navigator.language || navigator.userLanguage;
          var userLanguage = userLocale.split('-')[0];
          if ((settings.i18n.hasOwnProperty(userLanguage) || settings.customLanguages.hasOwnProperty(userLanguage)) && settings.autoLang) {
            return userLanguage;
          } else {
            return settings.defaultLang;
          }
        },
        toggleWarning: function() {
          if (this.getCookie(settings.cookieConfName) === '') {
            if(settings.customLanguages.hasOwnProperty(this.getLang())){
              $(settings.elements.selectors.wrapper).find(settings.elements.selectors.text).html(settings.customLanguages[this.getLang()].cookieWarning);
              $(settings.elements.selectors.wrapper).find(settings.elements.selectors.btnClose).html(settings.customLanguages[this.getLang()].btnClose);
            } else {
              $(settings.elements.selectors.wrapper).find(settings.elements.selectors.text).html(settings.i18n[this.getLang()].cookieWarning);
              $(settings.elements.selectors.wrapper).find(settings.elements.selectors.btnClose).html(settings.i18n[this.getLang()].btnClose);
            }

            if (settings.animation === 'slide') {
              $(settings.elements.selectors.wrapper).slideToggle();
            } else if (settings.animation === 'fade') {
              $(settings.elements.selectors.wrapper).fadeIn(settings.fadeTime);
            }
          }
        },
        confirmWarning: function() {
          if (this.getCookie(settings.cookieConfName) === '') {
            document.cookie = settings.cookieConfName + "=true; path=/";
            if (settings.animation === 'slide') {
              $(settings.elements.selectors.wrapper).slideToggle();
            } else if (settings.animation === 'fade') {
              $(settings.elements.selectors.wrapper).fadeIn(settings.fadeTime);
            }
          }
        }
      }

      return this.each(function() {
        var _this = $(this);

        // cookiez elements used
        var elements = {
          wrapper: _this,
          text: _this.find(settings.elements.selectors.text),
          btnClose: _this.find(settings.elements.selectors.btnClose),
        };

        functions.toggleWarning();

        /**
         * Add event handler for confirm button
         */
        elements.btnClose.on('click', function() {
          functions.confirmWarning();
        });
      });
    }
  });
})(jQuery)
