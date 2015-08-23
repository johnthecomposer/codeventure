//literals
	//collections
	var books = {name: 'books'};
	var pages = {name: 'pages'};
	var choices = {name: 'choices'};
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//jcjs pending categorization


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//constructors (bookfactory prototypes)
	function Book(title, author){
		this.title = title,
		this.author = author
	}

	function Page(name, narrative){
		this.name = name,
		this.narrative = narrative
	}
	
	function Choice(target, description){
		//set validation properties with literal values (ones that aren't functions) directly.
		//q_design: should these be separated into a collection of config functions?
		this.datatype = 'string';
		this.charlimit = 300;
		this.target = target,
		this.description = description
		//assigning a unique identifier to a choice allows it to be used on more than one page
			var UID = performance.now() + '_' + (Math.random() * 100);
		this.id = this.target + '_' + UID;
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//accessors
	//setters
			//book setters
			function setTitle(title){
				this.title = title;
			}
			function setAuthor(author){
				this.author = author;
			}
			
			//page setters
			function setName(name){
				this.name = name;
			}
			function setNarrative(narrative){
				this.narrative = narrative;
			}

			//choice setters
			function setTarget(book, target){
				var error = 'Error: ';
				//validate
					if(!book['pages'][target]){
						error += 'this page doesn\'t exist';
					}
					else{
						this.target = target;
					}
			}
			function setDescription(description){
				var error = 'Error: ';
				if(typeof description !== this.datatype || description.length > this.charlimit){
						error += 'please enter a valid string of less than ' + this.charlimit + 'characters';				
				}
				else{
					this.description = description;
				}
			}

		//function for adding setters to prototypes
			//takes function names as arguments
		function addSetters(){
			for(var i = 0; i < arguments.length; i++){
				//add methods passed as arguments to this
				arguments[i].function_class = 'setter';
				this[arguments[i].name] = arguments[i];
			}
		}
		

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//listeners for all functions
		//create eventlog	
		function logevent(){
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
			//if changed, do stuff
		};

	//invoke listeners
	function listenup(){
	  for(var i = 0; i < this.listeners.length; i++){
		this.listeners[i](this);
	  }
	}

	//function for adding listeners to prototypes
		//takes function names as arguments
	function addListeners(){
		if(!this.listeners){
			this.listeners = [];
		}
		for(listener in arguments){
			//assign listener class to listeners
			arguments[listener].function_class = 'listener';
			//assign listenup function to each listener function
			//arguments[listener].listenup = listenup;
			//arguments[listener].logevent = logevent;
			this.listeners.push(arguments[listener]);
		}
		//this.listenup = listenup;
		this.logevent = logevent;
	}
	


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
//extend bookfactory prototypes
	//setters
	Book.prototype.addSetters = addSetters;
	Page.prototype.addSetters = addSetters;	
	Choice.prototype.addSetters = addSetters;
	
	Book.prototype.addSetters(setTitle, setAuthor);	
	Page.prototype.addSetters(setName, setNarrative);
	Choice.prototype.addSetters(setTarget, setDescription);

	//listeners
	Book.prototype.addListeners = addListeners;
	Page.prototype.addListeners = addListeners;
	Choice.prototype.addListeners = addListeners;

	Book.prototype.addListeners(logevent);
	Page.prototype.addListeners(logevent);
	Choice.prototype.addListeners(logevent);
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//getters

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//destroyers
	Choice.prototype.destroyMe = function(){
		//find and delete all references to the object and the object itself
		//return 'deleted' + ' ' + this.description
	}
	

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//persistence
	
	//add object to parent object with custom property name; if this object has an id property, use it
		//if not, use name; else, use title

	function pshIt(obj, p_obj){
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//rendering
	//define containers
	var infoContainers = ['.info'];
	var userForms = [$('#choicesform'), $('#pageform')];
	
	//render
	function renIt(content){
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//calls
	$(document).ready(function(){
		//create a book
		var codeventure = new Book('codeventure', 'John');
			//codeventure.logevent();
		
		codeventure.author = 'Johnz';
			//codeventure.logevent();
		codeventure.setAuthor('Cody');
			//codeventure.logevent();
		
		pshIt(codeventure, books);
			//codeventure.logevent();
			

		//create pages
		var home = new Page('home', 'This is the starting place.');
		var inn = new Page('inn', 'The inn is nice.');
		var mountains = new Page('mountains', 'Go to the mountains?');
	
		pshIt(home, pages);
			//home.logevent();
		pshIt(inn, pages);
			//inn.logevent();
		pshIt(mountains, pages);
			//mountains.logevent();


		pshIt(pages, codeventure);
			//codeventure.logevent();
		
		
		//create choices
		var theinn = new Choice('theinn', 'Go to the inn?');
			//choices.logevent();

		var themountains = new Choice('mountains', 'Go to the mountains?');
			//choices.logevent();
			
			
		pshIt(theinn, choices);
			//choices.logevent();
		pshIt(themountains, choices);
			//choices.logevent();
		
/*		
		
		pshIt(choices, pages['home']);	
			//pages['home'].logevent();
		pshIt(pages, books['codeventure']);
			//codeventure.logevent();	
		pshIt(codeventure, books);
			
		

*/
		
		console.log(books);		

		//render
		renIt(books);
	});

