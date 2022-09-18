import go from 'gojs' ;
import request from '@/router/axios';
import {errorMsgbox} from "@/api/global_variable";
// import {OverviewResizingTool} from "gojs/extensionsTS/OverviewResizingTool";

//设计：将关系存入数据库表sm_cf_model_entitywx，model本身的数据不变
//预览：根据数据库中的关系查询数据拼装入json串，更新到monitor，展示monitor数据
//job: 每30分钟 自动读取数据库关系，查询拼装数据更新monitor
//设置为物性地图/硫分布：将model在monitor中的对应记录的类型更新为五行地图/硫分布，首页只查询展示这两条记录

export {
  initGojs_yulan,//对外开放的gojs方法，参数为：画板区id，素材区id，画板区数据，素材区数据。无返回
  initDataPublicTemple_yulan,//初始化自定义的公共样式，参数：图元数据，指定画板，指定素材版
  initDiaTempleAndDraw_yulan,//初始化独有样式并绘画，参数为：素材区对象，素材区数据。返回：无
}

let gobuild = go.GraphObject.make;
let sharedToolTip;
let sharedToolTip_l;
let alarmloop = ''
let pipeloop = ''
let cxElement;
let myContextMenu;
let moId;
let nowDiagram;

//初始化画板和素材板，并返回其对象，因为有很多自定义操作要在vue完成
function initGojs_yulan(myDiagramId,myOverviewDivId) {

  initstyle_Tip();
  //初始化画板
  let myDiagram = initGojs_myDiagram(myDiagramId);
  let myOverview = initOverview(myOverviewDivId,myDiagram);

  //初始化公共静态样式
  initstaticPublicTemple(myDiagram);
  //初始化画板独有静态样式
  initstaticDiaTemple(myDiagram);


  let map = {};
  nowDiagram = myDiagram;
  map.Diagram = myDiagram;
  map.Overview = myOverview;
  return map

}

//根据图元数初始化自定义公共样式样式。即所有图元
function initDataPublicTemple_yulan(tuyuandata, myDiagram) {
  let nodes = tuyuandata.ENTITIES;
  if (nodes && nodes.length) {
    for (let num = 0; num < nodes.length; num++) {
      let node = nodes[num];
      let portShapes = [];
      // 预览的
      // 节点及link模板样式
      if (node.PORTS.length === 0) {
        portShapes = [
          gobuild(go.Shape, "Rectangle", portStyle(),
            {portId: "p1", alignment: new go.Spot(0, 0.5)}
          ),
          gobuild(go.Shape, "Rectangle", portStyle(),
            {
              portId: "p2", alignment: new go.Spot(0.5, 1)
            }
          ),
          gobuild(go.Shape, "Rectangle", portStyle(),
            {
              portId: "p3", alignment: new go.Spot(1, 0.5)
            }
          ),
          gobuild(go.Shape, "Rectangle", portStyle(),
            {
              portId: "p4", alignment: new go.Spot(0.5, 0)
            }
          )];
      } else {
        for (let num0 = 0; num0 < node.PORTS.length; num0++) {
          let port = node.PORTS[num0];
          // let pos = port.ALIGNMENT;
          let pos = {};
          // //{x:0.95,y:0.65}不是{'x':'0.95','y':'0.65'}无法点出数据，所以我做了字符串切割
          let poss = port.ALIGNMENT.split(",");
          pos.x = poss[0].substring(3, poss[0].length);
          pos.y = poss[1].substring(2, poss[1].length - 1);
          let input;
          let output;
          if (port.IN_OUT == 0) {
            input = true;
            output = false;
          } else if (port.IN_OUT == 1) {
            input = false;
            output = true;
          } else {
            input = true;
            output = true;
          }

          portShapes.push(
            gobuild(go.Shape, "Rectangle",
              {
                portId: port.KEY_ID,
                fill: port.PORTCOLOR,
                //stroke: null,
                alignment: new go.Spot(pos.x, pos.y),
                desiredSize: new go.Size(6, 6),
                fromSpot: new go.Spot(pos.x, pos.y), toSpot: new go.Spot(pos.x, pos.y),  // declare where links may connect at this port
                alignmentFocus: new go.Spot(pos.x, pos.y),  // just inside the Shape
                fromLinkable: input,
                toLinkable: output,
                cursor: "pointer"

              },
              new go.Binding('portId', 'PORTID').makeTwoWay()//
            ));

        }

      }

      let nodeTemplate = gobuild(go.Node, "Spot", nodeStyle(),
        {
          // contextMenu: myContextMenu,
          locationSpot: go.Spot.Center, // the
          locationObjectName: "SHAPE",
          movable: false,
          selectionAdorned: false, // no
          resizable: false,
          resizeObjectName: "SHAPE",
          rotatable: false,
          rotateObjectName: "ROTA", // rotate
          layoutConditions: go.Part.LayoutStandard
            & ~go.Part.LayoutNodeSized
        },
        new go.Binding('entityId', 'entityId').makeTwoWay(),// 图元ID
        new go.Binding('bProperties', 'bProperties').makeTwoWay(),// 参数
        new go.Binding('location', 'pos', go.Point.parse).makeTwoWay(go.Point.stringify),
        // 绑定旋转角度
        {name: "ROTA"},
        new go.Binding("angle", "angle").makeTwoWay(),
        // 绑定节点大小
        {name: "SHAPE"},
        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
        gobuild(go.Panel, "Auto",
          new go.Binding("background", "alarm_color", nodeColorConverter),
          gobuild(go.Picture,
            {
              name: "SHAPE",
              imageStretch: go.GraphObject.Fill,
              fromLinkable: true,
              toLinkable: true,
              cursor: "pointer"
            },
            new go.Binding("source", "img")),
          new go.Binding("sports", "sports")
        ),
        gobuild(go.TextBlock,
          {margin: 5, isMultiline: false, editable: false},
          new go.Binding("text", "text")
        )
      );

      myDiagram.nodeTemplateMap.add(node.ENTITY_NAME, nodeTemplate);

    }
  }
}

