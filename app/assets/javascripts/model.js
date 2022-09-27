// equipmnet grid initizitation 
 $change = false;
  jQuery(document).ready(function() {  
     jQuery('input,select').on('change', function() {
      save_change();
     });   
     jQuery('input,textarea').on('keyup',function(){
      if(!(jQuery(this)[0].id == "name") && !(jQuery(this)[0].id == "sales_order_sales_order_date"))
      {
      save_change();
      }
     }); 
     jQuery('.save').on('click',function(){     
       jQuery("#spin_overlay").show();
          jQuery("#spinner").show();
          disable_warning_mess();
          $change = false;
          return true;     
    });
  });
   function save_change()
   {
    if(!($change))
     {
      setTimeout('recursive_action()',10000)
     }
    open_change();
    $change = true;
    enable_warning_mess();
    }
    
    function disable_changes()
    {
    disable_warning_mess();
    $change = false;
    }
    
  function recursive_action()
  {
   if($change)
   {
      disable_changes();  
     var valuesToSubmit = jQuery("#model_form").serialize();
         jQuery.ajax({
            type: 'PUT',
             url: jQuery("#model_form").attr('action'),
             data: valuesToSubmit + '&auto_save=true',
         }).success(function(json){
           showNotification({message: '<center>Auto Saved.<center>',
                                   autoClose: true,
                                   duration: 2
                               }); 
         });  
   }
   else
   {
     save_change();
   }
  }  

  function disable_warning_mess()
  {
  $change = false;
  }

  function enable_warning_mess()
  {
  $change = true;
  }
  var message = "You have unsaved changes on this page. If you leave the page, the unsaved changes will be lost.";
  
  function onExit()
  {
       if($change)
      {
        return message;
      }
  }
  window.onbeforeunload = onExit;

  
     jQuery("#new_model").fancybox({
       'width' : '550',
       'autoScale' : false,
       'transitionIn' : 'none',
       'transitionOut' : 'none',
       'type' : 'iframe',
       'padding' : 5
   });

  var model_datasource  = new kendo.data.DataSource({
    transport:{
        read:{
          url: "/models/admin_index",
          dataType: "json"
        },
    },
    
    schema: {
        errors: function(response) {
         return response.errors;
      },


       //type: "json",
       //data: "/equipment_unique_model/index",
       data: 'data',
       total: "total",
       model: {
           id: "id",
           fields: {
           id: { type: "string", editable: false},
           model_name: { type: "string", editable: false},
           // header: { type: "string", editable: false},
           // optional_display: { type: "string", editable: false},
           brand:  { type: "string",editable: false},
           equipment_type_id:  { type: "string",editable: false},
           created_at: { type: "string",editable: false }                                           
           }
       }
    },
             
     batch: true,
     serverPaging: false,
     serverFiltering: false,
     serverSorting: false,
     pageSize: 10
  });


jQuery(document).ready(function() {     
  var tabStrips = jQuery('#tabstrip').kendoTabStrip().data("kendoTabStrip");	
     jQuery("#admin_index_grid").kendoGrid({
         dataSource: model_datasource, 
         pageable: {
              refresh: true,
              pageSizes: true
            },         
         resizable: true,
         //resizable: true,
          sortable: true,
        filterable: {
                            extra: false,
                            operators: {
                                string: {
                                    contains: "contains",
                                    startswith: "Starts with"
                                    
                                }
                            }
                        },
         scrollable: true,          
     columns: [                          
              {
                  field: "model_name",
                  //width: "38%",
                  title: "Name"
              },
              {
                  field: "brand",
                  //width: "23%",
                  title: "Brand"
              },
              {
                  field: "equipment_type",
                  //width: "17%",
                  title: "Equipment Type",
                  //type: 'date',
              },
              // {
              //     field: "optional_display",
              //     //width: "17%",
              //     title: "Optional Display",
              //     //type: 'date',
              // },
              // {
              //     field: "equipment_display",
              //     //width: "17%",
              //     title: "Equipment Display",
              //     //type: 'date',
              // },
                                                                   
         {command: [{ name:"Edit",text:" Edit",click: edit_model_field},{ name:"Delete",text: "Delete",click: delete_field }]}            
          ],            
     });
  });

function edit_model_field(e) {
   var dataItem = this.dataItem(jQuery(e.currentTarget).closest("tr"));
   window.location.href = "/models/"+ dataItem.id + "/edit"
   return false;
 }
function delete_field(e) {
   var dataItem = this.dataItem(jQuery(e.currentTarget).closest("tr"));
   doDelete(dataItem.id)
   
 }

