
/* ---------------------------------------------------- */
var createList = function(sourceobj, destID, parentType, instructionTxt, defaultValue, classes){
    //alert('creating dropdown with arguments'  +  '\n sourceobj: ' + sourceobj + '\n destID: ' + destID + '\n parentType: ' + parentType + '\n instructionTxt: ' + instructionTxt + '\n defaultValue: ' + defaultValue + '\n classes: ' + classes );
    
    var fetched = this.fetchObj(sourceobj);
    var headerType = '';
    var rowType = '';
    var childType = '';
    var idType = '';
    var values = '';

    var isSelected = '';
    var defaultSelected = '';    

     switch(parentType){
        case 'select': 
            childType = 'option';
            idType = ' value';
            break;
        case 'ul':
            childType = 'li';
            idType = 'id';
            break;
        case 'table':
            headerType = 'th';
            rowType = 'tr';
            childType = 'td';
            idType = 'id';
            break;
    }

    if(parentType == 'table'){
        var rows = '<table>';
        for (prp in this[fetched]) {
            if(typeof this[prp] !== 'function'){
                //alert(this[prp]);
                rows += '<tr>' + 
                        '<td ' + idType + '=' + prp + '>' + this[fetched][prp].title + '</td>' +
                        '<td ' + idType + '=' + prp + '>' + this[fetched][prp].narrative + '</td>' +
                        '<td ' + idType + '=' + prp + '>' + this[fetched][prp].image + '</td>' +
                        '</tr>'
                }
        }
        rows += '</table>';
        $(destID).html(rows);
    }
    else{  
        for(prp in this[fetched]){
            if(prp == defaultValue){
                //alert('the property ' + prp + ' equals defaultValue ' + defaultValue);
                isSelected = ' selected';
                defaultSelected = '';
            }
            else{
                isSelected = '';
                defaultSelected = ' selected';
            }
            if(typeof this[prp] !== 'function'){    
                values += '<' + childType + ' class=' + classes +  ' ' + idType + '=' + prp + isSelected + '>' + this[fetched][prp].title + '</' + childType + '>';
        }
        var list = '<' + parentType + '>' + '<' + childType + idType + '=' + defaultValue + defaultSelected + '>' + instructionTxt + '</' + childType + '>' + values + '<' + parentType + '/>';
            
            $(destID).html(list);
        }
    }
    return list;
    //alert('finished creating list!');
}
/* ---------------------------------------------------- */
/* ---------------------------------------------------- */

var countRows = function(selectorpath){
	 	//count the number of rows with data in choices table
 	var rowcount = 0;
        //$("#choices tr td:nth-child(0)").each(function(){
        //$("#choices tr").not(":first").each(function(){
        $(selectorpath).each(function(){
        	//alert($(this).val());
        	if($(this).length > 0){
        		rowcount++
        	}
    }); 
    return rowcount;
}

var addRow = function(tablename){
	//	choicescount = rownum + changeChoicesCount;
	var rowcount = countRows("#choices tr select") + 1;
		$(tablename).append(
			'<tr>' + 
            '<td>' + (rowcount) + '</td>' + 
            '<td class="td_containing_select">' + 
                //create list of pages as <select>

                 this.createList('pages', '', 'select', '<span class="instructionTxt"></span>', '', 'select_in_td') + 
            '</td>' + 
            '<td><input type="text" class="choicetext" value=""></input>' +
            '</td>' +
            //'<td><input type="button" value="x" class="deletebutton" id="#choices:nth-child(' + rowcount + ')" title="delete choice ' + rowcount + '"/>' +
			'<td><input type="button" value="x" class="deletebutton" id="pages,choices,new choice,' + rowcount + '" title="delete choice ' + rowcount + '"/>' +
            '</td>' +
        '</tr>'
        );
	//$('#savepagebutton').trigger('click');
	//book.choicesFactory(0);
}

var getChoices = function(){
    if(this['pages'].hasOwnProperty(selectedPage)){ 
        var currentpagechoices = this['pages'][selectedPage]['choices'];
        var choicescount = 0;
        var choices = [];
        var target = [];
        
            for(prp in currentpagechoices){
                choices[choicescount] = currentpagechoices[prp];
                target[choicescount] = prp;
                choicescount++
            }     
    }
    return choicescount;	
}


