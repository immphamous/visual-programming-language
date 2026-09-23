let target = null, draggingItem = null, draggingSlot = null, itemContextMenuSelected = null;

let currentLabels = []

document.onclick = () => {
    $('#item-context-menu').hide(200);
}
document.oncontextmenu = (e) => {
    console.log("yo");
    if(!$('#item-context-menu').is(':hidden'))
        $('#item-context-menu').hide(200);
}

function isBefore(el1, el2) {
    if (el2.parentNode === el1.parentNode)
    for (var cur = el1.previousSibling; cur && cur.nodeType !== 9; cur = cur.previousSibling)
      if (cur === el2)
        return true;
    return false;
}

$('#item-context-menu').find('li').each((index, li) => {
    $(li).on('click', (e) => {
        if(!itemContextMenuSelected) return;
        
        if($(li).text() == "Remove") {
            itemContextMenuSelected.remove();
        } else if($(li).text() == "Duplicate") {
            var newItem = itemContextMenuSelected.clone();
            initItem(newItem);
            newItem.insertAfter(itemContextMenuSelected)
            
            newItem.find('.draggable-slot').each((index, slot) => {
                initSlotInstance($(slot), $(slot).find('button:last'));
            });
        }
        
        
        
        console.log(itemContextMenuSelected);
    })
})

function initSlotInstance(newSlot, xButton) {
    newSlot.attr('draggable', false);
    xButton.on("click", (e) => {
        newSlot.remove();
    })
}

function initSlot(slot) {
    $(slot).on('dragstart', (e) => {
        
        // var newSlot = $('<div>').text($(slot).text());
        
        var newSlot = $(slot).clone();
        newSlot.find('button').remove();
        newSlot.find('.slot').each((index, slot) => {
            initItemSlot(slot);
        })
        // newSlot.addClass($(slot).attr('class'))
        
        var xButton = $('<button>').appendTo(newSlot);
        var i = $('<i>').addClass("bi bi-x").appendTo(xButton);
        initSlotInstance(newSlot, xButton);
        
        draggingSlot = newSlot;
    })
    $(slot).on('dragend', (e) => {
        if(!draggingSlot) return;
        draggingSlot.removeClass('dragging');
        
        var chosenSlot = $('.dragging-over');
        if(chosenSlot.length) {
            chosenSlot.find('.draggable-slot').remove();
            
            $(chosenSlot).append(draggingSlot);
            $(chosenSlot).removeClass('dragging-over');
            
        } else {
            draggingSlot.remove();
        }
        
        
        draggingSlot = null;
    })
}

var slots = $('.draggable-slot');
slots.each((index, slot) => {
    initSlot(slot);
});

function initList(list) {
    console.log("INIT")
    $(list).on('dragenter', (e) => {
        e.stopPropagation();
        if(!draggingItem) return;
        if($(list).children().length > 0) {
            return;
        }
        /*e.target.appendChild(draggingItem);*/
        
        $(list).addClass('sortable-list-hovered');
        
        e.preventDefault();
    })
    $(list).on('dragleave', (e) => {
        e.stopPropagation();
        if(!draggingItem) return;
        if($(list).children().length > 0) {
            return;
        }
        /*e.target.appendChild(draggingItem);*/
        
        $(list).removeClass('sortable-list-hovered');
        
        e.preventDefault();
    })
    $(list).on('dragover', (e) => {
        e.preventDefault();  
        e.stopPropagation();
        
        console.log($(list).hasClass('blocklist'));
    })
    $(list).on('drop', (e) => {
        e.preventDefault();  
        e.stopPropagation();
        if(!draggingItem) return;
        if($(list).children().length > 0) {
            return;
        }
        
        if($(draggingItem).parent().attr('id') == 'blocks-list') {
            
            var item = $(draggingItem).clone().removeClass('dragging');
            
            item.find('.sortable-list').each((index, ul) => {
                initList(ul);
                console.log(ul);
            })
            $(list).append(item);
            
            initItem(item);
        } else {
            $(list).append(draggingItem);
        }
        
        $(list).removeClass('sortable-list-hovered');
    })
}

function newList(name) {
    if(!name) {
        name = prompt("What will be the name of the label?");
        if(!name) return;
    }
    if(currentLabels.includes(name)) {
        return;
    }
    
    var list = $('<div>').addClass('label').appendTo('#labels');
    var header = $('<div>', { "draggable": true }).addClass('draggable-slot catagory-label').text(name).appendTo(list);
    if(name != "begin"/* && name != "forever"*/) {
        var xButton = $('<button>').appendTo(header);
        
        $('.draggable-slot')
        
        var i = $('<i>').addClass("bi bi-x").appendTo(xButton);
        xButton.on("click", (e) => {
            list.remove();
            currentLabels = currentLabels.filter(item => item !== name)
            
            
            
            $('.draggable-slot').filter('.catagory-label').each((index, slot) => {
                console.log(slot)
                if($(slot).text() == name) $(slot).remove();
            })
        })
        
    }
    currentLabels.push(name);
    initSlot(header);
    
    var ul = $('<ul>').addClass('sortable-list').appendTo(list);
    initList(ul);
    
    return ul;
}

