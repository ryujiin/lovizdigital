function getProvinciasFactory(n){return function(o){var e=$(n);e.find("option").remove(),e.append(province_nullcase);var i="/ubigeo/provincia/json/?region_id="+o,t=function(n){$.each(n,function(n,o){var i="<option value='"+o.pk+"'>"+o.fields.name+"</option>";e.append(i)})};$.getJSON(i,t);var a=$(district_selector);a.find("option").remove(),a.append(district_nullcase)}}function getDistritosFactory(n){return function(o){var e=$(n);e.find("option").remove(),e.append(district_nullcase);var i="/ubigeo/distrito/json/?province_id="+o,t=function(n){$.each(n,function(n,o){var i="<option value='"+o.pk+"'>"+o.fields.name+"</option>";e.append(i)})};$.getJSON(i,t)}}var region_nullcase="<option value='' selected></option>",province_nullcase="<option value='' selected></option>",district_nullcase="<option value='' selected></option>";