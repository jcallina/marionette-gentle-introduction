ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _){
  List.Layout = Marionette.Layout.extend({
    template: "#contact-list-layout",

    regions: {
      panelRegion: "#panel-region",
      contactsRegion: "#contacts-region"
    }
  });

  List.Panel = Marionette.ItemView.extend({
    template: "#contact-list-panel"
  });

  List.Contact = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#contact-list-item",

    events: {
      "click": "highlightName",
      "click td a.js-show": "showClicked",
      "click td a.js-edit": "editClicked",
      "click button.js-delete": "deleteClicked"
    },

    flash: function(cssClass){
      var $view = this.$el;
      $view.hide().toggleClass(cssClass).fadeIn(800, function(){
        setTimeout(function(){
          $view.toggleClass(cssClass)
        }, 500);
      });
    },

    highlightName: function(e){
      this.$el.toggleClass('warning');
    },

    showClicked: function(e){
      e.preventDefault();
      e.stopPropagation();
      this.trigger("contact:show", this.model);
    },

    editClicked: function(e){
      e.preventDefault();
      e.stopPropagation();
      this.trigger("contact:edit", this.model);
    },

    deleteClicked: function(e){
      e.stopPropagation();
      this.trigger("contact:delete", this.model);
    },

    remove: function(){
      this.$el.fadeOut(function(){
        $(this).remove();
      });
    }
  });

  List.Contacts = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-hover",
    template: "#contact-list",
    itemView: List.Contact,
    itemViewContainer: "tbody"
  });
});