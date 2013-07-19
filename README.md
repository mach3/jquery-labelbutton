
# jQuery-labelButton

jQuery plugin to buttonize label elements which has hidden input element in it

## Feature

- Let label elements behave like toggle button
- They must have input elements in it (They may be hidden by CSS)
- Emulate change events when label is clicked for IE8 ow lower

## Usage

See simple example below.

```html
<div class="toggl-buttons">
    <label><input type="radio" name="myradio" value="Foo" checked>Foo</label>
    <label><input type="radio" name="myradio" value="Bar">Bar</label>
    <label><input type="radio" name="myradio" value="Baz">Baz</label>
</div>
```

Markup is like this. then, stylize the label and input.

```css
label {
    display: inline-block;
    padding: .3em .5em;
}
label input[type=radio]{
    display: none;
}
label.active {
    color: #0066cc;
}
```

This just hide inputs inside labels,
and let label elements to be inline-block, to let them behave as button.

```javascript
$("input[name=myradio]").labelButton(); // pass input element
// or
$(".toggle-buttons label").labelButton(); // you can pass label element
```

Initialize label or input with $.fn.labelButton().

Then, label element which has checked element will be activated with "active" css class.
This "activated" status will be updated when input's "change" event is triggered.

## Dynamically Inserted Label Button

You want to insert new label button dynamically after initalization ?
Just call $.fn.labelButton() again. (See demo)

## Author

mach3 @ <http://github.com/mach3>

- [Website](http://www.mach3.jp)
- [Blog](http://blog.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)

