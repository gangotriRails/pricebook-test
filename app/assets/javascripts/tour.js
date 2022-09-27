var tour = new Tour({
  steps: [
    {
      orphan: "true",
      title: "New way to upload custom priclists",
      content: "Pricebook has rolled out a new way to update the Custom Pricelists for your dealers.<br/><br/>Click Next to follow along, or click End Tour to go at it by yourself.",
      backdrop: true
    },
    {
      element: ".k-last",
      title: "Select the tab",
      content: "Click on the Custom Price List tab",
      reflex:true,
      onShown: function(tour) {
        jQuery(".popover.tour-tour .popover-navigation").hide();
        jQuery(".popover.tour-tour").css("transform","translate3d(0,25px,0)");
      }
    },
    {
      element: "#upload",
      title: "Create a new list",
      content: "Click on Upload",
      reflex:true,
      onShown: function(tour) {
        jQuery(".popover.tour-tour .popover-navigation").hide();
        jQuery(".popover.tour-tour").css("transform","translate3d(0,25px,0)");
      }
    },
    {
      element: "#continue",
      title: "Enter Information",
      content: "Fill in all the inputs for the new Custom Pricelist, then click Continue",
      reflex:true,
      placement: "bottom",
      onShown: function(tour) {
        jQuery(".popover.tour-tour .popover-navigation").hide();
      }
    }
  ],
  delay: 1000,
  storage: false
});

// Force initialize the tour 
//tour.init(true); 

// Force start the tour 
//tour.start(true);