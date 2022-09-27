
// dragable funtion

function dragable(grid,left_offset,right_offset) {
  var left_offset = left_offset || -10
  var right_offset = right_offset || -10
  $g= grid
  $count_up = 0;
  $count_down = 0;
  // $grid_height = grid.content.height();
  $y = ""
  $last_tr = ""
  $scroll = false
  grid.table.kendoDraggable({
    filter: "tbody > tr",
    group: "gridGroup",
    hint: function(e) {
        var start_point = grid.content.scrollTop();
        init_hint(e.html,grid)
        return jQuery('<div class="k-grid k-widget"><table><tbody><tr bgcolor=#FFCC00>'+ e.html() + '</tr></tbody></table></div>');
    },
    // console.log(left_offset)
    // if ((left_offset.lenght < 1)) { left_offset = -10 }
    cursorOffset: {top: right_offset,left: left_offset },
    drag: function(e) {
      // jQuery("#event").attr(e)
      $pre_position = $y
      $x = ""
      $y = ""
      $x = e.x.client
      $y = e.y.client
      var destination = jQuery(document.elementFromPoint($x, $y));
      if (destination.is("td") && $scroll == true) { grid.content.stop() }
      add_empty_tr(grid)
      scroll_div(grid, e.y.location)
    }
  });
}

function droppable(grid,callbackMethod){

  grid.table.kendoDropTarget({
    group: "gridGroup",
    drop: function(e) {
        jQuery("body").find("#image").remove()
        e.draggable.hint.hide();
        x = is_touch_device() == true ? $x  : e.clientX
        y = is_touch_device() == true ? $y : e.clientY
        var target = grid.dataSource.getByUid(jQuery(e.draggable.currentTarget).data("uid"));
            dest = jQuery(document.elementFromPoint(x,y));
        if ($scroll = true && !dest.is("td")) { $scroll = false; grid.content.stop(); }
        if (!dest.is("td")) {
            return;
        }
        dest = grid.dataSource.getByUid(dest.parent().data("uid"));
        //not on same item
        if (target.get("id") !== dest.get("id")) {
            //reorder the items
            dest_index = grid.dataSource.indexOf(dest);
            target_index = grid.dataSource.indexOf(target);
            reorder_row(grid,target_index,dest_index,target,callbackMethod)
        }
    }
});

}


function scorll(grid,x,y) {
  var grid_height = grid.content.height();
  if ((y >= (grid_height) && ($pre_position < y))) {
    var scroll_posiiotns = grid.content.scrollTop()
    grid.content.scrollTop(scroll_posiiotns + (grid_height /3) )
  }
}

function reorder_row(grid,target_index,dest_index,target,callbackMethod) {
  grid.dataSource._data.remove(target)
  jQuery("body").find("#image").remove()
   moves = (dest_index - target_index)
   moves_count =  target_index + moves
   grid.dataSource.insert(moves_count, target);
   a=jQuery(grid.items()[moves_count]).addClass("highlighted")
   setTimeout( function () { a.removeClass("highlighted")}, 2000)
   if (typeof callbackMethod !='undefined' &&  callbackMethod != '')
   {eval(callbackMethod)}
   else{
    change_order(grid.dataSource._data[0].equipment_type_id,grid.dataSource)
   }
}


function add_empty_tr(grid){

  var top_position = jQuery(".k-grid:last").position().top;
  var row = jQuery(document.elementFromPoint(0,top_position))
  postion_tr =grid.content.find("table").find("tr:last")
  $last_tr = jQuery("body").find("#image").animate({ 'top':  top_position+ 'px', 'left': "30px"}, 0,function(){ });
}


function init_hint(y,grid) {
  grid.content.find('table').find($last_tr).remove()
  top_position = 0
  message_td = ""
  div = "<div id='image' style = 'position: absolute; margin-left:-30px; background-color: rgb(43, 145, 226); display :block; '><table><tr> <td>Drop</td><td><img src='/assets/pointer-arrow.png' alt='g2.jpg' height='42' width='42'></td></tr></table></div>"
 jQuery("body").find("#image").append(div.interpolate())

  $last_tr = jQuery("body").find("#image")
  jQuery('body').append(div)
}

String.prototype.interpolate = function() {
    return this.replace(/\{(\w+)\}/g, function(match, expr) {
        return eval(expr);
    });
};


function smooth_scroll(grid) {
  grid.content.on( "mouseleave", function() {

    });

}

function scroll_div(grid, location) {
 var first_row_position =  grid.content.offset().top
 var last_row_position = first_row_position + grid.content.innerHeight()
 var posiion = jQuery(".k-grid:last").position().top;
 if (posiion > last_row_position) { animated_scroll(grid, grid.content.scrollTop() + 100) }
 if (posiion < first_row_position ) {  animated_scroll(grid,grid.content.scrollTop()-100)}

}

function animated_scroll(grid,value) {
   grid.content.animate(
      { scrollTop: value},
      {
        complete : function() {grid.content.finish() },
        duration : 2000
      });
   $scroll = true;
}