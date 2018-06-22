# cookie-z
A jquery plugin that shows a GDPR compliant cookie warning according to the language set on the users device.
## Setting up cookie-z
1. Import the [jQuery library](https://code.jquery.com/ "jQuery's CDN Page")
2. Load the cookie-z script in your HTML after the body
```html
<script type="text/javascript" src="jquery.cookie-z.min.js"></script>
```
3. Create the template for the cookie warning on your page. Example:
```html
<div class="cookie-warning">
  <div class="cookie-warning-inner">
    <p class="cookie-warning-text"></p>
    <button class="cookie-warning-close">OK</button>
  </div>
</div>
```
4. Call the cookie-z plugin on the wrapper of your cookie warning
```javascript
$('.cookie-warning').cookiez();
```
## Changing defaults
1. Use JSON to change the options
    1. Example of disabling automated language detection, setting the default language and changing the animation to fade:
        ```javascript
        $('.cookie-warning').cookiez({
          autoLang: false,
          defaultLang: 'en',
          animation: 'fade',
        });
        ```
### Available options
> **NOTE:** if you set `autoLang` to false it will use the default language's text

>**NOTE:** if you want to overwrite a language use the `customLanguages` JSON Array

| Option                     | Description                                                               | Default value | Var type  |
| -------------------------- | ------------------------------------------------------------------------- | ------------- | --------- |
| `autoLang`                 | Turning automated language detection on or off.                           | `true`        | `boolean` |
| `defaultLang`              | Locale of the language to use if the detected language is not found       | `en`          | `string`  |
| `animation`                | Change the animation of toggling the cookie warning (`slide` or `fade`)   | `slide`       | `string`  |
| `fadeTime`                 | Speed of the fade animation (in miliseconds)                              | `350`         | `integer` |
| `cookieConfName`           | Name of the cookie to set when the user has confirmed         | `cookie-warning-confirmed`| `string`  |
| `customLanguages.[locale].cookieWarning`| Cookie warning text for a custom language                    | `(check src)` | `string`  |
| `customLanguages.[locale].btnClose`   | Confirm button Text for a custom language                      | `(check src)` | `string`  |
| `elements.selectors.wrapper`| Selector for the cookie warning wrapper                              | `.cookie-warning` | `string`  |
| `elements.selectors.text`  | Selector for the element to place the warning into               | `.cookie-warning-text` | `string`  |
| `elements.selectors.btnClose` | Selector for the element the user clicks on to confirm       | `.cookie-warning-close` | `string`  |
## Predefined languages
1. English
2. German
### Adding your own language
1. When calling the cookie-z plugin add the `cutomLanguages` JSON Array to the parameters as follows:
```javascript
  $('.cookie-warning').cookiez({
      customLanguages: {
        fb: {
          cookieWarning: "foo",
          btnClose: "bar"
        }
      }
    });
```
> **NOTE:** the locale of the language in this example is `fb`. After defining the custom language, you can use it as a default language with the `defaultLang` option.
