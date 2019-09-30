$.fn.showEquips = function (opts) {
    this.empty();
    var list = opts.data,
    	equipType = opts.equipType,
        edit = opts.edit,
        remove = opts.remove,
        add = opts.add,
        update = opts.update,
        isMulti = opts.isMulti,
        hideOperation = opts.hideOperation,
        hidePlus = opts.hidePlus,
        selectAll = false;
    this.checked = [];

    if (list && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
            var equip = list[i];
            //TODO:修改需要显示的属性
            showEquipItem(this, equip, edit, remove, update, isMulti, this.checked, hideOperation,equipType);
        }
    }
    //监听全选
    allSelect(list,this.checked,selectAll);

    //TODO:显示感叹号方框暂时隐藏
    // showSigh(this, add, true);
    if (!hidePlus)
        showSigh(this, add);
    this.getCheckedBox = function () {
        //demo
        console.log(this.checked);
        return this.checked;
    };
    return this;
};

//全选
function allSelect(list,checked,selectAll) {
    $('#allSelect').on('click',function () {
        var checkItem = $('.checkItem');
        if(selectAll == false){
            $('#allSelect').attr('value',"全部取消");
            selectAll = true;
            checkItem.prop("checked", true);
            if(checked){
                var length = checked.length;
                for (var i = 0; i < length; i++){
                    checked.remove(checked[length-i-1]);
                }
            }
            for (var i = 0; i < list.length; i++){
                checked.add(list[i]);
            }
        }else {
            $('#allSelect').attr('value',"全选");
            selectAll = false;
            if(checked){
                var length = checked.length;
                for (var i = 0; i < length; i++){
                    checked.remove(checked[length-i-1]);
                }
            }
            checkItem.prop("checked", false);
        }
    });

};

function showSigh(box, add, isSigh) {
    var sighBox = $('<div class="equip-item-container"></div>');
    var itemContainer = $('<div class="equip-item"></div>');
    sighBox.append(itemContainer);
    var iconBox = $('<div class="equip-item-other-box equip-item-sigh-box"></div>');
    if (!isSigh) {
        iconBox = $('<div class="equip-item-other-box"></div>');
        iconBox.append($('<img src="../../../common/skins/skin3/img/plus-border.png" style="width: 100%;">'));
    } else
        iconBox.append($('<div class="glyphicon glyphicon-info-sign equip-item-sigh-icon"></div>'));
    if (add) {
        iconBox.on('click', function () {
            add();
        });
    }
    itemContainer.append(iconBox);
    var textBox = $('<div class="equip-item-sigh-text"><span  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 新增设备</span></div>');
    itemContainer.append(textBox);
    box.append(sighBox);
}

function resetAddress(addr) {
    if (addr < 10) {
        return '00' + addr;
    } else if (addr < 100 && addr > 9) {
        return '0' + addr;
    } else if (!addr) {
        return '';
    } else {
        return addr;
    }
}