//给指定的画板赋值,赋值就是绘画
function initDiaTempleAndDraw_yulan(myDiagramData, myDiagram, mo_id) {
  moId = mo_id;
  //console.warn("部署到预览画板scale：" + myDiagram.scale)
  //console.warn("部署到预览画板initialAutoScale：" + myDiagram.Uniform)
  myDiagram.model = go.Model.fromJson(myDiagramData);

}

//初始化基础风格
function initstyle_Tip() {
  sharedToolTip = gobuild(
    go.Adornment, "Auto",
    gobuild(go.Shape, "RoundedRectangle", {fill: "lightyellow"}),
    gobuild(go.TextBlock, {margin: 4},
      new go.Binding("text", "", function (d) {
        return d.category;
      })
    )
  );

}
// 初始化鹰眼区
function initOverview(myOverviewDivId,myDiagram){
  let myOverview =
    gobuild(go.Overview, myOverviewDivId,  // the HTML DIV element for the Overview
      {
        observed: myDiagram,
        contentAlignment: go.Spot.Center,
        'box.resizable': true,
        // 'resizingTool': new OverviewResizingTool()
      });
      document.getElementById("myOverviewDiv").style.marginBottom = "10px";
return myOverview;
}
//初始化画板区
function initGojs_myDiagram(myDiagramId) {
  let myDiagram;
  myDiagram =
    gobuild(go.Diagram, myDiagramId
      ,
      {
        grid: gobuild(go.Panel, "Grid",
          {gridCellSize: new go.Size(8, 8)},
          gobuild(go.Shape, "LineH", {stroke: "lightgray", strokeWidth: 0.5}),//小分段
          gobuild(go.Shape, "LineH", {stroke: "gray", strokeWidth: 0.5, interval: 10}),//大分段
          gobuild(go.Shape, "LineV", {stroke: "lightgray", strokeWidth: 0.5}),
          gobuild(go.Shape, "LineV", {stroke: "gray", strokeWidth: 0.5, interval: 10})
        ),

        allowDrop: false,
        initialAutoScale: go.Diagram.Uniform,//如果这个div是隐藏的，那么该div被视为无限小，uniform会适应它，所以也小到看不到
        "draggingTool.dragsLink": false,
        "draggingTool.isGridSnapEnabled": false,
        "animationManager.isEnabled": true,
        "grid.visible": false,
        "grid.gridCellSize": new go.Size(0.5, 0.5),
        "resizingTool.isGridSnapEnabled": true,
        "linkingTool.isUnconnectedLinkValid": true,
        "linkingTool.portGravity": 20,
        "relinkingTool.isUnconnectedLinkValid": true,
        "relinkingTool.portGravity": 20,
        "relinkingTool.fromHandleArchetype": gobuild(
          go.Shape, "Diamond", {
            segmentIndex: 0,
            cursor: "pointer",
            desiredSize: new go.Size(8, 8),
            fill: "tomato",
            stroke: "darkred"
          }),
        "relinkingTool.toHandleArchetype": gobuild(
          go.Shape, "Diamond", {
            segmentIndex: -1,
            cursor: "pointer",
            desiredSize: new go.Size(8, 8),
            fill: "darkred",
            stroke: "tomato"
          }),
        "linkReshapingTool.handleArchetype": gobuild(
          go.Shape, "Diamond", {
            desiredSize: new go.Size(7, 7),
            fill: "lightblue",
            stroke: "deepskyblue"
          }),
        // rotatingTool: gobuild(TopRotatingTool), // defined
        // below
        "rotatingTool.snapAngleMultiple": 15,
        "rotatingTool.snapAngleEpsilon": 15,
        // allow Ctrl-G to call groupSelection()
        "commandHandler.archetypeGroupData": {
          text: "Group",
          isGroup: true,
          color: "blue"
        },
        // enable undo & redo
        "undoManager.isEnabled": true
      }
    );
  cxElement = document.getElementById("contextMenu");
  myContextMenu = gobuild(go.HTMLInfo,
    {
      show: showContextMenu,
      hide: hideContextMenu
    }
  );
  myDiagram.contextMenu = myContextMenu;

  cxElement.addEventListener("contextmenu",
    function (e) {
      //console.warn("菜单监听")
      e.preventDefault();
      return false;
    }, false);


  myDiagram.linkTemplate = gobuild(go.Link, linkStyle(),
    {selectable: true},
    {
      // contextMenu: myContextMenu,
      //routing : go.Link.AvoidsNodes,
      routing: go.Link.Orthogonal,
      curve: go.Link.JumpOver,
      corner: 7,

      relinkableFrom: false,
      relinkableTo: false,
      reshapable: false,
      resegmentable: true,
      movable: false,
      adjusting: go.Link.Stretch

    },
    new go.Binding("points", "points").makeTwoWay(),

    gobuild(go.Shape, {isPanelMain: true, stroke: "grey", strokeWidth: 8},
      new go.Binding("stroke", "alarm_color", linkColorConverter)
    ),

    gobuild(go.Shape, {isPanelMain: true, stroke: "white", strokeWidth: 3, name: "PIPE", strokeDashArray: [20, 40]})
    , gobuild(go.TextBlock, {
        alignment: new go.Spot(0.5, 1, 4, 4),
        alignmentFocus: new go.Spot(0.5, 1, 4, 4),
        textAlign: "left",
        verticalAlignment: go.Spot.Bottom,
        font: "bold 14pt Helvetica, Arial, sans-serif"
      },
      new go.Binding("text", "text").makeTwoWay())
  );
  // 用于标记窗口自上次保存后被修改
  myDiagram.addDiagramListener("Modified", function (e) {
    if (e.diagram.isModified) {
      //console.warn("用于标记窗口自上次保存后被修改");
    }
  });
  // 移动了选定的图元
  myDiagram.addDiagramListener("SelectionMoved", function (e) {
    if (e.diagram.isModified) {
      //console.warn("移动了选定的图元");
    }
  });
  // 删除选定的图元
  myDiagram.addDiagramListener("SelectionDeleted", function (e) {
    if (e.diagram.isModified) {
      //console.warn("删除选定的图元");
    }
  });
  // 创建了一个新的链接
  myDiagram.addDiagramListener("LinkDrawn", function (e) {
    if (e.diagram.isModified) {
      //console.warn("创建了一个新的链接");
    }
    e.subject.data['lProperties'] = '';
    e.subject.data['colors'] = 'grey';
    e.subject.data['width'] = '5';
    e.subject.data['onParaChanged'] = '';
  });
  // 重新连接使用现有链路
  myDiagram.addDiagramListener("LinkRelinked", function (e) {
    if (e.diagram.isModified) {
      //console.warn("重新连接使用现有链路");
    }
  });
  // 更改图元的大小
  myDiagram.addDiagramListener("PartResized", function (e) {
    if (e.diagram.isModified) {
      //console.warn("更改图元的大小");
    }
  });
  // 更改图元的角度
  myDiagram.addDiagramListener("PartRotated", function (e) {
    if (e.diagram.isModified) {
      //console.warn("更改图元的角度")
    }
  });
  // 通过从图表外部拖放部件将零件复制到图表中
  myDiagram.addDiagramListener("ExternalObjectsDropped", function (e) {
    if (e.diagram.isModified) {
      //console.warn("通过从图表外部拖放部件将零件复制到图表中");
    }
  });

  // // 图元双击 这给 所有图元添加了双击监听，他和图元模板设置的双击监不冲突，会一起生效
  // myDiagram.addDiagramListener("ObjectDoubleClicked", function (e) {
  //   addmsg_wx(e.subject.part.key);//被点击的图元的数据在e.subject.part，key是其中一个默认属性。自定义属性也这样输出
  // });
  return myDiagram;
}
//初始化不需要数据支持的公共样式
function initstaticPublicTemple(myDiagram) {

  //定义了一node的模板
  let nodeTemplateCommont = gobuild(go.Node, "Spot",
    {
      locationSpot: go.Spot.Center, //
      locationObjectName: "SHAPE",
      selectionAdorned: false, //
      resizable: false,
      resizeObjectName: "SHAPE", // user
      rotatable: false,
      movable: false,
      rotateObjectName: "ROTA", //
      layoutConditions: go.Part.LayoutStandard
        & ~go.Part.LayoutNodeSized
    },
    new go.Binding('entityId', 'entityId').makeTwoWay(),// 图元ID
    new go.Binding('bProperties', 'bProperties').makeTwoWay(),// 参数
    new go.Binding('location', 'pos', go.Point.parse).makeTwoWay(go.Point.stringify),
    // 绑定旋转角度
    {name: "ROTA"},
    new go.Binding("angle", "angle").makeTwoWay(),
    // 绑定节点大小
    {name: "SHAPE"},
    new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
    gobuild(go.Panel, "Auto",
      gobuild(go.Shape, "RoundedRectangle",
        {
          fill: "lightyellow",
          stroke: "black",
          stretch: go.GraphObject.Fill,
          alignment: go.Spot.Center
        }
      )
    ),
    gobuild(go.TextBlock, {
        font: "bold 11pt Helvetica, Arial, sans-serif",
        margin: 2,
        //maxSize: new go.Size(60, NaN),
        wrap: go.TextBlock.WrapFit,
        editable: false
      },
      new go.Binding("text", "text").makeTwoWay(),
      new go.Binding("font", "fontSize", function (i) {

        return i;
      })
    )
  );
//将新定义的图元模板添加到 该画板对象的 图元模板map备选
  myDiagram.nodeTemplateMap.add("Comment", nodeTemplateCommont);
//添加自定义文字图元
  let nodeTemplateLBSJ = gobuild(go.Node, "Spot",
    {
      locationSpot: go.Spot.Center,
      locationObjectName: "SHAPE",
      selectionAdorned: false,
      resizable: false,
      resizeObjectName: "SHAPE",
      rotatable: false,
      movable: false,
      rotateObjectName: "ROTA",
      layoutConditions: go.Part.LayoutStandard
        & ~go.Part.LayoutNodeSized
    },
    new go.Binding('entityId', 'entityId').makeTwoWay(),// 图元ID
    new go.Binding('bProperties', 'bProperties').makeTwoWay(),// 参数
    new go.Binding('location', 'pos', go.Point.parse).makeTwoWay(go.Point.stringify),

    // 绑定节点大小
    {name: "SHAPE"},
    new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
    gobuild(go.Panel, "Auto",
      gobuild(go.Shape, "RoundedRectangle",
        {
          fill: "#ffffff",
          stroke: "rgba(0,0,0,0)",
          stretch: go.GraphObject.Fill,
          alignment: go.Spot.Center
        }
      )),
    gobuild(go.TextBlock, {
        font: "bold 11pt Helvetica, Arial, sans-serif",
        margin: 2,
        wrap: go.TextBlock.WrapFit,
        editable: false
      },
      new go.Binding("text", "text").makeTwoWay(),
      new go.Binding("font", "fontSize", function (i) {
        return i;
      })
    )
  );
  myDiagram.nodeTemplateMap.add("LBSJ", nodeTemplateLBSJ);

  //定义快评模板
  let nodeTemplateCommont2 = gobuild(go.Node, "Spot",
    {
      contextMenu: myContextMenu,
      locationSpot: go.Spot.Center, //
      locationObjectName: "SHAPE",
      selectionAdorned: false, //
      resizable: false,
      resizeObjectName: "SHAPE",
      rotatable: false,
      movable: false,
      rotateObjectName: "ROTA",
      layoutConditions: go.Part.LayoutStandard
        & ~go.Part.LayoutNodeSized,
      doubleClick: function (e, obj) {
      }
    },
    new go.Binding('entityId', 'entityId').makeTwoWay(),// 图元ID
    new go.Binding('bProperties', 'bProperties').makeTwoWay(),// 参数
    new go.Binding('cxname', 'cxname').makeTwoWay(),// 参数
    new go.Binding('location', 'pos', go.Point.parse).makeTwoWay(go.Point.stringify),
    // 绑定旋转角度
    {name: "ROTA"},
    new go.Binding("angle", "angle").makeTwoWay(),
    // 绑定节点大小
    {name: "SHAPE"},
    new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
    gobuild(go.Panel, "Auto",
      gobuild(go.Shape, "RoundedRectangle",
        {
          fill: "rgba(0,0,0,0)",
          stroke: "rgba(0,0,0,0)",
          stretch: go.GraphObject.Fill,
          alignment: go.Spot.Center
        }
      )
    ),
    gobuild(go.TextBlock, {
        font: "bold 11pt Helvetica, Arial, sans-serif",
        margin: 2,
        stroke: "#000000",
        //maxSize: new go.Size(60, NaN),
        wrap: go.TextBlock.WrapFit,
        editable: false
      },
      new go.Binding("text", "text").makeTwoWay(),
      new go.Binding("stroke", "stroke").makeTwoWay(),
      new go.Binding("font", "fontSize", function (i) {

        return i;
      })
    )
  );
  myDiagram.nodeTemplateMap.add("Comment2", nodeTemplateCommont2); //快评 样式

//定义LIMS模板
  let nodeTemplateCommont3 = gobuild(go.Node, "Spot",
    {
      contextMenu: myContextMenu,
      locationSpot: go.Spot.Center, //
      locationObjectName: "SHAPE",
      selectionAdorned: false, //
      resizable: false,
      resizeObjectName: "SHAPE",
      rotatable: false,
      movable: false,
      rotateObjectName: "ROTA",
      layoutConditions: go.Part.LayoutStandard
        & ~go.Part.LayoutNodeSized,
      doubleClick: function (e, obj) {
      }
    },
    new go.Binding('entityId', 'entityId').makeTwoWay(),// 图元ID
    new go.Binding('bProperties', 'bProperties').makeTwoWay(),// 参数
    new go.Binding('cxname', 'cxname').makeTwoWay(),// 参数
    new go.Binding('location', 'pos', go.Point.parse).makeTwoWay(go.Point.stringify),
    // 绑定旋转角度
    {name: "ROTA"},
    new go.Binding("angle", "angle").makeTwoWay(),
    // 绑定节点大小
    {name: "SHAPE"},
    new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
    gobuild(go.Panel, "Auto",
      gobuild(go.Shape, "RoundedRectangle",
        {
          fill: "rgba(0,0,0,0)",
          stroke: "rgba(0,0,0,0)",
          stretch: go.GraphObject.Fill,
          alignment: go.Spot.Center
        }
      )
    ),
    gobuild(go.TextBlock, {
        font: "bold 11pt Helvetica, Arial, sans-serif",
        margin: 2,
        stroke: "blue",
        //maxSize: new go.Size(60, NaN),
        wrap: go.TextBlock.WrapFit,
        editable: false
      },
      new go.Binding("text", "text").makeTwoWay(),
      new go.Binding("stroke", "stroke").makeTwoWay(),
      new go.Binding("font", "fontSize", function (i) {

        return i;
      })
    )
  );
  myDiagram.nodeTemplateMap.add("Comment3", nodeTemplateCommont3); //LIMS 样式


//定义PIMS模板
  let nodeTemplateCommont4 = gobuild(go.Node, "Spot",
    {
      contextMenu: myContextMenu,
      locationSpot: go.Spot.Center, //
      locationObjectName: "SHAPE",
      selectionAdorned: false, //
      resizable: false,
      resizeObjectName: "SHAPE",
      rotatable: false,
      movable: false,
      rotateObjectName: "ROTA",
      layoutConditions: go.Part.LayoutStandard
        & ~go.Part.LayoutNodeSized,
      doubleClick: function (e, obj) {
      }
    },
    new go.Binding('entityId', 'entityId').makeTwoWay(),// 图元ID
    new go.Binding('bProperties', 'bProperties').makeTwoWay(),// 参数
    new go.Binding('cxname', 'cxname').makeTwoWay(),// 参数
    new go.Binding('location', 'pos', go.Point.parse).makeTwoWay(go.Point.stringify),
    // 绑定旋转角度
    {name: "ROTA"},
    new go.Binding("angle", "angle").makeTwoWay(),
    // 绑定节点大小
    {name: "SHAPE"},
    new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
    gobuild(go.Panel, "Auto",
      gobuild(go.Shape, "RoundedRectangle",
        {
          fill: "rgba(0,0,0,0)",
          stroke: "rgba(0,0,0,0)",
          stretch: go.GraphObject.Fill,
          alignment: go.Spot.Center
        }
      )
    ),
    gobuild(go.TextBlock, {
        font: "bold 11pt Helvetica, Arial, sans-serif",
        margin: 2,
        stroke: "red",
        //maxSize: new go.Size(60, NaN),
        wrap: go.TextBlock.WrapFit,
        editable: false
      },
      new go.Binding("text", "text").makeTwoWay(),
      new go.Binding("stroke", "stroke").makeTwoWay(),
      new go.Binding("font", "fontSize", function (i) {

        return i;
      })
    )
  );
  myDiagram.nodeTemplateMap.add("Comment4", nodeTemplateCommont4); //PIMS 样式
}


