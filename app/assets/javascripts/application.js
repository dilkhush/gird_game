// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

var which_blocks = "";
//through javascript generate rendom blocks to show green color
function startGame(size, level){
  which_blocks = "";
  var how_many_blocks = Math.floor(Math.random() * 5) + 1;
  for ( count = 0; count < how_many_blocks; count++ ) {
    var row = Math.floor(Math.random() * 5);
    var column = Math.floor(Math.random() * 5);
    which_blocks += "#button_"+row+"_"+column;
  }
  highlightBlocks(which_blocks, level)
}

// to highlight the color
function highlightBlocks(blocks, level){
  which_blocks = "";
  which_blocks = $.trim(blocks);
  which_blocks = which_blocks.split(/[ ,]+/).join(',');
  removeAllClasses()
  $(which_blocks).addClass('green_color')
  setTimeout(removeGreenClasses, (6 - level) * 1000);
}

//to remove the green color
function removeGreenClasses(){
  $('.btn').removeClass('green_color')
}

//to reset the colors
function removeAllClasses(){
  removeGreenClasses()
  $('.btn').removeClass('gray_color')
  $('.btn').removeClass('red_color')
}

// to add grey class
function addClasses(){
  if($('.gray_color').length <= 4)
    $(this).addClass('gray_color')
  else
    showMessage('alert-warning alert', 'Can\'t select more then'+ 5)
}

// to show all kind of methods
function showMessage(className, message){
  $('.alert').attr('class', className).text(message)
}

// to show the result
function showResult(){
  var selectedBlocks = $('.gray_color');
  if(selectedBlocks.length == 0){
    showMessage('alert-danger alert', 'Please start a game Or select the blocks!')
    return null;
  }
  expectedBlockIds = which_blocks.split(',');
  var selectedBlocksIds = [];
  $.each(selectedBlocks, function(index, value){
    selectedBlocksIds.push('#'+value.id)
  })
  var matches='';
  var matchesCount = 0;
  var notmatches='';
  $.each(expectedBlockIds, function(index, value){
    if(selectedBlocksIds.indexOf(value) != -1){
      matches += ' '+value;
      matchesCount++;
    }else
      notmatches += ' '+value;
  })
  removeAllClasses()
  matches = $.trim(matches).split(/[ ,]+/).join(',');
  notmatches = $.trim(notmatches).split(/[ ,]+/).join(',');
  $(matches).removeClass('gray_color').addClass('green_color')
  $(notmatches).removeClass('gray_color').addClass('red_color')
  if(matchesCount == expectedBlockIds.length)
    showMessage('alert-success alert', 'Congratulations!!! You win this level.')
  else
    showMessage('alert-info alert', 'Green blocks you selected and red blocks not able to find')
}
