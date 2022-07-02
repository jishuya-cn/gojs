<template>
  <div>
    gojs
    <div
      id="myDiagramDiv"
      style="width: 900px; height: 900px; background-color: #dae4e4"
    ></div>
  </div>
</template>

<script>
import go from 'gojs'
export default {
  name: 'GojsHelloWorld',
  data() {
    return {}
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const myDiagram = new go.Diagram('myDiagramDiv', {
        // 选中div
        // 配置项 按Ctrl-Z撤消，按Ctrl-Y重做
        'undoManager.isEnabled': true,
        layout: new go.TreeLayout({ angle: 90, layerSpacing: 35 }) // 设置布局,文章后面有说明讲解
      })

      // 没有链接线 链接点实例 01

      // myDiagram.model = new go.Model([
      //   // 注意每个节点数据对象拥有它需要的任何属性;
      //   // 我们为这个应用添加了key属性
      //   { name: 'Don Meow' },
      //   { name: 'Copricat' },
      //   { name: 'Demeter' },
      //   {
      //     /* 空节点数据，以显示没有绑定值的节点  */
      //   }
      // ])

      // 链接点实例 02
      // 在 GraphLinksModel中，model.linkDataArray 除了 model.nodeDataArray.
      // 它包含一个 JavaScript 对象数组，每个对象通过指定“to”和“from”节点键来描述一个链接。
      // 这是一个示例，其中节点 A 链接到节点 B，节点 B 链接到节点 C：
      // 配置链接线 GraphLinksModel
      // GraphLinksModel 允许您在节点之间有任意数量的链接，向任意方向前进。从 A 到 B 可能有 10 个链接，另外三个从 B 到 A 以相反的方式运行。

      // myDiagram.model = new go.GraphLinksModel(
      //   [
      //     // //对于该数组中的每个对象，关系图都会创建一个节点来表示它
      //     { key: 'Alpha', name: 'Alpha' },
      //     { key: 'Beta', name: 'Beta' },
      //     { key: 'Gamma', name: 'Gamma' }
      //   ],
      //   [
      //     // the linkDataArray
      //     { from: 'Alpha', to: 'Beta' }
      //   ]
      // )

      // 链接点实例 03
      // 配置链接线 TreeModel 指定 '父节点'
      // TreeModel 的工作方式略有不同。树模型中的链接不是维护单独的链接数据数组，而是通过为节点数据指定“父节点”来创建的。然后从该关联中创建链接。
      // 这是与 TreeModel 相同的示例，节点 A 链接到节点 B，节点 B 链接到节点 C：

      myDiagram.model = new go.TreeModel([
        // the nodeDataArray
        { name: 'Alpha', key: 'A' },
        { name: 'Beta', key: 'B', parent: 'A' }, // 被A链接  // parent : 父级
        { name: 'Gamma', key: 'C', parent: 'B' } // 被B链接
      ])

      // 样式节点 设置样式的
      // TextBlocks、Shapes 和 Pictures 是 GoJS的原始构建块。TextBlocks 不能包含图像；形状不能包含文本。
      // 如果您希望节点显示一些文本，则必须使用 TextBlock。如果要绘制或填充一些几何图形，则必须使用 Shape。
      // go.Node第一个参数可以是面板类型 // 'Horizontal' 统一的
      myDiagram.nodeTemplate = new go.Node('Horizontal', {
        background: '#44CCFF' // 设置背景色 整个节点将具有浅蓝色背景
      })
        .add(
          new go.Picture(
            // 图片通常应该有明确的宽度和高度。
            // 这张图片有一个红色的背景，只有当没有设置源时才可见
            // 或当图像部分透明时。
            { margin: 10, width: 50, height: 50, background: 'red' }
          )
            // Picture.source 绑定到模型数据的“源”属性的数据
            .bind('source')
        )
        .add(
          new go.TextBlock(
            'Default Text', // TextBlock.text的初始值
            // 文本周围的一些空间，更大的字体，和白色描边:
            { margin: 12, stroke: 'white', font: 'bold 16px sans-serif' }
          )
            // TextBlock.text 是绑定到模型数据的“名称”属性的数据
            .bind('text', 'name')
        )

      // 图表布局
      // TreeModel 会自动创建必要的链接来关联节点，但很难分辨谁的父节点是谁。
      // 图表有一个默认布局，它采用所有没有位置的节点并为它们提供位置，将它们排列在网格中。
      // 我们可以明确地给每个节点一个位置来解决这个组织混乱，但是在我们的例子中，作为一个更简单的解决方案，我们将使用一个自动为我们提供良好位置的布局。
      // TreeLayout 默认是从左到右流动，所以要让它从上到下流动（这在组织图中很常见），我们将angle属性设置为 90。
      // 在上方我们选择div的地方设置布局 new go.Diagram 中设置
      // myDiagram.layout = new go.TreeLayout({ angle: 90, layerSpacing: 35 });
      // 然后我们就得到了一张结构清晰的图表框架结构

      // 链接模板
      // 宽大的方形节点 它的描边比正常的粗一点，深灰色而不是黑色。
      // 不会有箭头。我们将把 Link routing属性从 Normal 更改为 Orthogonal，并给它一个 corner值，使直角转弯变得圆滑。

      myDiagram.linkTemplate = new go.Link({
        routing: go.Link.Orthogonal,
        corner: 5
      }).add(new go.Shape({ strokeWidth: 3, stroke: '#555' }))
    }
  }
}
</script>

<style lang="scss" scoped></style>
