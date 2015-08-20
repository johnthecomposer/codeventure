//literals
	//collections
	var books = {name: 'books'};
	var pages = {name: 'pages'};
	var choices = {name: 'choices'};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
		//set validation properties with literal values directly
		this.datatype = 'string';
		this.charlimit = 300;
		this.target = target,
		this.description = description
		//assigning a unique identifier to a choice allows it to be used on more than one page
			var UID = performance.now() + '_' + (Math.random() * 100);
		this.id = this.target + '_' + UID;
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var sayhi = function(){alert('hi')};	
//accessors
	//setters
			//book setters
			var setTitle = function(title){
				this.title = title;
			}
			var setAuthor = function(author){
				this.author = author;
			}
			
			//page setters
			var setName = function(name){
				this.name = name;
			}
			var setNarrative = function(narrative){
				this.narrative = narrative;
			}

			//choice setters
			var setTarget = function(book, target){
				var error = 'Error: ';
				//validate
					if(!book['pages'][target]){
						error += 'this page doesn\'t exist';
					}
					else{
						this.target = target;
					}
				//render
				//persist
			}

			var setDescription = function(description){
				var error = 'Error: ';
				if(typeof description !== this.datatype || description.length > this.charlimit){
						error += 'please enter a valid string of less than ' + this.charlimit + 'characters';				
				}
				else{
					this.description = description;
				}
			}
			
		//add setters to prototypes
		var addSetters = function(){
			if(!this.setters){
				this.setters = [];
			}
			for(var i = 0; i < arguments.length; i++){

				this.setters.push(arguments[i]);
				this.setters[i] = arguments[i];
			}
		}


	Book.prototype.addSetters = addSetters;
	Page.prototype.addSetters = addSetters;	
	Choice.prototype.addSetters = addSetters;
	
	Book.prototype.addSetters(setTitle, setAuthor);	
	Page.prototype.addSetters(setName, setNarrative);
	Choice.prototype.addSetters(setTarget, setDescription);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//getters

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//destroyers
	Choice.prototype.destroyMe = function(){
		//find and delete all references to the object and the object itself
		//return 'deleted' + ' ' + this.description
	}
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//rendering
	//define containers
	var infoContainers = ['.info'];
	var userForms = [$('#choicesform'), $('#pageform')];
	
	//render
	var renIt = function(content){
		var tag = 'div';
		if(typeof content === 'object'){
			// Indent with tabs
			content = JSON.stringify(content, null, '\t');
			tag = 'pre';
			var opn = '<>';
			var cls = '</>';
			var opn_tag = insertAfter(opn, '<', tag, 1);
			var cls_tag = insertAfter(cls, '</', tag, 1);
		}
		else{
		}

		//render in info containers
			for(container in infoContainers){
				$(opn_tag + content + cls_tag).attr('class', 'info').appendTo($(infoContainers[container]));
			}
		//render in userforms
			
	}

//persistence
	
	//add object to parent object with custom property name; if this object has an id property, use it
		//if not, use name; else, use title

	var pshIt = function(obj, p_obj){
		//alert(obj['name']);
		if(obj.hasOwnProperty('id') && obj.id){
			var prp = obj.id;
		}
		else if(obj.hasOwnProperty('title') && obj.title){
			var prp = obj.title;
		}
		else{
			var prp = obj.name;
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

	//make properties private and only allow changes through setters
		
	
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
		//console.log(changed);
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
		var codeventure = new Book('codeventure', 'John');
			codeventure.logevent();
		
		codeventure.author = 'Johnz';
			codeventure.logevent();
		codeventure.author = 'Cody';
			codeventure.logevent();
		
		pshIt(codeventure, books);
			codeventure.logevent();
			
			codeventure.test = 'test';
			codeventure.logevent();


		
		//create pages
		var home = new Page('home', 'This is the starting place.');
		var inn = new Page('inn', 'The inn is nice.');
		var mountains = new Page('mountains', 'Go to the mountains?');

		
		pshIt(home, pages);
			home.logevent();
		pshIt(inn, pages);
			inn.logevent();
		pshIt(mountains, pages);
			mountains.logevent();


		//console.log(pages);		
		console.log(books);
			
			

		//pshIt(pages, codeventure);
		//	codeventure.logevent();
		
		
		//create choices

		var theinn = new Choice('theinn', 'Go to the inn?');
			//choices.logevent();

		var themountains = new Choice('mountains', 'Go to the mountains?');
			//choices.logevent();
			
			
		pshIt(theinn, choices);
			//choices.logevent();
		pshIt(themountains, choices);
			//choices.logevent();
		
		
		
		pshIt(choices, pages['home']);	
			//pages['home'].logevent();
		pshIt(pages, books['codeventure']);
			//codeventure.logevent();	
		pshIt(codeventure, books);
			
		


		
		//console.log(books);		


		//render
		renIt(books);
	});

