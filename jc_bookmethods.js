
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//jcjs pending categorization
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function listen_tree(obj){
	if(!obj){obj = books}

   	for(var property in obj){
   		if(typeof obj[property] !== "function" && typeof obj[property] !== "array" && typeof obj[property] == "object" && property.indexOf('_e_log') === -1){
			listen_tree(obj[property]);
		}
		else if(typeof obj[property] !== "function" &&  typeof obj[property] !== "object"){
			if(!obj[property + '_e_log']){
				obj[property + '_e_log'] = [];
			}
			var log = obj[property + '_e_log'];
			var val = obj[property];
				while(val !== log[log.length -1]){
					//console.log('Called ' + arguments.callee.caller.toString().slice(9, arguments.callee.caller.toString().indexOf('(')) + 
					//	'; changed ' + property + ' from ' + log[log.length -1] + ' to ' + val);
					log.push(val);
				break;
				}
		}
		else{
		//DO NOTHING; we've looped through all properties with values
		}
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//literals
	//collections
	var books = {name: 'books'};
	var pages = {name: 'pages'};
	var choices = {name: 'choices'};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//constructors (bookfactory prototypes)
	function Book(title, author){
		this.title = title,
		this.author = author
		listen_tree(books);
		listen_tree(this);		
	}

	function Page(name, narrative, image){
		this.name = name,
		this.narrative = narrative,
		this.narrative = image
		listen_tree(pages);
		listen_tree(this);
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
		listen_tree(this);
		//q_design: add third parameter 'page'?
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//accessors
	//setters
			//book setters
			function setTitle(title){
				this.title = title;
				//listen_tree(this);
			}
			function setAuthor(author){
				this.author = author;
				listen_tree(this);
			}
			
			//page setters
			function setName(name){
				this.name = name;
				listen_tree(this);
			}
			function setNarrative(narrative){
				this.narrative = narrative;
				listen_tree(this);
			}
			function setNarrative(image){
				this.narrative = image;
				listen_tree(this);
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
				listen_tree(this);
			}
			function setDescription(description){
				var error = 'Error: ';
				if(typeof description !== this.datatype || description.length > this.charlimit){
						error += 'please enter a valid string of less than ' + this.charlimit + 'characters';				
				}
				else{
					this.description = description;
				}
				listen_tree(this);
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
/*
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
	}
	
*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
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
/* ---------------------------------------------------- */
var createList = function(sourceobj, destID, parentType, instructionTxt, defaultValue, itemClasses, subObj){

	var obj = (subObj && sourceobj) ? this[sourceobj][subObj] :  
			  sourceobj ? this[sourceobj] : 
			  this;
    var headerType = '';
    var childType = '';
	//q_design: does it make sense to attach UIDs to IDs of DOM elements to avoid collisions in the namespace?
	var parentID = sourceobj + '_' + (subObj ? subObj + '_' : '' ) + parentType; //+ createStringUID();
	var item = '';
	var list = $('<' + parentType + '></' + parentType + '>').attr('id', parentID).attr('title', instructionTxt);
	var itemcount = 1;
	
		for(prp in obj){
			
			if(typeof obj[prp] !== 'function'){		
			
				//var displayVal = obj[prp].title ? obj[prp].title : obj[prp].name;
				var displayVal = obj[prp].title || obj[prp].name;

				//apply to all childTypes for all parentTypes
				function createItem(){
					item = $('<' + childType + '></' + childType + '>');
					item.attr('id', childType === 'tr' ? itemcount : prp)
					item.attr('class', itemClasses);
				}
				
				if(parentType === 'table'){
					headerType = 'th';
					childType = 'tr';
					grandchildType = 'td';
					createItem();
					displayVal = obj[prp];
					//if(itemClasses.indexOf('editable') !== -1){
						//if(){ = obj[prp];}
					//}
					if($(list).find('th').length === 0){
						var row_header = $('<' + childType + '><' + 
								headerType + '>#</' + headerType + '><' + 
								headerType + '>target</' + headerType + '><' + 
								headerType + '>text</' + headerType + '></' + 
							childType + '>');
					row_header.appendTo(list);
					}
			
					var col_counter = $('<' + grandchildType + '>' + itemcount + '</' + grandchildType + '>');
					var col_target = $('<' + grandchildType + '>' + prp + '</' + grandchildType + '>');
					var col_text = $('<' + grandchildType + '>' + displayVal + '</' + grandchildType + '>').attr('id', prp);
						
					$(item).append(col_counter, col_target, col_text);	
				}
				
				else if(parentType === 'select'){
					childType = 'option';
					createItem();
					
					item.attr('value', obj[prp].title);
						if(prp === defaultValue){
							item.attr('selected', 'selected');
						}
					item.attr('placeholder', obj[prp].title);
					item.attr('type', 'text');
				}
				
				else if(parentType === 'form' && typeof obj[prp] !== 'object'){
					console.log(obj[prp]);
					if(obj[prp].length > 50){
						childType = 'textarea';
					}
					else{
						childType = 'input';
					}
					createItem();
					item.attr('placeholder', obj[prp].title);
					item.attr('type', 'text');
					item.attr('id', prp);
					item.attr('value', obj[prp]);
					//$('<' + childType + '>' + displayVal + '</' + childType + '>').attr('value', 'hi').appendTo($(item));
				}
				
				else if(parentType === 'ul'){
					childType = 'li';
					createItem();
					item = $('<' + childType + '></' + childType + '>').attr('id', prp);
					

					$('<span>' + displayVal + '</span>').appendTo($(item));
				}
				
				else{
					alert('Error. Please choose a different element to create.');
					break;
				}

			//alert(childType);
			$(item).appendTo(list);
			itemcount++
			}
		}
	$(list).appendTo($(destID));
}

/* ---------------------------------------------------- */

		//function for adding renderers to prototypes
			//takes function names as arguments
		function addRenderers(){
			for(var i = 0; i < arguments.length; i++){
				//add methods passed as arguments to this
				arguments[i].function_class = 'renderer';
				this[arguments[i].name] = arguments[i];
			}
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
	/*
	Book.prototype.addListeners = addListeners;
	Page.prototype.addListeners = addListeners;
	Choice.prototype.addListeners = addListeners;

	Book.prototype.addListeners(logevent);
	Page.prototype.addListeners(logevent);
	Choice.prototype.addListeners(logevent);
	*/
	
	//renderers
	Book.prototype.addRenderers = addRenderers;
	Page.prototype.addRenderers = addRenderers;	
	Choice.prototype.addRenderers = addRenderers;
	
	Book.prototype.addRenderers(createList);	
	Page.prototype.addRenderers(createList);
	Choice.prototype.addRenderers(createList);
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
//calls
	$(document).ready(function(){

		//create a book
		var codeventure = new Book('codeventure', 'John');

		codeventure.setTitle('Dukeybook');
		codeventure.setTitle('Codeventure');
		codeventure.setAuthor('Atreu');
		codeventure.setAuthor('Jehosaphat');
		pshIt(codeventure, books);
			

		//create pages
		var home = new Page('home', 'This is the starting place.');
		var inn = new Page('inn', 'The inn is nice.');
		var mountains = new Page('mountains', 'Go to the mountains?');
	
	
		pshIt(home, pages);
		pshIt(inn, pages);
		pshIt(mountains, pages);

			pshIt(pages, codeventure);
		
		
		//create choices
		var theinn = new Choice('theinn', 'Go to the inn?');
		var themountains = new Choice('mountains', 'Go to the mountains?');

		pshIt(theinn, choices);
		pshIt(themountains, choices);
		

		pshIt(choices, pages['home']);	
		pshIt(pages, books['Codeventure']);

		//console.log(books);
	});