var choicesFactory = function (changeChoicesCount){
//alert('increment or decrement value is ' + changeChoicesCount);
    var selectedPage = this.selectedPage;   
	
	
	//if the choices table is not displaying any data, and if there are choices attached to the selected page, fetch them
    if(this['pages'].hasOwnProperty(selectedPage)){ 
        var currentpagechoices = this['pages'][selectedPage]['choices'];
        var choicescount = 0;
        var choices = [];
        var target = [];
        
            for(prp in currentpagechoices){
                choices[choicescount] = currentpagechoices[prp];
                target[choicescount] = prp;
                choicescount++
            }     
    }
    
    //if there are no choices displaying and none in storage
    else{
        //alert('no choices found for this page');
        choicescount =  2;
    }
    

	choicescount = choicescount + changeChoicesCount;
    
    //alert('total choices: ' + choicescount);
    var choicesrows = '<table id="choices">' + 
                         '<tr>' + 
                             '<th>' +  
                            '<th>target' +
                            '<th>choice' +
                            '<th> - ' +
                         '</tr>';
    for(var i = 0; i < choicescount; i++){
                if(currentpagechoices){       
                       var targetDefaultValue = target[i];
                       var choicetextDefaultValue = choices[i];
                }
                else{
                       var targetDefaultValue = '';
                       var choicetextDefaultValue = '';
                }
        choicesrows += '<tr id="' + (i+1) + '">' + 
            '<td>' + (i+1) + '</td>' + 
            '<td class="td_containing_select">' + 
                //create list of pages as <select>

                 this.createList('pages', '', 'select', '<span class="instructionTxt"></span>', targetDefaultValue, 'select_in_td') + 
            '</td>' + 
            '<td><input type="text" class="choicetext" value="' + choicetextDefaultValue + '"></input>' +
            '</td>' +
            //'<td><input type="button" value="x" class="deletebutton" id="#choices:nth-child(' + (i+1) + ')" title="delete choice ' + (i+1) + '"/>' +
			'<td><input type="button" value="x" class="deletebutton" id="pages,' + selectedPage + ',choices,' + targetDefaultValue + '" title="delete choice ' + targetDefaultValue + '"/>' +
            '</td>' +	
        '</tr>';    
    }    
    choicesrows += '</table>';
$("#choicesform").html(choicesrows);
$("#choiceswrapper").show();
}