function showEquipItem(box, equip, edit, remove, update, isMulti, checked, hideOperation,equipType) {
    var container = $('<div class="equip-item-container"></div>');
    var itemContainer = $('<div class="equip-item" style="cursor:pointer;"></div>');
    container.append(itemContainer);
    var topBox = $('<div class="flex-container-row" style="height: 30px;"></div>');

    var portBox = $('<div class="equip-port-box"></div>');
    if (isMulti) {
        var checkItem = $('<input type="checkbox" class="checkItem" style="margin-right: 2px;cursor:pointer; ">');
        //equip点击事件
        itemContainer.click(function () {
            //demo
            //console.log("success");
            //console.log(checked);
            if (checkItem.prop("checked")) {
                checked.remove(equip);
                checkItem.prop("checked", false);
            } else {
                checked.add(equip);
                checkItem.prop("checked", true);
            }
        });
        checkItem.change(function () {
            //dmeo
            //console.log(checked);
            //console.log(this.checked);
            if (checkItem.prop("checked")) {
                checked.remove(equip);
                checkItem.prop("checked", false);
            } else {
                checked.add(equip);
                checkItem.prop("checked", true);
            }
        });
        portBox.append(checkItem);
    } else {
        portBox.append($('<div style="width: 13px;"></div>'));
    }
    //TODO:设置端口
    if(equipType=="serialPortEquip"){
      	portBox.append($('<span id="port">' + (resetAddress(equip.address)) + '</span>'));    	
    }
    topBox.append(portBox);
    
    //TODO:设备探测图标显示
    var autoBox = $('<div class="equip-auto-icon-box"></div>');
    // status 0:正常，1警告，2异常
    //正常 通讯异常 通讯超时 协议错误 未知错误
    var status = equip.status;
    
    if (equip.isDisarm) {
    	if(status!=null&&status!="正常"){
    		var autoBoxB = $('<i id="update-' + equip.id+ '"  title="撤防" class="fa fa-shield" aria-hidden="true" style="margin: 9px 0 0 20px;  font-size: 21px;"></i>');
        }else{
    		var autoBoxB = $('<i id="update-' + equip.id+ '"  title="撤防" class="fa fa-shield" aria-hidden="true" style="margin: 9px 0 0 45px;  font-size: 21px;"></i>');
        }
    }else {
    	if(status!=null&&status!="正常"){
    		var autoBoxB = $('<i id="update-' + equip.id+ '"  title="布防" class="fa fa-shield" aria-hidden="true" style="margin: 9px 0 0 20px; color: #00dddd; font-size: 21px;"></i>');
        }else{
    		var autoBoxB = $('<i id="update-' + equip.id+ '"  title="布防" class="fa fa-shield" aria-hidden="true" style="margin: 9px 0 0 45px; color: #00dddd; font-size: 21px;"></i>');
        }
    }
    var autoItem = $('<div class="equip-auto-icon" title="自动添加">A</div>');
    if (equip.manual) {
        autoBox = $('<div class="equip-manual-icon-box"></div>');
        autoItem = $('<div class="equip-manual-icon" title="手动添加">M</div>');
    }
    autoBox.append(autoItem);
    topBox.append(autoBox);
    topBox.append(autoBoxB);

    if (update) {
        autoBoxB.on('click', function () {
            update(this.id.split('-')[1]);
        });
    }

    
    // if (!status) {
    //     status = '未知错误';
    // }
    var statusItem = $('<div style="width: 1px;"></div>');
    if (status == '通讯异常' || status == '通讯超时') {
        statusItem = $('<div class="glyphicon glyphicon-info-sign equip-warn-icon" title="' + status + '"></div>');
    } else if (status == '协议错误' || status == '未知错误') {
        statusItem = $('<div class="glyphicon glyphicon-info-sign equip-error-icon" title="' + status + '"></div>');
    }
    topBox.append(statusItem);

    if (!hideOperation) {
        var editBox = $('<div id="edit-' + equip.id+ '" class="equip-item-edit"></div>');
        topBox.append(editBox);
        if (edit) {
            editBox.on('click', function () {
                edit(this.id.split('-')[1]);
            });
        }

        var removeBox = $('<div id="remove-' + equip.id + '" class="glyphicon glyphicon-remove equip-item-remove"></div>');
        topBox.append(removeBox);
        if (remove) {
            removeBox.on('click', function () {
                remove(this.id.split('-')[1]);
            });
        }
    }
    itemContainer.append(topBox);

    var bottomBox = $('<div class="flex-container-row" style="flex: 1;"></div>');
    bottomBox.append($('<div class="equip-item-logo"></div>'));
    var equipItemBox = $('<div class="flex-container-column equip-item-box"></div>');
    if(equipType=="networkEquip"){
    	equipItemBox.append($('<div style="height: 27px;padding-top:10px;">'+equip.host+':'+equip.port+'</div>'));
    }else{
    	equipItemBox.append($('<div style="height: 27px;padding-top:10px;"></div>'));
    }
    //TODO:设置设备类型，名称
    equipItemBox.append($('<div style="cursor:pointer;"class="equip-item-box-type" title="' + equip.deviceModel.name+ '"><span>' + equip.deviceModel.name.substr(0, 8) + '</span></div>'));
    equipItemBox.append($('<div style="cursor:pointer;"class="equip-item-box-name"><span >' + equip.name+ '</span></div>'));
    bottomBox.append(equipItemBox);
    itemContainer.append(bottomBox);
    box.append(container);
}

function resetBackground(parent) {
    for (var i = 0; i < parent.childNodes.length; i++) {
        var child = parent.childNodes[i];
        child.style.background = '';
        child.style.border = '';
    }
}

$.fn.showEquipList = function (opts) {
    this.empty();
    var parent = this;
    var list = opts.data, isChecked = opts.checked, onChecked = opts.onChecked, toSelect = opts.toSelect,
        selected = opts.selected, currentEquip = opts.currentEquip;
    for (var i = 0; i < list.length; i++) {
        var equip = list[i];
        var box = $('<div id="' + equip.id + '" class="flex-container-row equip-list-item-box"></div>');
        var checkItem = $('<input type="checkbox" />&nbsp;');
        if (isChecked) {
            checkItem = $('<input type="checkbox" checked/>&nbsp;');
        }
        box[0].value = equip;
        box.append(checkItem);
        checkItem.on('click', function () {
            onChecked(this.parentElement.value);
        });
        box.append($('<img src="../../../common/skins/skin3/img/equip-type.png">&nbsp;'));
        box.append($('<span>' + equip.name + '</span>'));
        if (toSelect) {
            box.on('click', function () {
                if (this.style.background == '') {
                    resetBackground(this.parentElement);
                    this.style.background = '#3a3a3a';
                    this.style.border = '1px solid #02d7d7';
                    this.selected = true;
                }
                else if (this.style.background != '') {
                    this.style.background = '';
                    this.style.border = '';
                    this.selected = false;
                }
                selected(this);
            });
        }
        this.append(box);
        if (isChecked && equip.id == currentEquip.id) {
            box.trigger('click');
        }
    }
};

