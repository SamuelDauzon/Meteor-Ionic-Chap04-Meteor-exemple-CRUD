import { Template } from 'meteor/templating';

Template.ajouterMessage.events({
  'submit form': function(event) {
    event.preventDefault();
    var message = event.target.message.value;
    MessagesCollection.insert({
      message: message,
      dateEnvoi: new Date(),
    });
    event.target.message.value = '';
    event.stopPropagation();
  }
});

Template.listerMessages.helpers({
  'messages': function() {
    return MessagesCollection.find();
  }
});

Template.listerMessages.events({
  'submit form[name="modifierMessage"]': function(event) {
    event.preventDefault();
    var message = event.target.message.value;
    var _id = event.target._id.value;
    MessagesCollection.update({
        _id: _id
      },
      {$set: {
        message: message,
        dateEnvoi: new Date(),
      }}
    );
    event.stopPropagation();
  },
  'submit form[name="supprimerMessage"]': function(event) {
    event.preventDefault();
    var _id = event.target._id.value;
    MessagesCollection.remove({
      _id: _id
    });
    event.stopPropagation();
  }
});