// newList("it_was_true");

$('#newList').on('click', (e) => {
    newList()
})

var lists = $('.sortable-list');
lists.each((index, list) => {
    initList(list)
});

function initItemSlot(slot) {
    $(slot).on('dragenter', (e) => {
        if(!draggingSlot) return;
        /*$(input).addClass('hidden');*/
        $(slot).addClass('dragging-over');
        // slot.append(draggingSlot.get(0));
        e.stopPropagation();
    })
    $(slot).on('dragover', (e) => {
        if(!draggingSlot) return;
        e.preventDefault();
        e.stopPropagation();
    })
    $(slot).on('dragleave', (e) => {
        /*$(input).removeClass('hidden');*/
        
        if(e.target == slot) {
            return;
        }
        
        $(slot).removeClass('dragging-over');
        // draggingSlot.insertAfter(input);
        e.stopPropagation();
    })
}

function initItem(item) {
    var dragIcon = $(item).find('.drag-icon');
    
    $(item).on('mousedown', (e) => {
        target = e.target;
    })
    $(item).on('dragstart', (e) => {
        console.log("start")
        if($.contains(dragIcon.get(0), $(target).get(0))) {
            draggingItem = e.target;
            draggingItem.classList.add('dragging');
        } else {
            e.preventDefault();
        }
    })
    $(item).on('dragend', (e) => {
        if(!draggingItem) return;
        
        draggingItem.classList.remove('dragging');
        draggingItem = null;
        
        e.preventDefault();
    })
    $(item).on('dragover', (e) => {
        if(!draggingItem) return;
        
        e.preventDefault();
        
        var target = e.currentTarget;
        var domRect = target.getBoundingClientRect();
        if(e.offsetY > domRect.height / 2) {
           $(item).removeClass('sortable-item-hover-top')
           
           $(item).addClass('sortable-item-hover-bottom');
        } else {
           $(item).removeClass('sortable-item-hover-bottom');
           
           $(item).addClass('sortable-item-hover-top');
        }
    })
    $(item).on('drop', (e) => {
        if(!draggingItem) return;
        
        e.preventDefault();
        
        var target = e.currentTarget;
        var domRect = target.getBoundingClientRect();
        if($(draggingItem).parent().attr('id') == 'blocks-list') {
            
            var newItem = $(draggingItem).clone().removeClass('dragging');
            
            if(e.offsetY > domRect.height / 2) {
               // bottom
               
                item.after(newItem);
            } else {
                // top
                item.before(newItem);
            }
            initItem(newItem);
            newItem.find('.sortable-list').each((index, ul) => {
                initList(ul);
                console.log(ul)
            })
        } else {
            if(e.offsetY > domRect.height / 2) {
               // bottom
               
                item.after(draggingItem);
            } else {
                // top
                item.before(draggingItem);
            }
        }
        
       $(item).removeClass('sortable-item-hover-top')
       $(item).removeClass('sortable-item-hover-bottom');
    })
    $(item).on('dragleave', (e) => {
        if(!draggingItem) return;
        
        e.preventDefault();
        e.stopPropagation();
        
       $(item).removeClass('sortable-item-hover-top')
       $(item).removeClass('sortable-item-hover-bottom');
    })
    $(item).find('.slot').each((index, slot) => {
        initItemSlot(slot);
    })
    $(item).on('contextmenu', (e) => {
        e.preventDefault();
        
        e.stopPropagation();

        if (!$('#item-context-menu').is(":hidden"))
            $('#item-context-menu').hide(100)
        else {
            $('#item-context-menu').show(50)
            $('#item-context-menu').css('left', e.pageX + "px");
            $('#item-context-menu').css('top', e.pageY + "px");
            
            itemContextMenuSelected = $(item)
        }
    })
}

function genFromPresets(preset, div) {
    preset.sectors.forEach(sector => {
        if(sector.type == "text") {
            $('<span>').addClass('item-text').text(sector.content).appendTo(div);
        }
        if(sector.type == "input") {
            var slot = $('<span>').addClass('slot').appendTo(div);
            $('<input>').val(sector.content).appendTo(slot);
        }
        if(sector.type == "options") {
            var select = $('<select>').appendTo(div);
            sector.content.forEach(option => {
                $('<option>').text(option).appendTo(select);
            })
        }
        if(sector.type == "blocklist") {
            var ul = $('<ul>').addClass('sortable-list blocklist');
            div.after(ul);
        }
    })
}

