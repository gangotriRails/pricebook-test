// equipmnet grid initizitation 
 

	var datasource  = new kendo.data.DataSource({
    transport:{
        read:{
          url: "/model_unique_fields/unique_field",
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
       model: {
           id: "id",
           fields: {
           id: { type: "string", editable: false},
           field: { type: "string", editable: false},
           header: { type: "string", editable: false},
           optional_display: { type: "string", editable: false},
           equipment_display:  { type: "string",editable: false},
           equipment_type_id:  { type: "string",editable: false},
           reference:  { type: "string",editable: false},
           created_at: { type: "string",editable: false }            																
           }
       }
    },
             
     batch: true,
     serverPaging: false,
     serverFiltering: false,
     serverSorting: false
  });


jQuery(document).ready(function() {			 
     jQuery("#mygrid_container").kendoGrid({
         dataSource: datasource,					
         resizable: true,
         //resizable: true,
          sortable: true,
         filterable: false,
         scrollable: true,          
     columns: [                          
              {
                  field: "field",
                  //width: "38%",
                  title: "Field"
              },
              {
                  field: "header",
                  //width: "23%",
                  title: "Header"
              },
              {
                  field: "equipment_type_id",
                  //width: "17%",
                  title: "Equipment Type",
                  //type: 'date',
              },
              {
                  field: "optional_display",
                  //width: "17%",
                  title: "Optional Display",
                  //type: 'date',
              },
              {
                  field: "equipment_display",
                  //width: "17%",
                  title: "Equipment Display",
                  //type: 'date',
              },
              {
                  field: "reference",
                  //width: "17%",
                  title: "Reference Field",
                  //type: 'date',
              },
                                                                   
         {command: [{ name:"Edit",text:" Edit",click: edit_model_unique_field},{ name:"Delete",text: "Delete",click: delete_unique_field }]}            
          ],            
     });
  });

function edit_model_unique_field(e) {
   var dataItem = this.dataItem(jQuery(e.currentTarget).closest("tr"));
   window.location.href = "/model_unique_fields/"+ dataItem.id + "/edit"
   return false;
 }
function delete_unique_field(e) {
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