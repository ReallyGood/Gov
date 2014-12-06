Meteor.publish('Candidates', function () {
  return Candidates.find();
});
