Meteor.subscribe('Candidates');
Template['candidatesList'].helpers({
    list: function() {
        return Candidates.find({});
    }
});

Template['candidatesList'].events({
});