// 初始化画板样式
function initstaticDiaTemple(myDiagram) {

  if (alarmloop || pipeloop) {
    clearTimeout(alarmloop);
    clearTimeout(pipeloop);
  }
  loop_alarm(myDiagram);
  loop(myDiagram);
}

//管线流动方向
function loop(myDiagram) {
  let diagram = myDiagram;
  pipeloop = setTimeout(function () {
    let oldskips = diagram.skipsUndoManager;
    diagram.skipsUndoManager = true;
    let i = 3;

    diagram.links.each(function (link) {
      let shape = link.findObject("PIPE");
      if (shape === null) {

      } else {
        if (parseFloat(link.data.velocity) >= 30) {
          i = 6;
        } else {
          i = 3;
        }
        let off;
        if (link.data.arrow === '1') {  //0正向   1负向
          off = shape.strokeDashOffset + i;
        } else if (link.data.arrow === '0') {
          off = shape.strokeDashOffset - i;
        } else {
          off = shape.strokeDashOffset - i;
        }
        shape.strokeDashOffset = (off <= 0) ? 60 : off;
      }

    });
    diagram.skipsUndoManager = oldskips;
    loop(myDiagram);
  }, 60);
}

// 报警转换   图元及管线
function loop_alarm(myDiagram) {
  alarmloop = setTimeout(function () {
    let model = myDiagram.model;
    // update all nodes
    let arr = model.nodeDataArray;
    for (let i = 0; i < arr.length; i++) {
      let data = arr[i];
      if (data.is_alarm == '1') {
        if (data.alarm_color) {
          if (data.alarm_color == "white") {
            data.alarm_color = "red";
          } else {
            data.alarm_color = "white";
          }

        } else {
          data.alarm_color = "white";
        }

        model.updateTargetBindings(data);
      }

    }
    // and update all links
    let arr2 = model.linkDataArray;
    for (let i = 0; i < arr2.length; i++) {
      let data = arr2[i];
      if (data.is_alarm == '1') {
        let co = arr2.colors;
        if (data.alarm_color) {

          if (data.alarm_color == co) {
            data.alarm_color = "red";
          } else {
            data.alarm_color = co;
          }
        } else {
          data.alarm_color = co;
        }

      } else {
        data.alarm_color = data.colors;
      }
      model.updateTargetBindings(data);
    }
    loop_alarm(myDiagram);
  }, 800);
}