$.fn.showCheckPoints = function (list, onChange) {
    var searchBox = $('<div style="min-height: 50px;" class="flex-container-row flex-center flex-across-center"></div>');
    var searchInput = $('<input placeholder="Search"/>');
    searchBox.append(searchInput);
    var searchIndex = 0;
    searchInput.keyup(function (e) {
        if (e.keyCode != 13) {
            searchIndex = 0;
        }
        showItems($('#items-box'), getListByKeyWord(list, this.value), 0, onChange);

    });

    var searchLogo = $('<div class="search-pure-logo"></div>');
    searchBox.append(searchLogo);
    this.append(searchBox);
    var itemsBox = $('<div style="overflow: auto;" id="items-box"></div>');
    if (list && list.length > 0) {
        showItems(itemsBox, list, 0, onChange);
    }
    this.append(itemsBox);
};

function getListByKeyWord(list, word) {
    var newList = [];
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item.name.indexOf(word) > -1) {
            newList.add(item);
        }
    }
    return newList;
}

function showItems(box, list, index, onChange) {
    box.empty();
    for (var i = 0; i < list.length; i++) {
        var cp = list[i];
        var itemBox = $('<div id="' + cp.id + '" class="flex-container-row flex-across-center flex-center cp-item"></div>');
        if (i == index) {
            itemBox.addClass('cp-item-selected');
        }
        var nameBox = $('<span>' + cp.name + '</span>');
        itemBox.append(nameBox);
        box.append(itemBox);
        itemBox.on('click', function () {
            for (var k = 0; k < this.parentElement.children.length; k++) {
                var child = this.parentElement.children[k];
                child.classList.remove('cp-item-selected');
            }
            this.classList.add('cp-item-selected');
            onChange(this.id);
        });
    }
    $('.cp-item-selected').trigger('click');
}

$.fn.addItem = function (isTop, isSwitch, first) {
    var parent = this;

    if (isSwitch && first) {
        if (isTop)
            topIndex = 1;
        else
            bottomIndex = 1;
    }
    var flag = '';
    var inputRecoverTimeName = null;
    var selectDegreeName = null;
    if (isTop) {
        $('#topContainer').find('.fa-plus-square-o').hide();
        flag = 'top';
        inputRecoverTimeName = "metric.eventTypes[0].limitWarningUpgradeRule[" + topIndex + "].recoverTime";
        selectDegreeName = "metric.eventTypes[0].limitWarningUpgradeRule[" + topIndex + "].degree";
        if (!isSwitch) {
            checkPointForm.value.metric.eventTypes[0].limitWarningUpgradeRule[topIndex] = {};
        }
        itemIndex = topIndex;
        topIndex++;

    } else {
        $('#bottomContainer').find('.fa-plus-square-o').hide();
        inputRecoverTimeName = "metric.eventTypes[1].limitWarningUpgradeRule[" + bottomIndex + "].recoverTime";
        selectDegreeName = "metric.eventTypes[1].limitWarningUpgradeRule[" + bottomIndex + "].degree";
        if (!isSwitch) {
            checkPointForm.value.metric.eventTypes[1].limitWarningUpgradeRule[bottomIndex] = {};
        }
        itemIndex = bottomIndex;
        bottomIndex++;

    }

    var itemBox = $('<div id="' + flag + 'item-' + itemIndex + '" class="flex-container-row flex-across-center" style="height: 60px;"></div>');
    var labelBox = $('<label class="control-label" style="width: 114px;font-size: 24px;padding-right: 6px;"></label>');
    var plus = $('<i class="fa fa-plus-square-o" style="margin-right: 8px;"></i>');
    var minus = $('<i class="fa fa-minus-square-o"></i>');
    labelBox.append(plus);
    labelBox.append(minus);
    itemBox.append(labelBox);
    var box = $('<div style=""></div>');
    box.append($('<input placeholder="" type="text" id="' + flag + 'time-' + itemIndex + '" name="' + inputRecoverTimeName + '" style="width: 230px;"/>'));
    itemBox.append(box);
    itemBox.append($('<label class="control-label" style="width: 171px;">(秒)时间未恢复，升级为</label>'));

    var box2 = $('<div style=""></div>');
    box2.append($('<select id="' + flag + 'value-' + itemIndex + '" name="' + selectDegreeName + '" style="width: 230px;" class="form-control"/>'));

    itemBox.append(box2);
    itemBox.append($('<label class="control-label" style="width: 36px;">程度</label>'));
    this.before(itemBox);
    loadDegreeSelection(flag + 'value-' + itemIndex);
    plus.on('click', function () {
        var tagId = this.parentElement.parentElement.id;
        // $('#' + tagId + '').addItem(isTop);
        parent.addItem(isTop);
    });
    minus.on('click', function () {
        var tagId = this.parentElement.parentElement.id;
        var ss = tagId.split("-");
        var index = ss[1];

        $('#' + tagId + '').remove();
        if (isTop) {
            $('#topContainer').find('.fa-plus-square-o').hide();
            checkPointForm.value.metric.eventTypes[0].limitWarningUpgradeRule[index] = null;
        } else {
            $('#bottomContainer').find('.fa-plus-square-o').hide();
            checkPointForm.value.metric.eventTypes[1].limitWarningUpgradeRule[index] = null;
        }
        parent.prev().find('.fa-plus-square-o').show();

    });

};
