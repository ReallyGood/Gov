function addCandidate(name) {
    Candidates.insert({
        name: name,
        createdBy: Meteor.user()._id
    }, function(err) {
        if(!err) console.log('Added candidate ' + name);
    })
}

Template['addCandidate'].helpers({
});

Template['addCandidate'].events({
    'submit .add-candidate': function(ev, view) {
        ev.preventDefault();
        var name = $.trim(view.find('[name=candidate-name]').value);
        addCandidate(name);
    }
});