function newSlot(slotPreset) {
    var div = $('<div>', { "draggable": true }).addClass('draggable-slot');
    div.addClass('catagory-' + slotPreset.catagory);
    genFromPresets(slotPreset, div);
    return div;
}
function newItem(itemPreset) {
    var li = $('<li>', { "draggable": true }).addClass('sortable-item');
    var div = $('<div>').addClass('visual-item').appendTo(li);
    var handleSpan = $('<span>').addClass('drag-icon').appendTo(div);
    var handle = $('<i>').addClass('bi bi-grip-vertical').appendTo(handleSpan);
    div.addClass('catagory-' + itemPreset.catagory);
    genFromPresets(itemPreset, div);
    
    return li;
}

var items = $('.sortable-item');
items.each((index, item) => {
    initItem(item);
});

var begin = newList("begin");
// var forever = newList("forever");
/*newItem(toolboxBlocks["print"], begin);
newItem(toolboxBlocks["set_slot"], begin);
newItem(toolboxBlocks["change_slot"], begin);
newItem(toolboxBlocks["jump_to"], begin);
newItem(toolboxBlocks["jump_if"], begin);
newItem(toolboxBlocks["return"], begin);

newItem(toolboxBlocks["set_transform"], begin);
newItem(toolboxBlocks["change_transform"], begin);*/


var selectedCatagory = null;
function selectCatagory(catagoryButton, catagory, catagoryName) {
    if(selectedCatagory == catagoryButton) return;
    if(selectedCatagory) {
        selectedCatagory.removeClass('selected-catagory');
        selectedCatagory.css('background', 'white');
    }
    selectedCatagory = catagoryButton;
    catagoryButton.addClass('selected-catagory');
    catagoryButton.css('background', catagory.toolbox_color);
    
    $('#blocks-list').empty();
    
    for (let [name, block] of Object.entries(toolboxBlocks)) {
        if(block.catagory == catagoryName) {
            console.log(name);
            let item = newItem(block);
            item.appendTo($('#blocks-list'));
            // initItem(item);
            
            let target = null;
            let dragIcon = item.find('.drag-icon');
            
            let copy = null;
            
            item.on('mousedown', (e) => {
                target = e.target;
            })
            item.on('dragstart', (e) => {
                e.stopPropagation();
                if($.contains(dragIcon.get(0), $(target).get(0))) {
                    
                    draggingItem = item;
                    $(draggingItem).addClass('dragging');
                
                    
                } else {
                    e.preventDefault();
                }
            })
            item.on('dragend', (e) => {
                if(!draggingItem) return;
                
                $(draggingItem).removeClass('dragging');
                
                // $(draggingItem).clone().appendTo(e.target);
                
                draggingItem = null;
                
                e.preventDefault();
                e.stopPropagation();
            })
        }
    }
    
    for (let [name, slot] of Object.entries(toolboxSlots)) {
        if(slot.catagory == catagoryName) {
            let item = newSlot(slot);
            item.appendTo($('#blocks-list'));
            initSlot(item);
        }
    }
}
for (let [name, catagory] of Object.entries(catagories)) {
    let catagoryButton = $('<button>').addClass('catagory').appendTo($('.catagory-list')).text(catagory.name).css('border-color', catagory.toolbox_color);
    if(name == 'output') {
        selectCatagory(catagoryButton, catagory, name);
    }

    catagoryButton.click(() => {
        selectCatagory(catagoryButton, catagory, name)
    });
}


$('#toolbox').on('dragover', e => {
    if($(draggingSlot).parent().attr('id') == 'blocks-list') return;
    if($(draggingItem).parent().attr('id') == 'blocks-list') return;
    e.preventDefault();
})

$('#toolbox').on('drop', e => {
    if($(draggingSlot).parent().attr('id') == 'blocks-list') return;
    if($(draggingItem).parent().attr('id') == 'blocks-list') return;
    if(draggingSlot) {
        $(draggingSlot).remove();
        draggingSlot = null;
    }
    if(draggingItem) {
        $(draggingItem).remove();
        draggingItem = null;
    }
    
})

$('#toolbox-toggle').click(() => {
    if($('#toolbox-toggle').hasClass('toolbox-toggle-show')) {
        $('#toolbox-toggle').removeClass('toolbox-toggle-show');

        $('#toolbox').css('width', '400px');
        $('#playground').css('padding-left', '410px');
    } else {
        $('#toolbox-toggle').addClass('toolbox-toggle-show');


        $('#toolbox').css('width', '40px');
        $('#playground').css('padding-left', '50px');
    }
})