// 设置线条的颜色
function linkColorConverter(msg) {
  if (msg) return msg;
  return "gray";
}

//图元样式
function nodeStyle() {
  return [
    new go.Binding('location', 'pos',
      go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding("isShadowed", "isSelected").ofObject(),
    {
      selectionAdorned: false,
      shadowOffset: new go.Point(0, 0),
      shadowBlur: 15,
      shadowColor: "blue",
      resizable: false,
      resizeObjectName: "NODESHAPE"
      ,
      toolTip: sharedToolTip
    }
  ];
}

//线条样式
function linkStyle() {
  return [
    new go.Binding("isShadowed", "isSelected").ofObject(),
    {
      selectionAdorned: false,
      shadowOffset: new go.Point(0, 0),
      shadowBlur: 10,
      shadowColor: "gray",
      resizable: false,
      resizeObjectName: "NODESHAPE",
      toolTip: sharedToolTip_l
    }
  ];
}

//端口样式
function portStyle() {
  return {
    desiredSize: new go.Size(6, 6),
    fill: "white",
    // fromSpot: go.Spot.Right,
    fromLinkable: false,
    // toSpot: go.Spot.Left,
    toLinkable: false,
    toMaxLinks: 1,
    cursor: "pointer"
  };
}


//只能被调用
function showContextMenu(obj, diagram) {
  if (obj != null && diagram != null) {
    let store_data = [];
    //获取图元参数需要展示的参数信息
    // //console.warn("右键的物料obj：" + JSON.stringify(obj.data));
    // //console.warn("右键的物料obj.name：" + obj.data.text.split("\n")[0]);
    let m_id = moId; //模型id
    if (m_id !== '' && m_id !== null) {
      waitSearchMaterpro(m_id, obj.data.key, obj.data.bProperties).then(res => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        if (obj.data.bProperties != '' && obj.data.bProperties != null) {
          store_data = res.data.data;
        }
        // console.log('shuju',store_data);
        gojsMenudata(obj.data.text.split("\n")[0],store_data);

        // Show only the relevant buttons given the current state.
        var cmd = diagram.commandHandler;
        var hasMenuItem = false;

        function maybeShowItem(elt, pred) {
          // console.warn("----------"+store_data)
          if (pred&&store_data.length>0) {
            //console.warn("------------------------hasMenuItem1-1")

            elt.style.display = "block";
            hasMenuItem = true;
          } else {
            //console.warn("------------------------hasMenuItem1-2")

            elt.style.display = "none";
          }
        }

        maybeShowItem(document.getElementById("cut"), cmd.canCutSelection());
        //cxElement
        // Now show the whole context menu element
        if (hasMenuItem) {
          console.warn("------------------------hasMenuItem1")
          cxElement.classList.add("show-menu");
          // we don't bother overriding positionContextMenu, we just do it here:
          var mousePt = diagram.lastInput.viewPoint;
          cxElement.style.left = mousePt.x + 5 + "px";
          console.log("mousePt.y="+mousePt.y);
          if(mousePt.y>500){
            cxElement.style.bottom = 30 + "px";
            cxElement.style.top = "auto";
          }else{
            cxElement.style.top = mousePt.y + "px";
            cxElement.style.bottom= "auto";
          }

          //
          //console.warn("------------------------hasMenuItem2")

        }
        window.addEventListener("click", hideCX, true);



      });
    }


  }

}

// 图元报警
function nodeColorConverter(msg) {
  if (msg) return msg;
  return null;
}

//左侧待选物性列表 waitSearchMaterpro[原始结果，不是真实的]
const waitSearchMaterpro = (mo_id, entity_key, materiel_id) => {
  //console.warn("waitSearchMaterpro:" + mo_id + "---" + entity_key + "---" + materiel_id);

  return request({
    url: '/api/qcadmin-model/model/waitSearchMaterpro_jisuan',
    method: 'post',
    params: {
      mo_id, entity_key, materiel_id
    }
  })
}

function hideCX() {
  if (nowDiagram.currentTool instanceof go.ContextMenuTool) {
    nowDiagram.currentTool.doCancel();
  }
}

//隐藏右键菜单
function hideContextMenu() {
  gojsMenudata("",[]);
  cxElement.classList.remove("show-menu");
  // Optional: Use a `window` click listener with event capture to
  //           remove the context menu if the user clicks elsewhere on the page
  window.removeEventListener("click", hideCX, true);
}
