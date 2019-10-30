export default [
  {
    "label_value": "1",
    "label_content": [
      {
        type: 'property',
        value: '选项内容',
        placeholder: '选项内容'
      }
    ]
  }
]

export const formOptions = (it, h, isEdit) => {
  const property = (it, h, isEdit) => {
    if (isEdit) {
      return h("input", {
        domProps: {
          type: 'text',
          value: it.value,
          typeName: it.type,
          placeholder: it.placeholder,
          oninput(e) {
            it.value = e.target.value;
          }
        }
      })
    } else {
      return h("span", {
          domProps: {},
        },
        it.value
      )
    }
  };
  const comments = (it, h, isEdit) => {
    return h("input", {
      domProps: {
        type: 'text',
        value: it.value,
        typeName: it.type,
        placeholder: it.placeholder,
        oninput(e) {
          it.value = e.target.value;
        }
      }
    })
  };
  const date = (it, h, isEdit) => {
    return h('DatePicker', {
      props: {
        placeholder: it.placeholder,
        type: (!it.format || it.format == 'yyyy年MM月dd日') ? 'date' : 'datetime',
        format: it.format || 'yyyy年MM月dd日',
        value: it.value
      },
      on: {
        "on-change"(arr) {
          it.value = arr;
        }
      }
    })
  };
  let handler = {
    property,
    comments,
    date
  };
  return handler[it.type](it, h, isEdit)
};

export const optionsItemTypes = {
  property: {
    type: 'property',
    value: '',
    placeholder: '选项内容'
  },
  comments: {
    type: 'comments',
    value: '',
    placeholder: '备注'
  },
  date: {
    type: 'date',
    value: '',
    placeholder: '请选择日期'
  }
};

// 为单个option 操作的按钮
export const optionItemBtn = (_self, h) => {
  let buttonGroup = [];
  let addBtn = (k, btnText) => {
    return h('span', {
      class: "label_item",
      domProps: {
        onclick() {
          _self.ele.label_content.push(optionsItemTypes[k])
        }
      }
    }, btnText)
  };
  for (let k in optionsItemTypes) {
    let map = {
      property: addBtn(k, '追加内容'),
      comments: addBtn(k, '追加备注'),
      date: addBtn(k, '追加时间'),
    };
    buttonGroup.push(map[k])
  }
  return buttonGroup
};