import go from 'gojs' ;
// a.Cr = b.Y[Ra("7eba17a4ca3b1a8346")][Ra("78a118b7")](b.Y, Jk, 4, 4);
// a.Cr = function(){return true;};;

export {
  initGojs,//对外开放的gojs方法，参数为：画板区id，素材区id，画板区数据，素材区数据。无返回
  initDataPublicTemple,//初始化自定义的公共样式，参数：图元数据，指定画板，指定素材版
  initPalTempleAndDraw,//初始化独有样式并绘画，参数为：素材区对象，素材区数据。返回：无
  initDiaTempleAndDraw//初始化独有样式并绘画，参数为：素材区对象，素材区数据。返回：无
}

let gobuild = go.GraphObject.make;
let sharedToolTip;
let sharedToolTip_l;
let alarmloop = ''
let pipeloop = ''

//初始化画板和素材板，并返回其对象，因为有很多自定义操作要在vue完成
function initGojs(myDiagramId, myPaletteId) {

  initstyle_Tip();
  //初始化画板
  let myDiagram = initGojs_myDiagram(myDiagramId);
  //初始化素材板
  let myPalette = initGojs_myPalette(myPaletteId)
  //初始化公共静态样式
  initstaticPublicTemple(myDiagram, myPalette);
  //初始化画板独有静态样式
  initstaticDiaTemple(myDiagram);
  //初始化素材版独有静态样式
  initstaticPalTemple(myPalette);
  let map = {};
  map.Diagram = myDiagram;
  map.Palette = myPalette;
  return map

}
//根据图元数初始化自定义公共样式样式。即所有图元
function initDataPublicTemple(tuyuandata,myDiagram,myPalette) {
  let nodes = tuyuandata.ENTITIES;
  if (nodes && nodes.length) {
    for (let num = 0; num < nodes.length; num++) {
      let node = nodes[num];
      let portShapes = [];
      // 创建模型
      // 节点及连线模板样式 0

      if (node.PORTS.length === 0) {  //默认端口
        //console.warn("initNodeTemplateMaps----------node只有一个点--" + num + "---" + JSON.stringify(node));

        portShapes = [
          gobuild(go.Shape, "Rectangle", portStyle(),
            {
              portId: "p1",
              alignment: new go.Spot(0, 0.5)
            }
          ),
          gobuild(go.Shape, "Rectangle", portStyle(),
            {
              portId: "p2",
              alignment: new go.Spot(0.5, 1)
            }
          ),
          gobuild(go.Shape, "Rectangle", portStyle(),
            {
              portId: "p3",
              alignment: new go.Spot(1, 0.5)
            }
          ),
          gobuild(go.Shape, "Rectangle", portStyle(),
            {
              portId: "p4",
              alignment: new go.Spot(0.5, 0)
            }
          )
        ];
        // 这4个点定义不全是不能连线的
      } else {
        for (let num0 = 0; num0 < node.PORTS.length; num0++) {
          let port = node.PORTS[num0];
          // let pos = port.ALIGNMENT;
          let pos = {};
          // //{x:0.95,y:0.65}不是{'x':'0.95','y':'0.65'}无法点出数据，所以我做了字符串切割
          let poss = port.ALIGNMENT.split(",");
          pos.x = poss[0].substring(3, poss[0].length);
          pos.y = poss[1].substring(2, poss[1].length - 1);
          // //console.warn("port属性："+JSON.stringify(port))
          let input;
          let output;
          if (port.IN_OUT === 0) {
            input = true;
            output = false;
          } else if (port.IN_OUT === 1) {
            input = false;
            output = true;
          } else {
            input = true;
            output = true;
          }
          // //console.warn("port属性-："+"input:"+input+";output:"+output)

//为什么端口进出坐标还是不对？
          portShapes.push(
            gobuild(
              go.Shape, "Rectangle",//把点绘制称图块，按坐标排布
              {
                portId: port.KEY_ID,
                fill: port.PORTCOLOR,
                //stroke: null,
                alignment: new go.Spot(pos.x, pos.y),
                desiredSize: new go.Size(6, 6),
                fromSpot: new go.Spot(pos.x, pos.y),
                toSpot: new go.Spot(pos.x, pos.y),  // declare where links may connect at this port
                alignmentFocus: new go.Spot(pos.x, pos.y),  // just inside the Shape
                fromLinkable: input,
                toLinkable: output,
                cursor: "pointer",
                click : function(e,obj) {
                  // //console.warn("绘制点开始")
                  // //console.warn("绘制点："+"-e-"+JSON.stringify(e)+"-obj-"+JSON.stringify(obj))
                  // app.portDbClickEvent(obj.part.data.key,  obj.portId,  port.INOUT,  obj);
                }
              },
              new go.Binding('portId', 'PORTID').makeTwoWay(),
            )
          );
        }

      }
      // 节点及连线模板样式 1
      let nodeTemplate = gobuild(go.Node, "Spot", nodeStyle(),
        {
          locationSpot: go.Spot.Center, //
          locationObjectName: "SHAPE",
          selectionAdorned: false, //
          resizable: true,
          resizeObjectName: "SHAPE", // user
          rotatable: true,
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
          gobuild(go.Picture,
            {
              name: "SHAPE",
              imageStretch: go.GraphObject.Fill,
              fromLinkable: true,
              toLinkable: true,
              cursor: "pointer"
            },
            new go.Binding("source", "img")
          ),
          new go.Binding("sports", "sports"),
          portShapes,
        ),
        gobuild(go.TextBlock, {margin: 5, isMultiline: false, editable: false},
          new go.Binding("text", "text")
        )
      );
// 定义图元 1
      //按新图元添加到画板
      myPalette.nodeTemplateMap.add(node.ENTITY_NAME, nodeTemplate);
      myDiagram.nodeTemplateMap.add(node.ENTITY_NAME, nodeTemplate);

    }
  }
}
//给指定的画板赋值,赋值就是绘画
function initDiaTempleAndDraw(myDiagramData,myDiagram ){
  //console.warn("部署到画板scale："+myDiagram.scale)
  //console.warn("部署到画板initialAutoScale："+myDiagram.Uniform)
  myDiagram.model = go.Model.fromJson(myDiagramData);
}
//给指定的素材板赋值,赋值就是绘画
function initPalTempleAndDraw(myPaletteData,myPalette ) {

  let nodes = myPaletteData.ENTITIES;
  let nodearray = [];//todo
  if (nodes && nodes.length) {
    for (let num = 0; num < nodes.length; num++) {
      let node = nodes[num];

//读取图元信息【SRC没了，ENTITY_SIZE好像也没了】
      let entityName = node.ENTITY_NAME;
      let entityId = node.ENTITY_ID
      let entity_size = node.ENTITY_SIZE;
      let ports = node.PORTS;
      let imageSrc = node.SRC;
//将解析出来的图元信息拼装为一个map集合给nodearray

      nodearray.push({
        onParaChanged: "",
        key: "equipment",
        a: 0,
        type: 'Equipment',
        category: entityName,
        entityId: entityId,
        bProperties: '',
        text: "",
        img: imageSrc,
        ports: ports,
        size: entity_size,
        angle: 0
      });

    }

    nodearray.push({
      category: "LBSJ",
      text: "指标",
      bProperties: '',
      size: "50 50",
      fill: "red",
      fontSize: "bold 11pt Helvetica, Arial, sans-serif"
    });

    nodearray.push({
      category: "Comment",//已经设计好的样式
      text: "Text",
      bProperties: '',
      size: "50 50",
      fill: "lightyellow",
      fontSize: "bold 11pt Helvetica, Arial, sans-serif"
    });
    //{"category":"Comment2", "text":"原油", "bProperties":"17", "cxname":"原油", "size":"157 97",
    // "fill":"lightyellow", "fontSize":"bold 11pt Helvetica, Arial, sans-serif", "key":-82, "pos":"-250 224"}
    nodearray.push({
      category: "Comment2",
      text: "备注1",
      bProperties: '',//用来存储物料id
      cxname: '',//用来存储物料名
      size: "50 50",
      fill: "lightyellow",
      fontSize: "bold 11pt Helvetica, Arial, sans-serif"
    });

    nodearray.push({
      category: "Comment3",
      text: "备注2",
      bProperties: '',//用来存储物料id
      cxname: '',//用来存储物料名
      size: "50 50",
      fill: "lightyellow",
      fontSize: "bold 11pt Helvetica, Arial, sans-serif"
    });
    nodearray.push({
      category: "Comment4",
      text: "备注3",
      bProperties: '',//用来存储物料id
      cxname: '',//用来存储物料名
      size: "50 50",
      fill: "lightyellow",
      fontSize: "bold 11pt Helvetica, Arial, sans-serif"
    });

    let linkarray = [];
    linkarray.push({
      points: new go.List(go.Point).addAll([
        new go.Point(0, 20),
        new go.Point(20, 20),
        new go.Point(40, 20)]),
      colors: "grey",
      width: "5",
      lProperties: "",
      onParaChanged: ""
    });

    myPalette.model.nodeDataArray = nodearray;
    myPalette.model.linkDataArray = linkarray;
  }
}
// 初始化基础风格
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
//初始话画板样式
function initGojs_myDiagram(myDiagramId) {
  let myDiagram;
  myDiagram =
    gobuild(go.Diagram, myDiagramId,
      {
        grid: gobuild(go.Panel, "Grid",
          {gridCellSize: new go.Size(8, 8)},
          gobuild(go.Shape, "LineH", {stroke: "lightgray", strokeWidth: 0.5}),//小分段
          gobuild(go.Shape, "LineH", {stroke: "gray", strokeWidth: 0.5, interval: 10}),//大分段
          gobuild(go.Shape, "LineV", {stroke: "lightgray", strokeWidth: 0.5}),
          gobuild(go.Shape, "LineV", {stroke: "gray", strokeWidth: 0.5, interval: 10})
        ),

        allowDrop: true,
        initialAutoScale: go.Diagram.Uniform,
        "draggingTool.dragsLink": true,
        "draggingTool.isGridSnapEnabled": true,
        "animationManager.isEnabled": true,
        "grid.visible": true,
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
      });

  myDiagram.linkTemplate = gobuild(
    go.Link,
    // CustomLink,
    linkStyle(), {selectable: true},
  {
      routing: go.Link.AvoidsNodes,
      curve: go.Link.JumpOver,
      corner: 7,
      fromShortLength: 1,
      toShortLength: 1,
      relinkableFrom: true,
      relinkableTo: true,
      reshapable: true,
      resegmentable: true,
      adjusting: go.Link.Stretch,
      mouseEnter: function (e, link) {
        if (link.findObject("HIGHLIGHT"))
          link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
      },
      mouseLeave: function (e, link) {
        if (link.findObject("HIGHLIGHT"))
          link.findObject("HIGHLIGHT").stroke = "transparent";
      }
    },
    new go.Binding("points", "points").makeTwoWay(),

    gobuild(go.Shape, {isPanelMain: true, stroke: "grey", strokeWidth: 8},
      new go.Binding("stroke", "colors", linkColorConverter)
    ),

    gobuild(go.Shape, {isPanelMain: true, stroke: "white", strokeWidth: 3, name: "PIPE", strokeDashArray: [20, 40]}),

    gobuild(go.TextBlock, {
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
//初始化素材区
function initGojs_myPalette(myPaletteId) {
  let myPalette;
  myPalette = gobuild(go.Palette,
    myPaletteId, // must  div
    {
      maxSelectionCount: 1,
      // nodeTemplateMap: myDiagram.nodeTemplateMap, // share

      linkTemplate: gobuild(
        go.Link,
        { //
          locationSpot: go.Spot.Center,
          selectionAdornmentTemplate: gobuild(go.Adornment, "Link",
            {locationSpot: go.Spot.Center},
            gobuild(go.Shape,
              {
                isPanelMain: true,
                fill: null,
                stroke: "deepskyblue",
                strokeWidth: 0
              }),
            gobuild(go.Shape, {
              toArrow: "Standard", stroke: null
            })
          )
        },
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5,
          toShortLength: 4,
          fromShortLength: 4
        },
        new go.Binding("points"),
        gobuild(go.Shape, {isPanelMain: true, strokeWidth: 2}),
        gobuild(go.Shape, {toArrow: "Standard", stroke: null})
      )
    });


  return myPalette

}
// 初始化画板和素材区都有的样式
function initstaticPublicTemple(myDiagram, myPalette) {

  //定义了一node的模板
  let nodeTemplateCommont = gobuild(go.Node, "Spot",
    {
      locationSpot: go.Spot.Center, //
      locationObjectName: "SHAPE",
      selectionAdorned: false, //
      resizable: true,
      resizeObjectName: "SHAPE", // user
      rotatable: true,
      rotateObjectName: "ROTA", //
      layoutConditions: go.Part.LayoutStandard
        & ~go.Part.LayoutNodeSized,
      doubleClick: function (e, obj) {
        // console.warn("doubleClick-------------nodeTemplateCommont")
      },
      selectionChanged: nodeSelectionChanged

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
        editable: true
      },
      new go.Binding("text", "text").makeTwoWay(),
      new go.Binding("font", "fontSize", function (i) {

        return i;
      })
    )
  );
//将新定义的图元模板添加到 该画板对象的 图元模板map备选
  myDiagram.nodeTemplateMap.add("Comment", nodeTemplateCommont);
  myPalette.nodeTemplateMap.add("Comment", nodeTemplateCommont);
//添加自定义文字图元
  let nodeTemplateLBSJ = gobuild(go.Node, "Spot",
    {
      locationSpot: go.Spot.Center,
      locationObjectName: "SHAPE",
      selectionAdorned: false,
      resizable: true,
      resizeObjectName: "SHAPE",
      rotatable: true,
      rotateObjectName: "ROTA",
      layoutConditions: go.Part.LayoutStandard
        & ~go.Part.LayoutNodeSized,
      selectionChanged: nodeSelectionChanged
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
          fill: "#E6E6FA",
          stroke: "black",
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
  myPalette.nodeTemplateMap.add("LBSJ", nodeTemplateLBSJ);

  //节点选中回调方法
  //选中节点获取当前节点样式，填充样式设置数据
  function nodeSelectionChanged(node) {
    setFont(node);
  }
  //定义快评模板
  let nodeTemplateCommont2 = gobuild(go.Node, "Spot",
    {
      locationSpot: go.Spot.Center, //
      locationObjectName: "SHAPE",
      selectionAdorned: false, //
      resizable: true,
      resizeObjectName: "SHAPE", // user
      rotatable: true,
      rotateObjectName: "ROTA", //
      layoutConditions: go.Part.LayoutStandard
        & ~go.Part.LayoutNodeSized,
      doubleClick: function (e, obj) {
        addmsg_wx(obj.data)
        //console.warn("doubleClick-------------------obj" + JSON.stringify(obj.data))
      },
      selectionChanged: nodeSelectionChanged
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
        //maxSize: new go.Size(60, NaN),
        wrap: go.TextBlock.WrapFit,
        editable: true
      },
      new go.Binding("text", "text").makeTwoWay(),
      new go.Binding("font", "fontSize", function (i) {

        return i;
      })
    )
  );
  //定义了Lims模板
  let nodeTemplateCommont3 = gobuild(go.Node, "Spot",
    {
      locationSpot: go.Spot.Center, //
      locationObjectName: "SHAPE",
      selectionAdorned: false, //
      resizable: true,
      resizeObjectName: "SHAPE", // user
      rotatable: true,
      rotateObjectName: "ROTA", //
      layoutConditions: go.Part.LayoutStandard
        & ~go.Part.LayoutNodeSized,
      doubleClick: function (e, obj) {
        addmsg_wx(obj.data)
        //console.warn("doubleClick-------------------obj" + JSON.stringify(obj.data))
      },
      selectionChanged: nodeSelectionChanged
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
        editable: true
      },
      new go.Binding("text", "text").makeTwoWay(),
      new go.Binding("font", "fontSize", function (i) {

        return i;
      })
    )
  );
  //定义PIMS模板
  let nodeTemplateCommont4 = gobuild(go.Node, "Spot",
    {
      locationSpot: go.Spot.Center, //
      locationObjectName: "SHAPE",
      selectionAdorned: false, //
      resizable: true,
      resizeObjectName: "SHAPE", // user
      rotatable: true,
      rotateObjectName: "ROTA", //
      layoutConditions: go.Part.LayoutStandard
        & ~go.Part.LayoutNodeSized,
      doubleClick: function (e, obj) {
        addmsg_wx(obj.data)
        //console.warn("doubleClick-------------------obj" + JSON.stringify(obj.data))
      },
      selectionChanged: nodeSelectionChanged
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
        editable: true
      },
      new go.Binding("text", "text").makeTwoWay(),
      new go.Binding("font", "fontSize", function (i) {

        return i;
      })
    )
  );
  myDiagram.nodeTemplateMap.add("Comment2", nodeTemplateCommont2); //快评 样式
  myPalette.nodeTemplateMap.add("Comment2", nodeTemplateCommont2); //快评 样式

  myDiagram.nodeTemplateMap.add("Comment3", nodeTemplateCommont3); //LIMS 样式
  myPalette.nodeTemplateMap.add("Comment3", nodeTemplateCommont3); //LIMS 样式

  myDiagram.nodeTemplateMap.add("Comment4", nodeTemplateCommont4); //PIMS 样式
  myPalette.nodeTemplateMap.add("Comment4", nodeTemplateCommont4); //PIMS 样式

}
// 初始化画板无需数据支持的独有样式
function initstaticDiaTemple(myDiagram) {

  if (alarmloop || pipeloop) {
    clearTimeout(alarmloop);
    clearTimeout(pipeloop);
    loop_alarm(myDiagram);
    loop(myDiagram);
  } else {
    loop_alarm(myDiagram);
    loop(myDiagram);
  }

}
//初始化pal的无需数据支持的独有样式
function initstaticPalTemple(myPalette) {
  console.warn("pal的无需数据支持的独有样式")
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
      if (shape !== null) {
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





