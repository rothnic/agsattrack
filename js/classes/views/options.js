/*
Copyright 2012 Alex Greenland

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */ 
var AGOPTIONS = function() {
	'use strict';
	
	var _render = false;
	var _dirty = false;
	
	jQuery(document).bind('agsattrack.satclicked', function() {
		setupOptions();
		_dirty = false;		
	});
	
	function setupOptions() {
		jQuery('#window-preferences-calc-timer').numberspinner('setValue', AGSETTINGS.getRefreshTimerInterval() /1000);
		jQuery('#window-preferences-aos').numberspinner('setValue', AGSETTINGS.getAosEl());
        if (AGSETTINGS.getSwitchViewOnTabClick()) {
            jQuery('#switchtabonclick').prop('checked', true);
        } else {
            jQuery('#switchtabonclick').prop('checked', false);
        }
        if (AGSETTINGS.getShowPopupHelp()) {
            jQuery('#popuphelp-show').prop('checked', true);
        } else {
            jQuery('#popuphelp-show').prop('checked', false);
        }
        
        if (AGSETTINGS.getAutoAddSats()) {
            jQuery('#sats-autoadd').prop('checked', true);
        } else {
            jQuery('#sats-autoadd').prop('checked', false);
        }  
        
        jQuery('#options-sat-group-selector-listbox').children().remove();
        var tleGroups = jQuery('#sat-group-selector-listbox').jqxListBox('getItems');
        var selectedGroup = AGSETTINGS.getDefaultTLEgroup()
        jQuery.each(tleGroups, function(index, group) {
            var selected = '';
            if (group.value === selectedGroup) {
                selected = ' selected="selected"';
            }
            jQuery('#options-sat-group-selector-listbox').append('<option value="'+group.value+'"'+selected+'>'+group.label+'</option>'); 
        });        
              
    }

    jQuery('#options-sat-group-selector-listbox').on('change', function(e){
        enableSave();        
    });
        
    jQuery('#sats-autoadd').on('click', function(e){
        enableSave();        
    });
        
    jQuery('#popuphelp-show').on('click', function(e){
        enableSave();        
    });
    	
    jQuery('#switchtabonclick').on('click', function(e){
        enableSave();        
    });
    
	jQuery('#window-preferences-calc-timer').numberspinner({
		onSpinUp : function() {
			enableSave();
		},
		onSpinDown : function() {
			enableSave();
		}
	});
	jQuery('#window-preferences-aos').numberspinner({
		onSpinUp : function() {
			enableSave();
		},
		onSpinDown : function() {
			enableSave();
		}
	});	
	function enableSave() {
		jQuery('#options-save').enable();
	}
	
	jQuery('#options-save').click(function(){
        var temp;
        
		temp = jQuery('#window-preferences-calc-timer').numberspinner('getValue') * 1000;
		AGSETTINGS.setRefreshTimerInterval(temp)

		temp = jQuery('#window-preferences-aos').numberspinner('getValue');
		AGSETTINGS.setAosEl(temp)

        temp = jQuery('#switchtabonclick').prop('checked');
        AGSETTINGS.setSwitchViewOnTabClick(temp)

        temp = jQuery('#popuphelp-show').prop('checked');
        AGSETTINGS.setShowPopupHelp(temp)
        
        temp = jQuery('#sats-autoadd').prop('checked');
        AGSETTINGS.setAutoAddSats(temp)        
        
        var defaultgroup = jQuery('#options-sat-group-selector-listbox').find(":selected").val();
        AGSETTINGS.setDefaultTLEgroup(defaultgroup)  
                
        AGSETTINGS.saveSettings();               
		jQuery('#options-save').disable();
	});
    
	return {
		startRender : function() {
			_render = true;
		},
		
		stopRender : function() {
			_render = false;			
		},
		
		init : function() {
            jQuery(document).bind('agsattrack.setupoptions',
                function(e) {
                setupOptions();
            });			
		}
	}
}