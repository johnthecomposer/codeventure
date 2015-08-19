
//literals
	//collections
	var books = {name: 'books'};
	var pages = {name: 'pages'};
	var choices = {name: 'choices'};

//constructors (bookfactory prototypes)
	var Book = function (title, author){
		this.title = title,
		this.author = author
	}

	var Page = function (name, narrative){
		this.name = name,
		this.narrative = narrative
	}
	
	var Choice = function (target, description){
		this.target = target,
		this.description = description
		//assigning a unique identifier to a choice allows it to be used on more than one page
			var UID = performance.now() + '_' + (Math.random() * 100);
		this.id = this.target + '_' + UID;
	}


	
//accessors
	//setters
	Choice.prototype.setTarget = function(book, target){
		var error = 'Error: ';
		//validate
			if(!book['pages'][target]){
				error += 'this page doesn\'t exist';
			}
			else{
				this.target = target;
			}

		//render
			//call renderer
		//persist
			//call persistor?
	}

	Choice.prototype.datatype = 'string';
	Choice.prototype.charlimit = 300;
	
	Choice.prototype.setDescription = function(description){
		var error = 'Error: ';
		if(typeof description !== this.datatype || description.length > this.charlimit){
				error += 'please enter a valid string of less than ' + this.charlimit + 'characters';				
		}
		else{
			this.description = description;
		}	
	}

	//getters
	Choice.prototype.getInfo = function(){
	}

	//destroyers
	Choice.prototype.destroyMe = function(){
		//find and delete all references to the object and the object itself
		//return 'deleted' + ' ' + this.description
	}
	

//rendering
	//define containers
		var infoContainers = ['.info'];
		var userForms = [$('#choicesform'), $('#pageform')];

		
	var renIt = function(content){
	//info containers
		for(container in infoContainers){
			$('<div>' + content + '</div>').attr('class', 'info').appendTo($(infoContainers[container]));
		}

	//userforms
	}

//persistence
	//add object to parent object with custom property name
		//if this object has an id property, use it
		//if not, use name
		//else, use title

	var pshIt = function(obj, p_obj){
		if(obj.id){
			var prp = obj.id;
		}
		else if(obj.name){
			var prp = obj.name;
		}
		else{
			var prp = obj.title;
		}
		p_obj[prp] = obj;
	} 

	//save to local storage


//functions to extend prototypes	
//listeners
	

	//add listeners to prototypes
	var addListeners = function(){
		if(!this.listeners){
			this.listeners = [];
		}
		for(listener in arguments){
			this.listeners.push(arguments[listener]);
		}
	}
	
	//invoke listeners
	var listenup = function(){
	  for(var i = 0; i < this.listeners.length; i++){
		this.listeners[i](this);
	  }
	}
	

	//create eventlog	
	var logevent = function(){
		if(!this.eventlog){
			this.eventlog = [];
		}
			for(prp in this){
				var thisevent = this[prp];
				if(typeof thisevent !== 'function' && typeof thisevent !== 'object' && prp !== 'eventlog'){
					if(!this.eventlog[prp]){
						
						this.eventlog[prp] = [];
					}
				var lastindex = this.eventlog[prp].length - 1;
				var lastevent = this.eventlog[prp][lastindex];				
				var changed = '';
				changed += thisevent == lastevent ? '' : 'changed ' + prp + ' from ' + lastevent + ' to ' + thisevent + '\n';
					changed ? this.eventlog[prp].push(thisevent) : '';
				}
			}
		alert(changed);
	}




//extend bookfactory prototypes
	//Book.prototype.addListeners = addListners;
	//Page.prototype.addListeners = addListeners;
	//Choice.prototype.addListeners = addListeners;
	

	Book.prototype.logevent = logevent;
	Page.prototype.logevent = logevent;
	Choice.prototype.logevent = logevent;
	
//calls
	$(document).ready(function(){

		//create a book
		var codeventure = new Book('Codeventure', 'John');

		codeventure.logevent();
		codeventure.author = 'Johnz';
		codeventure.logevent();
		codeventure.author = 'Cody';		
		codeventure.logevent();
		pshIt(codeventure, books);

		
		//create pages
		var home = new Page('home', 'This is the starting place.');
		var theinn = new Page('the inn', 'The inn is nice.');
		var themountains = new Page('the inn', 'Go to the mountains?');
		pshIt(home, pages);
		pshIt(theinn, pages);
		pshIt(themountains, pages);
		pshIt(pages, books['Codeventure']);
		pages.logevent = logevent;
		//pages.logevent();
		
		//create choices
		var theinn = new Choice('theinn', 'Go to the inn?');
		var themountains = new Choice('mountains', 'Go to the mountains?');
		pshIt(theinn, choices);
		pshIt(themountains, choices);
		pshIt(choices, pages['home']);	
		choices.logevent = logevent;
		//choices.logevent();
		

		//pshIt(codeventure, books);
			
		
		//books.logevent();
		//render
		//renIt(books);
		
		//console.log(books);
		
	});

