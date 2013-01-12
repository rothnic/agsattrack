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
var AGSETTINGS = (function() {
    'use strict';
    
	var _haveCanvas = true;
    var _haveWebGl = false;
//    var _spm = 'isana'; /* broken DO NOT USE */
//    var _spm = 'jspredict'; /* broken DO NOT USE */
    var _spm = 'predictlib';
    var _debugLevel = 1;
    var _calculateEvents = true;
    var _requireEUCookieLaw = false;
    
    var _settings = {
        aosEl: 5,
        refreshTimerInterval : 5000,
        showPopupHelp : true,
        switchViewOnTabClick : true,
        autoAddSats: true,
        defaultTleGroup: 'amateur'
    };
    var COOKIENAME = 'agsattrack';
    var COOKIEEXPIRES = 30;
    
    /**
    * Save all of our settings to a cookie
    */
    function saveSettings() {
        if (AGSETTINGS.cookiesOk()) {
            var cookieData = JSON.stringify(_settings);
            
            jQuery.cookie(COOKIENAME, cookieData, { expires: COOKIEEXPIRES });
        } 
    }
    
    /**
    * Determine if its ok for us to use cookies.
    */
    function cookiesOK() {
        var result = true;
        
        if (_requireEUCookieLaw) {
            if(jQuery.cookie('cc_cookie_accept') === null && jQuery.cookie('cc_cookie_decline') === null) { 
            } else {
                if (jQuery.cookie('cc_cookie_decline') == "cc_cookie_decline") {
                    result = false;
                }    
            }    
        } 
        return result;         
    }
    
    /**
    * Load settings from a cookie if one is found
    */
    if (jQuery.cookie(COOKIENAME) !== null) {
        var cookieData = jQuery.cookie(COOKIENAME);
        _settings = JSON.parse(cookieData); 
    }
    
	return {
		init: function() {
		},
        saveSettings: function() {
            saveSettings();    
        },
        cookiesOk: function() {
            return cookiesOK();
        },
        getRequireEUCookieLaw : function() {
            return _requireEUCookieLaw;    
        },

        getDefaultTLEgroup : function() {
            return _settings.defaultTleGroup;    
        },
        setDefaultTLEgroup : function(value) {
            _settings.defaultTleGroup = value;
        },         
        getAutoAddSats : function() {
            return _settings.autoAddSats;    
        },
        setAutoAddSats : function(value) {
            _settings.autoAddSats = value;
        }, 
                
        getShowPopupHelp : function() {
            return _settings.showPopupHelp;    
        },
        setShowPopupHelp : function(value) {
            _settings.showPopupHelp = value;
            jQuery(document).trigger('agsattrack.showpopuphelp', value);            
        },    
        getCalculateEvents : function() {
            return _calculateEvents;    
        },
        setCalculateEvents : function(value) {
            _calculateEvents = value;
        },      
        getDebugLevel : function() {
            return _debugLevel;    
        },
        setDebugLevel : function(value) {
            _debugLevel = value;
        },       
        getSPM : function() {
            return _spm;    
        },
        setSPM : function(value) {
            _spm = value;
        },   
        getSwitchViewOnTabClick : function() {
            return _settings.switchViewOnTabClick;
        },
        setSwitchViewOnTabClick : function(value) {
            _settings.switchViewOnTabClick = value;    
        },
        getHaveWebGL : function() {
            return _haveWebGl;
        },
        setHaveWebGL : function(value) {
            _haveWebGl = value;    
        },
        getHaveCanvas : function() {
            return _haveCanvas;
        },
        setHaveCanvas : function(value) {
            _haveCanvas = value;    
        },
		getAosEl : function() {
			return _settings.aosEl;
		},
		setAosEl : function(val) {
			_settings.aosEl = val;
		},
		getRefreshTimerInterval : function() {
			return _settings.refreshTimerInterval;
		},
		setRefreshTimerInterval : function(val) {
			_settings.refreshTimerInterval = val;
		}	

	};
})();