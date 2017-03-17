var Cat = function() {
  this.clickCount = ko.observable(0);
  this.name = ko.observable('Tabby');
  this.imgSrc = ko.observable('img/434164568_fea0ad4013_z.jpg');
  this.imgAttribution = ko.observable('https://www.flickr.com');

  this.levelArray = ko.observableArray(['not old enough to know better',
                                        'old enough to know better',
                                         'not old enough to know',
                                          'old enough to know',
                                           'not old enough',
                                           'old enough',
                                           'not old',
                                           'old',
                                           'not']);

  this.nicknames = ko.observableArray([
    { nick:'Scamp' },
    { nick:'Fluffoid' },
    { nick:'Purr-Monster' },
    { nick:'Marvin' }
  ])

  this.level = ko.computed(function() {
    var numLevel = Math.floor(this.clickCount() / 10);
    if (numLevel >= this.levelArray().length) {
      numLevel = this.levelArray().length - 1;
    }
    return this.levelArray()[numLevel];
  }, this);

}


var ViewModel = function() {
  // Note: In KO, the only time we need to write ViewModel methods is when we need to actually cahnge something ourselves (KO does the rest).

  this.currentCat = ko.observable( new Cat() );

  this.incrementCounter = function() {
    //Now that clickCount lives in currentCat, we must specify this IN BOTH PLACES!!!
    this.currentCat().clickCount(this.currentCat().clickCount() + 1);
  };
};

// For Now, let's just start our app like this...
// NOTE: We need to tell ko to apply our bindings to this ViewModel, or it will never get run.
ko.applyBindings(new ViewModel());
