[Demo](https://gugegev5.github.io/dnd_ts/build/index.html)

INSERT时 生成新的itemKey供下一次使用  

drag指被拖动的组件拖动方相关事件，drop指被嵌入的父组件接受方相关事件  
组件结构组成事件 CompositionsActionNames  
拖动方drag确定事件类型compositionType是INSERT，UPDATE，DELETE  
INSERT 由接收方useDrop.drop处理  
DELETE 由拖动方useDrag.end判断有没有接收方,没有则delete  