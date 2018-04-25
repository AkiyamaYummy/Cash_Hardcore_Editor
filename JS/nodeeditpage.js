var mainEdit = {
    editing:false,
    tree:[{key:"我的笔记本",value:[{key:"我的分区",value:["123456","654321"]},{key:"已删除",value:["123457"]}]}],
    treepath:[],
    notemessage:{
        "123456":{
            name:"论野猪的健康配种",
            page:13,
            createtime:"2018-4-23 12:11",
            lastedittime:"2018-4-23 12:11"
        },
        "654321":{
            name:"笑林广记",
            page:13,
            createtime:"2018-4-23 12:11",
            lastedittime:"2018-4-23 12:11"
        },
        "123457":{
            name:"四座楼核桃盘玩心得",
            page:13,
            createtime:"2018-4-23 12:11",
            lastedittime:"2018-4-23 12:11"
        }
    }
};
function setMainEdit() {
    var topbuttons = $(".top-panel-button");
    $(topbuttons[0]).click(function () {
        showTopButtonSubList();
    });
    $(topbuttons[1]).click(function () {
        mainEdit.editing = !mainEdit.editing;
        if(mainEdit.editing)pageEdit.editModeOn();
        else {
            pageEdit.editModeOff();
            allPanelsUncheck();
        }
        $(this).css({
            "background":mainEdit.editing?"white":"black",
            "color":mainEdit.editing?"black":"white"
        })
    });
}
function showTopButtonSubList() {
    var eleposi = getEleRelativePosi($(".top-panel-button")[0]);
    var listposi = {x: eleposi.l, y: eleposi.t + eleposi.h};
    var mask = getSubListMask();
    var list = $("<div></div>");
    $(list).attr({
        "id":"top-button-sublist"
    });
    $(list).css({
        "min-width":"150px",
        "position": "fixed",
        "top": (listposi.y+5)+"px",
        "left": (listposi.x-3)+"px",
        "background":"black",
        "color":"white"
    });
    if(mainEdit.treepath.length === 0){
        for(var i=0;i<mainEdit.tree.length;i++){
            $(list).append(getSubListItem(mainEdit.tree[i].key));
        }
        $(list).append(getSubListItem("详细信息"));
    }else if(mainEdit.treepath.length === 1){
        var items = mainEdit.tree[mainEdit.treepath[0]].value;
        for(var i=0;i<items.length;i++){
            $(list).append(getSubListItem(items[i].key));
        }
        $(list).append(getSubListItem("返回"));
    }else if(mainEdit.treepath.length === 2){
        var items = mainEdit.tree[mainEdit.treepath[0]].value[mainEdit.treepath[1]].value;
        for(var i=0;i<items.length;i++){
            $(list).append(getSubListItem(items[i]));
        }
        $(list).append(getSubListItem("返回"));
    }
    $("body").append(mask);
    $("body").append(list);
}
function getSubListItem(str) {
    var item = $("<div>"+str+"</div>");
    $(item).css({
        "margin":"3px 10px 7px 10px",
        "cursor":"pointer"
    });
    $(item).click(function () {
        execSubListClick($(this).index());
    });
    return item;
}
function execSubListClick(r) {
    $("#top-button-sublist").remove();
    $("#top-button-sublist-mask").remove();
    if(mainEdit.treepath.length === 0){
        var size = mainEdit.tree.length;
        if(r === size){
            showTreeEditPanel();
            return;
        }else{
            mainEdit.treepath.push(r);
        }
    }else if(mainEdit.treepath.length === 1){
        var size = mainEdit.tree[mainEdit.treepath[0]].value.length;
        if(r === size){
            mainEdit.treepath.pop();
        }else{
            mainEdit.treepath.push(r);
        }
    }else if(mainEdit.treepath.length === 2){
        var size = mainEdit.tree[mainEdit.treepath[0]].value[mainEdit.treepath[1]].value.length;
        if(r === size){
            mainEdit.treepath.pop();
        }else{
            alert("do some thing");
            return;
        }
    }
    showTopButtonSubList();
}
function getSubListMask() {
    var mask = $("<div></div>");
    $(mask).attr({
        "id": "top-button-sublist-mask"
    });
    $(mask).css({
        "position": "fixed",
        "width": "100%",
        "height": "100%",
        "top": "0",
        "left": "0"
    });
    $(mask).click(function () {
        $("#top-button-sublist").remove();
        $("#top-button-sublist-mask").remove();
    });
    return mask;
}
function showTreeEditPanel() {
    if($("#tree-edit-panel").length > 0)return;
    var treeeditpanel = $("<div></div>");
    $(treeeditpanel).attr({
        "id":"tree-edit-panel"
    });
    $(treeeditpanel).css({
        "position": "fixed",
        "width": "400px",
        "height": "100%",
        "top": "0",
        "left": "0",
        "background":"black",
        "color":"white",
        "font-family":"方正书宋简体",
        "font-size":"20px"
    });
    var treeshowpanel = $("<div></div>");
    $(treeshowpanel).css({
        "position":"absolute",
        "top":"50px",
        "left":"10px"
    });
    var closep = $("<u>收起</u>");
    $(closep).css({
        "position":"absolute",
        "top":"50px",
        "right":"10px",
        "cursor":"pointer"
    });
    $(closep).click(function () {
        $("#tree-edit-panel").remove();
    });
    $(treeeditpanel).append(treeshowpanel);
    $(treeeditpanel).append(closep);
    $("#main-top-panel").before(treeeditpanel);
    showTreeEditPanelContent();
}
function showTreeEditPanelContent() {
    var contentpanel0 = $("#tree-edit-panel").find("div")[0];
    for(var i=0;i<mainEdit.tree.length;i++){
        var key1 = mainEdit.tree[i].key;
        var value1 = mainEdit.tree[i].value;
        $(contentpanel0).append(getTreeEditPanelItem(key1));
        var subpanel1 = getTreeEditPanelContent();
        $(contentpanel0).append(subpanel1);
        for(var j=0;j<value1.length;j++){
            var key2 = value1[j].key;
            var value2 = value1[j].value;
            $(subpanel1).append(getTreeEditPanelItem(key2));
            var subpanel2 = getTreeEditPanelContent();
            $(subpanel1).append(subpanel2);
            for(var k=0;k<value2.length;k++){
                var key3 = value2[k];
                var contentitempanel = getTreeEditNoteMessagePanel(key3);
                $(subpanel2).append(contentitempanel);
            }
        }
    }
}
function getTreeEditPanelItem(str) {
    var item = $("<div>"+str+"</div>");
    $(item).css({
        "margin-left":"10px",
        "cursor":"pointer"
    });
    $(item).click(function () {
        $(this).next().slideToggle("fast");
    });
    return item;
}
function getTreeEditPanelContent() {
    var content = $("<div></div>");
    $(content).css({
        "margin-left":"30px",
        "border-left":"1px white dashed"
    });
    return content;
}
function getTreeEditNoteMessagePanel(id) {
    var messagenode = mainEdit.notemessage[id];
    var name = messagenode.name;
    var messagepanel = $("<div></div>");
    $(messagepanel).append(getTreeEditPanelItem(name));
    var messagecontent = $("<div></div>");
    $(messagecontent).append(getTreeEditMessageItem("页数",messagenode.page));
    $(messagecontent).append(getTreeEditMessageItem("创建时间",messagenode.lastedittime));
    $(messagecontent).append(getTreeEditMessageItem("最后编辑时间",messagenode.createtime));
    $(messagepanel).append(messagecontent);
    $(messagepanel).find("label").css({
        "height":"20px",
        "width":"100px",
        "display":"inline-block"
    });
    $(messagepanel).find("span").css({
        "height":"20px",
        "margin":"0"
    });
    return messagepanel;
}
function getTreeEditMessageItem(key,value) {
    var mi = $("<div></div>");
    $(mi).css({
        "font-size":"15px",
        "margin-left":"30px"
    });
    $(mi).append($("<label>"+key+"</label>"));
    $(mi).append($("<span>"+value+"</span>"));
    return mi;
}