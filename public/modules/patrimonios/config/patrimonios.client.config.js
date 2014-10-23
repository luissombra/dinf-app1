'use strict';

// Configuring the Articles module
angular.module('patrimonios').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Patrimonios', 'patrimonios', 'dropdown', '/patrimonios(/create)?');
		Menus.addSubMenuItem('topbar', 'patrimonios', 'List Patrimonios', 'patrimonios');
		Menus.addSubMenuItem('topbar', 'patrimonios', 'New Patrimonio', 'patrimonios/create');
	}
]);