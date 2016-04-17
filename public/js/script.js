$(document).ready(function(){

  var Ht=$(window).height();
  var Wt=$(window).width();
  $("#signup-modal-trigger").on("click",function()
  {
    $("#signup-modal").openModal();
  });
  $("#signin-modal-trigger").on("click",function()
  {
    $("#signin-modal").openModal();
  });
  $(".button-collapse").sideNav();

  $('#history-get-trigger').on("click",function(){
    $('#history-timeline-modal').openModal();
  });
  $('#prescription-view-trigger').on("click",function(){
    $('#prescription-view-modal').openModal();
  });

  $('.collapsible').collapsible({
    accordion : false
  });
  $('.dropdown-button').dropdown({
     inDuration: 300,
     outDuration: 225,
     constrain_width: true, // Does not change width of dropdown to that of the activator
     hover: true, // Activate on hover
     gutter: 0, // Spacing from edge
     belowOrigin: true, // Displays dropdown below the button
     alignment: 'right' // Displays dropdown with edge aligned to the left of button
   }
 );

  $(".custom-nav").on("mouseleave",function(){
    $(".top-bar-row").addClass("top-bar-row-hover");
    $(".top-bar-row").removeClass("top-bar-row");
  });
  $(".custom-nav").on("mouseover",function(){
    $(".top-bar-row-hover").addClass("top-bar-row");
    $(".top-bar-row-hover").removeClass("top-bar-row-hover");
  });

var details_ht=Ht/1.3;
$(".personal-details").css("height",details_ht);
var history_ht=Ht/1.4;
$(".history-search").css("height",history_ht*1.5);
$(".history-timeline").css("height",history_ht*2);
$(".red-timeline").css("height",history_ht*2-100);


$(".details").hide();
  /*$("#details-trigger").on("click",function()
  {
    $(".history").hide();
    $(".history").removeClass("animated slideInDown");
    $(".history-timeline-row").hide();
    $(".history-timeline-row").removeClass("animated slideInDown");
    $(".prescription").hide();
    $(".prescription").removeClass("animated slideInDown");
    $('.prescription-text-holder').hide();
    $('.prescription-text-holder').removeClass('animated slideInDown');
    $('.prescription-ocr-holder').hide();
    $('.prescription-ocr-holder').removeClass('animated slideInDown');
    $(".details").show();
    $(".details").addClass("animated slideInDown");
  });*/

  $(".history-timeline .collapsible-header").on("click",function()
  {
    $(".history-timeline .collapsible-header").toggleClass("history-timeline-margin");
    $(".history-timeline .collapsible-header").toggleClass("history-timeline-margin-none");

  });

  $(".history").hide();
  $("#history-add-trigger").on("click",function()
  {
    $(".details").hide();
    $(".details").removeClass("animated slideInDown");
    $(".history-timeline-row").hide();
    $(".history-timeline-row").removeClass("animated slideInDown");
    $(".prescription").hide();
    $(".prescription").removeClass("animated slideInDown");
    $('.prescription-text-holder').hide();
    $('.prescription-text-holder').removeClass('animated slideInDown');
    $('.prescription-ocr-holder').hide();
    $('.prescription-ocr-holder').removeClass('animated slideInDown');
    $(".history").show();
    $(".history").addClass("animated slideInDown");
  });

  $(".history-timeline-row").hide();
  /*$("#history-get-trigger").on("click",function()
  {
    $(".details").hide();
    $(".details").removeClass("animated slideInDown");
    $(".history").hide();
    $(".history").removeClass("animated slideInDown");
    $(".prescription").hide();
    $(".prescription").removeClass("animated slideInDown");
    $('.prescription-text-holder').hide();
    $('.prescription-text-holder').removeClass('animated slideInDown');
    $('.prescription-ocr-holder').hide();
    $('.prescription-ocr-holder').removeClass('animated slideInDown');
    $(".history-timeline-row").show();
    $(".history-timeline-row").addClass("animated slideInDown");
  });*/

  $(".prescription").hide();
  $("#prescription-trigger").on("click",function()
  {
    $(".details").hide();
    $(".details").removeClass("animated slideInDown");
    $(".history").hide();
    $(".history").removeClass("animated slideInDown");
    $(".history-timeline-row").hide();
    $(".history-timeline-row").removeClass("animated slideInDown");
    $('.prescription-text-holder').hide();
    $('.prescription-text-holder').removeClass('animated slideInDown');
    $('.prescription-ocr-holder').hide();
    $('.prescription-ocr-holder').removeClass('animated slideInDown');
    $(".prescription").show();
    $(".prescription").addClass("animated slideInDown");
  });
  /*prescription*/
  $(".prescription-text-holder").hide();
  $("#prescription-text-trigger").on("click",function()
  {
    $(".details").hide();
    $(".details").removeClass("animated slideInDown");
    $(".history").hide();
    $(".history").removeClass("animated slideInDown");
    $(".history-timeline-row").hide();
    $(".history-timeline-row").removeClass("animated slideInDown");
    $(".prescription").hide();
    $(".prescription").removeClass("animated slideInDown");
    $(".prescription-ocr-holder").hide();
    $(".prescription-ocr-holder").removeClass("animated slideInDown");
    $(".prescription-text-holder").show();
    $(".prescription-text-holder").addClass("animated slideInDown");
  });

  $(".prescription-ocr-holder").hide();
  $("#prescription-ocr-trigger").on("click",function()
  {
    $(".details").hide();
    $(".details").removeClass("animated slideInDown");
    $(".history").hide();
    $(".history").removeClass("animated slideInDown");
    $(".history-timeline-row").hide();
    $(".history-timeline-row").removeClass("animated slideInDown");
    $(".prescription").hide();
    $(".prescription").removeClass("animated slideInDown");
    $(".prescription-text-holder").hide();
    $(".prescription-text-holder").removeClass("animated slideInDown");
    $(".prescription-ocr-holder").show();
    $(".prescription-ocr-holder").addClass("animated slideInDown");
  });
  $('.illustration-row-1').css('height',Ht-(Ht/20));
});

$(window).resize(function()
{
  var Ht=$(window).height();
  var Wt=$(window).width();

  var details_ht=Ht/1.3;
  $(".personal-details").css("height",details_ht);
  var history_ht=Ht/1.4;
  $(".history-search").css("height",history_ht*1.5);
  $(".history-timeline").css("height",history_ht*2);
  $(".red-timeline").css("height",history_ht*2-100);
  $('.illustration-row-1').css('height',Ht-(Ht/20));
});
