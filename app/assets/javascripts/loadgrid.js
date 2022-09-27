 /*    <link rel="STYLESHEET" type="text/css" href="/javascripts/dhtmlxGrid/codebase/dhtmlxgrid.css"/>
      <%= javascript_include_tag "dhtmlxGrid/codebase/dhtmlxcommon", :cache => true %>
      <%= javascript_include_tag "dhtmlxGrid/codebase/dhtmlxgrid", :cache => true %>
      <%= javascript_include_tag "dhtmlxGrid/codebase/dhtmlxgridcell", :cache => true %>

     <script type="text/javascript">

        var mygrid;
        function doInitGrid(){
          //alert("in grid");
          mygrid = new dhtmlXGridObject('mygrid_container');
          mygrid.setImagePath("/javascripts/dhtmlxGrid/codebase/imgs/");
          mygrid.setHeader("Model,Qty,Price");
          mygrid.setInitWidths("*,150,150");
          mygrid.setColAlign("left,right,right");
          mygrid.setSkin("light");
          mygrid.init();
       }

       if ( window.addEventListener) window.addEventListener('load', function(){doInitGrid();}, false); else if(window.attachEvent) window.attachEvent('onload', function(){doInitGrid();});

     </script>

*/