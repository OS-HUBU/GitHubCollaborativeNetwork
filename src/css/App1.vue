<template>
  <div class="box">
    <div id="MainCy"></div>
    <div class="rig">{{ content }}</div>
  </div>
</template>
<script>
import cytoscape from "cytoscape";

export default {
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    var cy = cytoscape({
      container: document.getElementById("MainCy"),
      zoom: 1,
      userZoomingEnabled: false,
      boxSelectionEnabled: true,
      userPanningEnabkled: false,
      panningEnabled: false,
      layout: {
        name: "random",
      },

      style: [
        {
          selector: "node",
          css: {
            content: "data(name)",
            color: "white",
            "text-valign": "center",
            "text-outline-color": "#6699FF",
            "background-color": "#6699FF",
            height: 50,
            width: 50,
            "font-size": "14px",
            "font-weight": "bold",
          },
        },

        {
          selector: "edge",
          css: {
            content: "data(relationship)",
            "curve-style": "bezier", //曲线类型为贝塞尔曲线
            "target-arrow-shape": "triangle",
            "line-color": "#CCCCCC",
            width: 1,
            "font-size": "14px",
          },
        },
      ],

      elements: {
        nodes: [
          //节点数据
          { data: { id: "n1", label: "节点1" } },
          { data: { id: "n2", label: "节点2" } },
          { data: { id: "n3", label: "节点3" } },
          { data: { id: "n4", label: "节点4" } },
          { data: { id: "n5", label: "节点5" } },
        ],
        edges: [
          //边的数据
          {
            data: {
              id: "e1",
              relationship: "关系1",
              source: "n2",
              target: "n1",
            },
          },
          {
            data: {
              id: "e2",
              relationship: "关系2",
              source: "n3",
              target: "n2",
            },
          },
          {
            data: {
              id: "e3",
              relationship: "关系3",
              source: "n3",
              target: "n4",
            },
          },
          {
            data: {
              id: "e4",
              relationship: "关系4",
              source: "n3",
              target: "n5",
            },
          },
        ],
      },
    });

    //增加节点和边
    var eles = cy.add([
      { group: "nodes", data: { id: "n0" }, position: { x: 100, y: 100 } },
      { group: "nodes", data: { id: "n6" }, position: { x: 200, y: 200 } },
      { group: "edges", data: { id: "e0", source: "n0", target: "n6" } },
    ]);

  console.log(  cy.nodes('[id = "n6"]'));

  cy.nodes('[id = "n6"]')
  .data('weight', '70')   // style update
  .addClass('funny')      // style update AGAIN
  .removeClass('serious').active(true)


  cy.batch(function(){
    cy.nodes('[id = "n6"]')
    .data('weight', '10000')
    .addClass('funny')
    .removeClass('serious')
  ;
});


cy.on('tap', 'node', function(evt){
  var node = evt.target;
  console.log( 'tapped ' + node.id() );
});
    // cy.nodes().on("mouseover", (evt) => {
    //   this.content = evt.cyTarget._private.data;
    // });
    // cy.nodes().on("mouseout", (evt) => {
    //   this.content = "";
    // });

    // cy.edges().on("mouseover", (evt) => {
    //   this.content = evt.cyTarget._private.data;
    // });
    // cy.edges().on("mouseout", (evt) => {
    //   this.content = "";
    // });
  },
};
</script>

<style scoped>
.box {
  display: flex;

  width: 100%;
  height: 100vh;
}
#MainCy {
  flex: 4;
}
.rig {
  flex: 1;
}
.funny{
  color: red!important;;
}
</style>
