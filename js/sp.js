$(document).ready(function(){
	var domain = window.location.protocol + "//" + window.location.host + "/";
	$('<img id="spMenu" src="'+ domain +'npoidea/images/menu.png" alt="menu">').insertAfter('#header h1');
	$('#spMenu').click(function(){
		var glmenu = $('#glmenu').attr('class'),
			whatClass = glmenu == 'opened' ? 'closed' : 'opened';
		$('#glmenu').attr('class',whatClass);
	});
	$('<ul id="spSubMenu"></ul>').insertAfter('#header ul#glmenu li:nth-child(3)');
	$('#drops li').each(function(){
		var href = $(this).find('a').attr('href');
			alt = $(this).find('img').attr('alt');
		$('#spSubMenu').append('<li><a href="'+ href +'">'+ alt +'</a></li>');
	});
});



/*here is my coding start sakib */
/*IF YOU WANT TO ADD BODY CLASS PLEASE FOLLOW BELLOW VARIABLE*/

var BODY_CLASS = [	
	{
		file_path_names 	: [
		    
		    'info/index',
		    'about/index',
		],
		body_class_name 	: 's-one'
	},
	{
		file_path_names 	: [
		    'contact/index',
		],
		body_class_name 	: 's-two'
	},
	{
		file_path_names 	: [
		    'profile/index',

		],
		body_class_name 	: 's-three'
	},
	{
		file_path_names 	: [
		    'works/taikenbus',
		    
		],
		body_class_name 	: 's-four'
	},
	{
		file_path_names 	: [
		    'works/ecopass',
		],
		body_class_name 	: 's-five'
	},
	{
		file_path_names 	: [
		    'works/juku',
		],
		body_class_name 	: 's-six'
	},
	{
		file_path_names 	: [
		    'works/other',
		],
		body_class_name 	: 's-seven'
	},
	{
		file_path_names 	: [
		    'works/index',
		],
		body_class_name 	: 's-eight'
	},
	{
		file_path_names 	: [
		    'yataichiket/index',
		],
		body_class_name 	: 's-nine'
	},
];



function add_class_to_body(class_name){
	var body = document.getElementsByTagName('body');
	body = body[0];
	var body_class = body.getAttribute('class');
	if (body_class) {
		class_name = ' ' + class_name;
		body.setAttribute('class',body_class+class_name);
	}else{
		body.setAttribute('class',class_name);
	}
}

function add_body_classes(){
	var domain = window.location.origin;
	var path = window.location.pathname;
	var fullPath = domain+path;

	for(var x in BODY_CLASS){
		if (BODY_CLASS[x].file_path_names.length) {
			var pages  = BODY_CLASS[x].file_path_names;
			for(var i=0; i<pages.length; i++){
				if (fullPath.indexOf(pages[i])>=0) {
					add_class_to_body(BODY_CLASS[x].body_class_name);
				};
			}
		};
	}
}

add_body_classes();



function current_index(NODE_ID){
	var child = document.getElementById(NODE_ID);
	if (child) {
		var parent = child.parentNode;
		var index = Array.prototype.indexOf.call(parent.children, child);
		return index;
	}
	return 0;
}



