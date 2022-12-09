import { extender } from '@antd-templater/antd-template-lib2.x/SForm/Helper'

/**
 * @description 字典管理 - 代码表单数据
 */
export default {
  data () {
    // 基本信息
    const FORM_BASE = [
      {
        type: 'AGroup',
        slot: '',
        field: 'title1',
        title: '',
        attrs: {},
        grid: {}
      },
      {
        type: 'AInput',
        slot: 'codeName',
        field: 'codeName',
        label: '代码名称',
        decorator: {
          rules: [{ required: true, message: '请输入代码名称' }]
        },
        attrs: {
          placeholder: '请输入代码名称'
        }
      },
      {
        type: 'AInput',
        slot: 'codeId',
        field: 'codeId',
        label: '代码编码',
        decorator: {
          rules: [{ required: true, message: '请输入代码编码' }]
        },
        attrs: {
          placeholder: '请输入代码编码'
        }
      },
      {
        type: 'AInput',
        slot: 'udf1',
        field: 'udf1',
        label: '补充说明1',
        decorator: {},
        attrs: {
          placeholder: '请输入补充说明1'
        }
      },
      {
        type: 'AInput',
        slot: 'udf2',
        field: 'udf2',
        label: '补充说明2',
        decorator: {},
        attrs: {
          placeholder: '请输入补充说明2'
        }
      },
      {
        type: 'AInput',
        slot: 'udf3',
        field: 'udf3',
        label: '补充说明3',
        decorator: {},
        attrs: {
          placeholder: '请输入补充说明3'
        }
      },
      {
        type: 'AInput',
        slot: 'showSequence',
        field: 'showSequence',
        label: '显示顺序',
        decorator: {
          rules: [{ required: true, message: '请输入显示顺序' }]
        },
        attrs: {
          placeholder: '请输入显示顺序'
        }
      }
    ]

    // 其他信息
    const FORM_OTHER = [
      {
        type: 'AGroup',
        slot: 'title2',
        field: 'title2',
        title: '',
        attrs: {},
        grid: {}
      },
      {
        type: 'ASwitch',
        slot: 'activity',
        field: 'activity',
        label: '角色状态',
        decorator: {
          valuePropName: 'checked'
        },
        attrs: {
          checkedChildren: '开',
          unCheckedChildren: '关'
        }
      }
    ]

    // 合并处理
    const groups = [
      ...FORM_BASE,
      ...FORM_OTHER
    ]

    return {
      // 布局
      grid: {
        gutter: 8,
        xs: 24
      },

      // 属性
      attrs: {
        labelAlign: 'right'
      },

      // 监听
      watch: {
        onValuesChange (props, values) {
          // 创建更改区
          const changed = {}

          // 是否进行赋值 (一次性赋值，提升性能)
          if (Object.keys(changed).length > 0) {
            this.setFieldsValue(changed)
          }
        }
      },

      // 配置
      groups: [
        ...extender.groups(groups, (group, index, groups) => {

        })
      ],

      // 扩展
      options: {
        ...extender.options(groups, (group, index, groups) => {
          // 默认值
          const option = {}

          // 下拉框处理
          if (
            [
              'ASelect',
              'ATreeSelect',
              'ACascader',
              'ARadioGroup',
              'ACheckboxGroup',
              'AAutoComplete'
            ].includes(group.type)
          ) {
            Object.assign(option, {
              selectOptions: []
            })
          }

          return option
        })
      },

      // 禁用 (已从props接受)
      // disabled: false,

      // 只读 (已从props接受)
      // readonly: false,

      // 查询中
      spinning: false
    }
  }
}
