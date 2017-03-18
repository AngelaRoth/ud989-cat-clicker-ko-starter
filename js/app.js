var initialCats = [
  {
    clickCount: 0,
    name: 'Tabby',
    imgSrc: 'img/434164568_fea0ad4013_z.jpg',
    imgAttribution: 'https://www.flickr.com',
    nicknames: [
      { nick:'Scamp' },
      { nick:'Fluffoid' },
      { nick:'Purr-Monster' },
      { nick:'Marvin' }
    ]
  },
  {
    clickCount: 0,
    name: 'Tiger',
    imgSrc: 'img/1413379559_412a540d29_z.jpg',
    imgAttribution: 'https://www.flickr.com',
    nicknames: [
      { nick:'Wilda' },
      { nick:'Pedro' }
    ]
  },
  {
    clickCount: 0,
    name: 'Scaredy',
    imgSrc: 'img/22252709_010df3379e_z.jpg',
    imgAttribution: 'https://www.flickr.com',
    nicknames: [
      { nick:'Whizz' },
      { nick:'Grrrr' },
      { nick:'Spook' }
    ]
  },
  {
    clickCount: 0,
    name: 'Bombo',
    imgSrc: 'img/4154543904_6e2428c421_z.jpg',
    imgAttribution: 'https://www.flickr.com',
    nicknames: [
      { nick:'oops' }
    ]
  },
  {
    clickCount: 0,
    name: 'Shadow',
    imgSrc: 'img/9648464288_2516b35537_z.jpg',
    imgAttribution: 'https://www.flickr.com',
    nicknames: [
      { nick:'Zimba' },
      { nick:'Zomba' },
      { nick:'Zumba' },
      { nick:'Zoof' }
    ]
  }
];

var Cat = function(data) {
  this.clickCount = ko.observable(data.clickCount);
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);
  this.imgAttribution = ko.observable(data.imgAttribution);
  this.nicknames = ko.observableArray(data.nicknames);

  this.levelArray = ko.observableArray(['not old enough to know better',
                                        'old enough to know better',
                                         'not old enough to know',
                                          'old enough to know',
                                           'not old enough',
                                           'old enough',
                                           'not old',
                                           'old',
                                           'not']);


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

  var self = this;

  this.catList = ko.observableArray([]);

  initialCats.forEach(function(catItem) {
    self.catList.push( new Cat(catItem))
  });

  this.currentCat = ko.observable( this.catList()[0] );

  this.setCurrentCat = function(clickedCat) {
    self.currentCat(clickedCat);
    // NOTE: When you click on something and it runs a function, it passes in the object you clicked on; specifically the model we're talking about.
    // With NO PARAMETERS PASSED IN, this works ==> self.currentCat( this );
  };


  this.incrementCounter = function() {
    //Now that clickCount lives in currentCat, we must specify this IN BOTH PLACES!!!
    // this.currentCat().clickCount(this.currentCat().clickCount() + 1);
    //UNTIL we apply the "with" binding in our view! Then we no longer need to. BEFORE, when we clicked on the cat, we were clicking on the ViewModel BINDING CONTEXT; we had not yet created a new binding context with the "with" binding, so when we clicked on the image we were effectively within the binding context of the ViewModel. But with the use of "with," when you click on the image, you are WITHIN THE BINDING CONTEXT of currentCat; now, "this" represents the binding context of the current cat.
    // ==> this.clickCount(this.clickCount() + 1);
    //ALTERNATELY, you could make "var self = this" (as a variable of the ViewModel) and then, inside this function, say ==>
    // self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    //==> Now we're not using "this," which represents the binding context when you click on increment counter; we're talking about "self" which represents the ViewModel.
    this.clickCount(this.clickCount() + 1);
  };
};

// For Now, let's just start our app like this...
// NOTE: We need to tell ko to apply our bindings to this ViewModel, or it will never get run.
ko.applyBindings(new ViewModel());
