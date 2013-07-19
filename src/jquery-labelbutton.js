(function($, win, doc){

	$.extend($, {
		/**
		 * Return a formatted string by arguments
		 * This only supports "%s"
		 *
		 * @param String tmpl
		 * @param String value1, value2, value3 ...
		 */
		_sprintf: function(/* tmpl, value1, value2, value3 */){
			var args, tmpl;
			args = $.makeArray(arguments);
			tmpl = args.shift();
			return tmpl.replace(/%s/g, function(){
				if(args.length){
					return args.shift();
				}
				return "";
			});
		}
		
	});

	$.fn.extend({

		/**
		 * Get grouped input elements
		 * They have the same type attribute and the same name
		 * Maybe checkbox or radio
		 */
		getGroup: function(){
			var selector = $._sprintf(
				"input[type=%s][name=%s]", 
				this.prop("type"),
				this.prop("name")
			);
			return $(selector);
		},

		/**
		 * Initialize label button (which has hidden radio or checkbox in it)
		 * Options:
		 * - activeClass:String = Class name for activated label element
		 *
		 * @param Object options
		 */
		labelButton: function(options){
			var my = {};

			// Options
			my.options = $.extend({
				activeClass: "active"
			}, options);

			// Keys for $.data
			my.keys = {
				group: "labelButtonGroup",
				init: "labelButtonInit"
			};

			// Check the element is valid
			// It must be like label>input[type=radio|checkbox]
			my.validate = function(node){
				return (node.get(0).nodeName === "INPUT")
				&& ($.inArray(node.prop("type"), ["radio", "checkbox"]) >= 0)
				&& (node.closest("label").length > 0);
			};

			// Refresh the grouped buttons
			my.refresh = function(ele){
				$(ele).data(this.keys.group).each(function(){
					var node = $(this);
					node.closest("label").toggleClass(
						my.options.activeClass,
						node.prop("checked")
					);
				});
			};

			// Emulate change event for hidden input
			// For IE8 or lower
			my.emulateChange = function(node){
				if(! win.ActiveXObject || doc.getSelection){
					return;
				}
				node.closest("label").on("click", function(){
					var input, checked;
					input = $(this).find("input");
					checked = input.prop("type") === "radio" ? true : ! input.prop("checked");
					input.prop("checked", checked).trigger("change");
				});
			};

			this.each(function(){
				var ele, node;
				if(this.nodeName === "LABEL"){
					node = $(this).find("input");
					ele = node.get(0);
				} else {
					ele = this;
					node = $(ele);
				}
				if(! my.validate(node)){
					return;
				}
				node.data(my.keys.group, node.getGroup());
				if(! node.data(my.keys.init)){
					node.on("change", function(){
						my.refresh(this);
					});
					my.emulateChange(node);
					node.data(my.keys.init, true);
				}
				my.refresh(ele);
			});

			return this;
		}

	});

}(jQuery, window, document));