function doDelete(id)
  { 
    jQuery('#popup-header').html("<h3>Delete Field</h3>");
    jQuery('#popup-info').html("<p>Are you sure you would like to remove ?</p>");
    jQuery('#popup-footer').html("<button class='button' onclick='ondelete("+id+")'>Delete</button><button class='button cancel'  onclick='closeWindow()'>Cancel</button>");
    jQuery.fancybox.open({              
        content : jQuery("#delete-popup").html(),
        type : 'iframe'
    });
  }
  
    var marketing_stmt  = new kendo.data.DataSource({
    transport:{
        read:{
          url: "/models/marketing_statement?id="+id,
          dataType: "json"
        },
  
                   update: {
                           url: function (e) {
                               return "/models/update_marketing_stmt?id="+id +"&model="+ e.models[0].id
                            },
                           dataType: "json"
                       },
              },
    
    schema: {
        errors: function(response) {
         return response.errors;
      },
     

       data: 'data',
       total: "total",
       model: {
           id: "id",
           fields: {
           id: { type: "string", editable: false},
           marketing_statement: { type: "string", editable: true},                                      
           }
       }
    },
    
    parameterMap: function(options, operation) {
                          if (operation !== "read" && options.models) {
                              return {option: kendo.stringify(options.models)};
                          }
                      }, 
             
     batch: true,
     serverPaging: false,
     serverFiltering: false,
     serverSorting: false,
     pageSize: 10
  });


jQuery(document).ready(function() {     
     jQuery("#marketing_grid").kendoGrid({
         dataSource: marketing_stmt,
	 editable: "inline",	     
         pageable: {
              refresh: true,
              pageSizes: true
            },         
         resizable: true,
          sortable: true,
           scrollable: true,          
     columns: [                          
              {
                  field: "marketing_statement",
		  width: "700px",
                  title: "Statement"
              },
                                                                   
         {command: [{ name:"edit",text:" "},{ name:"Delete",text: "Delete",click: delete_marketing }]}            
          ],            
     });
  });
  
  
  function delete_marketing(e) {
   var dataItem = this.dataItem(jQuery(e.currentTarget).closest("tr"));
   doDeleteMarketing(dataItem.id)
   
 }

function doDeleteMarketing(id)
  { 
    jQuery('#popup-header').html("<h3>Delete Marketing</h3>");
    jQuery('#popup-info').html("<p>Are you sure you would like to remove ?</p>");
    jQuery('#popup-footer').html("<button class='button' onclick='deleteMarketing("+id+")'>Delete</button><button class='button cancel'  onclick='closeWindow()'>Cancel</button>");
    jQuery.fancybox.open({              
        content : jQuery("#delete-popup").html(),
        type : 'iframe'
    });
  }
  
      var warranty_stmt  = new kendo.data.DataSource({
    transport:{
        read:{
          url: "/models/warranty_statement?id="+id,
          dataType: "json"
        },
	 update: {
                           url: function (e) {
                               return "/models/update_warranty_stmt?id="+id +"&model="+ e.models[0].id
                            },
                           dataType: "json"
                       },
    },
    
    schema: {
        errors: function(response) {
         return response.errors;
      },

       data: 'data',
       total: "total",
       model: {
           id: "id",
           fields: {
           id: { type: "string", editable: false},
           warranty_statement: { type: "string", editable: true},                                      
           }
       }
    },
             
     batch: true,
     serverPaging: false,
     serverFiltering: false,
     serverSorting: false,
     pageSize: 10
  });


jQuery(document).ready(function() {     
     jQuery("#warranty_grid").kendoGrid({
         dataSource: warranty_stmt, 
	 editable: "inline",
         pageable: {
              refresh: true,
              pageSizes: true
            },         
         resizable: true,
          sortable: true,
           scrollable: true,          
     columns: [                          
              {
                  field: "warranty_statement",
		  width: "700px",
                  title: "Statement"
              },
                                                                   
         {command: [{ name:"edit",text:" "},{ name:"Delete",text: "Delete",click: delete_warranty }]}            
          ],            
     });
  });
  
  
    function delete_warranty(e) {
   var dataItem = this.dataItem(jQuery(e.currentTarget).closest("tr"));
   doDeleteWarranty(dataItem.id)
   
 }

function doDeleteWarranty(id)
  { 
    jQuery('#popup-header').html("<h3>Delete Warranty</h3>");
    jQuery('#popup-info').html("<p>Are you sure you would like to remove ?</p>");
    jQuery('#popup-footer').html("<button class='button' onclick='deleteWarranty("+id+")'>Delete</button><button class='button cancel'  onclick='closeWindow()'>Cancel</button>");
    jQuery.fancybox.open({              
        content : jQuery("#delete-popup").html(),
        type : 'iframe'
    });
  }
  
  
  function editable_halt()
   {
    var len = option_dataSource._data.length
    for(i=0 ;i < len ; i++)
    {
    option_dataSource._data[i].fields.id.editable = false
    }
   }
   
       jQuery("#new_mgstmt").fancybox({
       'width' : '550',
       'autoScale' : false,
       'transitionIn' : 'none',
       'transitionOut' : 'none',
       'type' : 'iframe',
       'padding' : 5
   });
   
        jQuery("#new_wstmt").fancybox({
       'width' : '550',
       'autoScale' : false,
       'transitionIn' : 'none',
       'transitionOut' : 'none',
       'type' : 'iframe',
       'padding' : 5
   });