define([
  'jquery',
  'underscore',
  'backbone',
  'views/modal',
  'views/alert',
  'text!templates/modalDetachHost.html'
], function($, _, Backbone, ModalView, AlertView, modalDetachHostTemplate) {
  'use strict';
  var ModalDetachHostView = ModalView.extend({
    className: 'detach-host-modal',
    template: _.template(modalDetachHostTemplate),
    title: 'Detach Host',
    okText: 'Detach',
    body: function() {
      return this.template(this.model.toJSON());
    },
    onOk: function() {
      this.setLoading('Detaching host...');
      this.model.destroy({
        success: function() {
          this.close(true);
        }.bind(this),
        error: function() {
          this.clearLoading();
          this.setAlert('danger',
            'Failed to detach host, server error occurred.');
        }.bind(this)
      });
    }
  });

  return ModalDetachHostView;
});