/* ---------------------------------------------------- */
/* ---------------------------------------------------- */
/* ---------------------------------------------------- */
$(document).ready(function(){
//console.log(fetchFromLocal("library_book"));
    //localStorage.clear();
    //localStorage.removeItem("library_book");

//document.getElementById("demo").innerHTML = 
//"Page hostname is: " + window.location.hostname;

	var startbook = function(){
		//check if the book exists in local storage
			$("#startbook").show();
			$("#startbook").dialog({
				resizable: false,
				modal: true,
				title: 'Begin.',
					height: 100,
					width: 200,
				buttons: {
						"Retrieve my book": function(){
							if(!localStorage["library_book"]){
								alert('Existing book not found. Please choose another option.');
							}
							else{
								buildIt();
								$(this).dialog('close');
							}
					},
						"Start a new book from a sample": function(){
							//retrieve JSON version of literal book in text file		
							//Valid JSON starts with { or [ , not with a variable name
							$.get("bookliteral.txt", function(data){
								var bookliteral = JSON.parse(data);
								storeLocally("library_book", bookliteral);
								buildIt();
							});
						$(this).dialog('close');					
					},
						"Start a new book": function(){
						var newbook = {
							  pages: {
								newpage: {
								  title: "New Page",
								  narrative: "",
								  image: "",
								  choices: {
								  }
								}
							  }
							}
						storeLocally("library_book", newbook);
						buildIt();
						$(this).dialog('close');
					},
						"Delete my book from the library": function(){
							if(localStorage["library_book"]){
								$("#yesno").show();
								$("#yesno").dialog({
									resizable: false,
									modal: true,
									stack: true,
									title: 'Confirm.',
									height: 100,
									width: 200,
									buttons: {
										"Yes": function(){deleteFromLocal("library_book")},
										"No": function(){$(this).dialog('close')}
									}
								});
								
							}
							//else{
							//	alert('Existing book not found.');
							//}
					},
				},
				close: function(){
						$("#pagewrapper").show();
						//$("#choiceswrapper").show();
						$("#bookinfowrapper").show();
					}
			});
	}

startbook();
	
	var buildIt = function(){
	
			var book = fetchFromLocal("library_book");

			//assign methods to the object after it is fetched because storing functions in local storage is not recommended     
			var assignMethods = function(obj){
				obj.countProps = countProps;
				obj.fetchObj = fetchObj;
				obj.addRow = addRow;
				obj.choicesFactory = choicesFactory;
				obj.createList = createList; 
			}
				
				assignMethods(book);
				assignMethods(book['pages']);
				
			/* ---- Build the document ---- */

			//create list of pages as <ul>
				book.createList('pages', '#pageslist', 'ul', '', '', 'editable')
			
			//get page onclick and display it in form fields 
				var getPage = function(elem){
					//alert(elem.id + ' page clicked');
					$("#temptext").html('val/id: ' + $(elem).attr('id') + '<br>text: ' + $(elem).text() + '<br>index: ' + $(elem).index());
					var selectedPage = $(elem).attr('id');
					var pagename = $(elem).attr('id');

						$("#title").val(book['pages'][selectedPage].title);
						$("#narrative").val(book['pages'][selectedPage].narrative);
						$("#image").val(book['pages'][selectedPage].image);
						$("#pageform").show();
					
					book.selectedPage = selectedPage;
			
			$("#pagewrapper").show();
			
			
			//fetch choices on this page  
					//alert('found page, about to call choicesFactory');
					book.choicesFactory(0);
				}
				
			//onclick of <li> element, show page fields and populate page fields for clicked page from fetched book object
				$("li").click(function(){
				 getPage(this);
				 init();
				 //alert(this.id);
				});
				
			  
			//onclick of save page button, save changes to localStorage
			//save title, narrative, image
				$("#savepagebutton").click(function(){            

					var title = $("#title").val();
					var narrative = $("#narrative").val();
					var image = $("#image").val();

						if(title.length == 0){alert('Please create a new page or modify an existing page before storing your book')}
						else if(book.selectedPage == 'newPage'){
							var selectedPage = title.replace(/\W+/g, '').toLowerCase();
							book.selectedPage = title.replace(/\W+/g, '').toLowerCase();
							book['pages'][selectedPage] = {};
						}
						else{
							var selectedPage = book.selectedPage;
						}
							book['pages'][selectedPage].title = title;
							book['pages'][selectedPage].narrative = narrative;
							book['pages'][selectedPage].image = image; 
					
					storeLocally("library_book", book);

			//save choices
			book['pages'][selectedPage]['choices'] = {};
				$("#choices tr").not(":first").each(function(){
				var selectedPage = book.selectedPage;
				var targetpage = $(this).find("td select").val();
				var choicetext = $(this).find(".choicetext").val();
					
					if(targetpage.length > 0){
						book['pages'][selectedPage]['choices'][targetpage] = choicetext;
						//alert("targetpage: " + targetpage + "\n choicetext: " + choicetext);
						}
				}); 

					storeLocally("library_book", book);
					
					$('#temptext').html('&quot;' + $("#title").val() + '&quot; has been saved to localStorage!');          
					$("#pageform").hide();

					assignMethods(book);
					assignMethods(book['pages']);

			//create list of pages as <ul>
				book.createList('pages', '#pageslist', 'ul', '', '', 'editable');
					
			//onclick of <li> element, show page fields and populate page fields for clicked page from fetched book object
				$("li").click(function(){
				 getPage(this);
				 init();
				 //alert(this.id); 
				});
				//alert('saving');

			});

	

			//Source: http://jsfiddle.net/taditdash/vvjj8/ modal confirm yes/no dialog
			function deleteObj(objName, prpPath, prpType){

				var toDeleteStr = prpPath;
				var toDeleteArr = toDeleteStr.split(",");
			
			//Edit: this function must be edited so that it deletes associated references to a page when it is deleted 
					function deleteLastInArr(obj, arr, prp){
						var lastInd = arr.length - 1;
						var lastPrp = arr[lastInd];
						for(var i = 0; i < arr.length; i++){
							var prp = arr[i];
							var nxt = arr[i + 1];

							if(obj.hasOwnProperty(prp)){
								//get parent object of the property to delete; must use index rather than name; 
								//if the property name is used as a property name for in an object higher in obj's hierarchy,
								//the function will delete it
								if(i < lastInd - 1){
									deleteLastInArr(obj[prp], arr, nxt);
								}	
								else{
									delete obj[prp][nxt];
									//console.log(obj[prp]);
								}
							}
						}
					}
				
				var divname = '#confirmdelete';
	
				$(divname).html('Delete ' + prpType + ':\n' + toDeleteArr[toDeleteArr.length - 1] + '?');
				$(divname).show();
				$(divname).dialog({
					resizable: false,
					modal: true,
					title: 'Confirm.',
					height: 'auto',
					width: 'auto',
					buttons: {
							"Yes": function(){
								deleteLastInArr(book, toDeleteArr);
									if(prpType === 'page'){
										$("#createpagebutton").trigger('click');
										storeLocally("library_book", book);
										buildIt();
										//$("#pageform").hide();
										//$("#choiceswrapper").hide();
									}
									else{
										book.choicesFactory(0);
									}
									
								$(this).dialog('close');
						},
							"No": function () {
								$(this).dialog('close');
						}         
					}
				});
			}
			

					// Attach a delegated event handler
					$("#choicesform, #pagewrapper").on("click", ".deletebutton", function(event){
						var prpPath;
						var prpType;
						
						if(this.id == 'currentPage'){
							prpType = 'page'; 
							prpPath = book.selectedPage ? 'pages,' + book.selectedPage : '';
						}
						else{
							prpType = 'choice';
							prpPath = this.id;
						};
						prpPath ? deleteObj('book', prpPath, prpType) : alert('Nothing to delete. A page has not been selected.');
					});
					
					//Edit: toggle isn't working properly following a page delete
					$('#bookinfobutton').click(function(){
						$('#temptext').html('<pre>' + JSON.stringify(book, null, 2) + '</pre>');
						if($(this).val() == 'i'){
							$(this).val('h');
							$(this).prop('title', 'show book information');                
						}
						else{
							$(this).val('i');
							$(this).prop('title', 'hide book information');
						}
						
						$('#temptext').toggle();
					});

						$("#createpagebutton").click(function(){
							$("#title").val('');
							$("#narrative").val('');
							$("#image").val('');

							book.selectedPage = "newPage";
							$("#pageform").show();
							init();
							book.choicesFactory(0);
						});
				
					$("#addchoice").click(function(){
						//alert('adding choice');
						//book.choicesFactory(1);
						book.addRow('#choices');
					});

			  






			//Source:  http://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize 
			//Resize auto-resize textarea
			var observe;
			if (window.attachEvent) {
				observe = function (element, event, handler) {
					element.attachEvent('on'+event, handler);
				};
			}
			else {
				observe = function (element, event, handler) {
					element.addEventListener(event, handler, false);
				};
			}
			function init(){
				var text = document.getElementById('narrative');
				function resize () {
					text.style.height = 'auto';
					text.style.height = text.scrollHeight+'px';
				}
				// 0-timeout to get the already changed text 
				function delayedResize () {
					window.setTimeout(resize, 0);
				}
				observe(text, 'change',  resize);
				observe(text, 'cut',     delayedResize);
				observe(text, 'paste',   delayedResize);
				observe(text, 'drop',    delayedResize);
				observe(text, 'keydown', delayedResize);

				text.focus();
				text.select();
				resize();
			}    
			init();
		

	}

});