var SMARTPHONE 				= {

	get_by_id : function(ID){
		return document.getElementById(ID)
	},

	create_html_tag : function(TAG_NAME){
		return document.createElement(TAG_NAME);
	},

	insert_with_specific_position : function(node,container,index){
		if (typeof index =='string') {
			switch(index){
				case 'firstChild' 	: {
					container.insertBefore(node,container.firstChild);
				} 	break;
				case 'lastChild' 	: {
					container.insertBefore(node,container.lastChild);
				}	break;
				default 	: { /*No Action*/ }	break;
			}
		}else{
			container.insertBefore(node,container.childNodes[index]);
		}
	},

	replace_all_replace_ids : function(){
		var obj,node;
		for(var index in REPLACE_IDS){
			obj 	= REPLACE_IDS[index];
			node 	= this.get_by_id(obj.replace_from);
			if (node) {	/*If ID found, Then replace it*/
				node.setAttribute('id',obj.replace_with);

				//console.log('Replacing ID="'+obj.replace_from+'" to ID="'+obj.replace_with+'"');
			}
		}
	},

	restore_all_replace_ids : function(){
		var obj,node;
		for(var index in REPLACE_IDS){
			obj 	= REPLACE_IDS[index];
			node 	= this.get_by_id(obj.replace_with);
			if (node) {	/*If ID found, Then restore it*/
				node.setAttribute('id',obj.replace_from);

				//console.log('Restore ID="'+obj.replace_with+'" to ID="'+obj.replace_from+'"');
			}
		}
	},

	move_all_move_ids : function(){
		var obj,container,node,index;
		for(var x in MOVE_IDS){
			obj 		= MOVE_IDS[x];

			if (obj.move_to.is_moved) {
				continue;
			}
			MOVE_IDS[x].move_to.is_moved = true;

			container 	= this.get_by_id(obj.move_to.container_id);
			node 		= this.get_by_id(obj.move_from);
			index 		= obj.move_to.insert_index;

			if (container && node) {	/*If CONTAINER and NODE is valid/found*/
				this.insert_with_specific_position(node,container,index);
			}

		}
	},

	restore_all_move_ids : function(){
		var obj,container,node,index;
		for(var x in MOVE_IDS){
			obj 		= MOVE_IDS[x];

			if (!obj.move_to.is_moved) {
				continue;
			}
			MOVE_IDS[x].move_to.is_moved = false;

			container 	= this.get_by_id(obj.move_to.container_id);
			node 		= this.get_by_id(obj.move_from);
			index 		= obj.move_to.current_index;

			if (container && node) {	/*If CONTAINER and NODE is valid/found*/
				if (typeof index =='string') {
					switch(index){
						case 'firstChild' 	: {
							container.insertBefore(node,container.firstChild);
						} 	break;
						case 'lastChild' 	: {
							container.insertBefore(node,container.lastChild);
						}	break;
						default 	: { /*No Action*/ }	break;
					}
				}else{
					container.insertBefore(node,container.childNodes[index]);
				}
			}

		}
	},

	hide_all_ids : function(){
		var obj,hide_from;
		for(var index in HIDE_IDS){
			obj = HIDE_IDS[index];

			HIDE_IDS[index].node_conf.is_hide = true;

			hide_from = this.get_by_id(obj.node_conf.node_id);
			if (hide_from) {
				hide_from.style.display = 'none';
				//console.log('Hiding ID="'+obj.node_conf.node_id+'"');
			}
		}
	},

	show_all_ids : function(){
		var obj,show_from;
		for(var index in HIDE_IDS){
			obj = HIDE_IDS[index];

			if (!obj.node_conf.is_hide) {
				continue;
			}

			show_from = this.get_by_id(obj.node_conf.node_id);
			if (show_from) {
				show_from.style.display = obj.node_conf.display_as;
				//console.log('Showing ID="'+obj.node_conf.node_id+'" as "'+obj.node_conf.display_as+'"');
			}
		}
	},

	copy_all_ids : function(){
		var obj,container,node,index,div;
		for(var x in COPY_IDS){
			obj 		= COPY_IDS[x];

			if (obj.copy_to.is_copied) {
				continue;
			}
			COPY_IDS[x].copy_to.is_copied = true;

			container 	= this.get_by_id(obj.copy_from);
			node 		= this.get_by_id(obj.copy_to.container_id);
			index 		= obj.copy_to.insert_index;

			if (container && node) {	/*If CONTAINER and NODE is valid/found*/
				div 	= this.create_html_tag('div');
				div.setAttribute('id',obj.copy_to.new_id);
				div.innerHTML = container.innerHTML;
				this.insert_with_specific_position(div,node,index);
			}

		}
	},

	set_menu_click_action : function(){
		var click_btn 	= this.get_by_id(SP_MENU_CONFIG.click_icon.id);
		var toggle_id 	= this.get_by_id(SP_MENU_CONFIG.menu_ul_id);
		if (click_btn && toggle_id) {
			click_btn.onclick = function(){
				if (toggle_id.className.indexOf(SP_MENU_CONFIG.menu_toggle_class.collapse_class)!=-1) {
					toggle_id.setAttribute('class',SP_MENU_CONFIG.menu_toggle_class.expand_class);
				}else{
					toggle_id.setAttribute('class',SP_MENU_CONFIG.menu_toggle_class.collapse_class);
				}
			}
		}else{
			console.log('Click ID="'+SP_MENU_CONFIG.click_icon.id+'" or toggle ID="'+SP_MENU_CONFIG.menu_ul_id+'" is not found!');
		}
	},

	create_smartphone_menu : function(){

		if (this.get_by_id(SP_MENU_CONFIG.menu_container_id)) {	/*If menu is already created*/
			return false;
		}

		//console.log('Creating SP menu...');

		var obj,menu,menu_container,menu_location,menu_index;
		
		menu_container = this.create_html_tag('div');
		menu_container.setAttribute('id',SP_MENU_CONFIG.menu_container_id);
		
		menu 	= '<div id="'+SP_MENU_CONFIG.menu_div_id+'">';
		menu 	   += 	'<a href="'+DOMAIN_NAME+'"><img src="'+DOMAIN_NAME+SP_MENU_CONFIG.sie_logo.source+'" alt="'+SP_MENU_CONFIG.sie_logo.alt+'" /></a>';
		menu 	   += 	'<img id="'+SP_MENU_CONFIG.click_icon.id+'" src="'+DOMAIN_NAME+SP_MENU_CONFIG.click_icon.source+'" alt="'+SP_MENU_CONFIG.click_icon.alt+'" />';
		menu 	   += '</div>';
		menu 	   += '<ul id="'+SP_MENU_CONFIG.menu_ul_id+'" class="'+SP_MENU_CONFIG.menu_toggle_class.collapse_class+'">';
		for( var index in SP_MENU_CONFIG.menu_items){
			obj = SP_MENU_CONFIG.menu_items[index];

			menu    += '<li class="'+obj.li_class+'"><a href="'+DOMAIN_NAME+obj.link+'">'+obj.item+'</a></li>';
		}
		menu 	   += '</ul>';
		menu_container.innerHTML = menu;

		menu_location = this.get_by_id(SP_MENU_CONFIG.menu_location.container_id);
		menu_index 	  = SP_MENU_CONFIG.menu_location.insert_index;
		
		if (menu_location) {
			this.insert_with_specific_position(menu_container,menu_location,menu_index);
			this.set_menu_click_action();	/*Activate menu click action*/
		}else{
			console.log('SP menu location ID="'+SP_MENU_CONFIG.menu_location.container_id+'" is not found.');
		}
		
	}

};


