
function when_panel_clicked(){
    alert("you clicked on a panel!!!!")
}

function on_page_ready(){
    $(".panel").click(when_panel_clicked)
}

$(document).ready(on_page_ready)