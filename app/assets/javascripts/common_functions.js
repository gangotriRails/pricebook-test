function search_box(grid,text_class,show_columns){
  if (typeof grid != 'undefined'){
    fields = (typeof show_columns != 'undefined' && show_columns.length > 0) ? show_columns : find_fields(grid) ;
    create_append_search_row(grid,text_class,fields,"text");
    search_text_content(grid,text_class,fields);
  }
}

function drop_down_box(grid,text_class,show_columns){
  fields = (show_columns.length > 0) ? show_columns : find_fields(grid) ;
  create_append_search_row(grid,text_class,fields,"drop_down");
  search_drop_dwon_content(grid,text_class,fields);
}

function find_fields(gird){
   var fields = jQuery.map(gird.columns, function( a ) {
     if (!a.hidden) {
      return (typeof a.command =='undefined' ? a.field : "command_column")
     }
  });
   return fields
}

function create_append_search_row(gird,text_class,fields,type){
  var class_names =  text_class +" form-control input-xs kendo_search"
  var row_list = '<tr class="search-row">';
  jQuery.each(fields, function( index, value ) {
    if(value != 'heat_strip') {
      if (value != "command_column" && value != ""){
        row_list = row_list + text_or_drop_down(value,class_names,type,text_class,gird)
      }
      else{
        row_list = row_list + "<td></td>"
      }
    }
  });
  row_list = row_list + '</tr>'
  //console.log(row_list)
  var filterRow = jQuery(row_list);
  gird.thead.append(filterRow);
}

function search_text_content(grid,text_class,fields){
  class_name = "."+text_class;
  jQuery(class_name).keyup(function () {
    search_content(grid,text_class,fields)
  });
  jQuery(class_name).change(function () {
    search_content(grid,text_class,fields)
  });
}

function search_drop_dwon_content(grid,text_class,fields){
  class_name = "."+text_class;
  jQuery(class_name).change(function () {
    search_content(grid,text_class,fields)
 });

}

function search_content(grid,text_class,fields){
  $filters = new Array();
   jQuery.each(fields, function( index, value ) {
    if(jQuery('#'+value+text_class).prop('tagName') == 'INPUT'){
      var val = jQuery('#'+value+text_class).val();
    }else if(jQuery('#'+value+text_class).prop('tagName') == 'SELECT'){
      var val = jQuery('#'+value+text_class+' option:selected').val()
    }
    if(val)
    {
      $filters.push({field: value,operator: "contains",value   : val});
    }
   });
   grid.dataSource.filter($filters);
}

function text_or_drop_down(value,class_names,type,text_class,gird){
  var id_name = value + text_class
  if (typeof page == 'undefined') page = null
  if (type != "text" || (page == 'dealer_index' && (value == 'pb_plus_dealer' || value == 'pb_plus_dealer2'))){
    html = '<td><select id="'+id_name+'" value="" class="'+class_names+'"><option value="">Select...</option>'
    var arrayProducts = [];
    var data = gird.dataSource._data;
    for(i=0; i<data.length; i++){
      if(data[i].pb_plus_dealer != null) {
        arrayProducts.push(data[i].pb_plus_dealer);
      }else if(data[i].pb_plus_dealer2 != null) {
        arrayProducts.push(data[i].pb_plus_dealer2);
      }
    }  
    jQuery.unique(arrayProducts).each(function(val, index) {
      html += '<option value="'+val+'">'+val+'</option>'
    })
    html += '</select></td>'
    return html
  }
  else{
    if (value == 'nothing') {
      return '<td></td>'
    }else{
      return '<td><input id="'+id_name+'" class="'+class_names+'" placeholder="search for '+value+'"/></td>'
    }
  }

}