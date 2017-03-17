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
    // this.currentCat().clickCount(this.currentCat().clickCount() + 1);
    //UNTIL we apply the "with" binding in our view! Then we no longer need to. BEFORE, when we clicked on the cat, we were clicking on the ViewModel BINDING CONTEXT; we had not yet created a new binding context with the "with" binding, so when we clicked on the image we were effectively within the binding context of the ViewModel. But with the use of "with," when you click on the image, you are WITHIN THE BINDING CONTEXT of currentCat; now, "this" represents the binding context of the current cat.
    //ALTERNATELY, you could make "var self = this" (as a variable of the ViewModel) and then, inside this function, say ==>
    // self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    //==> Now we're not using "this," which represents the binding context when you click on increment counter; we're talking about "self" which represents the ViewModel.
    this.clickCount(this.clickCount() + 1);
  };
};

// For Now, let's just start our app like this...
// NOTE: We need to tell ko to apply our bindings to this ViewModel, or it will never get run.
ko.applyBindings(new ViewModel());
